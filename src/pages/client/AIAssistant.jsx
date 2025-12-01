import { useState } from "react";
import {
  Sparkles,
  Send,
  User,
  Bot,
  Loader2,
  Image as ImageIcon,
} from "lucide-react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { saveOutfit } from "../../store/slices/closetSlice";
import Button from "../../components/common/Button";
import Card from "../../components/common/Card";
import { aiService } from "../../services/aiService";

const AIAssistant = () => {
  const { isAuthenticated } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const [messages, setMessages] = useState([
    {
      id: 1,
      type: "bot",
      content:
        "¡Hola! 👋 Soy tu asistente de moda con IA. Cuéntame qué tipo de outfit buscas y te ayudaré a crear el look perfecto.",
    },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [gender, setGender] = useState("");
  const [generateImage, setGenerateImage] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!input.trim()) return;

    if (!gender) {
      alert("Por favor selecciona el género antes de enviar el mensaje");
      return;
    }

    const userMessage = {
      id: messages.length + 1,
      type: "user",
      content: input,
    };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setLoading(true);

    try {
      const result = await aiService.chatWithAI({
        message: input,
        gender: gender,
        generateImage: generateImage,
      });

      if (result.success) {
        const aiResponse = result.data;
        const botContent = aiResponse.reason || "¡Aquí está tu outfit!";
        const outfitProducts = aiResponse.selectedProducts || [];
        
        const mappedProducts = outfitProducts.map((item) => ({
          name: item.product.name,
          description: item.product.description || item.product.iaDescription,
          price: item.product.price,
          stock: item.product.stock,
          style: item.product.style,
          climate: item.product.climate,
          storeName: item.store.name,
          imageUrl: item.product.imageUrl,
          garmentType: item.product.garmentType,
          ...item.product
        }));

        const botMessage = {
          id: messages.length + 2,
          type: "bot",
          content: botContent,
          outfit: mappedProducts,
          accessory: aiResponse.accessory,
          imageUrl: aiResponse.imageUrl || null,
        };

        setMessages((prev) => [...prev, botMessage]);

        if (mappedProducts.length > 0) {
          const firstProduct = mappedProducts[0];
          const saveMessage = {
            id: messages.length + 3,
            type: "action",
            content:
              "¿Te gusta este outfit? Guárdalo en tu ropero para verlo después.",
            outfitData: {
              outfitName: `Outfit ${gender} - ${new Date().toLocaleDateString()}`,
              description: botContent,
              products: outfitProducts.map(p => ({
                productId: p.product.productId,
                storeId: p.store.storeId,
                productName: p.product.name,
                productPrice: p.product.price,
                productImageUrl: p.product.imageUrl,
                garmentType: p.product.garmentType
              })),
              accessory: aiResponse.accessory,
              imageUrl: aiResponse.imageUrl,
              gender: gender,
              climate: firstProduct?.climate || "",
              style: firstProduct?.style || "",
            },
          };
          setMessages((prev) => [...prev, saveMessage]);
        }
      } else {
        const errorMessage = {
          id: messages.length + 2,
          type: "bot",
          content: `Lo siento, hubo un error: ${result.error}. ¿Puedes intentar de nuevo?`,
        };
        setMessages((prev) => [...prev, errorMessage]);
      }
    } catch (error) {
      console.error("❌ Error en chat con IA:", error);
      const errorMessage = {
        id: messages.length + 2,
        type: "bot",
        content:
          "Lo siento, ocurrió un error inesperado. Por favor intenta de nuevo.",
      };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setLoading(false);
    }
  };

  const handleSaveOutfit = (outfitData) => {
    dispatch(saveOutfit(outfitData))
      .unwrap()
      .then(() => {
        alert("¡Outfit guardado en tu ropero! 🎉");
      })
      .catch((err) => {
        alert(`Error al guardar el outfit: ${err.message || 'Ocurrió un error.'}`);
      });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 via-purple-50 to-pink-50 py-8">
      <div className="container-custom max-w-5xl">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-primary-600 to-purple-600 rounded-3xl mb-4 shadow-lg">
            <Sparkles className="w-10 h-10 text-white" />
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
            Asistente IA de Moda
          </h1>
          <p className="text-gray-600 text-lg">
            Descubre tu outfit perfecto con ayuda de inteligencia artificial
          </p>
        </div>

        {/* Gender Selection */}
        {!gender && messages.length === 1 && (
          <Card className="mb-6 animate-slide-up">
            <h3 className="text-lg font-semibold mb-4 text-center">
              Primero, ¿para quién es el outfit?
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              <button
                onClick={() => setGender("Masculino")}
                className="p-4 border-2 border-gray-300 rounded-lg hover:border-primary-600 hover:bg-primary-50 transition-all"
              >
                <div className="text-4xl mb-2">👨</div>
                <p className="font-medium">Hombre</p>
              </button>
              <button
                onClick={() => setGender("Femenino")}
                className="p-4 border-2 border-gray-300 rounded-lg hover:border-primary-600 hover:bg-primary-50 transition-all"
              >
                <div className="text-4xl mb-2">👩</div>
                <p className="font-medium">Mujer</p>
              </button>
              <button
                onClick={() => setGender("Unisex")}
                className="p-4 border-2 border-gray-300 rounded-lg hover:border-primary-600 hover:bg-primary-50 transition-all col-span-2 md:col-span-1"
              >
                <div className="text-4xl mb-2">🌟</div>
                <p className="font-medium">Unisex</p>
              </button>
            </div>
          </Card>
        )}

        {/* Selected Gender Badge */}
        {gender && (
          <Card className="mb-6 bg-primary-50 border-primary-200">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <span className="text-2xl">
                  {gender === "Masculino"
                    ? "👨"
                    : gender === "Femenino"
                    ? "👩"
                    : "🌟"}
                </span>
                <div>
                  <p className="font-semibold text-gray-900">
                    Género seleccionado: {gender}
                  </p>
                  <button
                    onClick={() => setGender("")}
                    className="text-sm text-primary-600 hover:text-primary-700"
                  >
                    Cambiar
                  </button>
                </div>
              </div>

              {/* Toggle para generar imagen */}
              <div className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  id="generateImage"
                  checked={generateImage}
                  onChange={(e) => setGenerateImage(e.target.checked)}
                  className="w-5 h-5 text-primary-600 rounded focus:ring-primary-500"
                />
                <label
                  htmlFor="generateImage"
                  className="text-sm font-medium text-gray-700 cursor-pointer flex items-center"
                >
                  <ImageIcon className="w-4 h-4 mr-1" />
                  Generar imagen
                </label>
              </div>
            </div>
          </Card>
        )}

        {/* Chat Container */}
        <Card className="mb-6 h-[500px] flex flex-col" padding={false}>
          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 md:p-6 space-y-4">
            {messages.map((message) => (
              <div key={message.id}>
                {message.type !== "action" ? (
                  <div
                    className={`flex items-start gap-3 ${
                      message.type === "user" ? "flex-row-reverse" : ""
                    } animate-fade-in`}
                  >
                    {/* Avatar */}
                    <div
                      className={`flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center ${
                        message.type === "user"
                          ? "bg-primary-600"
                          : "bg-gradient-to-br from-purple-600 to-pink-600"
                      }`}
                    >
                      {message.type === "user" ? (
                        <User className="w-5 h-5 text-white" />
                      ) : (
                        <Bot className="w-5 h-5 text-white" />
                      )}
                    </div>

                    {/* Message Bubble */}
                    <div
                      className={`flex-1 max-w-[80%] p-4 rounded-2xl ${
                        message.type === "user"
                          ? "bg-primary-600 text-white"
                          : "bg-white border border-gray-200 text-gray-900"
                      }`}
                    >
                      <p className="leading-relaxed whitespace-pre-line">
                        {message.content}
                      </p>

                      {message.accessory && (
                        <div className="mt-3 p-2 bg-blue-50 rounded-lg border border-blue-200">
                          <p className="text-sm text-blue-800">
                            💼 <strong>Accesorio:</strong> {message.accessory}
                          </p>
                        </div>
                      )}

                      {message.imageUrl && (
                        <div className="mt-4">
                          <p className="text-sm font-semibold mb-2 text-gray-700">
                            📸 Visualización del outfit:
                          </p>
                          <img
                            src={message.imageUrl}
                            alt="Outfit generado"
                            className="rounded-lg max-w-full shadow-lg border border-gray-200"
                            onError={(e) => {
                              console.error("❌ Error cargando imagen:", message.imageUrl);
                              e.target.style.display = 'none';
                            }}
                          />
                        </div>
                      )}

                      {message.outfit && message.outfit.length > 0 && (
                        <div className="mt-4 space-y-3">
                          <p className="font-semibold text-sm border-b pb-2">
                            📦 Productos recomendados ({message.outfit.length}):
                          </p>
                          {message.outfit.map((product, idx) => (
                            <div
                              key={idx}
                              className="bg-gray-50 p-3 rounded-lg border border-gray-200 hover:shadow-md transition-shadow"
                            >
                              <div className="flex items-start justify-between gap-3">
                                {product.imageUrl && (
                                  <img
                                    src={product.imageUrl}
                                    alt={product.name}
                                    className="w-16 h-16 object-cover rounded-lg border border-gray-300"
                                    onError={(e) => e.target.style.display = 'none'}
                                  />
                                )}
                                
                                <div className="flex-1">
                                  <p className="font-semibold text-gray-900 mb-1">
                                    {product.name}
                                  </p>
                                  <p className="text-sm text-gray-600 mb-2 line-clamp-2">
                                    {product.description || product.style}
                                  </p>
                                  <div className="flex flex-wrap items-center gap-2 text-xs text-gray-500">
                                    {product.storeName && (
                                      <span className="flex items-center bg-blue-100 px-2 py-1 rounded">
                                        📍 {product.storeName}
                                      </span>
                                    )}
                                    {product.climate && (
                                      <span className="flex items-center bg-green-100 px-2 py-1 rounded">
                                        🌡️ {product.climate}
                                      </span>
                                    )}
                                    {product.garmentType && (
                                      <span className="flex items-center bg-purple-100 px-2 py-1 rounded">
                                        👔 {product.garmentType}
                                      </span>
                                    )}
                                  </div>
                                </div>
                                
                                <div className="text-right ml-3">
                                  <p className="font-bold text-primary-600 text-lg">
                                    ${product.price?.toLocaleString()}
                                  </p>
                                  {product.stock && (
                                    <p className="text-xs text-gray-500">
                                      Stock: {product.stock}
                                    </p>
                                  )}
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                ) : (
                  <div className="flex justify-center animate-fade-in">
                    <Card className="bg-gradient-to-r from-blue-50 to-purple-50 border-blue-200">
                      <div className="text-center">
                        <p className="text-gray-700 mb-3 font-medium">
                          {message.content}
                        </p>
                        <Button
                          onClick={() => {
                            handleSaveOutfit(message.outfitData);
                          }}
                          icon={<span className="text-lg">💾</span>}
                        >
                          Guardar en Mi Ropero
                        </Button>
                      </div>
                    </Card>
                  </div>
                )}
              </div>
            ))}

            {loading && (
              <div className="flex items-start gap-3 animate-fade-in">
                <div className="flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center bg-gradient-to-br from-purple-600 to-pink-600">
                  <Bot className="w-5 h-5 text-white" />
                </div>
                <div className="flex-1 max-w-[80%] p-4 rounded-2xl bg-white border border-gray-200">
                  <div className="flex items-center space-x-2">
                    <Loader2 className="w-5 h-5 animate-spin text-primary-600" />
                    <span className="text-gray-600">
                      {generateImage
                        ? "Generando outfit con imagen fotorealista... (esto puede tardar 5-10 segundos)"
                        : "Generando outfit..."}
                    </span>
                  </div>
                </div>
              </div>
            )}
          </div>

          <div className="border-t p-4">
            <form onSubmit={handleSubmit} className="flex gap-2">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder={
                  gender
                    ? "Ej: Algo casual para clima frío..."
                    : "Primero selecciona el género arriba"
                }
                disabled={!gender || loading}
                className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 disabled:bg-gray-100 text-sm md:text-base"
              />
              <Button
                type="submit"
                disabled={!gender || loading || !input.trim()}
                icon={<Send className="w-5 h-5" />}
              >
                <span className="hidden sm:inline">Enviar</span>
              </Button>
            </form>
          </div>
        </Card>

        <Card>
          <h3 className="font-semibold mb-3 flex items-center">
            <Sparkles className="w-5 h-5 text-primary-600 mr-2" />
            Tips para mejores resultados:
          </h3>
          <ul className="space-y-2 text-sm text-gray-600">
            <li>✨ Menciona la ocasión (ej: "trabajo", "fiesta", "casual")</li>
            <li>🌡️ Indica el clima (ej: "frío", "cálido", "templado")</li>
            <li>🎨 Especifica colores preferidos si tienes</li>
            <li>👔 Menciona el estilo (ej: "formal", "deportivo", "urbano")</li>
            <li>
              📸 Activa "Generar imagen" para ver una visualización fotorealista del outfit (tarda 5-10 segundos)
            </li>
          </ul>
        </Card>
      </div>
    </div>
  );
};

export default AIAssistant;