import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Package, Store, Users, TrendingUp, AlertCircle } from 'lucide-react';
import Card from '../../components/common/Card';
import Button from '../../components/common/Button';
import Loader from '../../components/common/Loader';
import { productService } from '../../services/productService';
import { storeService } from '../../services/storeService';

const AdminDashboard = () => {
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({
    totalProducts: 0,
    totalStores: 0,
    lowStockProducts: 0,
    activeStores: 0,
  });

  useEffect(() => {
    loadDashboardData();
  }, []);

  const loadDashboardData = async () => {
    try {
      // Cargar todos los productos
      const productsResult = await productService.getAllProducts();
      
      if (productsResult.success) {
        const products = productsResult.data;
        const totalProducts = products.length;
        const lowStockProducts = products.filter(p => p.stock < 5).length;
        
        setStats(prev => ({
          ...prev,
          totalProducts,
          lowStockProducts,
        }));
      }

      // Cargar todas las tiendas
      const storesResult = await storeService.getAllStores();
      
      if (storesResult.success) {
        const stores = storesResult.data;
        const totalStores = stores.length;
        const activeStores = stores.filter(s => s.activeAdvertising).length;
        
        setStats(prev => ({
          ...prev,
          totalStores,
          activeStores,
        }));
      }
    } catch (error) {
      console.error('Error loading dashboard:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <Loader text="Cargando dashboard..." />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container-custom">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Panel de Administración
          </h1>
          <p className="text-gray-600">
            Resumen general de la plataforma Cloufit
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {/* Total Productos */}
          <Card hover>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 mb-1">Total Productos</p>
                <p className="text-3xl font-bold text-gray-900">{stats.totalProducts}</p>
              </div>
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                <Package className="w-6 h-6 text-blue-600" />
              </div>
            </div>
          </Card>

          {/* Total Tiendas */}
          <Card hover>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 mb-1">Total Tiendas</p>
                <p className="text-3xl font-bold text-gray-900">{stats.totalStores}</p>
              </div>
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                <Store className="w-6 h-6 text-purple-600" />
              </div>
            </div>
          </Card>

          {/* Tiendas Activas */}
          <Card hover>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 mb-1">Tiendas con Publicidad</p>
                <p className="text-3xl font-bold text-green-600">{stats.activeStores}</p>
              </div>
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                <TrendingUp className="w-6 h-6 text-green-600" />
              </div>
            </div>
          </Card>

          {/* Productos Stock Bajo */}
          <Card hover>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 mb-1">Stock Bajo</p>
                <p className="text-3xl font-bold text-orange-600">{stats.lowStockProducts}</p>
              </div>
              <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center">
                <AlertCircle className="w-6 h-6 text-orange-600" />
              </div>
            </div>
          </Card>
        </div>

        {/* Quick Actions */}
        <Card className="mb-8">
          <h2 className="text-xl font-bold mb-4">Gestión Rápida</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Link to="/admin/products">
              <Button variant="primary" fullWidth icon={<Package className="w-5 h-5" />}>
                Gestionar Productos
              </Button>
            </Link>
            <Link to="/admin/stores">
              <Button variant="outline" fullWidth icon={<Store className="w-5 h-5" />}>
                Gestionar Tiendas
              </Button>
            </Link>
          </div>
        </Card>

        {/* Info Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card>
            <h3 className="font-bold text-lg mb-3">Actividad Reciente</h3>
            <div className="space-y-3">
              <div className="flex items-center space-x-3 text-sm">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <span className="text-gray-600">Sistema funcionando correctamente</span>
              </div>
              <div className="flex items-center space-x-3 text-sm">
                <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                <span className="text-gray-600">{stats.totalProducts} productos en catálogo</span>
              </div>
              <div className="flex items-center space-x-3 text-sm">
                <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                <span className="text-gray-600">{stats.totalStores} tiendas registradas</span>
              </div>
            </div>
          </Card>

          <Card className="bg-gradient-to-br from-primary-600 to-primary-700 text-white">
            <h3 className="font-bold text-lg mb-3">Plataforma Cloufit</h3>
            <p className="text-primary-100 text-sm mb-4">
              Sistema de moda inteligente con IA para crear outfits personalizados.
            </p>
            <div className="flex items-center space-x-2 text-sm">
              <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
              <span>Sistema Activo</span>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;