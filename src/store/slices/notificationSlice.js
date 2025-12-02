import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import notificationService from '../../services/notificationService';

/**
 * Thunk para obtener notificaciones no leídas
 */
export const fetchUnreadNotifications = createAsyncThunk(
    'notifications/fetchUnread',
    async (userType, { rejectWithValue }) => {
        try {
            const result = await notificationService.getUnreadNotifications(userType);
            if (result.success) {
                return result.data;
            }
            return rejectWithValue(result.error);
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);

/**
 * Thunk para obtener el contador de no leídas
 */
export const fetchUnreadCount = createAsyncThunk(
    'notifications/fetchUnreadCount',
    async (userType, { rejectWithValue }) => {
        try {
            const result = await notificationService.getUnreadCount(userType);
            if (result.success) {
                return result.data;
            }
            return rejectWithValue(result.error);
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);

/**
 * Thunk para obtener todas las notificaciones
 */
export const fetchAllNotifications = createAsyncThunk(
    'notifications/fetchAll',
    async (userType, { rejectWithValue }) => {
        try {
            const result = await notificationService.getAllNotifications(userType);
            if (result.success) {
                return result.data;
            }
            return rejectWithValue(result.error);
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);

/**
 * Thunk para marcar una notificación como leída
 */
export const markNotificationAsRead = createAsyncThunk(
    'notifications/markAsRead',
    async (notificationId, { rejectWithValue }) => {
        try {
            const result = await notificationService.markAsRead(notificationId);
            if (result.success) {
                return notificationId;
            }
            return rejectWithValue(result.error);
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);

/**
 * Thunk para marcar todas como leídas
 */
export const markAllNotificationsAsRead = createAsyncThunk(
    'notifications/markAllAsRead',
    async (userType, { rejectWithValue }) => {
        try {
            const result = await notificationService.markAllAsRead(userType);
            if (result.success) {
                return result.data;
            }
            return rejectWithValue(result.error);
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);

/**
 * Thunk para eliminar una notificación
 */
export const deleteNotification = createAsyncThunk(
    'notifications/delete',
    async (notificationId, { rejectWithValue }) => {
        try {
            const result = await notificationService.deleteNotification(notificationId);
            if (result.success) {
                return notificationId;
            }
            return rejectWithValue(result.error);
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);

/**
 * Slice de Notificaciones
 */
const notificationSlice = createSlice({
    name: 'notifications',
    initialState: {
        // Lista de notificaciones
        items: [],

        // Contador de no leídas
        unreadCount: 0,

        // Estados de carga
        status: 'idle', // 'idle' | 'loading' | 'succeeded' | 'failed'
        error: null,

        // Flag para saber si hay notificaciones no leídas
        hasUnread: false,

        // Timestamp de la última actualización (para polling)
        lastUpdated: null,
    },
    reducers: {
        /**
         * Resetear el estado de notificaciones (útil al cerrar sesión)
         */
        resetNotifications: (state) => {
            state.items = [];
            state.unreadCount = 0;
            state.status = 'idle';
            state.error = null;
            state.hasUnread = false;
            state.lastUpdated = null;
        },

        /**
         * Agregar una nueva notificación (para WebSockets futuros)
         */
        addNotification: (state, action) => {
            state.items.unshift(action.payload);
            if (!action.payload.isRead) {
                state.unreadCount += 1;
                state.hasUnread = true;
            }
            state.lastUpdated = new Date().toISOString();
        },
    },
    extraReducers: (builder) => {
        builder
            // ========== fetchUnreadNotifications ==========
            .addCase(fetchUnreadNotifications.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchUnreadNotifications.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.items = action.payload;
                state.unreadCount = action.payload.length;
                state.hasUnread = action.payload.length > 0;
                state.lastUpdated = new Date().toISOString();
                state.error = null;
            })
            .addCase(fetchUnreadNotifications.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.payload || 'Error al cargar notificaciones';
            })

            // ========== fetchUnreadCount ==========
            .addCase(fetchUnreadCount.fulfilled, (state, action) => {
                state.unreadCount = action.payload.count || 0;
                state.hasUnread = action.payload.hasUnread || false;
            })

            // ========== fetchAllNotifications ==========
            .addCase(fetchAllNotifications.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchAllNotifications.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.items = action.payload;
                state.unreadCount = action.payload.filter(n => !n.isRead).length;
                state.hasUnread = state.unreadCount > 0;
                state.lastUpdated = new Date().toISOString();
                state.error = null;
            })
            .addCase(fetchAllNotifications.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.payload || 'Error al cargar notificaciones';
            })

            // ========== markNotificationAsRead ==========
            .addCase(markNotificationAsRead.fulfilled, (state, action) => {
                const notification = state.items.find(n => n.id === action.payload);
                if (notification && !notification.isRead) {
                    notification.isRead = true;
                    notification.readAt = new Date().toISOString();
                    state.unreadCount = Math.max(0, state.unreadCount - 1);
                    state.hasUnread = state.unreadCount > 0;
                }
            })

            // ========== markAllNotificationsAsRead ==========
            .addCase(markAllNotificationsAsRead.fulfilled, (state) => {
                state.items.forEach(notification => {
                    if (!notification.isRead) {
                        notification.isRead = true;
                        notification.readAt = new Date().toISOString();
                    }
                });
                state.unreadCount = 0;
                state.hasUnread = false;
            })

            // ========== deleteNotification ==========
            .addCase(deleteNotification.fulfilled, (state, action) => {
                const index = state.items.findIndex(n => n.id === action.payload);
                if (index !== -1) {
                    const wasUnread = !state.items[index].isRead;
                    state.items.splice(index, 1);
                    if (wasUnread) {
                        state.unreadCount = Math.max(0, state.unreadCount - 1);
                        state.hasUnread = state.unreadCount > 0;
                    }
                }
            });
    },
});

// Exportar acciones
export const { resetNotifications, addNotification } = notificationSlice.actions;

// Selectores
export const selectNotifications = (state) => state.notifications.items;
export const selectUnreadCount = (state) => state.notifications.unreadCount;
export const selectHasUnread = (state) => state.notifications.hasUnread;
export const selectNotificationStatus = (state) => state.notifications.status;
export const selectNotificationError = (state) => state.notifications.error;

// Exportar reducer
export default notificationSlice.reducer;