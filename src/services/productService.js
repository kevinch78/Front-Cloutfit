import apiClient from '../api/axiosConfig';
import { ENDPOINTS } from '../api/endpoints';

export const productService = {
  // ==================== OBTENER TODOS LOS PRODUCTOS ====================
  // GET /api/products
  // PÚBLICO
  getAllProducts: async () => {
    try {
      const response = await apiClient.get(ENDPOINTS.PRODUCTS.BASE);
      return { success: true, data: response.data };
    } catch (error) {
      return {
        success: false,
        error: error.response?.data?.message || 'Error al obtener productos',
      };
    }
  },

  // ==================== OBTENER PRODUCTO POR ID ====================
  // GET /api/products/{productId}
  // PÚBLICO
  getProductById: async (id) => {
    try {
      const response = await apiClient.get(ENDPOINTS.PRODUCTS.BY_ID(id));
      return { success: true, data: response.data };
    } catch (error) {
      return {
        success: false,
        error: error.response?.data?.message || 'Error al obtener producto',
      };
    }
  },

  // ==================== CREAR PRODUCTO ====================
  // POST /api/products
  // ROL: ADMIN
  // Puede recibir FormData con imagen
  createProduct: async (formData) => {
    try {
      console.log('📤 Enviando producto al backend...');
      
      // El formData ya viene con productDto (JSON) e image (file)
      const response = await apiClient.post(ENDPOINTS.PRODUCTS.BASE, formData);
      // ✅ Sin especificar Content-Type - Axios lo maneja solo

      console.log('✅ Producto creado:', response.data);
      return { success: true, data: response.data };
    } catch (error) {
      console.error('❌ Error al crear producto:', error);
      return {
        success: false,
        error: error.response?.data?.message || 'Error al crear el producto',
      };
    }
  },

  // ==================== ACTUALIZAR PRODUCTO ====================
  // PUT /api/products/{productId}
  // ROL: ADMIN
  // Si tu backend lo implementa
  updateProduct: async (id, productData) => {
    try {
      let formData = productData;
      
      if (productData.image && !(productData instanceof FormData)) {
        formData = new FormData();
        Object.keys(productData).forEach(key => {
          formData.append(key, productData[key]);
        });
      }

      const response = await apiClient.put(
        ENDPOINTS.PRODUCTS.BY_ID(id), 
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
        error: error.response?.data?.message || 'Error al actualizar producto',
      };
    }
  },

  // ==================== ELIMINAR PRODUCTO ====================
  // DELETE /api/products/{productId}
  // ROL: ADMIN
  deleteProduct: async (id) => {
    try {
      await apiClient.delete(ENDPOINTS.PRODUCTS.BY_ID(id));
      return { success: true };
    } catch (error) {
      return {
        success: false,
        error: error.response?.data?.message || 'Error al eliminar producto',
      };
    }
  },

  // ==================== FILTRAR POR ESTILO ====================
  // GET /api/products/style/{style}
  // PÚBLICO
  getProductsByStyle: async (style) => {
    try {
      const response = await apiClient.get(ENDPOINTS.PRODUCTS.BY_STYLE(style));
      return { success: true, data: response.data };
    } catch (error) {
      return {
        success: false,
        error: error.response?.data?.message || 'Error al filtrar productos',
      };
    }
  },

  // ==================== OBTENER PRODUCTOS DE UNA TIENDA ====================
  // GET /api/products/store/{storeId}
  // PÚBLICO
  getProductsByStore: async (storeId) => {
    try {
      const response = await apiClient.get(ENDPOINTS.PRODUCTS.BY_STORE(storeId));
      return { success: true, data: response.data };
    } catch (error) {
      return {
        success: false,
        error: error.response?.data?.message || 'Error al obtener productos de la tienda',
      };
    }
  },

  // ==================== OBTENER PRODUCTOS CON INFO DE TIENDAS ====================
  // GET /api/products/with-stores
  // PÚBLICO
  getProductsWithStores: async () => {
    try {
      const response = await apiClient.get(ENDPOINTS.PRODUCTS.WITH_STORES);
      return { success: true, data: response.data };
    } catch (error) {
      return {
        success: false,
        error: error.response?.data?.message || 'Error al obtener productos',
      };
    }
  },

  // ==================== MÉTODOS HELPER ÚTILES ====================
  
  // Buscar productos por múltiples filtros (cliente)
  searchProducts: async (filters) => {
    try {
      const allProducts = await productService.getAllProducts();
      
      if (!allProducts.success) {
        return allProducts;
      }

      let filtered = allProducts.data;

      // Aplicar filtros en el cliente
      if (filters.search) {
        filtered = filtered.filter(p => 
          p.name?.toLowerCase().includes(filters.search.toLowerCase()) ||
          p.description?.toLowerCase().includes(filters.search.toLowerCase())
        );
      }

      if (filters.style) {
        filtered = filtered.filter(p => p.style === filters.style);
      }

      if (filters.gender) {
        filtered = filtered.filter(p => p.gender === filters.gender);
      }

      if (filters.climate) {
        filtered = filtered.filter(p => p.climate === filters.climate);
      }

      if (filters.minPrice !== undefined) {
        filtered = filtered.filter(p => p.price >= filters.minPrice);
      }

      if (filters.maxPrice !== undefined) {
        filtered = filtered.filter(p => p.price <= filters.maxPrice);
      }

      return { success: true, data: filtered };
    } catch (error) {
      return {
        success: false,
        error: 'Error al buscar productos',
      };
    }
  },
};