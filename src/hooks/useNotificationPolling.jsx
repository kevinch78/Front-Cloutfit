import { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUnreadCount } from '../store/slices/notificationSlice';

/**
 * Hook para hacer polling automático de notificaciones
 * Consulta el contador de notificaciones no leídas cada 30 segundos
 * 
 * @param {number} intervalMs - Intervalo en milisegundos (default: 30000 = 30 seg)
 * @returns {Object} - Estado del polling y funciones de control
 */
const useNotificationPolling = (intervalMs = 30000) => {
  const dispatch = useDispatch();
  const intervalRef = useRef(null);
  
  // Obtener datos del usuario autenticado
  const { isAuthenticated, user } = useSelector((state) => state.auth);
  const { unreadCount, hasUnread } = useSelector((state) => state.notifications);

  /**
   * Iniciar el polling
   */
  const startPolling = () => {
    if (!isAuthenticated || !user) return;

    // Determinar el tipo de usuario
    const userType = user.role === 'CLIENT' ? 'CLIENT' : 'VENDOR';

    // Hacer la primera consulta inmediatamente
    dispatch(fetchUnreadCount(userType));

    // Configurar el intervalo
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }

    intervalRef.current = setInterval(() => {
      dispatch(fetchUnreadCount(userType));
    }, intervalMs);

    console.log(`🔔 Polling de notificaciones iniciado cada ${intervalMs / 1000}s para ${userType}`);
  };

  /**
   * Detener el polling
   */
  const stopPolling = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
      console.log('🔕 Polling de notificaciones detenido');
    }
  };

  /**
   * Reiniciar el polling (útil después de marcar como leídas)
   */
  const refreshNow = () => {
    if (!isAuthenticated || !user) return;
    const userType = user.role === 'CLIENT' ? 'CLIENT' : 'VENDOR';
    dispatch(fetchUnreadCount(userType));
  };

  // Efecto para iniciar/detener polling según autenticación
  useEffect(() => {
    if (isAuthenticated && user) {
      startPolling();
    } else {
      stopPolling();
    }

    // Cleanup al desmontar
    return () => {
      stopPolling();
    };
  }, [isAuthenticated, user, intervalMs]); // eslint-disable-line react-hooks/exhaustive-deps

  return {
    unreadCount,
    hasUnread,
    refreshNow,
    stopPolling,
    startPolling,
  };
};

export default useNotificationPolling;
