import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import {
  Store,
  Package,
  ShoppingBag,
  TrendingUp,
  Plus,
  Eye,
  Edit
} from 'lucide-react';
import Card from '../../components/common/Card';
import Button from '../../components/common/Button';
import Loader from '../../components/common/Loader';
import { storeService } from '../../services/storeService';
import { productService } from '../../services/productService';

const VendorDashboard = () => {
  const { user } = useSelector((state) => state.auth);
  const [loading, setLoading] = useState(true);
  const [storeInfo, setStoreInfo] = useState(null);
  const [stats, setStats] = useState({
    totalProducts: 0,
    lowStock: 0,
    totalValue: 0,
    newThisWeek: 0,
  });

  useEffect(() => {
    loadDashboardData();
  }, []);

  const loadDashboardData = async () => {
    try {
      if (!user?.storeId) {
        setLoading(false);
        return;
      }

      // 1. Obtener información de la tienda
      const storeResponse = await storeService.getStoreById(user.storeId);
      if (storeResponse.success) {
        setStoreInfo(storeResponse.data);
      }

      // 2. Obtener productos de la tienda
      const productsResponse = await productService.getProductsByStore(user.storeId);

      if (productsResponse.success) {
        const products = productsResponse.data;

        // 3. Calcular estadísticas reales
        const totalProducts = products.length;

        // Productos con stock bajo (menos de 5 unidades)
        const lowStock = products.filter(p => p.stock < 5).length;

        // Valor total del inventario (precio × stock)
        const totalValue = products.reduce((sum, p) => {
          return sum + ((p.price || 0) * (p.stock || 0));
        }, 0);

        // Productos nuevos esta semana
        const weekAgo = new Date();
        weekAgo.setDate(weekAgo.getDate() - 7);

        const newThisWeek = products.filter(p => {
          if (!p.createdAt) return false;
          const createdDate = new Date(p.createdAt);
          return createdDate >= weekAgo;
        }).length;

        setStats({
          totalProducts,
          lowStock,
          totalValue,
          newThisWeek,
        });
      } else {
        // Si falla, usar valores por defecto
        console.warn('No se pudieron cargar los productos:', productsResponse.error);
        setStats({
          totalProducts: 0,
          lowStock: 0,
          totalValue: 0,
          newThisWeek: 0,
        });
      }
    } catch (error) {
      console.error('Error al cargar datos del dashboard:', error);
      // En caso de error, mantener valores en 0
      setStats({
        totalProducts: 0,
        lowStock: 0,
        totalValue: 0,
        newThisWeek: 0,
      });
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <Loader />;
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container-custom">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            ¡Bienvenido de nuevo! 👋
          </h1>
          <p className="text-gray-600">
            Aquí está el resumen de tu tienda
          </p>
        </div>

        {/* Info de la tienda del usuario */}
        {user?.storeId && (
          <Card className="mb-8 bg-gradient-to-br from-cyan-600 to-cyan-700 text-white">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div className="w-16 h-16 bg-white/20 rounded-xl flex items-center justify-center">
                  <Store className="w-8 h-8" />
                </div>
                <div>
                  <p className="text-white/80 text-sm mb-1">Tu Tienda</p>
                  <h2 className="text-2xl font-bold">
                    {storeInfo?.name || `Tienda #${user.storeId}`}
                  </h2>
                  <p className="text-white/90 text-sm mt-1">{user.email}</p>
                </div>
              </div>
              <Link to={`/seller/store`}>
                <Button variant="outline" className="bg-white text-cyan-600 hover:bg-white/90">
                  <Edit className="w-4 h-4 mr-2" />
                  Editar Tienda
                </Button>
              </Link>
            </div>
          </Card>
        )}

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {/* Total de Productos */}
          <Card hover>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm mb-1">Total de Productos</p>
                <p className="text-3xl font-bold text-gray-900">{stats.totalProducts}</p>
                {stats.newThisWeek > 0 && (
                  <p className="text-green-600 text-sm mt-2 flex items-center">
                    <TrendingUp className="w-4 h-4 mr-1" />
                    +{stats.newThisWeek} esta semana
                  </p>
                )}
              </div>
              <div className="w-12 h-12 bg-cyan-100 rounded-xl flex items-center justify-center">
                <Package className="w-6 h-6 text-cyan-600" />
              </div>
            </div>
          </Card>

          {/* Productos con Stock Bajo */}
          <Card hover>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm mb-1">Stock Bajo</p>
                <p className="text-3xl font-bold text-gray-900">{stats.lowStock}</p>
                {stats.lowStock > 0 ? (
                  <p className="text-yellow-600 text-sm mt-2">
                    Requieren atención
                  </p>
                ) : (
                  <p className="text-green-600 text-sm mt-2">
                    Todo en orden ✓
                  </p>
                )}
              </div>
              <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${stats.lowStock > 0 ? 'bg-yellow-100' : 'bg-green-100'
                }`}>
                <ShoppingBag className={`w-6 h-6 ${stats.lowStock > 0 ? 'text-yellow-600' : 'text-green-600'
                  }`} />
              </div>
            </div>
          </Card>

          {/* Valor Total del Inventario */}
          <Card hover>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm mb-1">Valor del Inventario</p>
                <p className="text-3xl font-bold text-gray-900">
                  ${stats.totalValue > 0 ? (stats.totalValue / 1000).toFixed(0) : 0}K
                </p>
                <p className="text-gray-600 text-sm mt-2">
                  COP {stats.totalValue.toLocaleString()}
                </p>
              </div>
              <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
                <TrendingUp className="w-6 h-6 text-green-600" />
              </div>
            </div>
          </Card>
        </div>

        {/* Acciones Rápidas */}
        <Card className="mb-8">
          <h2 className="text-xl font-bold mb-6">Acciones Rápidas</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Link to="/seller/CreateProduct">
              <button className="w-full flex items-center space-x-4 p-4 border-2 border-gray-200 rounded-xl hover:border-cyan-500 hover:bg-cyan-50 transition-all group">
                <div className="w-12 h-12 bg-cyan-100 group-hover:bg-cyan-600 rounded-lg flex items-center justify-center transition-colors">
                  <Plus className="w-6 h-6 text-cyan-600 group-hover:text-white" />
                </div>
                <div className="text-left">
                  <p className="font-semibold text-gray-900">Agregar Producto</p>
                  <p className="text-sm text-gray-600">Crea un nuevo producto</p>
                </div>
              </button>
            </Link>

            <Link to="/seller/MyProducts">
              <button className="w-full flex items-center space-x-4 p-4 border-2 border-gray-200 rounded-xl hover:border-cyan-500 hover:bg-cyan-50 transition-all group">
                <div className="w-12 h-12 bg-blue-100 group-hover:bg-blue-600 rounded-lg flex items-center justify-center transition-colors">
                  <Eye className="w-6 h-6 text-blue-600 group-hover:text-white" />
                </div>
                <div className="text-left">
                  <p className="font-semibold text-gray-900">Ver Mis Productos</p>
                  <p className="text-sm text-gray-600">Gestiona tu catálogo</p>
                </div>
              </button>
            </Link>

            <Link to="/seller/store">
              <button className="w-full flex items-center space-x-4 p-4 border-2 border-gray-200 rounded-xl hover:border-cyan-500 hover:bg-cyan-50 transition-all group">
                <div className="w-12 h-12 bg-cyan-100 group-hover:bg-cyan-600 rounded-lg flex items-center justify-center transition-colors">
                  <Store className="w-6 h-6 text-cyan-600 group-hover:text-white" />
                </div>
                <div className="text-left">
                  <p className="font-semibold text-gray-900">Configurar Tienda</p>
                  <p className="text-sm text-gray-600">Edita información</p>
                </div>
              </button>
            </Link>

            <button
              className="w-full flex items-center space-x-4 p-4 border-2 border-gray-200 rounded-xl opacity-50 cursor-not-allowed"
              disabled
            >
              <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center">
                <ShoppingBag className="w-6 h-6 text-gray-400" />
              </div>
              <div className="text-left">
                <p className="font-semibold text-gray-900">Ver Ventas</p>
                <p className="text-sm text-gray-600">Próximamente...</p>
              </div>
            </button>
          </div>
        </Card>

        {/* Tips para Vendedores */}
        <Card className="bg-gradient-to-br from-cyan-50 to-teal-50 border-cyan-200">
          <h3 className="text-lg font-bold text-gray-900 mb-3">💡 Tips para Vendedores</h3>
          <ul className="space-y-2 text-sm text-gray-700">
            <li className="flex items-start">
              <span className="text-cyan-600 mr-2">•</span>
              <span>Agrega fotos de alta calidad para atraer más clientes</span>
            </li>
            <li className="flex items-start">
              <span className="text-cyan-600 mr-2">•</span>
              <span>Mantén tu inventario actualizado para evitar ventas fallidas</span>
            </li>
            <li className="flex items-start">
              <span className="text-cyan-600 mr-2">•</span>
              <span>Completa toda la información del producto para mejor posicionamiento</span>
            </li>
          </ul>
        </Card>
      </div>
    </div>
  );
};

export default VendorDashboard;