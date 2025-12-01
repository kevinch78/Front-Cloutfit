import { createSlice } from '@reduxjs/toolkit';
import { clearAuthData } from '../../utils/authUtils';

const initialState = {
  isAuthenticated: false,
  user: null,
  token: null,
  role: null,
  loading: false,
  error: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    // Iniciar proceso de login
    loginStart: (state) => {
      state.loading = true;
      state.error = null;
    },

    // Login exitoso
    loginSuccess: (state, action) => {
      state.loading = false;
      state.isAuthenticated = true;
      state.token = action.payload.token;
      state.user = action.payload.user;
      state.role = action.payload.user?.role;
      state.error = null;
      
      // ✅ AGREGAR: Persistir en localStorage
      localStorage.setItem('token', action.payload.token);
      localStorage.setItem('user', JSON.stringify(action.payload.user));
      
      console.log('✅ Redux + localStorage actualizado:', {
        user: action.payload.user,
        storeId: action.payload.user?.storeId
      });
    },

    // Login fallido
    loginFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
      state.isAuthenticated = false;
    },

    // Cerrar sesión
    logout: (state) => {
      clearAuthData();
      state.isAuthenticated = false;
      state.user = null;
      state.token = null;
      state.role = null;
      state.error = null;
    },

    // Restaurar sesión desde localStorage (al recargar página)
    restoreAuth: (state, action) => {
      state.isAuthenticated = true;
      state.token = action.payload.token;
      state.user = action.payload.user;
      state.role = action.payload.user?.role;
      
      console.log('🔄 Sesión restaurada desde localStorage:', {
        user: action.payload.user,
        storeId: action.payload.user?.storeId
      });
    },

    // Actualizar datos del usuario
    updateUser: (state, action) => {
      state.user = { ...state.user, ...action.payload };
      // Actualizar en localStorage también
      localStorage.setItem('user', JSON.stringify(state.user));
    },

    // Limpiar errores
    clearError: (state) => {
      state.error = null;
    },
  },
});

export const {
  loginStart,
  loginSuccess,
  loginFailure,
  logout,
  restoreAuth,
  updateUser,
  clearError,
} = authSlice.actions;

export default authSlice.reducer;