import { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { ArrowLeft, Calendar, Clock, Package, Store, MapPin, CheckCircle, XCircle } from 'lucide-react';
import { fetchClientReservations } from '../../store/slices/reservationSlice';
import Card from '../../components/common/Card';
import Button from '../../components/common/Button';
import Loader from '../../components/common/Loader';

const ReservationDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const { history, status } = useSelector((state) => state.reservation);

  // Buscar la reserva específica
  const reservation = history.find((r) => r.id === parseInt(id));

  useEffect(() => {
    if (user?.clientId && history.length === 0) {
      dispatch(fetchClientReservations(user.clientId));
    }
  }, [dispatch, user?.clientId, history.length]);

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
        return <CheckCircle className="w-6 h-6" />;
      case 'SOLICITADA':
      case 'REQUESTED':
      case 'PENDIENTE':
      case 'PENDING':
        return <Clock className="w-6 h-6" />;
      case 'CANCELADA':
      case 'CANCELLED':
        return <XCircle className="w-6 h-6" />;
      default:
        return <Package className="w-6 h-6" />;
    }
  };

  // 🏪 Agrupar items por tienda
  const itemsByStore = (reservation?.items || []).reduce((acc, item) => {
    const storeId = item.storeId || 'sin-tienda';
    if (!acc[storeId]) {
      acc[storeId] = {
        storeId,
        storeName: item.product?.storeName || `Tienda ${storeId}`,
        items: []
      };
    }
    acc[storeId].items.push(item);
    return acc;
  }, {});

  const storeGroups = Object.values(itemsByStore);
  console.log('🔍 ReservationDetail - Items agrupados:', storeGroups);

  if (status === 'loading') {
    return <Loader text="Cargando detalles..." />;
  }

  if (!reservation) {
    return (
      <div className="min-h-screen bg-gray-50 py-16">
        <div className="container-custom max-w-2xl text-center">
          <div className="text-6xl mb-4">🔍</div>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            Reserva no encontrada
          </h2>
          <p className="text-gray-600 mb-6">
            No pudimos encontrar la reserva que estás buscando.
          </p>
          <Button onClick={() => navigate('/client/my-reservations')}>
            Volver a Mis Reservas
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container-custom max-w-5xl">
        {/* Header con botón volver */}
        <div className="mb-6">
          <Button
            variant="outline"
            onClick={() => navigate('/client/my-reservations')}
            className="mb-4"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Volver a Mis Reservas
          </Button>
          
          <div className="flex items-center justify-between flex-wrap gap-4">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">
                Reserva #{reservation.id}
              </h1>
              <div className="flex items-center gap-2 mt-2 text-gray-600">
                <Calendar className="w-4 h-4" />
                <span>{new Date(reservation.createdAt).toLocaleDateString()}</span>
                <span className="text-gray-300">|</span>
                <Clock className="w-4 h-4" />
                <span>{new Date(reservation.createdAt).toLocaleTimeString()}</span>
              </div>
            </div>
            
            <div className={`px-4 py-2 rounded-full font-medium flex items-center gap-2 ${getStatusColor(reservation.status)}`}>
              {getStatusIcon(reservation.status)}
              {reservation.status}
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Productos Reservados */}
          <div className="lg:col-span-2">
            <Card>
              <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                <Package className="w-5 h-5 text-primary-600" />
                Prendas Reservadas ({reservation.items?.length || 0})
              </h2>
              
              {reservation.items && reservation.items.length > 0 ? (
                <div className="space-y-6">
                  {storeGroups.map((storeGroup) => (
                    <div key={storeGroup.storeId}>
                      {/* Encabezado de la Tienda */}
                      <div className="bg-primary-50 border-l-4 border-primary-600 px-4 py-3 mb-3 rounded-lg">
                        <h3 className="font-semibold text-lg text-primary-900 flex items-center gap-2">
                          🏪 {storeGroup.storeName}
                          <span className="text-sm font-normal text-gray-600">
                            ({storeGroup.items.length} {storeGroup.items.length === 1 ? 'prenda' : 'prendas'})
                          </span>
                        </h3>
                      </div>

                      {/* Items de esta tienda */}
                      <div className="space-y-4">
                        {storeGroup.items.map((item) => (
                          <div
                            key={item.id}
                            className="flex gap-4 p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                          >
                            {/* Imagen */}
                            <div className="w-20 h-20 bg-white rounded-lg overflow-hidden flex-shrink-0 border">
                              {item.product?.imageUrl ? (
                                <img
                                  src={item.product.imageUrl}
                                  alt={item.product.name}
                                  className="w-full h-full object-cover"
                                />
                              ) : (
                                <div className="w-full h-full flex items-center justify-center text-gray-400">
                                  <Package className="w-8 h-8" />
                                </div>
                              )}
                            </div>

                            {/* Info */}
                            <div className="flex-1">
                              <h3 className="font-semibold text-gray-900">
                                {item.product?.name || 'Producto'}
                              </h3>
                              <p className="text-sm text-gray-600">
                                {item.product?.style || 'Sin descripción'}
                              </p>
                              <div className="flex items-center gap-4 mt-2">
                                <span className="text-sm text-gray-500">
                                  Cantidad: <span className="font-medium text-gray-900">{item.quantity}</span>
                                </span>
                                {item.priceSnapshot && (
                                  <span className="text-sm font-medium text-primary-600">
                                    ${item.priceSnapshot.toLocaleString()}
                                  </span>
                                )}
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-gray-500 text-center py-8">
                  No hay productos en esta reserva
                </p>
              )}
            </Card>
          </div>

          {/* Información Adicional */}
          <div className="space-y-6">
            {/* Info de la Tienda */}
            <Card>
              <h3 className="font-bold text-gray-900 mb-3 flex items-center gap-2">
                <Store className="w-5 h-5 text-primary-600" />
                Información de la Tienda
              </h3>
              <div className="space-y-2 text-sm">
                <div className="flex items-center gap-2 text-gray-600">
                  <MapPin className="w-4 h-4" />
                  <span>Tienda #{reservation.storeId}</span>
                </div>
              </div>
            </Card>

            {/* Resumen */}
            <Card>
              <h3 className="font-bold text-gray-900 mb-3">Resumen</h3>
              <div className="space-y-3">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Total de prendas:</span>
                  <span className="font-medium">
                    {reservation.items?.reduce((sum, item) => sum + item.quantity, 0) || 0}
                  </span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Productos diferentes:</span>
                  <span className="font-medium">{reservation.items?.length || 0}</span>
                </div>
                {reservation.totalPrice > 0 && (
                  <div className="border-t pt-3 flex justify-between">
                    <span className="font-semibold text-gray-900">Total:</span>
                    <span className="font-bold text-primary-600 text-lg">
                      ${reservation.totalPrice.toLocaleString()}
                    </span>
                  </div>
                )}
              </div>
            </Card>

            {/* Acciones */}
            {(reservation.status === 'SOLICITADA' || reservation.status === 'PENDIENTE') && (
              <Card className="bg-orange-50 border-orange-200">
                <p className="text-sm text-orange-800 mb-3">
                  <strong>Nota:</strong> Tu reserva está esperando confirmación de la tienda.
                </p>
                <Button
                  variant="outline"
                  fullWidth
                  className="border-red-300 text-red-600 hover:bg-red-50"
                >
                  Cancelar Reserva
                </Button>
              </Card>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReservationDetailPage;
