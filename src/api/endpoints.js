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

  // Notificaciones (para Clientes y Vendedores)
  NOTIFICATIONS: {
    // Para Clientes
    CLIENT_ALL: '/notifications/client/me',
    CLIENT_UNREAD: '/notifications/client/me/unread',
    CLIENT_UNREAD_COUNT: '/notifications/client/me/unread/count',
    CLIENT_MARK_ALL_READ: '/notifications/client/me/mark-all-read',

    // Para Vendedores
    STORE_ALL: '/notifications/store/me',
    STORE_UNREAD: '/notifications/store/me/unread',
    STORE_UNREAD_COUNT: '/notifications/store/me/unread/count',
    STORE_MARK_ALL_READ: '/notifications/store/me/mark-all-read',

    // Acciones individuales (ambos)
    MARK_AS_READ: (notificationId) => `/notifications/${notificationId}/read`,
    DELETE: (notificationId) => `/notifications/${notificationId}`,
  },

  // Reservas
  RESERVATIONS: {
    BASE: '/reservations',
    BY_ID: (id) => `/reservations/${id}`,
    BY_CLIENT: (clientId) => `/reservations/client/${clientId}`,
    BY_STORE: (storeId) => `/reservations/store/${storeId}`,
  },

  // Items de Reserva
  RESERVATION_ITEMS: {
    BASE: '/reservation-items',
    BY_ID: (id) => `/reservation-items/${id}`,
    BY_RESERVATION: (reservationId) => `/reservation-items/reservation/${reservationId}`,
    BY_STORE: (storeId) => `/reservation-items/store/${storeId}`,
    BY_STORE_AND_STATUS: (storeId, status) => `/reservation-items/store/${storeId}/status/${status}`,
  },
};