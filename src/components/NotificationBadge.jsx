import { useState, useRef, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Bell, X, Trash2 } from 'lucide-react';
import {
    fetchUnreadNotifications,
    markNotificationAsRead,
    deleteNotification,
    resetNotifications
} from '../store/slices/notificationSlice';
import useNotificationPolling from '../hooks/useNotificationPolling';

const NotificationBadge = ({ isInMenu = false, isMobile = false, onClick }) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const dropdownRef = useRef(null);

    const [isOpen, setIsOpen] = useState(false);

    const { user, isAuthenticated } = useSelector((state) => state.auth);
    const { items: notifications } = useSelector((state) => state.notifications);

    const { unreadCount, hasUnread, refreshNow } = useNotificationPolling();

    // Limpiar notificaciones al desmontar o cambiar de usuario
    useEffect(() => {
        return () => {
            if (!isAuthenticated) {
                dispatch(resetNotifications());
            }
        };
    }, [isAuthenticated, dispatch]);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setIsOpen(false);
            }
        };

        if (isOpen) {
            document.addEventListener('mousedown', handleClickOutside);
        }

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [isOpen]);

    const handleToggleDropdown = () => {
        if (!isOpen && user) {
            const userType = user.role === 'CLIENT' ? 'CLIENT' : 'VENDOR';
            dispatch(fetchUnreadNotifications(userType));
        }
        setIsOpen(!isOpen);
    };

    const handleNotificationClick = async (notification) => {
        try {
            console.log('🔔 Click en notificación:', {
                id: notification.id,
                recipientType: notification.recipientType,
                recipientId: notification.recipientId,
                userRole: user.role
            });

            // Marcar como leída si no lo está
            if (!notification.isRead) {
                await dispatch(markNotificationAsRead(notification.id)).unwrap();
                console.log('✅ Notificación marcada como leída');
                refreshNow();
            }

            // Navegar según el tipo
            if (notification.relatedEntityType === 'RESERVATION' && notification.relatedEntityId) {
                const baseRoute = user.role === 'CLIENT' ? '/client' : '/seller';
                navigate(`${baseRoute}/reservations/${notification.relatedEntityId}`);
            }

            setIsOpen(false);
        } catch (error) {
            console.error('❌ Error al procesar notificación:', error);

            // Si el error es 403, significa que la notificación no es del usuario
            if (error.message?.includes('403')) {
                console.warn('⚠️ Intentaste marcar una notificación que no te pertenece');
                // Refrescar la lista de notificaciones
                const userType = user.role === 'CLIENT' ? 'CLIENT' : 'VENDOR';
                dispatch(fetchUnreadNotifications(userType));
            }

            // Navegar de todos modos si es posible
            if (notification.relatedEntityType === 'RESERVATION' && notification.relatedEntityId) {
                const baseRoute = user.role === 'CLIENT' ? '/client' : '/seller';
                navigate(`${baseRoute}/reservations/${notification.relatedEntityId}`);
                setIsOpen(false);
            }
        }
    };

    const handleDelete = async (e, notificationId) => {
        e.stopPropagation();
        try {
            await dispatch(deleteNotification(notificationId)).unwrap();
            console.log('✅ Notificación eliminada');
            refreshNow();
        } catch (error) {
            console.error('❌ Error al eliminar:', error);
            if (error.message?.includes('403')) {
                console.warn('⚠️ No tienes permiso para eliminar esta notificación');
                // Refrescar la lista
                const userType = user.role === 'CLIENT' ? 'CLIENT' : 'VENDOR';
                dispatch(fetchUnreadNotifications(userType));
            }
        }
    };

    const getTimeAgo = (timestamp) => {
        const now = new Date();
        const notifDate = new Date(timestamp);
        const diffMs = now - notifDate;
        const diffMins = Math.floor(diffMs / 60000);
        const diffHours = Math.floor(diffMs / 3600000);
        const diffDays = Math.floor(diffMs / 86400000);

        if (diffMins < 1) return 'Ahora';
        if (diffMins < 60) return `Hace ${diffMins} min`;
        if (diffHours < 24) return `Hace ${diffHours}h`;
        return `Hace ${diffDays}d`;
    };

    const getNotificationIcon = (type) => {
        switch (type) {
            case 'RESERVATION_ACCEPTED':
                return '✅';
            case 'RESERVATION_REJECTED':
                return '❌';
            case 'RESERVATION_READY':
                return '📦';
            case 'NEW_RESERVATION':
                return '🛍️';
            case 'RESERVATION_CANCELLED':
                return '🚫';
            case 'LOW_STOCK':
                return '⚠️';
            default:
                return '🔔';
        }
    };

    if (!isAuthenticated) return null;

    if (isInMenu) {
        return (
            <button
                onClick={() => {
                    navigate('/notifications');
                    if (onClick) onClick();
                }}
                className={`w-full flex items-center justify-between px-4 py-3 transition-colors ${isMobile
                        ? 'text-white hover:bg-cyan-700 rounded-lg'
                        : 'text-gray-700 hover:bg-gray-100'
                    }`}
            >
                <div className="flex items-center">
                    <Bell className="w-4 h-4 mr-3" />
                    <span>Notificaciones</span>
                </div>
                {unreadCount > 0 && (
                    <span className="bg-red-500 text-white text-xs font-bold px-2 py-0.5 rounded-full">
                        {unreadCount > 9 ? '9+' : unreadCount}
                    </span>
                )}
            </button>
        );
    }

    return (
        <div className="relative" ref={dropdownRef}>
            <button
                onClick={handleToggleDropdown}
                className="relative p-2 text-white hover:bg-cyan-600 rounded-lg transition-colors"
                aria-label="Notificaciones"
            >
                <Bell className="w-6 h-6" />

                {hasUnread && (
                    <span className="absolute top-0 right-0 inline-flex items-center justify-center w-5 h-5 text-xs font-bold text-white bg-red-500 rounded-full animate-pulse">
                        {unreadCount > 9 ? '9+' : unreadCount}
                    </span>
                )}
            </button>

            {isOpen && (
                <div className="absolute right-0 mt-2 w-96 bg-white rounded-xl shadow-2xl border border-gray-200 z-50 animate-slide-down">
                    <div className="px-4 py-3 border-b border-gray-200 flex items-center justify-between">
                        <h3 className="font-semibold text-gray-900">Notificaciones</h3>
                        <button
                            onClick={() => setIsOpen(false)}
                            className="text-gray-400 hover:text-gray-600 transition-colors"
                        >
                            <X className="w-5 h-5" />
                        </button>
                    </div>

                    <div className="max-h-96 overflow-y-auto">
                        {notifications.length === 0 ? (
                            <div className="px-4 py-8 text-center text-gray-500">
                                <Bell className="w-12 h-12 mx-auto mb-3 text-gray-300" />
                                <p className="text-sm">No tienes notificaciones</p>
                            </div>
                        ) : (
                            <div className="divide-y divide-gray-100">
                                {notifications.slice(0, 5).map((notification) => (
                                    <div
                                        key={notification.id}
                                        onClick={() => handleNotificationClick(notification)}
                                        className={`px-4 py-3 hover:bg-gray-50 cursor-pointer transition-colors ${!notification.isRead ? 'bg-blue-50' : ''
                                            }`}
                                    >
                                        <div className="flex items-start gap-3">
                                            <div className="flex-shrink-0 text-2xl">
                                                {getNotificationIcon(notification.type)}
                                            </div>

                                            <div className="flex-1 min-w-0">
                                                <p className="text-sm font-semibold text-gray-900 mb-1">
                                                    {notification.title}
                                                </p>
                                                <p className="text-sm text-gray-600 line-clamp-2">
                                                    {notification.message}
                                                </p>
                                                <p className="text-xs text-gray-400 mt-1">
                                                    {getTimeAgo(notification.createdAt)}
                                                </p>
                                            </div>

                                            <div className="flex flex-col gap-1">
                                                {!notification.isRead && (
                                                    <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                                                )}
                                                <button
                                                    onClick={(e) => handleDelete(e, notification.id)}
                                                    className="text-gray-400 hover:text-red-500 transition-colors"
                                                >
                                                    <Trash2 className="w-4 h-4" />
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>

                    {notifications.length > 0 && (
                        <div className="px-4 py-3 border-t border-gray-200">
                            <button
                                onClick={() => {
                                    navigate('/notifications');
                                    setIsOpen(false);
                                }}
                                className="w-full text-center text-sm text-cyan-600 hover:text-cyan-700 font-medium"
                            >
                                Ver todas las notificaciones
                            </button>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
};

export default NotificationBadge;