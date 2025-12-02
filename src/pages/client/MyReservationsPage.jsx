import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Calendar, Package, Clock, CheckCircle, XCircle, ArrowRight } from 'lucide-react';
import { fetchClientReservations } from '../../store/slices/reservationSlice';
import Card from '../../components/common/Card';
import Button from '../../components/common/Button';
import Loader from '../../components/common/Loader';

const MyReservationsPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);
  const { history, status, error } = useSelector((state) => state.reservation);

  useEffect(() => {
    if (user?.clientId) {
      dispatch(fetchClientReservations(user.clientId));
    }
  }, [dispatch, user?.clientId]);

  const getStatusColor = (status) => {
    switch (status) {
      case 'CONFIRMADA':
      case 'CONFIRMED':
        return 'text-green-600 bg-green-100';
      case 'SOLICITADA':
      case 'REQUESTED':
        return 'text-blue-600 bg-blue-100';
      case 'PENDIENTE':
      case 'PENDING':
        return 'text-orange-600 bg-orange-100';
      case 'CANCELADA':
      case 'CANCELLED':
        return 'text-red-600 bg-red-100';
      default:
        return 'text-gray-600 bg-gray-100';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'CONFIRMADA':
      case 'CONFIRMED':
        return <CheckCircle className="w-5 h-5" />;
      case 'SOLICITADA':
      case 'REQUESTED':
        return <Clock className="w-5 h-5" />;
      case 'PENDIENTE':
      case 'PENDING':
        return <Clock className="w-5 h-5" />;
      case 'CANCELADA':
      case 'CANCELLED':
        return <XCircle className="w-5 h-5" />;
      default:
        return <Package className="w-5 h-5" />;
    }
  };

  if (status === 'loading') {
    return <Loader text="Cargando tus reservas..." />;
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container-custom max-w-4xl">
        <h1 className="text-3xl font-bold text-gray-900 mb-8 flex items-center gap-3">
          <Calendar className="w-8 h-8 text-primary-600" />
          Mis Reservas
        </h1>

        {history.length === 0 ? (
          <div className="text-center py-16 bg-white rounded-2xl shadow-sm">
            <div className="text-6xl mb-4">📭</div>
            <h3 className="text-2xl font-bold text-gray-900 mb-2">
              No tienes reservas
            </h3>
            <p className="text-gray-600 mb-6">
              Cuando confirmes tu cesta, tus reservas aparecerán aquí.
            </p>
            <Button onClick={() => navigate('/catalog')}>
              Ir al Catálogo
            </Button>
          </div>
        ) : (
          <div className="space-y-6">
            {history.map((reservation) => (
              <Card key={reservation.id} hover className="group transition-all">
                <div className="flex flex-col md:flex-row justify-between gap-6">
                  {/* Info Principal */}
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <span className={`px-3 py-1 rounded-full text-sm font-medium flex items-center gap-2 ${getStatusColor(reservation.status)}`}>
                        {getStatusIcon(reservation.status)}
                        {reservation.status}
                      </span>
                      <span className="text-gray-500 text-sm">
                        #{reservation.id}
                      </span>
                    </div>
                    
                    <div className="flex items-center gap-2 text-gray-600 mb-4">
                      <Calendar className="w-4 h-4" />
                      <span>{new Date(reservation.createdAt).toLocaleDateString()}</span>
                      <span className="text-gray-300">|</span>
                      <Clock className="w-4 h-4" />
                      <span>{new Date(reservation.createdAt).toLocaleTimeString()}</span>
                    </div>

                    <div className="flex items-center gap-2 text-gray-700 font-medium">
                      <Package className="w-5 h-5 text-primary-600" />
                      <span>{reservation.items?.length || 0} prendas reservadas</span>
                    </div>
                  </div>

                  {/* Acciones / Detalles */}
                  <div className="flex flex-col justify-center items-end border-t md:border-t-0 md:border-l pt-4 md:pt-0 md:pl-6 border-gray-100">
                     <div className="text-right mb-4">
                        <p className="text-sm text-gray-500">Tienda</p>
                        <p className="font-semibold text-gray-900">#{reservation.storeId || 'N/A'}</p>
                     </div>
                     
                     <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => navigate(`/client/reservation/${reservation.id}`)}
                        className="w-full md:w-auto group-hover:bg-primary-50 group-hover:text-primary-700 group-hover:border-primary-200"
                     >
                        Ver Detalles <ArrowRight className="w-4 h-4 ml-2" />
                     </Button>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default MyReservationsPage;
