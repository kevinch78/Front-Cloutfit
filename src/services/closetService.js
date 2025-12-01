import api from '../api/axiosConfig';
import { ENDPOINTS } from '../api/endpoints';

/**
 * Obtiene todos los outfits del usuario autenticado.
 * @returns {Promise<object>}
 */
export const getOutfits = async () => {
  try {
    const response = await api.get(ENDPOINTS.OUTFITS.BASE);
    return response.data;
  } catch (error) {
    console.error('Error fetching outfits:', error);
    throw error;
  }
};

/**
 * Guarda un nuevo outfit para el usuario.
 * @param {object} outfitData - Los datos del outfit a guardar.
 * @returns {Promise<object>}
 */
export const addOutfit = async (outfitData) => {
  try {
    const response = await api.post(ENDPOINTS.OUTFITS.BASE, outfitData);
    return response.data;
  } catch (error) {
    console.error('Error adding outfit:', error);
    throw error;
  }
};

/**
 * Elimina un outfit por su ID.
 * @param {string} outfitId - El ID del outfit a eliminar.
 * @returns {Promise<void>}
 */
export const deleteOutfit = async (outfitId) => {
  try {
    await api.delete(ENDPOINTS.OUTFITS.BY_ID(outfitId));
  } catch (error) {
    console.error('Error deleting outfit:', error);
    throw error;
  }
};
