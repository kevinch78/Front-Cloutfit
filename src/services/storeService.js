import apiClient from '../api/axiosConfig';
import { ENDPOINTS } from '../api/endpoints';

export const storeService = {
  // ==================== CREAR TIENDA ====================
  // POST /api/stores
  // ROL: ADMIN
  // Puede incluir FormData si tiene imagen
  createStore: async (storeData) => {
    try {
      // Si viene con imagen, usar FormData
      let formData = storeData;
      if (storeData instanceof FormData) {
        formData = storeData;
      } else {
        // Si es objeto normal, convertir a FormData si tiene imagen
        if (storeData.image) {
          formData = new FormData();
          Object.keys(storeData).forEach(key => {
            formData.append(key, storeData[key]);
          });
        }
      }

      const response = await apiClient.post(ENDPOINTS.STORES.BASE, formData, {
        headers: formData instanceof FormData 
          ? { 'Content-Type': 'multipart/form-data' }
          : { 'Content-Type': 'application/json' }
      });

      return { success: true, data: response.data };
    } catch (error) {
      return {
        success: false,
        error: error.response?.data?.message || 'Error al crear tienda',
      };
    }
  },

  // ==================== OBTENER TODAS LAS TIENDAS ====================
  // GET /api/stores
  // ROL: ADMIN
  getAllStores: async () => {
    try {
      const response = await apiClient.get(ENDPOINTS.STORES.BASE);
      return { success: true, data: response.data };
    } catch (error) {
      return {
        success: false,
        error: error.response?.data?.message || 'Error al obtener tiendas',
      };
    }
  },

  // ==================== OBTENER TIENDA POR ID ====================
  // GET /api/stores/{storeId}
  // ROL: ADMIN
  getStoreById: async (storeId) => {
    try {
      const response = await apiClient.get(ENDPOINTS.STORES.BY_ID(storeId));
      return { success: true, data: response.data };
    } catch (error) {
      return {
        success: false,
        error: error.response?.data?.message || 'Error al obtener tienda',
      };
    }
  },

  // ==================== ELIMINAR TIENDA ====================
  // DELETE /api/stores/{storeId}
  // ROL: ADMIN
  deleteStore: async (storeId) => {
    try {
      await apiClient.delete(ENDPOINTS.STORES.BY_ID(storeId));
      return { success: true };
    } catch (error) {
      return {
        success: false,
        error: error.response?.data?.message || 'Error al eliminar tienda',
      };
    }
  },

  // ==================== BUSCAR TIENDA POR NOMBRE ====================
  // GET /api/stores/name/{name}
  // ROL: ADMIN
  getStoresByName: async (name) => {
    try {
      const response = await apiClient.get(ENDPOINTS.STORES.BY_NAME(name));
      return { success: true, data: response.data };
    } catch (error) {
      return {
        success: false,
        error: error.response?.data?.message || 'Error al buscar tienda',
      };
    }
  },

  // ==================== BUSCAR TIENDA POR DIRECCIÓN ====================
  // GET /api/stores/address/{address}
  // ROL: ADMIN
  getStoresByAddress: async (address) => {
    try {
      const response = await apiClient.get(ENDPOINTS.STORES.BY_ADDRESS(address));
      return { success: true, data: response.data };
    } catch (error) {
      return {
        success: false,
        error: error.response?.data?.message || 'Error al buscar tienda',
      };
    }
  },

  // ==================== OBTENER TIENDAS CON PUBLICIDAD ACTIVA ====================
  // GET /api/stores/pay-advertising
  // ROL: ADMIN
  getStoresWithAdvertising: async () => {
    try {
      const response = await apiClient.get(ENDPOINTS.STORES.PAY_ADVERTISING);
      return { success: true, data: response.data };
    } catch (error) {
      return {
        success: false,
        error: error.response?.data?.message || 'Error al obtener tiendas con publicidad',
      };
    }
  },

  // ==================== ACTUALIZAR TIENDA (ÚTIL PARA EL FUTURO) ====================
  // PUT /api/stores/{storeId}
  // Si tu backend lo implementa en el futuro
  updateStore: async (storeId, storeData) => {
    try {
      let formData = storeData;
      if (storeData.image && !(storeData instanceof FormData)) {
        formData = new FormData();
        Object.keys(storeData).forEach(key => {
          formData.append(key, storeData[key]);
        });
      }

      const response = await apiClient.put(
        ENDPOINTS.STORES.BY_ID(storeId), 
        formData,
        {
          headers: formData instanceof FormData 
            ? { 'Content-Type': 'multipart/form-data' }
            : { 'Content-Type': 'application/json' }
        }
      );

      return { success: true, data: response.data };
    } catch (error) {
      return {
        success: false,
        error: error.response?.data?.message || 'Error al actualizar tienda',
      };
    }
  },
};