import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Plus, Trash2, Edit, Search, Package } from 'lucide-react';
import Card from '../../components/common/Card';
import Button from '../../components/common/Button';
import Loader from '../../components/common/Loader';
import { productService } from '../../services/productService';
import { useSelector } from 'react-redux';

const MyProducts = () => {
  const { user } = useSelector((state) => state.auth);
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');

  // ✅ Obtener storeId del usuario logueado
  const myStoreId = user?.storeId;

  console.log('🏪 Mi storeId:', myStoreId);

  useEffect(() => {
    if (myStoreId) {
      loadMyProducts();
    }
  }, [myStoreId]);

  useEffect(() => {
    filterProducts();
  }, [searchQuery, products]);

  const loadMyProducts = async () => {
    console.log('📦 Cargando productos de la tienda:', myStoreId);
    
    const result = await productService.getProductsByStore(myStoreId);
    if (result.success) {
      setProducts(result.data);
      console.log('✅ Productos cargados:', result.data.length);
    } else {
      console.error('❌ Error al cargar productos:', result.error);
    }
    setLoading(false);
  };

  const filterProducts = () => {
    if (!searchQuery.trim()) {
      setFilteredProducts(products);
      return;
    }

    const filtered = products.filter(p =>
      p.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.style?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.description?.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredProducts(filtered);
  };

  const handleDelete = async (id, name) => {
    if (!confirm(`¿Estás seguro de eliminar "${name}"?`)) return;

    const result = await productService.deleteProduct(id);
    if (result.success) {
      alert('Producto eliminado exitosamente');
      loadMyProducts();
    } else {
      alert(result.error);
    }
  };

  // Si no hay storeId, mostrar mensaje
  if (!myStoreId) {
    return (
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="container-custom">
          <Card>
            <div className="text-center py-12">
              <div className="text-6xl mb-4">⚠️</div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">
                No tienes una tienda asignada
              </h3>
              <p className="text-gray-600 mb-6">
                Contacta al administrador para configurar tu tienda
              </p>
            </div>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container-custom">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8 gap-4">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2 flex items-center">
              <Package className="w-8 h-8 text-primary-600 mr-3" />
              Mis Productos
            </h1>
            <p className="text-gray-600">
              Tienda ID: {myStoreId} - {filteredProducts.length} productos en tu catálogo
            </p>
          </div>

          <Link to="/seller/CreateProduct">
            <Button
              variant="primary"
              icon={<Plus className="w-5 h-5" />}
            >
              Agregar Producto
            </Button>
          </Link>
        </div>

        {/* Search Bar */}
        <Card className="mb-6">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Buscar en mis productos..."
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
            />
          </div>
        </Card>

        {/* Products Grid */}
        {loading ? (
          <Loader />
        ) : filteredProducts.length === 0 ? (
          <Card>
            <div className="text-center py-12">
              <div className="text-6xl mb-4">📦</div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">
                {searchQuery ? 'No se encontraron productos' : 'No tienes productos todavía'}
              </h3>
              <p className="text-gray-600 mb-6">
                {searchQuery
                  ? 'Intenta con otro término de búsqueda'
                  : 'Comienza agregando productos a tu tienda'}
              </p>
              {!searchQuery && (
                <Link to="/seller/createProducts">
                  <Button icon={<Plus className="w-5 h-5" />}>
                    Agregar Primer Producto
                  </Button>
                </Link>
              )}
            </div>
          </Card>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProducts.map((product) => (
              <Card key={product.idProduct} hover>
                <div className="aspect-square bg-gray-200 rounded-lg mb-4 overflow-hidden">
                  {product.imageUrl ? (
                    <img
                      src={product.imageUrl}
                      alt={product.name}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-gray-400">
                      <Package className="w-16 h-16" />
                    </div>
                  )}
                </div>

                <h3 className="font-semibold text-lg mb-2 line-clamp-2">
                  {product.name}
                </h3>

                <div className="flex items-center gap-2 mb-3">
                  <span className="text-xs px-2 py-1 bg-primary-100 text-primary-700 rounded-full">
                    {product.style}
                  </span>
                  <span className={`text-xs px-2 py-1 rounded-full ${
                    product.stock > 10
                      ? 'bg-green-100 text-green-800'
                      : product.stock > 0
                      ? 'bg-yellow-100 text-yellow-800'
                      : 'bg-red-100 text-red-800'
                  }`}>
                    Stock: {product.stock}
                  </span>
                </div>

                <p className="text-primary-600 font-bold text-xl mb-4">
                  ${product.price?.toLocaleString()}
                </p>

                <div className="flex gap-2">
                  <Link to={`/seller/products/edit/${product.idProduct}`} className="flex-1">
                    <Button
                      variant="outline"
                      size="sm"
                      fullWidth
                      icon={<Edit className="w-4 h-4" />}
                    >
                      Editar
                    </Button>
                  </Link>
                  <Button
                    variant="danger"
                    size="sm"
                    icon={<Trash2 className="w-4 h-4" />}
                    onClick={() => handleDelete(product.idProduct, product.name)}
                  >
                    Eliminar
                  </Button>
                </div>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default MyProducts;