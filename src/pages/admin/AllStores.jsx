import { useState, useEffect } from 'react';
import { Store, Trash2, Search, MapPin, Phone } from 'lucide-react';
import Card from '../../components/common/Card';
import Button from '../../components/common/Button';
import Loader from '../../components/common/Loader';
import { storeService } from '../../services/storeService';

const AllStores = () => {
  const [stores, setStores] = useState([]);
  const [filteredStores, setFilteredStores] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    loadStores();
  }, []);

  useEffect(() => {
    filterStores();
  }, [searchQuery, stores]);

  const loadStores = async () => {
    const result = await storeService.getAllStores();
    if (result.success) {
      setStores(result.data);
    }
    setLoading(false);
  };

  const filterStores = () => {
    if (!searchQuery.trim()) {
      setFilteredStores(stores);
      return;
    }

    const filtered = stores.filter(s =>
      s.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      s.city?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      s.owner?.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredStores(filtered);
  };

  const handleDelete = async (id, name) => {
    if (!confirm(`¿Estás seguro de eliminar la tienda "${name}"? Esto también eliminará todos sus productos.`)) return;

    const result = await storeService.deleteStore(id);
    if (result.success) {
      alert('Tienda eliminada exitosamente');
      loadStores();
    } else {
      alert(result.error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container-custom">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Gestión de Tiendas
          </h1>
          <p className="text-gray-600">
            {filteredStores.length} tiendas registradas en la plataforma
          </p>
        </div>

        {/* Search */}
        <Card className="mb-6">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Buscar tiendas por nombre, ciudad, propietario..."
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
            />
          </div>
        </Card>

        {loading ? (
          <Loader />
        ) : filteredStores.length === 0 ? (
          <Card>
            <div className="text-center py-12">
              <Store className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-xl font-bold text-gray-900 mb-2">
                {searchQuery ? 'No se encontraron tiendas' : 'No hay tiendas registradas'}
              </h3>
              <p className="text-gray-600">
                {searchQuery && 'Intenta con otro término de búsqueda'}
              </p>
            </div>
          </Card>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredStores.map((store) => (
              <Card key={store.storeId} hover>
                <div className="aspect-video bg-gray-200 rounded-lg mb-4 overflow-hidden">
                  {store.imageUrl ? (
                    <img
                      src={store.imageUrl}
                      alt={store.name}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center">
                      <Store className="w-12 h-12 text-gray-400" />
                    </div>
                  )}
                </div>

                <h3 className="font-bold text-xl mb-2">{store.name}</h3>
                <p className="text-gray-600 text-sm mb-3 line-clamp-2">
                  {store.description}
                </p>

                <div className="space-y-2 text-sm text-gray-600 mb-4">
                  <div className="flex items-center space-x-2">
                    <MapPin className="w-4 h-4 flex-shrink-0" />
                    <span className="line-clamp-1">{store.city} - {store.address}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Phone className="w-4 h-4 flex-shrink-0" />
                    <span>{store.contact}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Store className="w-4 h-4 flex-shrink-0" />
                    <span>Propietario: {store.owner}</span>
                  </div>
                </div>

                {store.activeAdvertising && (
                  <div className="mb-3">
                    <span className="inline-flex items-center px-3 py-1 bg-green-100 text-green-800 rounded-full text-xs font-medium">
                      ✨ Publicidad Activa
                    </span>
                  </div>
                )}

                <Button
                  variant="danger"
                  size="sm"
                  fullWidth
                  icon={<Trash2 className="w-4 h-4" />}
                  onClick={() => handleDelete(store.storeId, store.name)}
                >
                  Eliminar Tienda
                </Button>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default AllStores;