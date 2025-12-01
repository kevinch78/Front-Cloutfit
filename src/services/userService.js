import apiClient from '../api/axiosConfig';
import { ENDPOINTS } from '../api/endpoints';

export const userService = {
  // ==================== OBTENER PERFIL DEL USUARIO ACTUAL ====================
  // GET /api/users
  // ROL: CLIENT (cualquier usuario autenticado)
  // Devuelve el perfil del usuario que está logueado
  getCurrentUserProfile: async () => {
    try {
      const response = await apiClient.get(ENDPOINTS.USERS.PROFILE);
      return { success: true, data: response.data };
    } catch (error) {
      return {
        success: false,
        error: error.response?.data?.message || 'Error al obtener perfil',
      };
    }
  },

  // ==================== ACTUALIZAR PERFIL ====================
  // Si tu backend lo implementa en el futuro
  updateProfile: async (userData) => {
    try {
      const response = await apiClient.put(ENDPOINTS.USERS.PROFILE, userData);
      return { success: true, data: response.data };
    } catch (error) {
      return {
        success: false,
        error: error.response?.data?.message || 'Error al actualizar perfil',
      };
    }
  },

  // ==================== CAMBIAR CONTRASEÑA ====================
  // Si tu backend lo implementa
  changePassword: async (passwordData) => {
    try {
      const response = await apiClient.put(
        `${ENDPOINTS.USERS.PROFILE}/password`, 
        passwordData
      );
      return { success: true, data: response.data };
    } catch (error) {
      return {
        success: false,
        error: error.response?.data?.message || 'Error al cambiar contraseña',
      };
    }
  },
};