import apiClient from '../api/axiosConfig';
import { ENDPOINTS } from '../api/endpoints';
import { parseJwt, saveAuthData, clearAuthData, isTokenExpired } from '../utils/authUtils';

export const authService = {
  // ==================== REGISTRAR NUEVO USUARIO ====================
  register: async (userData) => {
    try {
      const response = await apiClient.post(ENDPOINTS.AUTH.REGISTER, userData);
      return { success: true, data: response.data };
    } catch (error) {
      console.error('Register error:', error);
      return {
        success: false,
        error: error.response?.data?.message || 'Error al registrar usuario',
      };
    }
  },

  // ==================== INICIAR SESIÓN ====================
  login: async (credentials) => {
    try {
      console.log('📤 Enviando login request:', credentials);
      
      // El backend ahora devuelve { token: "...", user: { id, email, role, storeId?, clientId? } }
      const response = await apiClient.post(ENDPOINTS.AUTH.LOGIN, credentials);
      const data = response.data;

      console.log('📥 Login response:', data);

      // Validar que tenga la estructura correcta
      if (!data || !data.token || !data.user) {
        console.error('❌ Estructura de respuesta inválida:', data);
        throw new Error('Respuesta inválida del servidor');
      }

      const { token, user } = data;

      // Validar que el token sea un string válido
      if (!token || typeof token !== 'string') {
        throw new Error('Token inválido recibido del servidor');
      }

      // Decodificar el token para obtener información adicional si es necesario
      const payload = parseJwt(token);
      
      if (!payload) {
        throw new Error('No se pudo decodificar el token');
      }

      console.log('🔓 Token decodificado:', payload);

      // Crear objeto de usuario completo combinando lo que viene del backend y del token
      const completeUser = {
        id: user.id,
        email: user.email,
        role: user.role, // Ya viene sin el prefijo ROLE_ desde el backend
        storeId: user.storeId || null, // Para VENDOR
        clientId: user.clientId || null, // Para CLIENT
        exp: payload.exp, // Expiración del token
      };

      console.log('👤 Usuario completo:', completeUser);

      // Guardar en localStorage
      saveAuthData(token, completeUser);

      return { 
        success: true, 
        token, 
        user: completeUser 
      };
    } catch (error) {
      console.error('❌ Login error:', error);
      clearAuthData();
      return {
        success: false,
        error: error.response?.data?.message || error.message || 'Credenciales incorrectas',
      };
    }
  },

  // ==================== CERRAR SESIÓN ====================
  logout: () => {
    console.log('🚪 Cerrando sesión...');
    clearAuthData();
  },

  // ==================== VERIFICAR SI HAY SESIÓN ACTIVA ====================
  isAuthenticated: () => {
    const token = localStorage.getItem('token');
    if (!token) {
      console.log('ℹ️ No hay token en localStorage');
      return false;
    }
    
    const isExpired = isTokenExpired(token);
    if (isExpired) {
      console.log('⏰ Token expirado');
      clearAuthData();
      return false;
    }
    
    return true;
  },

  // ==================== OBTENER TOKEN ACTUAL ====================
  getToken: () => {
    return localStorage.getItem('token');
  },

  // ==================== OBTENER USUARIO ACTUAL ====================
  getCurrentUser: () => {
    const userStr = localStorage.getItem('user');
    if (!userStr) return null;
    
    try {
      return JSON.parse(userStr);
    } catch (error) {
      console.error('Error parsing user:', error);
      return null;
    }
  },

  // ==================== REFRESCAR TOKEN (SI LO IMPLEMENTAS) ====================
  refreshToken: async () => {
    // TODO: Implementar si tu backend soporta refresh tokens
    try {
      const response = await apiClient.post('/auth/refresh');
      const data = response.data;
      
      if (!data || !data.token || !data.user) {
        throw new Error('Respuesta inválida del servidor');
      }

      const { token, user } = data;
      const payload = parseJwt(token);
      
      const completeUser = {
        ...user,
        exp: payload.exp,
      };
      
      saveAuthData(token, completeUser);
      
      return { success: true, token, user: completeUser };
    } catch (error) {
      clearAuthData();
      return { success: false, error: 'No se pudo refrescar el token' };
    }
  },
};