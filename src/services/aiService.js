import apiClient from '../api/axiosConfig';
import { ENDPOINTS } from '../api/endpoints';

export const aiService = {
  // ==================== CHAT CONVERSACIONAL CON IA ====================
  // POST /api/products/chat
  // Parámetros: message (body), gender y generateImage (query params)
  chatWithAI: async (chatData) => {
    try {
      // ✅ Crear query params para gender y generateImage
      const params = new URLSearchParams();
      if (chatData.gender) {
        params.append('gender', chatData.gender);
      }
      if (chatData.generateImage !== undefined) {
        params.append('generateImage', chatData.generateImage);
      }

      console.log('📤 Enviando al chat IA:', {
        message: chatData.message,
        gender: chatData.gender,
        generateImage: chatData.generateImage
      });

      // ✅ Enviar message en el body, gender y generateImage en URL
      const response = await apiClient.post(
        `${ENDPOINTS.PRODUCTS.CHAT}?${params.toString()}`,
        { message: chatData.message }
      );

      console.log('✅ Respuesta del chat IA:', response.data);
      return { success: true, data: response.data };
    } catch (error) {
      console.error('❌ Error in AI chat:', error);
      console.error('❌ Respuesta del servidor:', error.response?.data);
      return {
        success: false,
        error: error.response?.data?.message || 'Error en el chat con IA',
      };
    }
  },

  // ==================== GENERAR OUTFIT CON FILTROS ====================
  // GET /api/products/outfit
  // Parámetros: gender, climate, style, generateImage (opcional)
  generateOutfit: async (filters) => {
    try {
      const params = new URLSearchParams();
      
      if (filters.gender) params.append('gender', filters.gender);
      if (filters.climate) params.append('climate', filters.climate);
      if (filters.style) params.append('style', filters.style);
      if (filters.occasion) params.append('occasion', filters.occasion);
      if (filters.generateImage !== undefined) {
        params.append('generateImage', filters.generateImage);
      }

      const response = await apiClient.get(
        `${ENDPOINTS.PRODUCTS.OUTFIT}?${params.toString()}`
      );

      return { success: true, data: response.data };
    } catch (error) {
      console.error('❌ Error generating outfit:', error);
      return {
        success: false,
        error: error.response?.data?.message || 'Error al generar outfit',
      };
    }
  },

  // ==================== GENERAR OUTFIT RÁPIDO ====================
  quickOutfit: async ({ gender, climate, style = 'Casual', withImage = false }) => {
    return await aiService.generateOutfit({
      gender,
      climate,
      style,
      generateImage: withImage,
    });
  },
};