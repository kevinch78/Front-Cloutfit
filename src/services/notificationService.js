import apiClient from '../api/axiosConfig';
import { ENDPOINTS } from '../api/endpoints';

/**
 * Servicio de Notificaciones
 * Maneja todas las operaciones relacionadas con notificaciones para clientes y vendedores
 */
class NotificationService {

    /**
     * Obtiene todas las notificaciones no leídas según el tipo de usuario
     * @param {string} userType - 'CLIENT' o 'VENDOR'
     * @returns {Promise<Array>} Lista de notificaciones no leídas
     */
    async getUnreadNotifications(userType) {
        try {
            const endpoint = userType === 'CLIENT'
                ? ENDPOINTS.NOTIFICATIONS.CLIENT_UNREAD
                : ENDPOINTS.NOTIFICATIONS.STORE_UNREAD;

            const response = await apiClient.get(endpoint);

            return {
                success: true,
                data: response.data || []
            };
        } catch (error) {
            console.error('❌ Error obteniendo notificaciones no leídas:', error);
            return {
                success: false,
                error: error.response?.data?.message || 'Error al cargar notificaciones',
                data: []
            };
        }
    }

    /**
     * Obtiene el contador de notificaciones no leídas
     * @param {string} userType - 'CLIENT' o 'VENDOR'
     * @returns {Promise<Object>} Objeto con count y hasUnread
     */
    async getUnreadCount(userType) {
        try {
            const endpoint = userType === 'CLIENT'
                ? ENDPOINTS.NOTIFICATIONS.CLIENT_UNREAD_COUNT
                : ENDPOINTS.NOTIFICATIONS.STORE_UNREAD_COUNT;

            const response = await apiClient.get(endpoint);

            return {
                success: true,
                data: response.data
            };
        } catch (error) {
            console.error('❌ Error obteniendo contador:', error);
            return {
                success: false,
                data: { count: 0, hasUnread: false }
            };
        }
    }

    /**
     * Obtiene todas las notificaciones (leídas y no leídas)
     * @param {string} userType - 'CLIENT' o 'VENDOR'
     * @returns {Promise<Array>} Lista completa de notificaciones
     */
    async getAllNotifications(userType) {
        try {
            const endpoint = userType === 'CLIENT'
                ? ENDPOINTS.NOTIFICATIONS.CLIENT_ALL
                : ENDPOINTS.NOTIFICATIONS.STORE_ALL;

            const response = await apiClient.get(endpoint);

            return {
                success: true,
                data: response.data || []
            };
        } catch (error) {
            console.error('❌ Error obteniendo todas las notificaciones:', error);
            return {
                success: false,
                error: error.response?.data?.message || 'Error al cargar notificaciones',
                data: []
            };
        }
    }

    /**
     * Marca una notificación específica como leída
     * @param {number} notificationId - ID de la notificación
     * @returns {Promise<Object>} Resultado de la operación
     */
    async markAsRead(notificationId) {
        try {
            await apiClient.put(ENDPOINTS.NOTIFICATIONS.MARK_AS_READ(notificationId));

            return {
                success: true,
                message: 'Notificación marcada como leída'
            };
        } catch (error) {
            console.error('❌ Error marcando como leída:', error);
            return {
                success: false,
                error: error.response?.data?.message || 'Error al marcar como leída'
            };
        }
    }

    /**
     * Marca todas las notificaciones como leídas
     * @param {string} userType - 'CLIENT' o 'VENDOR'
     * @returns {Promise<Object>} Resultado de la operación
     */
    async markAllAsRead(userType) {
        try {
            const endpoint = userType === 'CLIENT'
                ? ENDPOINTS.NOTIFICATIONS.CLIENT_MARK_ALL_READ
                : ENDPOINTS.NOTIFICATIONS.STORE_MARK_ALL_READ;

            const response = await apiClient.put(endpoint);

            return {
                success: true,
                data: response.data
            };
        } catch (error) {
            console.error('❌ Error marcando todas como leídas:', error);
            return {
                success: false,
                error: error.response?.data?.message || 'Error al marcar todas como leídas'
            };
        }
    }

    /**
     * Elimina una notificación
     * @param {number} notificationId - ID de la notificación
     * @returns {Promise<Object>} Resultado de la operación
     */
    async deleteNotification(notificationId) {
        try {
            await apiClient.delete(ENDPOINTS.NOTIFICATIONS.DELETE(notificationId));

            return {
                success: true,
                message: 'Notificación eliminada'
            };
        } catch (error) {
            console.error('❌ Error eliminando notificación:', error);
            return {
                success: false,
                error: error.response?.data?.message || 'Error al eliminar notificación'
            };
        }
    }
}

// Exportar instancia singleton
export default new NotificationService();