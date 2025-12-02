import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ShoppingCart, Heart, ArrowLeft, Store, Box } from 'lucide-react';
import { useDispatch, useSelector } from 'react-redux';
import Button from '../../components/common/Button';
import Loader from '../../components/common/Loader';
import { productService } from '../../services/productService';
import { storeService } from '../../services/storeService';
import { addOrUpdateItem } from '../../store/slices/reservationSlice';

const ProductPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user, isAuthenticated } = useSelector((state) => state.auth);
  const [product, setProduct] = useState(null);
  const [storeName, setStoreName] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadProduct();
  }, [id]);

  const loadProduct = async () => {
    try {
      const result = await productService.getProductById(id);
      if (result.success) {
        setProduct(result.data);

        // Cargar información de la tienda si existe storeId
        if (result.data.storeId) {
          try {
            const storeResult = await storeService.getStoreById(result.data.storeId);
            if (storeResult.success) {
              setStoreName(storeResult.data.name);
            }
          } catch (error) {
            console.error("Error cargando info de tienda:", error);
          }
        }
      } else {
        navigate('/catalog');
      }
    } catch (error) {
      console.error("Error cargando producto:", error);
      navigate('/catalog');
    } finally {
      setLoading(false);
    }
  };

  const handleAddToReservation = async () => {
    if (!isAuthenticated) {
      alert('Debes iniciar sesión para hacer una reserva');
      navigate('/login');
      return;
    }

    if (!user?.clientId) {
      alert('Solo los clientes pueden hacer reservas');
      return;
    }

    if (!product) return;

    try {
      await dispatch(addOrUpdateItem({
        clientId: user.clientId,
        storeId: product.storeId,
        product: product,
        quantity: 1
      })).unwrap();

      alert('Producto añadido a tu cesta de reserva');
    } catch (error) {
      console.error('Error al añadir a reserva:', error);
      alert(error || 'Error al añadir a la reserva');
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader />
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4">Producto no encontrado</h2>
          <Button onClick={() => navigate('/catalog')}>
            Volver al Catálogo
          </Button>
        </div>
      </div>
    );
  }

  const isVendor = user?.role === 'VENDOR';

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container-custom">
        {/* Breadcrumb */}
        <button
          onClick={() => navigate(-1)}
          className="flex items-center space-x-2 text-gray-600 hover:text-cyan-600 mb-6 transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
          <span>Volver</span>
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
          {/* Imagen del Producto */}
          <div className="animate-fade-in">
            <div className="aspect-square bg-white rounded-2xl overflow-hidden shadow-lg border border-gray-100">
              {product.imageUrl ? (
                <img
                  src={product.imageUrl}
                  alt={product.name}
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-gray-400 bg-gray-50">
                  <div className="text-center">
                    <div className="text-6xl mb-4 opacity-50">📦</div>
                    <p className="font-medium">Sin imagen disponible</p>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Detalles del Producto */}
          <div className="animate-slide-up">
            <div className="bg-white rounded-2xl shadow-lg p-6 md:p-8 border border-gray-100">
              {/* Título y Precio */}
              <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4 leading-tight">
                {product.name}
              </h1>

              <div className="flex flex-wrap items-center gap-2 mb-6">
                {product.style && (
                  <span className="px-3 py-1 bg-cyan-50 text-cyan-700 rounded-full text-sm font-semibold border border-cyan-100">
                    {product.style}
                  </span>
                )}
                {product.climate && (
                  <span className="px-3 py-1 bg-blue-50 text-blue-700 rounded-full text-sm font-semibold border border-blue-100">
                    {product.climate}
                  </span>
                )}
                {product.gender && (
                  <span className="px-3 py-1 bg-teal-50 text-teal-700 rounded-full text-sm font-semibold border border-teal-100">
                    {product.gender}
                  </span>
                )}
              </div>

              <div className="flex items-baseline gap-4 mb-8 pb-6 border-b border-gray-100">
                <span className="text-5xl font-bold text-cyan-600 tracking-tight">
                  ${product.price?.toLocaleString()}
                </span>
                {product.stock > 0 ? (
                  <span className="text-green-600 font-medium bg-green-50 px-3 py-1 rounded-lg border border-green-100">
                    Stock: {product.stock} disponibles
                  </span>
                ) : (
                  <span className="text-red-600 font-medium bg-red-50 px-3 py-1 rounded-lg border border-red-100">
                    Agotado
                  </span>
                )}
              </div>

              {/* Descripción */}
              <div className="mb-8">
                <h3 className="text-lg font-bold text-gray-900 mb-3">Descripción</h3>
                <p className="text-gray-600 leading-relaxed text-lg">
                  {product.description || "Sin descripción detallada."}
                </p>
              </div>

              {/* Descripción IA */}
              {product.iaDescription && (
                <div className="mb-8 p-5 bg-gradient-to-br from-cyan-50 to-teal-50 rounded-xl border border-cyan-100 shadow-sm relative overflow-hidden">
                  <div className="absolute top-0 right-0 -mt-2 -mr-2 w-16 h-16 bg-cyan-200 rounded-full blur-2xl opacity-50"></div>
                  <h3 className="text-lg font-bold mb-3 flex items-center text-cyan-800 relative z-10">
                    <span className="mr-2 text-xl">✨</span>
                    Descripción Inteligente
                  </h3>
                  <p className="text-cyan-900/80 leading-relaxed relative z-10">
                    {product.iaDescription}
                  </p>
                </div>
              )}

              {/* Detalles Técnicos */}
              <div className="mb-8 space-y-3 bg-gray-50 p-5 rounded-xl border border-gray-100">
                {product.material && (
                  <div className="flex items-center justify-between py-2 border-b border-gray-200 last:border-0">
                    <span className="text-gray-500 font-medium">Material</span>
                    <span className="font-semibold text-gray-800">{product.material}</span>
                  </div>
                )}
                {product.primaryColor && (
                  <div className="flex items-center justify-between py-2 border-b border-gray-200 last:border-0">
                    <span className="text-gray-500 font-medium">Color Principal</span>
                    <span className="font-semibold text-gray-800">{product.primaryColor}</span>
                  </div>
                )}
                {product.fit && (
                  <div className="flex items-center justify-between py-2 border-b border-gray-200 last:border-0">
                    <span className="text-gray-500 font-medium">Ajuste</span>
                    <span className="font-semibold text-gray-800">{product.fit}</span>
                  </div>
                )}
                {product.occasion && (
                  <div className="flex items-center justify-between py-2 border-b border-gray-200 last:border-0">
                    <span className="text-gray-500 font-medium">Ocasión</span>
                    <span className="font-semibold text-gray-800">{product.occasion}</span>
                  </div>
                )}
              </div>

              {/* Botones de Acción - SOLO SI NO ES VENDOR */}
              {!isVendor && (
                <div className="space-y-4 mb-8">
                  <Button
                    variant="primary"
                    fullWidth
                    size="lg"
                    icon={<Box className="w-5 h-5" />}
                    onClick={handleAddToReservation}
                    disabled={product.stock === 0}
                    className="shadow-lg shadow-cyan-200 hover:shadow-xl hover:shadow-cyan-300 transition-all"
                  >
                    {product.stock === 0
                      ? 'No disponible para reservar'
                      : 'Añadir a la Cesta'}
                  </Button>

                  <Button
                    variant="outline"
                    fullWidth
                    size="lg"
                    icon={<Heart className="w-5 h-5" />}
                    className="hover:bg-gray-50 border-gray-300 text-gray-700"
                  >
                    Agregar a Favoritos
                  </Button>
                </div>
              )}

              {/* Info de Tienda */}
              {product.storeId && (
                <div className="mt-6 p-4 bg-white border-2 border-gray-100 rounded-xl flex items-center justify-between hover:border-cyan-200 transition-colors group cursor-default">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-cyan-100 rounded-full flex items-center justify-center text-cyan-600 group-hover:scale-110 transition-transform">
                      <Store className="w-5 h-5" />
                    </div>
                    <div>
                      <p className="text-xs text-gray-500 font-medium uppercase tracking-wider">Vendido por</p>
                      <p className="font-bold text-gray-900 text-lg">
                        {storeName || `Tienda #${product.storeId}`}
                      </p>
                    </div>
                  </div>
                  {/* Podríamos agregar un botón de "Ver Perfil" aquí en el futuro */}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductPage;