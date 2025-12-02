import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, MapPin, Phone, Store, Mail } from 'lucide-react';
import Button from '../../components/common/Button';
import Loader from '../../components/common/Loader';
import ProductCard from '../../components/common/ProductCard';
import { storeService } from '../../services/storeService';
import { productService } from '../../services/productService';

const StorePage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [store, setStore] = useState(null);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadStoreData();
  }, [id]);

  const loadStoreData = async () => {
    setLoading(true);
    try {
      // 1. Cargar información de la tienda
      const storeResult = await storeService.getStoreById(id);

      if (storeResult.success) {
        setStore(storeResult.data);

        // 2. Cargar productos de esta tienda
        // Usamos el endpoint específico getProductsByStore
        const productsResult = await productService.getProductsByStore(id);

        if (productsResult.success) {
          setProducts(productsResult.data);
        } else {
          console.error('Error loading store products:', productsResult.error);
        }
      } else {
        console.error('Error loading store:', storeResult.error);
        // Si no existe la tienda, volver a la lista
        navigate('/stores');
      }
    } catch (error) {
      console.error('Unexpected error:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader />
      </div>
    );
  }

  if (!store) return null;

  return (
    <div className="min-h-screen bg-gray-50 pb-12">
      {/* Hero Section de la Tienda */}
      <div className="bg-white shadow-sm border-b border-gray-100">
        <div className="container-custom py-8">
          <button
            onClick={() => navigate('/stores')}
            className="flex items-center space-x-2 text-gray-600 hover:text-primary-600 mb-6 transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
            <span>Volver a Almacenes</span>
          </button>

          <div className="flex flex-col md:flex-row items-start md:items-center gap-6 md:gap-8">
            {/* Logo de la Tienda */}
            <div className="w-32 h-32 md:w-40 md:h-40 bg-gray-100 rounded-2xl overflow-hidden shadow-md flex-shrink-0 border border-gray-200">
              {store.imageUrl ? (
                <img
                  src={store.imageUrl}
                  alt={store.name}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center">
                  <Store className="w-16 h-16 text-gray-400" />
                </div>
              )}
            </div>

            {/* Información Principal */}
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-2">
                <h1 className="text-3xl md:text-4xl font-bold text-gray-900">
                  {store.name}
                </h1>
                {store.activeAdvertising && (
                  <span className="px-3 py-1 bg-yellow-100 text-yellow-800 rounded-full text-xs font-bold border border-yellow-200">
                    Destacado
                  </span>
                )}
              </div>

              <p className="text-gray-600 text-lg mb-4 max-w-2xl">
                {store.description || 'Bienvenido a nuestra tienda oficial.'}
              </p>

              <div className="flex flex-wrap gap-4 text-sm text-gray-600">
                <div className="flex items-center gap-2 bg-gray-50 px-3 py-2 rounded-lg border border-gray-100">
                  <MapPin className="w-4 h-4 text-primary-500" />
                  <span>{store.city} - {store.address}</span>
                </div>
                <div className="flex items-center gap-2 bg-gray-50 px-3 py-2 rounded-lg border border-gray-100">
                  <Phone className="w-4 h-4 text-primary-500" />
                  <span>{store.contact}</span>
                </div>
                {store.owner && (
                  <div className="flex items-center gap-2 bg-gray-50 px-3 py-2 rounded-lg border border-gray-100">
                    <Store className="w-4 h-4 text-primary-500" />
                    <span>Propietario: {store.owner}</span>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Sección de Productos */}
      <div className="container-custom py-12">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-2xl font-bold text-gray-900">
            Catálogo de Productos
          </h2>
          <span className="text-gray-500">
            {products.length} productos disponibles
          </span>
        </div>

        {products.length === 0 ? (
          <div className="text-center py-16 bg-white rounded-2xl shadow-sm border border-gray-100">
            <div className="text-5xl mb-4">👕</div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              Aún no hay productos
            </h3>
            <p className="text-gray-500">
              Esta tienda está preparando su nueva colección.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {products.map((product) => (
              <ProductCard
                key={product.idProduct || product.id}
                product={product}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default StorePage;