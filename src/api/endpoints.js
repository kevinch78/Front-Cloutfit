// Endpoints organizados por módulo
export const ENDPOINTS = {
  // Autenticación
  AUTH: {
    LOGIN: '/auth/login',
    REGISTER: '/auth/register',
  },

  // Usuarios
  USERS: {
    PROFILE: '/users',
  },

  // Productos
  PRODUCTS: {
    BASE: '/products',
    BY_ID: (id) => `/products/${id}`,
    BY_STYLE: (style) => `/products/style/${style}`,
    BY_STORE: (storeId) => `/products/store/${storeId}`,
    OUTFIT: '/products/outfit',
    CHAT: '/products/chat',
    RECOMMENDED: '/products/recommended',
    WITH_STORES: '/products/with-stores',
  },

  // Tiendas
  STORES: {
    BASE: '/stores',
    BY_ID: (id) => `/stores/${id}`,
    BY_NAME: (name) => `/stores/name/${name}`,
    BY_ADDRESS: (address) => `/stores/address/${address}`,
    PAY_ADVERTISING: '/stores/pay-advertising',
  },

  // Outfits del Clóset
  OUTFITS: {
    BASE: '/outfits',
    BY_ID: (id) => `/outfits/${id}`,
  },
};