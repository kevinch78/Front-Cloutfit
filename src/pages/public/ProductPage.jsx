import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ShoppingCart, Heart, ArrowLeft, Store, Box } from 'lucide-react';
import { useDispatch, useSelector } from 'react-redux';
import Button from '../../components/common/Button';
import Loader from '../../components/common/Loader';
import { productService } from '../../services/productService';
import { addOrUpdateItem } from '../../store/slices/reservationSlice';

const ProductPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user, isAuthenticated } = useSelector((state) => state.auth);
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadProduct();
  }, [id]);

  const loadProduct = async () => {
    const result = await productService.getProductById(id);
    if (result.success) {
      setProduct(result.data);
    } else {
      navigate('/catalog');
    }
    setLoading(false);
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

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container-custom">
        {/* Breadcrumb */}
        <button
          onClick={() => navigate(-1)}
          className="flex items-center space-x-2 text-gray-600 hover:text-primary-600 mb-6 transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
          <span>Volver</span>
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
          {/* Imagen del Producto */}
          <div className="animate-fade-in">
            <div className="aspect-square bg-white rounded-2xl overflow-hidden shadow-lg">
              {product.imageUrl ? (
                <img
                  src={product.imageUrl}
                  alt={product.name}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-gray-400">
                  <div className="text-center">
                    <div className="text-6xl mb-4">📦</div>
                    <p>Sin imagen disponible</p>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Detalles del Producto */}
          <div className="animate-slide-up">
            <div className="bg-white rounded-2xl shadow-lg p-6 md:p-8">
              {/* Título y Precio */}
              <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                {product.name}
              </h1>

              <div className="flex items-center gap-2 mb-4">
                {product.style && (
                  <span className="px-3 py-1 bg-primary-100 text-primary-700 rounded-full text-sm font-medium">
                    {product.style}
                  </span>
                )}
                {product.climate && (
                  <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm font-medium">
                    {product.climate}
                  </span>
                )}
                {product.gender && (
                  <span className="px-3 py-1 bg-purple-100 text-purple-700 rounded-full text-sm font-medium">
                    {product.gender}
                  </span>
                )}
              </div>

              <div className="flex items-baseline gap-4 mb-6">
                <span className="text-4xl font-bold text-primary-600">
                  ${product.price?.toLocaleString()}
                </span>
                {product.stock > 0 ? (
                  <span className="text-green-600 font-medium">
                    Stock: {product.stock} disponibles
                  </span>
                ) : (
                  <span className="text-red-600 font-medium">
                    Agotado
                  </span>
                )}
              </div>

              {/* Descripción */}
              {product.description && (
                <div className="mb-6">
                  <h3 className="text-lg font-semibold mb-2">Descripción</h3>
                  <p className="text-gray-600 leading-relaxed">
                    {product.description}
                  </p>
                </div>
              )}

              {/* Descripción IA */}
              {product.iaDescription && (
                <div className="mb-6 p-4 bg-primary-50 rounded-lg border border-primary-200">
                  <h3 className="text-lg font-semibold mb-2 flex items-center">
                    <span className="mr-2">✨</span>
                    Descripción Inteligente
                  </h3>
                  <p className="text-gray-700 leading-relaxed">
                    {product.iaDescription}
                  </p>
                </div>
              )}

              {/* Detalles Técnicos */}
              <div className="mb-6 space-y-3">
                {product.material && (
                  <div className="flex items-center justify-between py-2 border-b">
                    <span className="text-gray-600">Material:</span>
                    <span className="font-medium">{product.material}</span>
                  </div>
                )}
                {product.primaryColor && (
                  <div className="flex items-center justify-between py-2 border-b">
                    <span className="text-gray-600">Color Principal:</span>
                    <span className="font-medium">{product.primaryColor}</span>
                  </div>
                )}
                {product.fit && (
                  <div className="flex items-center justify-between py-2 border-b">
                    <span className="text-gray-600">Ajuste:</span>
                    <span className="font-medium">{product.fit}</span>
                  </div>
                )}
                {product.occasion && (
                  <div className="flex items-center justify-between py-2 border-b">
                    <span className="text-gray-600">Ocasión:</span>
                    <span className="font-medium">{product.occasion}</span>
                  </div>
                )}
              </div>

              {/* Botones de Acción */}
              <div className="space-y-3">
                <Button
                  variant="primary"
                  fullWidth
                  icon={<Box className="w-5 h-5" />}
                  onClick={handleAddToReservation}
                  disabled={product.stock === 0}
                >
                  {product.stock === 0
                    ? 'No disponible para reservar'
                    : 'Añadir a la Cesta'}
                </Button>

                <Button
                  variant="outline"
                  fullWidth
                  icon={<Heart className="w-5 h-5" />}
                >
                  Agregar a Favoritos
                </Button>
              </div>

              {/* Info de Tienda */}
              {product.storeId && (
                <div className="mt-6 p-4 bg-gray-50 rounded-lg">
                  <div className="flex items-center space-x-2 text-gray-600">
                    <Store className="w-5 h-5" />
                    <span className="text-sm">
                      Vendido por: <span className="font-semibold">Tienda #{product.storeId}</span>
                    </span>
                  </div>
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