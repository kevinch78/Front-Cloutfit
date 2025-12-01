import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Store, MapPin, Phone } from 'lucide-react';
import Card from '../../components/common/Card';
import Loader from '../../components/common/Loader';

const StoresPage = () => {
  const [stores, setStores] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // TODO: Implementar servicio de tiendas
    // Por ahora mostramos un mensaje
    setLoading(false);
  }, []);

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
              <Card key={store.id} hover>
                <Link to={`/store/${store.id}`}>
                  <div className="aspect-video bg-gray-200 rounded-lg mb-4 overflow-hidden">
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
                  <h3 className="font-bold text-xl mb-2">{store.name}</h3>
                  <p className="text-gray-600 text-sm mb-3 line-clamp-2">
                    {store.description}
                  </p>
                  <div className="space-y-2 text-sm text-gray-500">
                    <div className="flex items-center space-x-2">
                      <MapPin className="w-4 h-4" />
                      <span>{store.address}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Phone className="w-4 h-4" />
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