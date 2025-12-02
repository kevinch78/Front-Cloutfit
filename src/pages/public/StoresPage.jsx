import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Store, MapPin, Phone, Search, ArrowRight, ShoppingBag } from 'lucide-react';
import Loader from '../../components/common/Loader';
import { storeService } from '../../services/storeService';

const StoresPage = () => {
  const [stores, setStores] = useState([]);
  const [filteredStores, setFilteredStores] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    loadStores();
  }, []);

  useEffect(() => {
    if (searchTerm.trim() === '') {
      setFilteredStores(stores);
    } else {
      const lowerTerm = searchTerm.toLowerCase();
      const filtered = stores.filter(store =>
        store.name.toLowerCase().includes(lowerTerm) ||
        store.city?.toLowerCase().includes(lowerTerm) ||
        store.description?.toLowerCase().includes(lowerTerm)
      );
      setFilteredStores(filtered);
    }
  }, [searchTerm, stores]);

  const loadStores = async () => {
    try {
      const result = await storeService.getAllStores();
      if (result.success) {
        setStores(result.data);
        setFilteredStores(result.data);
      } else {
        console.error('Error loading stores:', result.error);
      }
    } catch (error) {
      console.error('Unexpected error loading stores:', error);
    } finally {
      setLoading(false);
    }
  };

  // Función para generar un color de fondo aleatorio pero estético basado en el ID
  const getStoreGradient = (id) => {
    const gradients = [
      'from-pink-500 to-rose-500',
      'from-purple-500 to-indigo-500',
      'from-cyan-500 to-blue-500',
      'from-emerald-500 to-teal-500',
      'from-orange-500 to-amber-500',
      'from-fuchsia-500 to-purple-600'
    ];
    return gradients[id % gradients.length];
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section con Buscador */}
      <div className="bg-white border-b border-gray-100 sticky top-0 z-10 shadow-sm">
        <div className="container-custom py-8 md:py-12">
          <div className="max-w-3xl mx-auto text-center space-y-6">
            <h1 className="text-3xl md:text-4xl font-extrabold text-gray-900 tracking-tight">
              Descubre Nuestros <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-600 to-teal-600">Almacenes</span>
            </h1>
            <p className="text-gray-500 text-lg">
              Explora las mejores tiendas de moda y encuentra tu estilo único cerca de ti.
            </p>

            {/* Buscador */}
            <div className="relative max-w-xl mx-auto mt-8 group">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <Search className="h-5 w-5 text-gray-400 group-focus-within:text-cyan-600 transition-colors" />
              </div>
              <input
                type="text"
                className="block w-full pl-11 pr-4 py-4 bg-gray-50 border-2 border-gray-100 rounded-2xl text-gray-900 placeholder-gray-400 focus:outline-none focus:border-cyan-500 focus:ring-4 focus:ring-cyan-500/10 transition-all shadow-sm"
                placeholder="Buscar por nombre, ciudad o estilo..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>
        </div>
      </div>

      <div className="container-custom py-12">
        {loading ? (
          <div className="flex justify-center py-20">
            <Loader />
          </div>
        ) : filteredStores.length === 0 ? (
          <div className="text-center py-20 animate-fade-in">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-gray-100 rounded-full mb-6">
              <Search className="w-10 h-10 text-gray-400" />
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-2">
              No encontramos resultados
            </h3>
            <p className="text-gray-500">
              Intenta con otra búsqueda o explora todas las tiendas.
            </p>
            {searchTerm && (
              <button
                onClick={() => setSearchTerm('')}
                className="mt-6 text-cyan-600 font-semibold hover:text-cyan-700 hover:underline"
              >
                Ver todas las tiendas
              </button>
            )}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredStores.map((store, index) => (
              <Link
                key={store.storeId}
                to={`/store/${store.storeId}`}
                className="group bg-white rounded-2xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col h-full"
              >
                {/* Header de la Tarjeta (Imagen o Gradiente) */}
                <div className="relative h-48 overflow-hidden bg-gray-100">
                  {store.imageUrl ? (
                    <img
                      src={store.imageUrl}
                      alt={store.name}
                      className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700"
                    />
                  ) : (
                    <div className={`w-full h-full bg-gradient-to-br ${getStoreGradient(store.storeId)} flex items-center justify-center`}>
                      <Store className="w-16 h-16 text-white/80" />
                    </div>
                  )}

                  {/* Badge Destacado */}
                  {store.activeAdvertising && (
                    <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm text-amber-600 text-xs font-bold px-3 py-1.5 rounded-full shadow-lg flex items-center gap-1">
                      <span className="w-2 h-2 bg-amber-500 rounded-full animate-pulse"></span>
                      Destacado
                    </div>
                  )}
                </div>

                {/* Contenido de la Tarjeta */}
                <div className="p-6 flex-1 flex flex-col">
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="font-bold text-xl text-gray-900 group-hover:text-cyan-700 transition-colors line-clamp-1">
                      {store.name}
                    </h3>
                    <div className="w-8 h-8 rounded-full bg-gray-50 flex items-center justify-center group-hover:bg-cyan-50 transition-colors">
                      <ArrowRight className="w-4 h-4 text-gray-400 group-hover:text-cyan-600" />
                    </div>
                  </div>

                  <p className="text-gray-500 text-sm mb-6 line-clamp-2 flex-1">
                    {store.description || 'Descubre nuestra colección exclusiva de moda y accesorios.'}
                  </p>

                  <div className="space-y-3 pt-4 border-t border-gray-50">
                    <div className="flex items-start gap-3 text-sm text-gray-600">
                      <MapPin className="w-4 h-4 text-cyan-500 mt-0.5 flex-shrink-0" />
                      <span className="line-clamp-1">{store.city} - {store.address}</span>
                    </div>
                    <div className="flex items-center gap-3 text-sm text-gray-600">
                      <Phone className="w-4 h-4 text-cyan-500 flex-shrink-0" />
                      <span>{store.contact}</span>
                    </div>
                  </div>

                  {/* Botón "Fantasma" para UX */}
                  <div className="mt-6 w-full py-2.5 rounded-xl bg-gray-50 text-gray-600 text-sm font-semibold text-center group-hover:bg-cyan-600 group-hover:text-white transition-all duration-300 flex items-center justify-center gap-2">
                    <ShoppingBag className="w-4 h-4" />
                    Visitar Tienda
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default StoresPage;