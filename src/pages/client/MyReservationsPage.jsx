import { useEffect, useState, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Calendar, Package, Clock, CheckCircle, XCircle, ArrowRight, Store, Filter, ShoppingBag } from 'lucide-react';
import { fetchClientReservations } from '../../store/slices/reservationSlice';
import { storeService } from '../../services/storeService';
import Button from '../../components/common/Button';
import Loader from '../../components/common/Loader';

const MyReservationsPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);
  const { history, status } = useSelector((state) => state.reservation);
  const [storeMap, setStoreMap] = useState({});
  const [activeTab, setActiveTab] = useState('ALL');

  useEffect(() => {
    if (user?.clientId) {
      dispatch(fetchClientReservations(user.clientId));
    }
    loadStores();
  }, [dispatch, user?.clientId]);

  const loadStores = async () => {
    try {
      const result = await storeService.getAllStores();
      if (result.success) {
        const map = {};
        result.data.forEach(store => {
          map[store.storeId] = store.name;
        });
        setStoreMap(map);
      }
    } catch (error) {
      console.error("Error loading stores map:", error);
    }
  };

  const filteredReservations = useMemo(() => {
    if (activeTab === 'ALL') return history;
    return history.filter(res => {
      if (activeTab === 'PENDING') return ['PENDIENTE', 'PENDING', 'SOLICITADA', 'REQUESTED'].includes(res.status);
      if (activeTab === 'CONFIRMED') return ['CONFIRMADA', 'CONFIRMED'].includes(res.status);
      if (activeTab === 'CANCELLED') return ['CANCELADA', 'CANCELLED'].includes(res.status);
      return true;
    });
  }, [history, activeTab]);

  const stats = useMemo(() => {
    return {
      total: history.length,
      pending: history.filter(r => ['PENDIENTE', 'PENDING', 'SOLICITADA', 'REQUESTED'].includes(r.status)).length,
      confirmed: history.filter(r => ['CONFIRMADA', 'CONFIRMED'].includes(r.status)).length
    };
  }, [history]);

  const getStatusConfig = (status) => {
    switch (status) {
      case 'CONFIRMADA':
      case 'CONFIRMED':
        return { color: 'bg-emerald-100 text-emerald-700 border-emerald-200', icon: <CheckCircle className="w-4 h-4" />, label: 'Confirmada' };
      case 'SOLICITADA':
      case 'REQUESTED':
        return { color: 'bg-blue-100 text-blue-700 border-blue-200', icon: <Clock className="w-4 h-4" />, label: 'Solicitada' };
      case 'PENDIENTE':
      case 'PENDING':
        return { color: 'bg-amber-100 text-amber-700 border-amber-200', icon: <Clock className="w-4 h-4" />, label: 'Pendiente' };
      case 'CANCELADA':
      case 'CANCELLED':
        return { color: 'bg-red-100 text-red-700 border-red-200', icon: <XCircle className="w-4 h-4" />, label: 'Cancelada' };
      default:
        return { color: 'bg-gray-100 text-gray-700 border-gray-200', icon: <Package className="w-4 h-4" />, label: status };
    }
  };

  const getStoreGradient = (id) => {
    const gradients = [
      'from-pink-500 to-rose-500',
      'from-purple-500 to-indigo-500',
      'from-cyan-500 to-blue-500',
      'from-emerald-500 to-teal-500',
      'from-orange-500 to-amber-500'
    ];
    return gradients[(id || 0) % gradients.length];
  };

  if (status === 'loading' && history.length === 0) {
    return <Loader text="Cargando tus reservas..." />;
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8 md:py-12">
      <div className="container-custom max-w-5xl">

        {/* Header Dashboard */}
        <div className="mb-10">
          <h1 className="text-3xl font-extrabold text-gray-900 mb-2 flex items-center gap-3">
            <ShoppingBag className="w-8 h-8 text-cyan-600" />
            Mis Reservas
          </h1>
          <p className="text-gray-500">Gestiona y revisa el estado de tus solicitudes de compra.</p>

          {/* Stats Cards */}
          <div className="grid grid-cols-3 gap-4 mt-8">
            <div className="bg-white p-4 rounded-2xl shadow-sm border border-gray-100 flex flex-col items-center justify-center">
              <span className="text-3xl font-bold text-gray-900">{stats.total}</span>
              <span className="text-xs text-gray-500 font-medium uppercase tracking-wide">Total</span>
            </div>
            <div className="bg-white p-4 rounded-2xl shadow-sm border border-blue-100 flex flex-col items-center justify-center relative overflow-hidden">
              <div className="absolute inset-0 bg-blue-50/50"></div>
              <span className="text-3xl font-bold text-blue-600 relative z-10">{stats.pending}</span>
              <span className="text-xs text-blue-600/80 font-medium uppercase tracking-wide relative z-10">En Proceso</span>
            </div>
            <div className="bg-white p-4 rounded-2xl shadow-sm border border-emerald-100 flex flex-col items-center justify-center relative overflow-hidden">
              <div className="absolute inset-0 bg-emerald-50/50"></div>
              <span className="text-3xl font-bold text-emerald-600 relative z-10">{stats.confirmed}</span>
              <span className="text-xs text-emerald-600/80 font-medium uppercase tracking-wide relative z-10">Confirmadas</span>
            </div>
          </div>
        </div>

        {/* Tabs de Filtro */}
        <div className="flex overflow-x-auto pb-4 mb-6 gap-2 no-scrollbar">
          {[
            { id: 'ALL', label: 'Todas' },
            { id: 'PENDING', label: 'En Proceso' },
            { id: 'CONFIRMED', label: 'Confirmadas' },
            { id: 'CANCELLED', label: 'Canceladas' }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-5 py-2.5 rounded-full text-sm font-medium transition-all whitespace-nowrap ${activeTab === tab.id
                  ? 'bg-cyan-600 text-white shadow-md shadow-cyan-200'
                  : 'bg-white text-gray-600 hover:bg-gray-100 border border-gray-200'
                }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Lista de Reservas */}
        {filteredReservations.length === 0 ? (
          <div className="text-center py-20 bg-white rounded-3xl border border-gray-100 shadow-sm animate-fade-in">
            <div className="w-24 h-24 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-6">
              <Filter className="w-10 h-10 text-gray-300" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">
              No hay reservas en esta categoría
            </h3>
            <p className="text-gray-500 mb-8 max-w-md mx-auto">
              {activeTab === 'ALL'
                ? 'Aún no has realizado ninguna reserva. ¡Explora el catálogo y encuentra tu outfit ideal!'
                : 'No tienes reservas con este estado actualmente.'}
            </p>
            {activeTab === 'ALL' && (
              <Button onClick={() => navigate('/catalog')} icon={<ShoppingBag className="w-4 h-4" />}>
                Ir al Catálogo
              </Button>
            )}
          </div>
        ) : (
          <div className="space-y-5 animate-slide-up">
            {filteredReservations.map((reservation) => {
              const statusConfig = getStatusConfig(reservation.status);
              const storeName = storeMap[reservation.storeId] || `Tienda #${reservation.storeId}`;

              return (
                <div
                  key={reservation.id}
                  className="bg-white rounded-2xl p-5 md:p-6 shadow-sm border border-gray-100 hover:shadow-md transition-all group relative overflow-hidden"
                >
                  {/* Decoración lateral de estado */}
                  <div className={`absolute left-0 top-0 bottom-0 w-1.5 ${statusConfig.color.split(' ')[0].replace('bg-', 'bg-')}`}></div>

                  <div className="flex flex-col md:flex-row justify-between gap-6 items-start md:items-center pl-3">

                    {/* Info Principal */}
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-3">
                        <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider flex items-center gap-1.5 border ${statusConfig.color}`}>
                          {statusConfig.icon}
                          {statusConfig.label}
                        </span>
                        <span className="text-xs text-gray-400 font-mono">
                          ID: {reservation.id}
                        </span>
                      </div>

                      <div className="flex items-center gap-4 mb-1">
                        <div className="flex items-center gap-2">
                          <div className={`w-8 h-8 rounded-lg bg-gradient-to-br ${getStoreGradient(reservation.storeId)} flex items-center justify-center text-white text-xs font-bold shadow-sm`}>
                            <Store className="w-4 h-4" />
                          </div>
                          <div>
                            <p className="text-xs text-gray-500 font-medium">Vendido por</p>
                            <h3 className="font-bold text-gray-900 text-lg leading-none">{storeName}</h3>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Detalles Secundarios */}
                    <div className="flex flex-wrap gap-6 md:gap-12 items-center text-sm text-gray-600 w-full md:w-auto border-t md:border-t-0 pt-4 md:pt-0 border-gray-50">
                      <div className="flex items-center gap-2">
                        <Calendar className="w-4 h-4 text-gray-400" />
                        <div className="flex flex-col">
                          <span className="text-xs text-gray-400">Fecha</span>
                          <span className="font-medium">{new Date(reservation.createdAt).toLocaleDateString()}</span>
                        </div>
                      </div>

                      <div className="flex items-center gap-2">
                        <Package className="w-4 h-4 text-gray-400" />
                        <div className="flex flex-col">
                          <span className="text-xs text-gray-400">Items</span>
                          <span className="font-medium">{reservation.items?.length || 0} prendas</span>
                        </div>
                      </div>

                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => navigate(`/client/reservation/${reservation.id}`)}
                        className="w-full md:w-auto group-hover:bg-cyan-50 group-hover:text-cyan-700 group-hover:border-cyan-200 transition-colors"
                      >
                        Ver Detalles <ArrowRight className="w-4 h-4 ml-2" />
                      </Button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default MyReservationsPage;
