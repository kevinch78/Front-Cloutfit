import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Bell, Check, CheckCheck, Trash2, Filter, Clock } from 'lucide-react';
import {
  fetchAllNotifications,
  markNotificationAsRead,
  markAllNotificationsAsRead,
  deleteNotification,
} from '../store/slices/notificationSlice';
import Card from '../components/common/Card';
import Button from '../components/common/Button';
import Loader from '../components/common/Loader';

/**
 * Página completa de Notificaciones
 * Muestra todas las notificaciones con filtros y acciones masivas
 */
const NotificationsPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { user } = useSelector((state) => state.auth);
  const { items: notifications, status, unreadCount } = useSelector(
    (state) => state.notifications
  );

  const [filter, setFilter] = useState('all'); // 'all' | 'unread' | 'read'

  // Cargar notificaciones al montar
  useEffect(() => {
    if (user) {
      const userType = user.role === 'CLIENT' ? 'CLIENT' : 'VENDOR';
      dispatch(fetchAllNotifications(userType));
    }
  }, [dispatch, user]);

  // Filtrar notificaciones
  const filteredNotifications = notifications.filter((notif) => {
    if (filter === 'unread') return !notif.isRead;
    if (filter === 'read') return notif.isRead;
    return true;
  });

  // Marcar todas como leídas
  const handleMarkAllAsRead = async () => {
    if (user) {
      const userType = user.role === 'CLIENT' ? 'CLIENT' : 'VENDOR';
      await dispatch(markAllNotificationsAsRead(userType));
    }
  };

  // Marcar una como leída y navegar
  const handleNotificationClick = async (notification) => {
    // Marcar como leída si no lo está
    if (!notification.isRead) {
      await dispatch(markNotificationAsRead(notification.id));
    }

    // Navegar según el tipo
    if (notification.relatedEntityType === 'RESERVATION' && notification.relatedEntityId) {
      const baseRoute = user.role === 'CLIENT' ? '/client' : '/seller';
      navigate(`${baseRoute}/reservations/${notification.relatedEntityId}`);
    }
  };

  // Eliminar notificación
  const handleDelete = async (e, notificationId) => {
    e.stopPropagation();
    if (window.confirm('¿Eliminar esta notificación?')) {
      await dispatch(deleteNotification(notificationId));
    }
  };

  // Formato de fecha completa
  const formatDate = (timestamp) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diffMs = now - date;
    const diffDays = Math.floor(diffMs / 86400000);

    if (diffDays === 0) {
      return date.toLocaleTimeString('es-ES', {
        hour: '2-digit',
        minute: '2-digit',
      });
    } else if (diffDays === 1) {
      return 'Ayer';
    } else if (diffDays < 7) {
      return `Hace ${diffDays} días`;
    } else {
      return date.toLocaleDateString('es-ES', {
        day: '2-digit',
        month: 'short',
      });
    }
  };

  // Icono según tipo
  const getNotificationIcon = (type) => {
    const icons = {
      RESERVATION_ACCEPTED: { emoji: '✅', color: 'text-green-500' },
      RESERVATION_REJECTED: { emoji: '❌', color: 'text-red-500' },
      RESERVATION_READY: { emoji: '📦', color: 'text-blue-500' },
      NEW_RESERVATION: { emoji: '🛍️', color: 'text-purple-500' },
      RESERVATION_CANCELLED: { emoji: '🚫', color: 'text-orange-500' },
      LOW_STOCK: { emoji: '⚠️', color: 'text-yellow-500' },
    };
    return icons[type] || { emoji: '🔔', color: 'text-gray-500' };
  };

  if (status === 'loading') {
    return <Loader text="Cargando notificaciones..." />;
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container-custom max-w-4xl">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-3">
                <Bell className="w-8 h-8 text-primary-600" />
                Notificaciones
              </h1>
              <p className="text-gray-600 mt-1">
                {unreadCount > 0 ? (
                  <span>
                    Tienes <span className="font-semibold text-primary-600">{unreadCount}</span>{' '}
                    notificación{unreadCount !== 1 ? 'es' : ''} sin leer
                  </span>
                ) : (
                  'Estás al día con tus notificaciones'
                )}
              </p>
            </div>

            {/* Marcar todas como leídas */}
            {unreadCount > 0 && (
              <Button
                variant="outline"
                icon={<CheckCheck className="w-4 h-4" />}
                onClick={handleMarkAllAsRead}
              >
                Marcar todas como leídas
              </Button>
            )}
          </div>

          {/* Filtros */}
          <div className="flex gap-2">
            <button
              onClick={() => setFilter('all')}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                filter === 'all'
                  ? 'bg-primary-600 text-white'
                  : 'bg-white text-gray-600 hover:bg-gray-100'
              }`}
            >
              Todas ({notifications.length})
            </button>
            <button
              onClick={() => setFilter('unread')}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                filter === 'unread'
                  ? 'bg-primary-600 text-white'
                  : 'bg-white text-gray-600 hover:bg-gray-100'
              }`}
            >
              No leídas ({unreadCount})
            </button>
            <button
              onClick={() => setFilter('read')}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                filter === 'read'
                  ? 'bg-primary-600 text-white'
                  : 'bg-white text-gray-600 hover:bg-gray-100'
              }`}
            >
              Leídas ({notifications.length - unreadCount})
            </button>
          </div>
        </div>

        {/* Lista de Notificaciones */}
        {filteredNotifications.length === 0 ? (
          <Card className="text-center py-16">
            <Bell className="w-16 h-16 mx-auto mb-4 text-gray-300" />
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              No hay notificaciones
            </h3>
            <p className="text-gray-600">
              {filter === 'unread'
                ? 'No tienes notificaciones sin leer'
                : filter === 'read'
                ? 'No tienes notificaciones leídas'
                : 'Aún no has recibido notificaciones'}
            </p>
          </Card>
        ) : (
          <div className="space-y-3">
            {filteredNotifications.map((notification) => {
              const iconData = getNotificationIcon(notification.type);
              return (
                <Card
                  key={notification.id}
                  padding={false}
                  className={`cursor-pointer hover:shadow-md transition-all ${
                    !notification.isRead ? 'border-l-4 border-l-primary-600 bg-blue-50' : ''
                  }`}
                  onClick={() => handleNotificationClick(notification)}
                >
                  <div className="p-4 flex items-start gap-4">
                    {/* Icono */}
                    <div
                      className={`flex-shrink-0 w-12 h-12 rounded-full bg-white flex items-center justify-center text-2xl ${iconData.color} border-2`}
                    >
                      {iconData.emoji}
                    </div>

                    {/* Contenido */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-2 mb-1">
                        <h3
                          className={`font-semibold ${
                            !notification.isRead ? 'text-gray-900' : 'text-gray-700'
                          }`}
                        >
                          {notification.title}
                        </h3>
                        {!notification.isRead && (
                          <span className="flex-shrink-0 w-2.5 h-2.5 bg-primary-600 rounded-full"></span>
                        )}
                      </div>

                      <p className="text-sm text-gray-600 mb-2">{notification.message}</p>

                      <div className="flex items-center gap-4 text-xs text-gray-500">
                        <span className="flex items-center gap-1">
                          <Clock className="w-3 h-3" />
                          {formatDate(notification.createdAt)}
                        </span>
                        {notification.isRead && notification.readAt && (
                          <span className="flex items-center gap-1">
                            <Check className="w-3 h-3" />
                            Leída
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Botón eliminar */}
                    <button
                      onClick={(e) => handleDelete(e, notification.id)}
                      className="flex-shrink-0 p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                      aria-label="Eliminar notificación"
                    >
                      <Trash2 className="w-5 h-5" />
                    </button>
                  </div>
                </Card>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default NotificationsPage;
