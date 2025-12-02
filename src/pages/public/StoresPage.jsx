import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Store, MapPin, Phone } from 'lucide-react';
import Card from '../../components/common/Card';
import Loader from '../../components/common/Loader';
import { storeService } from '../../services/storeService';

const StoresPage = () => {
  const [stores, setStores] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadStores();
  }, []);

  const loadStores = async () => {
    try {
      const result = await storeService.getAllStores();
      if (result.success) {
        setStores(result.data);
      } else {
        console.error('Error loading stores:', result.error);
      }
    } catch (error) {
      console.error('Unexpected error loading stores:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container-custom">
        <div className="text-center mb-12">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Nuestros Almacenes
          </h1>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Descubre las mejores tiendas de moda en un solo lugar
          </p>
        </div>

        {loading ? (
          <Loader />
        ) : stores.length === 0 ? (
          <div className="text-center py-16">
            <div className="text-6xl mb-4">🏪</div>
            <h3 className="text-2xl font-bold text-gray-900 mb-2">
              Próximamente
            </h3>
            <p className="text-gray-600">
              Estamos trabajando para traerte las mejores tiendas
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {stores.map((store) => (
              <Card key={store.storeId} hover>
                <Link to={`/store/${store.storeId}`}>
                  <div className="aspect-video bg-gray-200 rounded-lg mb-4 overflow-hidden relative">
                    {store.imageUrl ? (
                      <img
                        src={store.imageUrl}
                        alt={store.name}
                        className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center bg-gray-100">
                        <Store className="w-16 h-16 text-gray-400" />
                      </div>
                    )}
                    {/* Badge de Publicidad Activa (Opcional, si quieres destacarlas) */}
                    {store.activeAdvertising && (
                      <div className="absolute top-2 right-2 bg-yellow-400 text-yellow-900 text-xs font-bold px-2 py-1 rounded-full shadow-sm">
                        Destacado
                      </div>
                    )}
                  </div>
                  <h3 className="font-bold text-xl mb-2 text-gray-900">{store.name}</h3>
                  <p className="text-gray-600 text-sm mb-4 line-clamp-2 h-10">
                    {store.description || 'Sin descripción disponible.'}
                  </p>
                  <div className="space-y-2 text-sm text-gray-500 border-t pt-4">
                    <div className="flex items-center space-x-2">
                      <MapPin className="w-4 h-4 text-primary-500" />
                      <span className="truncate">{store.city} - {store.address}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Phone className="w-4 h-4 text-primary-500" />
                      <span>{store.contact}</span>
                    </div>
                  </div>
                </Link>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default StoresPage;