import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { reservationService } from '../../services/reservationService';

const initialState = {
  reservation: null, // Contendrá el objeto de la reserva activa { id, status, etc. }
  items: [], // Contendrá los productos (items) de la reserva
  history: [], // Historial de reservas
  status: 'idle', // 'idle' | 'loading' | 'succeeded' | 'failed'
  error: null,
};

export const fetchActiveReservation = createAsyncThunk(
  'reservation/fetchActiveReservation',
  async (clientId, { rejectWithValue }) => {
    console.log('🔍 fetchActiveReservation - Iniciando con clientId:', clientId);

    const response = await reservationService.getReservationsByClient(clientId);
    console.log('🔍 fetchActiveReservation - Respuesta del servicio:', response);

    if (response.success) {
      console.log('🔍 fetchActiveReservation - Reservas encontradas:', response.data);

      // Buscamos la reserva activa (carrito) que debe estar en estado 'PENDIENTE'
      const activeReservation = response.data.find(
        (r) => r.status === 'PENDIENTE' || r.status === 'PENDING'
      );

      console.log('🔍 fetchActiveReservation - Reserva activa:', activeReservation);

      if (activeReservation) {
        // Si encontramos una reserva activa, buscamos sus items
        const itemsResponse = await reservationService.getItemsByReservation(activeReservation.id);
        console.log('🔍 fetchActiveReservation - Items de la reserva:', itemsResponse);

        if (itemsResponse.success) {
          const result = { reservation: activeReservation, items: itemsResponse.data };
          console.log('✅ fetchActiveReservation - Resultado final:', result);
          return result;
        }
        console.error('❌ fetchActiveReservation - Error al obtener items:', itemsResponse.error);
        return rejectWithValue(itemsResponse.error);
      }
      console.log('ℹ️ fetchActiveReservation - No hay reserva activa');
      return { reservation: null, items: [] }; // No hay reserva activa
    }
    console.error('❌ fetchActiveReservation - Error al obtener reservas:', response.error);
    return rejectWithValue(response.error);
  }
);

// THUNK: Añadir un item, creando la reserva si no existe
export const addOrUpdateItem = createAsyncThunk(
  'reservation/addOrUpdateItem',
  async ({ clientId, storeId, product, quantity }, { getState, rejectWithValue }) => {
    console.log('🛒 addOrUpdateItem - Iniciando con:', { clientId, storeId, product, quantity });

    let { reservation } = getState().reservation;
    console.log('🛒 addOrUpdateItem - Reserva actual:', reservation);

    // 1. Si no hay reserva, crear una nueva
    if (!reservation) {
      console.log('🛒 addOrUpdateItem - No hay reserva, creando una nueva...');
      const createResponse = await reservationService.createReservation({
        clientId,
        storeId,
        status: 'PENDIENTE',
        reservationDate: new Date().toISOString(),
      });
      console.log('🛒 addOrUpdateItem - Respuesta de crear reserva:', createResponse);

      if (createResponse.success) {
        reservation = createResponse.data;
        console.log('✅ addOrUpdateItem - Reserva creada:', reservation);
      } else {
        console.error('❌ addOrUpdateItem - Error al crear reserva:', createResponse.error);
        return rejectWithValue(createResponse.error);
      }
    }

    // 2. Añadir el producto a la reserva
    const itemData = {
      reservationId: reservation.id,
      productId: product.idProduct,
      storeId: product.storeId,
      quantity,
    };
    console.log('🛒 addOrUpdateItem - Datos del item a añadir:', itemData);

    const addItemResponse = await reservationService.addItemToReservation(itemData);
    console.log('🛒 addOrUpdateItem - Respuesta de añadir item:', addItemResponse);

    if (addItemResponse.success) {
      console.log('✅ addOrUpdateItem - Item añadido, refrescando lista...');
      // Refrescamos todo el estado para mantenerlo consistente
      const itemsResponse = await reservationService.getItemsByReservation(reservation.id);
      console.log('🛒 addOrUpdateItem - Items actualizados:', itemsResponse);

      const result = { reservation, items: itemsResponse.data };
      console.log('✅ addOrUpdateItem - Resultado final:', result);
      return result;
    }
    console.error('❌ addOrUpdateItem - Error al añadir item:', addItemResponse.error);
    return rejectWithValue(addItemResponse.error);
  }
);

// THUNK: Eliminar un item de la reserva
export const removeItem = createAsyncThunk(
  'reservation/removeItem',
  async (itemId, { rejectWithValue }) => {
    const response = await reservationService.deleteReservationItem(itemId);
    if (response.success) {
      return itemId; // Devolvemos el ID del item eliminado
    }
    return rejectWithValue(response.error);
  }
);

export const confirmReservation = createAsyncThunk(
  'reservation/confirmReservation',
  async (reservation, { getState, rejectWithValue }) => {
    try {
      const state = getState();
      const currentItems = state.reservation.items;

      // Asegurar que los items tengan el formato correcto para el backend
      // Especialmente asegurar que productId esté presente si el backend lo necesita para el mapeo
      const formattedItems = currentItems.map(item => ({
        ...item,
        productId: item.product?.idProducto || item.product?.id || item.productId,
        // Si el backend espera 'product' como objeto, ya está ahí en '...item'
        // Si espera solo ID, con productId debería bastar si el mapper lo usa.
      }));

      // Enviar el objeto completo de la reserva con el status actualizado e items
      const updatedReservation = {
        ...reservation,
        status: 'SOLICITADA', // Cliente solicita, esperando aprobación del vendedor
        items: formattedItems
      };

      const response = await reservationService.updateReservationStatus(reservation.id, updatedReservation);
      if (response.success) {
        return response.data;
      }
      return rejectWithValue(response.error);
    } catch (error) {
      return rejectWithValue(error.message || 'Error al confirmar la reserva');
    }
  }
);

export const fetchClientReservations = createAsyncThunk(
  'reservation/fetchClientReservations',
  async (clientId, { rejectWithValue }) => {
    const response = await reservationService.getReservationsByClient(clientId);
    if (response.success) {
      return response.data;
    }
    return rejectWithValue(response.error);
  }
);

// THUNK: Actualizar la cantidad de un item
export const updateItemQuantity = createAsyncThunk(
  'reservation/updateItemQuantity',
  async ({ itemId, quantity }, { rejectWithValue }) => {
    const response = await reservationService.updateReservationItem(itemId, { quantity });
    if (response.success) {
      return response.data; // Devolvemos el item actualizado
    }
    return rejectWithValue(response.error);
  }
);

const reservationSlice = createSlice({
  name: 'reservation',
  initialState,
  reducers: {
    clearReservation: (state) => {
      state.reservation = null;
      state.items = [];
      state.status = 'idle';
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Estados para fetch, add y update (cuando todo va bien)
      .addCase(fetchActiveReservation.fulfilled, (state, action) => {
        console.log('✅ REDUCER - fetchActiveReservation.fulfilled:', action.payload);
        state.status = 'succeeded';
        state.reservation = action.payload.reservation;
        state.items = action.payload.items;
        console.log('✅ REDUCER - Estado actualizado:', { reservation: state.reservation, items: state.items });
      })
      .addCase(addOrUpdateItem.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.reservation = action.payload.reservation;
        state.items = action.payload.items;
      })
      .addCase(updateItemQuantity.fulfilled, (state, action) => {
        state.status = 'succeeded';
        const index = state.items.findIndex((item) => item.id === action.payload.id);
        if (index !== -1) {
          state.items[index] = action.payload;
        }
      })
      .addCase(removeItem.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.items = state.items.filter((item) => item.id !== action.payload);
      })
      // Confirm Reservation
      .addCase(confirmReservation.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(confirmReservation.fulfilled, (state) => {
        state.status = 'succeeded';
        state.reservation = null; // Limpiamos la reserva activa (carrito)
        state.items = [];
      })
      .addCase(confirmReservation.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      })
      // Fetch Client Reservations (History)
      .addCase(fetchClientReservations.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchClientReservations.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.history = action.payload;
      })
      .addCase(fetchClientReservations.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      })
      // Estados de carga (pending)
      .addMatcher(
        (action) => action.type.endsWith('/pending'),
        (state) => {
          state.status = 'loading';
          state.error = null;
        }
      )
      // Estados de error (rejected)
      .addMatcher(
        (action) => action.type.endsWith('/rejected'),
        (state, action) => {
          state.status = 'failed';
          state.error = action.payload || 'Algo salió mal';
        }
      );
  },
});

export const { clearReservation } = reservationSlice.actions;
export default reservationSlice.reducer;
