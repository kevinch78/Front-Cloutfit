import apiClient from '../api/axiosConfig';
import { ENDPOINTS } from '../api/endpoints';

export const reservationService = {
  // ==================== RESERVATIONS ====================

  /**
   * Crea una nueva reserva.
   * @param {object} reservationData - Datos de la reserva. Ej: { clientId, storeId, status, reservationDate }
   * @returns {Promise<object>}
   */
  createReservation: async (reservationData) => {
    try {
      const response = await apiClient.post(ENDPOINTS.RESERVATIONS.BASE, reservationData);
      return { success: true, data: response.data };
    } catch (error) {
      return {
        success: false,
        error: error.response?.data?.message || 'Error al crear la reserva',
      };
    }
  },

  /**
   * Obtiene todas las reservas de un cliente.
   * @param {number} clientId - ID del cliente
   * @returns {Promise<object>}
   */
  getReservationsByClient: async (clientId) => {
    try {
      const response = await apiClient.get(ENDPOINTS.RESERVATIONS.BY_CLIENT(clientId));
      return { success: true, data: response.data };
    } catch (error) {
      return {
        success: false,
        error: error.response?.data?.message || 'Error al obtener las reservas del cliente',
      };
    }
  },
  
  /**
   * Actualiza el estado de una reserva.
   * @param {number} reservationId - ID de la reserva
   * @param {object} statusUpdate - Objeto con el nuevo estado. Ej: { status: 'CONFIRMADA' }
   * @returns {Promise<object>}
   */
  updateReservationStatus: async (reservationId, statusUpdate) => {
    try {
      const response = await apiClient.put(ENDPOINTS.RESERVATIONS.BY_ID(reservationId), statusUpdate);
      return { success: true, data: response.data };
    } catch (error) {
      return {
        success: false,
        error: error.response?.data?.message || 'Error al actualizar la reserva',
      };
    }
  },

  // ==================== RESERVATION ITEMS ====================

  /**
   * Añade un producto a una reserva.
   * @param {object} itemData - Datos del item. Ej: { reservationId, productId, quantity }
   * @returns {Promise<object>}
   */
  addItemToReservation: async (itemData) => {
    try {
      const response = await apiClient.post(ENDPOINTS.RESERVATION_ITEMS.BASE, itemData);
      return { success: true, data: response.data };
    } catch (error) {
      return {
        success: false,
        error: error.response?.data?.message || 'Error al añadir el producto a la reserva',
      };
    }
  },

  /**
   * Obtiene todos los productos de una reserva.
   * @param {number} reservationId - ID de la reserva
   * @returns {Promise<object>}
   */
  getItemsByReservation: async (reservationId) => {
    try {
      const response = await apiClient.get(ENDPOINTS.RESERVATION_ITEMS.BY_RESERVATION(reservationId));
      return { success: true, data: response.data };
    } catch (error) {
      return {
        success: false,
        error: error.response?.data?.message || 'Error al obtener los productos de la reserva',
      };
    }
  },

  /**
   * Actualiza la cantidad de un producto en la reserva.
   * @param {number} itemId - ID del item de reserva
   * @param {object} quantityUpdate - Objeto con la nueva cantidad. Ej: { quantity: 2 }
   * @returns {Promise<object>}
   */
  updateReservationItem: async (itemId, quantityUpdate) => {
    try {
      const response = await apiClient.put(ENDPOINTS.RESERVATION_ITEMS.BY_ID(itemId), quantityUpdate);
      return { success: true, data: response.data };
    } catch (error) {
      return {
        success: false,
        error: error.response?.data?.message || 'Error al actualizar la cantidad del producto',
      };
    }
  },

  /**
   * Elimina un producto de una reserva.
   * @param {number} itemId - ID del item de reserva
   * @returns {Promise<object>}
   */
  deleteReservationItem: async (itemId) => {
    try {
      const response = await apiClient.delete(ENDPOINTS.RESERVATION_ITEMS.BY_ID(itemId));
      return { success: true, data: response.data };
    } catch (error) {
      return {
        success: false,
        error: error.response?.data?.message || 'Error al eliminar el producto de la reserva',
      };
    }
  },
};
