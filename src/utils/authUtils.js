/**
 * Utilidades para manejo de autenticación
 */

// Decodificar JWT sin librería externa
export const parseJwt = (token) => {
  try {
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const jsonPayload = decodeURIComponent(
      atob(base64)
        .split('')
        .map((c) => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
        .join('')
    );
    return JSON.parse(jsonPayload);
  } catch (error) {
    console.error('Error parsing JWT:', error);
    return null;
  }
};

// Verificar si el token ha expirado
export const isTokenExpired = (token) => {
  if (!token) return true;
  
  const payload = parseJwt(token);
  if (!payload || !payload.exp) return true;
  
  // exp viene en segundos, Date.now() en milisegundos
  const expirationTime = payload.exp * 1000;
  const currentTime = Date.now();
  
  return currentTime >= expirationTime;
};

// Obtener información del usuario desde el token
export const getUserFromToken = (token) => {
  if (!token) return null;
  
  const payload = parseJwt(token);
  if (!payload) return null;
  
  return {
    email: payload.sub,
    role: payload.role?.replace('ROLE_', ''), // Quitar prefijo ROLE_
    exp: payload.exp,
  };
};

// Limpiar completamente la sesión
export const clearAuthData = () => {
  localStorage.removeItem('token');
  localStorage.removeItem('user');
  localStorage.removeItem('role');
  console.log('🗑️ Datos de autenticación eliminados');
};

// Guardar datos de autenticación
export const saveAuthData = (token, user) => {
  localStorage.setItem('token', token);
  localStorage.setItem('user', JSON.stringify(user));
  localStorage.setItem('role', user.role);
  console.log('💾 Datos guardados:', { user, storeId: user.storeId });
};

// Restaurar sesión desde localStorage
export const restoreSession = () => {
  const token = localStorage.getItem('token');
  const userStr = localStorage.getItem('user'); // ✅ OBTENER USUARIO COMPLETO
  
  if (!token) {
    return { isValid: false, data: null };
  }
  
  // Verificar si el token expiró
  if (isTokenExpired(token)) {
    clearAuthData();
    return { isValid: false, data: null };
  }
  
  // ✅ USAR EL USUARIO COMPLETO DE LOCALSTORAGE
  let user = null;
  
  // Intentar obtener usuario completo de localStorage primero
  if (userStr) {
    try {
      user = JSON.parse(userStr);
      console.log('✅ Usuario completo restaurado de localStorage:', user);
      console.log('✅ storeId encontrado:', user.storeId);
    } catch (error) {
      console.error('❌ Error al parsear usuario:', error);
    }
  }
  
  // Si no hay usuario en localStorage, obtenerlo del token (fallback)
  if (!user) {
    user = getUserFromToken(token);
    console.warn('⚠️ Usuario obtenido solo del token (sin storeId):', user);
  }
  
  if (!user) {
    clearAuthData();
    return { isValid: false, data: null };
  }
  
  return {
    isValid: true,
    data: {
      token,
      user,
    },
  };
};
