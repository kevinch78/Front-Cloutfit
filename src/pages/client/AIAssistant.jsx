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
                productId: p.product.idProduct,
                storeId: p.product.storeId || p.store.storeId,
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
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-cyan-50/30 to-teal-50/50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto space-y-8">

        {/* Header Section */}
        <div className="text-center space-y-6 animate-fade-in">
          <div className="relative inline-block">
            <div className="absolute -inset-2 bg-gradient-to-r from-cyan-500 to-teal-500 rounded-full blur-xl opacity-40 animate-pulse"></div>
            <div className="relative inline-flex items-center justify-center w-24 h-24 bg-gradient-to-br from-cyan-500 to-teal-600 rounded-full shadow-2xl ring-4 ring-white/50">
              <Sparkles className="w-12 h-12 text-white" />
            </div>
          </div>
          <div>
            <h1 className="text-4xl md:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-slate-800 via-teal-700 to-cyan-600 tracking-tight">
              Asistente de Moda IA
            </h1>
            <p className="mt-4 text-lg text-slate-600 max-w-2xl mx-auto font-medium">
              Tu estilista personal inteligente. Descubre looks únicos diseñados solo para ti.
            </p>
          </div>
        </div>

        {/* Gender Selection Cards */}
        {!gender && messages.length === 1 && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 animate-slide-up">
            {[
              { id: "Masculino", icon: "👨", label: "Hombre", desc: "Outfits varoniles y modernos", color: "from-cyan-500 to-cyan-600" },
              { id: "Femenino", icon: "👩", label: "Mujer", desc: "Estilos femeninos y en tendencia", color: "from-teal-500 to-teal-600" },
              { id: "Unisex", icon: "🌟", label: "Unisex", desc: "Moda sin género y versátil", color: "from-cyan-500 to-teal-500" }
            ].map((item) => (
              <button
                key={item.id}
                onClick={() => setGender(item.id)}
                className="group relative p-8 bg-white rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 border-2 border-gray-100 hover:border-cyan-300 hover:-translate-y-1 text-left overflow-hidden"
              >
                <div className={`absolute inset-0 bg-gradient-to-br ${item.color} opacity-0 group-hover:opacity-5 transition-opacity duration-300`}></div>
                <div className="relative z-10">
                  <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-cyan-50 to-teal-50 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                    <span className="text-4xl">{item.icon}</span>
                  </div>
                  <h3 className="text-xl font-bold text-slate-800 mb-2">{item.label}</h3>
                  <p className="text-sm text-slate-600 group-hover:text-slate-800 transition-colors">{item.desc}</p>
                </div>
                <div className="absolute bottom-4 right-4 opacity-0 group-hover:opacity-100 transform translate-x-4 group-hover:translate-x-0 transition-all duration-300">
                  <div className={`w-10 h-10 rounded-full bg-gradient-to-r ${item.color} flex items-center justify-center shadow-lg`}>
                    <Send className="w-5 h-5 text-white" />
                  </div>
                </div>
              </button>
            ))}
          </div>
        )}

        {/* Active Session Interface */}
        {gender && (
          <div className="grid lg:grid-cols-4 gap-6 animate-fade-in">

            {/* Sidebar / Context Panel */}
            <div className="lg:col-span-1 space-y-4">
              {/* Gender Badge */}
              <div className="bg-white p-5 rounded-2xl shadow-md border-2 border-gray-100">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Perfil</span>
                  <button onClick={() => setGender("")} className="text-xs font-semibold text-cyan-600 hover:text-cyan-700 hover:underline">
                    Cambiar
                  </button>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-cyan-100 to-teal-100 flex items-center justify-center text-2xl border-2 border-cyan-200">
                    {gender === "Masculino" ? "👨" : gender === "Femenino" ? "👩" : "🌟"}
                  </div>
                  <div>
                    <p className="font-bold text-slate-800">{gender}</p>
                    <p className="text-xs text-slate-500">Modo activo</p>
                  </div>
                </div>
              </div>

              {/* Image Generation Toggle */}
              <div className="bg-gradient-to-br from-teal-600 to-cyan-600 p-5 rounded-2xl shadow-lg text-white relative overflow-hidden group border-2 border-teal-500/50">
                <div className="absolute top-0 right-0 -mt-4 -mr-4 w-24 h-24 bg-white/20 rounded-full blur-2xl group-hover:bg-white/30 transition-all"></div>
                <div className="relative z-10">
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-bold flex items-center gap-2">
                      <ImageIcon className="w-5 h-5" />
                      Visualización
                    </span>
                    <div className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        id="generateImage"
                        checked={generateImage}
                        onChange={(e) => setGenerateImage(e.target.checked)}
                        className="sr-only peer"
                      />
                      <div className="w-11 h-6 bg-white/30 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-white/90 shadow-md"></div>
                    </div>
                  </div>
                  <label htmlFor="generateImage" className="text-xs text-cyan-50 cursor-pointer block leading-relaxed">
                    Activa para generar imágenes fotorealistas de tus outfits.
                  </label>
                </div>
              </div>

              {/* Tips Accordion (Simplified) */}
              <div className="bg-white p-5 rounded-2xl shadow-md border-2 border-gray-100">
                <h3 className="font-bold text-slate-800 mb-3 flex items-center text-sm">
                  <Sparkles className="w-4 h-4 text-cyan-500 mr-2" />
                  Tips Pro
                </h3>
                <ul className="space-y-2.5 text-xs text-slate-600">
                  <li className="flex gap-2 items-start"><span className="text-cyan-600 font-bold mt-0.5">•</span> <span>Sé específico con la ocasión.</span></li>
                  <li className="flex gap-2 items-start"><span className="text-cyan-600 font-bold mt-0.5">•</span> <span>Menciona tu clima local.</span></li>
                  <li className="flex gap-2 items-start"><span className="text-cyan-600 font-bold mt-0.5">•</span> <span>Define tu estilo (Urbano, Formal...).</span></li>
                </ul>
              </div>
            </div>

            {/* Main Chat Area */}
            <div className="lg:col-span-3">
              <div className="bg-white rounded-2xl shadow-xl border-2 border-gray-100 h-[650px] flex flex-col overflow-hidden relative">

                {/* Chat Messages */}
                <div className="flex-1 overflow-y-auto p-6 space-y-6 scroll-smooth custom-scrollbar">
                  {messages.map((message) => (
                    <div key={message.id} className={`flex w-full ${message.type === "user" ? "justify-end" : "justify-start"} animate-fade-in`}>
                      <div className={`flex max-w-[90%] md:max-w-[80%] gap-4 ${message.type === "user" ? "flex-row-reverse" : "flex-row"}`}>

                        {/* Avatar */}
                        {message.type !== "action" && (
                          <div className={`flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center shadow-md ${message.type === "user"
                              ? "bg-gradient-to-r from-cyan-600 to-teal-600 ring-2 ring-cyan-400/50"
                              : "bg-gradient-to-br from-cyan-50 to-teal-50 border-2 border-cyan-200"
                            }`}>
                            {message.type === "user" ? (
                              <User className="w-5 h-5 text-white" />
                            ) : (
                              <Bot className="w-6 h-6 text-cyan-600" />
                            )}
                          </div>
                        )}

                        {/* Bubble */}
                        <div className={`flex flex-col ${message.type === "user" ? "items-end" : "items-start"}`}>
                          {message.type !== "action" ? (
                            <div className={`p-5 rounded-2xl shadow-md text-sm md:text-base leading-relaxed ${message.type === "user"
                                ? "bg-gradient-to-r from-cyan-600 to-teal-600 text-white rounded-tr-none border-2 border-cyan-500/50"
                                : "bg-white border-2 border-gray-200 text-slate-800 rounded-tl-none"
                              }`}>
                              <p className="whitespace-pre-line">{message.content}</p>

                              {/* Accessory Badge */}
                              {message.accessory && (
                                <div className="mt-4 inline-flex items-center gap-2 px-3 py-1.5 bg-gradient-to-r from-cyan-50 to-teal-50 text-cyan-700 rounded-lg text-xs font-semibold border-2 border-cyan-200">
                                  <span>💼</span>
                                  <span>Accesorio: {message.accessory}</span>
                                </div>
                              )}

                              {/* Generated Image */}
                              {message.imageUrl && (
                                <div className="mt-4 group relative rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow">
                                  <img
                                    src={message.imageUrl}
                                    alt="Outfit generado"
                                    className="w-full h-auto object-cover transform group-hover:scale-105 transition-transform duration-500"
                                    onError={(e) => {
                                      console.error("❌ Error cargando imagen:", message.imageUrl);
                                      e.target.style.display = 'none';
                                    }}
                                  />
                                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                                </div>
                              )}

                              {/* Products List */}
                              {message.outfit && message.outfit.length > 0 && (
                                <div className="mt-5 space-y-3">
                                  <p className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Productos Recomendados</p>
                                  <div className="grid gap-3">
                                    {message.outfit.map((product, idx) => (
                                      <div key={idx} className="bg-gradient-to-r from-slate-50 to-cyan-50/50 p-4 rounded-xl border-2 border-gray-200 flex gap-3 hover:bg-white hover:shadow-md hover:border-cyan-300 transition-all duration-200">
                                        {product.imageUrl && (
                                          <img
                                            src={product.imageUrl}
                                            alt={product.name}
                                            className="w-16 h-16 rounded-lg object-cover shadow-sm"
                                            onError={(e) => e.target.style.display = 'none'}
                                          />
                                        )}
                                        <div className="flex-1 min-w-0">
                                          <h4 className="font-bold text-slate-800 truncate">{product.name}</h4>
                                          <p className="text-xs text-slate-600 line-clamp-1 mb-1">{product.description || product.style}</p>
                                          <div className="flex items-center justify-between">
                                            <div className="flex gap-1">
                                              {product.storeName && <span className="text-[10px] bg-cyan-100 text-cyan-700 px-2 py-0.5 rounded font-medium border border-cyan-200">{product.storeName}</span>}
                                            </div>
                                            <span className="font-bold text-cyan-600 text-lg">${product.price?.toLocaleString()}</span>
                                          </div>
                                        </div>
                                      </div>
                                    ))}
                                  </div>
                                </div>
                              )}
                            </div>
                          ) : (
                            /* Action Message (Save Button) */
                            <div className="w-full flex justify-center py-2">
                              <div className="bg-gradient-to-r from-slate-800 to-teal-900 p-6 rounded-2xl shadow-xl text-center max-w-sm border-2 border-teal-700/50">
                                <p className="text-gray-200 mb-4 font-medium">{message.content}</p>
                                <button
                                  onClick={() => handleSaveOutfit(message.outfitData)}
                                  className="w-full py-3 px-4 bg-gradient-to-r from-cyan-500 to-teal-500 text-white rounded-xl font-bold hover:from-cyan-600 hover:to-teal-600 transform hover:scale-105 transition-all flex items-center justify-center gap-2 shadow-lg"
                                >
                                  <span>💾</span>
                                  Guardar en Mi Ropero
                                </button>
                              </div>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}

                  {/* Loading State */}
                  {loading && (
                    <div className="flex w-full justify-start animate-fade-in">
                      <div className="flex max-w-[80%] gap-4">
                        <div className="flex-shrink-0 w-10 h-10 rounded-full bg-gradient-to-br from-cyan-100 to-teal-100 border-2 border-cyan-200 flex items-center justify-center shadow-md">
                          <Bot className="w-6 h-6 text-cyan-600" />
                        </div>
                        <div className="p-4 rounded-2xl bg-white border-2 border-gray-200 shadow-md rounded-tl-none flex items-center gap-3">
                          <Loader2 className="w-5 h-5 animate-spin text-cyan-600" />
                          <span className="text-slate-700 text-sm font-medium">
                            {generateImage ? "Diseñando tu look fotorealista..." : "Analizando tendencias..."}
                          </span>
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                {/* Input Area */}
                <div className="p-5 bg-gradient-to-r from-slate-50 to-cyan-50/30 border-t-2 border-gray-100">
                  <form onSubmit={handleSubmit} className="relative flex items-center gap-2 max-w-4xl mx-auto">
                    <input
                      type="text"
                      value={input}
                      onChange={(e) => setInput(e.target.value)}
                      placeholder={gender ? "Describe la ocasión, clima o estilo..." : "Selecciona un género para comenzar"}
                      disabled={!gender || loading}
                      className="w-full pl-6 pr-14 py-4 bg-white border-2 border-gray-200 rounded-full text-slate-800 placeholder-slate-400 focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 shadow-sm transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                    />
                    <button
                      type="submit"
                      disabled={!gender || loading || !input.trim()}
                      className="absolute right-2 p-3 bg-gradient-to-r from-cyan-600 to-teal-600 text-white rounded-full shadow-lg hover:shadow-xl hover:scale-105 disabled:opacity-50 disabled:hover:scale-100 transition-all duration-200"
                    >
                      <Send className="w-5 h-5" />
                    </button>
                  </form>
                  <p className="text-center text-xs text-slate-500 mt-3">
                    IA impulsada por Cloufit. Los resultados pueden variar.
                  </p>
                </div>

              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AIAssistant;