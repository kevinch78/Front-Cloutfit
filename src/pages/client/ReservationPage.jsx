import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Trash2, Plus, Minus, Calendar, Package, AlertCircle } from 'lucide-react';
import { fetchActiveReservation, removeItem, updateItemQuantity, confirmReservation } from '../../store/slices/reservationSlice';
import Card from '../../components/common/Card';
import Button from '../../components/common/Button';
import Loader from '../../components/common/Loader';

const ReservationPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { user } = useSelector((state) => state.auth);
  const { reservation, items, status, error } = useSelector((state) => state.reservation);
  
  // Obtener la reserva activa (carrito) cuando el componente se monta
  useEffect(() => {
    if (user?.clientId) {
      dispatch(fetchActiveReservation(user.clientId));
    }
  }, [dispatch, user?.clientId]);

  const handleUpdateQuantity = (itemId, newQuantity) => {
    if (newQuantity < 1) return;
    dispatch(updateItemQuantity({ itemId, quantity: newQuantity }));
  };

  const handleRemoveItem = (itemId) => {
    dispatch(removeItem(itemId));
  };

  const handleConfirmReservation = async () => {
    if (!reservation) return;
    
    try {
      await dispatch(confirmReservation(reservation)).unwrap();
      alert('¡Reserva confirmada con éxito! Te esperamos en la tienda.');
      navigate('/client/my-reservations'); // Redirigir al historial
    } catch (err) {
      console.error('Error al confirmar:', err);
      alert('Hubo un error al confirmar tu reserva. Inténtalo de nuevo.');
    }
  };

  // 🏪 Agrupar items por tienda
  const itemsByStore = items.reduce((acc, item) => {
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
  
  console.log('🔍 Items agrupados por tienda:', storeGroups);

  if (status === 'loading' && items.length === 0) {
    return <Loader text="Cargando tu cesta..." />;
  }

  if (status === 'failed') {
    return (
      <div className="text-center py-16 text-red-600">
        <AlertCircle className="mx-auto h-12 w-12" />
        <h3 className="mt-4 text-2xl font-bold">Error al cargar tu cesta</h3>
        <p className="mt-2 text-base text-gray-700">{error}</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container-custom max-w-5xl">
        <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-8 flex items-center gap-3">
          <Package className="w-8 h-8 text-cyan-600" />
          Mi Cesta de Reserva
        </h1>

        {items.length === 0 ? (
          <div className="text-center py-16 bg-white rounded-2xl shadow-sm">
            <div className="text-6xl mb-4">🛒</div>
            <h3 className="text-2xl font-bold text-gray-900 mb-2">
              Tu cesta está vacía
            </h3>
            <p className="text-gray-600 mb-6">
              Explora el catálogo para añadir prendas que quieras probarte.
            </p>
            <Button onClick={() => navigate('/catalog')}>
              Ir al Catálogo
            </Button>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Lista de Items */}
            <div className="lg:col-span-2 space-y-6">
              {storeGroups.map((storeGroup) => (
                <div key={storeGroup.storeId}>
                  {/* Encabezado de la Tienda */}
                  <div className="bg-cyan-50 border-l-4 border-cyan-600 px-4 py-3 mb-3 rounded-lg">
                    <h3 className="font-semibold text-lg text-teal-900 flex items-center gap-2">
                      
🏪 {storeGroup.storeName}
                      <span className="text-sm font-normal text-gray-600">
                        ({storeGroup.items.length} {storeGroup.items.length === 1 ? 'prenda' : 'prendas'})
                      </span>
                    </h3>
                  </div>

                  {/* Items de esta tienda */}
                  <div className="space-y-4">
                    {storeGroup.items.map((item) => (
                      <Card key={item.id} padding={false}>
                        <div className="p-4 flex flex-col sm:flex-row gap-4">
                          {/* Imagen */}
                          <div className="w-full sm:w-32 h-32 bg-gray-200 rounded-lg overflow-hidden flex-shrink-0">
                            {item.product?.imageUrl ? (
                              <img
                                src={item.product.imageUrl}
                                alt={item.product.name}
                                className="w-full h-full object-cover"
                              />
                            ) : (
                              <div className="w-full h-full flex items-center justify-center text-gray-400">
                                <Package className="w-10 h-10" />
                              </div>
                            )}
                          </div>

                          {/* Detalles */}
                          <div className="flex-1">
                            <h3 className="font-semibold text-lg mb-1">{item.product?.name || 'Producto sin nombre'}</h3>
                            <p className="text-gray-600 text-sm mb-2">{item.product?.style || 'Estilo no especificado'}</p>
                            
                            {/* Controles de Cantidad */}
                            <div className="flex items-center gap-4 mt-4">
                              <div className="flex items-center border border-gray-300 rounded-lg">
                                <button
                                  onClick={() => handleUpdateQuantity(item.id, item.quantity - 1)}
                                  className="p-2 hover:bg-gray-100 transition-colors"
                                >
                                  <Minus className="w-4 h-4" />
                                </button>
                                <span className="px-4 font-medium">{item.quantity}</span>
                                <button
                                  onClick={() => handleUpdateQuantity(item.id, item.quantity + 1)}
                                  className="p-2 hover:bg-gray-100 transition-colors"
                                >
                                  <Plus className="w-4 h-4" />
                                </button>
                              </div>

                              <button
                                onClick={() => handleRemoveItem(item.id)}
                                className="text-red-600 hover:text-red-700 flex items-center gap-1 text-sm"
                              >
                                <Trash2 className="w-4 h-4" />
                                Eliminar
                              </button>
                            </div>
                          </div>
                        </div>
                      </Card>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            {/* Resumen de la Reserva */}
            <div className="lg:col-span-1">
              <Card className="sticky top-24">
                <h3 className="text-xl font-bold mb-4">Resumen</h3>
                
                <div className="space-y-3 mb-6">
                  <div className="flex justify-between text-gray-600">
                    <span>Prendas a probar:</span>
                    <span className="font-bold">{items.reduce((sum, item) => sum + item.quantity, 0)}</span>
                  </div>
                   <div className="flex justify-between text-gray-600">
                    <span>Estado actual:</span>
                    <span className="font-bold text-orange-500">En Cesta (Pendiente)</span>
                  </div>
                  <div className="border-t pt-3 flex justify-between text-lg font-bold">
                    <span>Total Items:</span>
                    <span>{items.length}</span>
                  </div>
                </div>

                <Button
                  variant="primary"
                  fullWidth
                  icon={<Calendar className="w-5 h-5" />}
                  onClick={handleConfirmReservation}
                >
                  Confirmar Reserva
                </Button>

                <p className="text-xs text-gray-500 text-center mt-4">
                  Al confirmar, separaremos estas prendas para ti en la tienda.
                </p>
              </Card>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ReservationPage;
