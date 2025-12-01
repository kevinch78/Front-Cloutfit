import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getOutfits, addOutfit, deleteOutfit } from '../../services/closetService';

const initialState = {
  items: [],
  status: 'idle', // 'idle' | 'loading' | 'succeeded' | 'failed'
  error: null,
  currentOutfit: null,
};

// Thunks
export const fetchOutfits = createAsyncThunk('closet/fetchOutfits', async () => {
  const outfits = await getOutfits();
  return outfits;
});

export const saveOutfit = createAsyncThunk('closet/saveOutfit', async (outfitData) => {
  const newOutfit = await addOutfit(outfitData);
  return newOutfit;
});

export const removeOutfitThunk = createAsyncThunk('closet/removeOutfit', async (outfitId) => {
  await deleteOutfit(outfitId);
  return outfitId;
});

const closetSlice = createSlice({
  name: 'closet',
  initialState,
  reducers: {
    setCurrentOutfit: (state, action) => {
      state.currentOutfit = action.payload;
    },
    clearCloset: (state) => {
      state.items = [];
      state.status = 'idle';
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch Outfits
      .addCase(fetchOutfits.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchOutfits.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.items = action.payload;
      })
      .addCase(fetchOutfits.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      // Save Outfit
      .addCase(saveOutfit.fulfilled, (state, action) => {
        state.items.unshift(action.payload);
      })
      // Remove Outfit
      .addCase(removeOutfitThunk.fulfilled, (state, action) => {
        state.items = state.items.filter((outfit) => outfit.outfitId !== action.payload);
      });
  },
});

export const { setCurrentOutfit, clearCloset } = closetSlice.actions;
export default closetSlice.reducer;