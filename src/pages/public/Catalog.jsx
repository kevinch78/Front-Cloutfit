import { useState, useEffect } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { Filter, X } from 'lucide-react';
import Card from '../../components/common/Card';
import Loader from '../../components/common/Loader';
import Button from '../../components/common/Button';
import { productService } from '../../services/productService';

const Catalog = () => {
  const [searchParams] = useSearchParams();
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showFilters, setShowFilters] = useState(false);
  
  // Filtros
  const [filters, setFilters] = useState({
    search: searchParams.get('search') || '',
    style: '',
    gender: '',
    climate: '',
    minPrice: 0,
    maxPrice: 1000000,
  });

  useEffect(() => {
    loadProducts();
  }, []);

  useEffect(() => {
    applyFilters();
  }, [products, filters]);

  const loadProducts = async () => {
    const result = await productService.getAllProducts();
    if (result.success) {
      setProducts(result.data);
    }
    setLoading(false);
  };

  const applyFilters = () => {
    let filtered = [...products];

    // Búsqueda por texto
    if (filters.search) {
      filtered = filtered.filter(p => 
        p.name?.toLowerCase().includes(filters.search.toLowerCase()) ||
        p.description?.toLowerCase().includes(filters.search.toLowerCase())
      );
    }

    // Filtro por estilo
    if (filters.style) {
      filtered = filtered.filter(p => p.style === filters.style);
    }

    // Filtro por género
    if (filters.gender) {
      filtered = filtered.filter(p => p.gender === filters.gender);
    }

    // Filtro por clima
    if (filters.climate) {
      filtered = filtered.filter(p => p.climate === filters.climate);
    }

    // Filtro por precio
    filtered = filtered.filter(p => 
      p.price >= filters.minPrice && p.price <= filters.maxPrice
    );

    setFilteredProducts(filtered);
  };

  const handleFilterChange = (key, value) => {
    setFilters({ ...filters, [key]: value });
  };

  const clearFilters = () => {
    setFilters({
      search: '',
      style: '',
      gender: '',
      climate: '',
      minPrice: 0,
      maxPrice: 1000000,
    });
  };

  const styles = ['Casual', 'Formal', 'Deportivo', 'Urbano', 'Elegante'];
  const genders = ['Masculino', 'Femenino', 'Unisex'];
  const climates = ['Cálido', 'Frío', 'Templado'];

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container-custom py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
              Catálogo de Productos
            </h1>
            <p className="text-gray-600">
              {filteredProducts.length} productos encontrados
            </p>
          </div>

          {/* Mobile Filter Button */}
          <button
            onClick={() => setShowFilters(!showFilters)}
            className="lg:hidden flex items-center space-x-2 px-4 py-2 bg-cyan-600 text-white rounded-lg"
          >
            <Filter className="w-5 h-5" />
            <span>Filtros</span>
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Filtros Sidebar */}
          <aside className={`
            ${showFilters ? 'block' : 'hidden'} lg:block
            fixed lg:relative inset-0 lg:inset-auto z-40 lg:z-0
            bg-black/50 lg:bg-transparent
          `}>
            <div className="bg-white h-full lg:h-auto lg:rounded-xl lg:shadow-md p-6 overflow-y-auto">
              <div className="flex items-center justify-between mb-6 lg:hidden">
                <h2 className="text-xl font-bold">Filtros</h2>
                <button onClick={() => setShowFilters(false)}>
                  <X className="w-6 h-6" />
                </button>
              </div>

              <h2 className="text-xl font-bold mb-6 hidden lg:block">Filtros</h2>

              {/* Búsqueda */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Buscar
                </label>
                <input
                  type="text"
                  value={filters.search}
                  onChange={(e) => handleFilterChange('search', e.target.value)}
                  placeholder="Buscar productos..."
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500"
                />
              </div>

              {/* Estilo */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Estilo
                </label>
                <select
                  value={filters.style}
                  onChange={(e) => handleFilterChange('style', e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500"
                >
                  <option value="">Todos</option>
                  {styles.map(style => (
                    <option key={style} value={style}>{style}</option>
                  ))}
                </select>
              </div>

              {/* Género */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Género
                </label>
                <select
                  value={filters.gender}
                  onChange={(e) => handleFilterChange('gender', e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500"
                >
                  <option value="">Todos</option>
                  {genders.map(gender => (
                    <option key={gender} value={gender}>{gender}</option>
                  ))}
                </select>
              </div>

              {/* Clima */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Clima
                </label>
                <select
                  value={filters.climate}
                  onChange={(e) => handleFilterChange('climate', e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500"
                >
                  <option value="">Todos</option>
                  {climates.map(climate => (
                    <option key={climate} value={climate}>{climate}</option>
                  ))}
                </select>
              </div>

              {/* Rango de Precio */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Precio Máximo: ${filters.maxPrice.toLocaleString()}
                </label>
                <input
                  type="range"
                  min="0"
                  max="1000000"
                  step="10000"
                  value={filters.maxPrice}
                  onChange={(e) => handleFilterChange('maxPrice', parseInt(e.target.value))}
                  className="w-full"
                />
              </div>

              {/* Botón Limpiar Filtros */}
              <Button
                variant="outline"
                fullWidth
                onClick={clearFilters}
              >
                Limpiar Filtros
              </Button>
            </div>
          </aside>

          {/* Productos Grid */}
          <div className="lg:col-span-3">
            {loading ? (
              <Loader />
            ) : filteredProducts.length === 0 ? (
              <div className="text-center py-16">
                <div className="text-6xl mb-4">🔍</div>
                <h3 className="text-2xl font-bold text-gray-900 mb-2">
                  No se encontraron productos
                </h3>
                <p className="text-gray-600 mb-6">
                  Intenta ajustar los filtros o buscar otro término
                </p>
                <Button onClick={clearFilters}>
                  Limpiar Filtros
                </Button>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
                {filteredProducts.map((product) => (
                  <Card key={product.idProduct} hover>
                    <Link to={`/product/${product.idProduct}`}>
                      <div className="aspect-square bg-gray-200 rounded-lg mb-4 overflow-hidden">
                        {product.imageUrl ? (
                          <img
                            src={product.imageUrl}
                            alt={product.name}
                            className="w-full h-full object-cover hover:scale-110 transition-transform duration-300"
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center text-gray-400">
                            Sin imagen
                          </div>
                        )}
                      </div>
                      <h3 className="font-semibold text-lg mb-2 line-clamp-2">
                        {product.name}
                      </h3>
                      <div className="flex items-center gap-2 mb-2">
                        {product.style && (
                          <span className="text-xs px-2 py-1 bg-cyan-100 text-cyan-700 rounded-full">
                            {product.style}
                          </span>
                        )}
                        {product.climate && (
                          <span className="text-xs px-2 py-1 bg-blue-100 text-blue-700 rounded-full">
                            {product.climate}
                          </span>
                        )}
                      </div>
                      <p className="text-gray-600 text-sm mb-2">
                        {product.gender}
                      </p>
                      <p className="text-cyan-600 font-bold text-xl">
                        ${product.price?.toLocaleString()}
                      </p>
                      {product.stock < 5 && product.stock > 0 && (
                        <p className="text-orange-600 text-sm mt-2">
                          ¡Solo quedan {product.stock}!
                        </p>
                      )}
                      {product.stock === 0 && (
                        <p className="text-red-600 text-sm mt-2">
                          Agotado
                        </p>
                      )}
                    </Link>
                  </Card>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Catalog;