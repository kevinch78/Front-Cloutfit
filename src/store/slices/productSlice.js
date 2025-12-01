import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  products: [],
  featuredProducts: [],
  currentProduct: null,
  filters: {
    style: '',
    climate: '',
    gender: '',
    minPrice: 0,
    maxPrice: 1000000,
  },
  loading: false,
  error: null,
};

const productSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    setProducts: (state, action) => {
      state.products = action.payload;
    },
    setFeaturedProducts: (state, action) => {
      state.featuredProducts = action.payload;
    },
    setCurrentProduct: (state, action) => {
      state.currentProduct = action.payload;
    },
    setFilters: (state, action) => {
      state.filters = { ...state.filters, ...action.payload };
    },
    clearFilters: (state) => {
      state.filters = initialState.filters;
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
  },
});

export const {
  setProducts,
  setFeaturedProducts,
  setCurrentProduct,
  setFilters,
  clearFilters,
  setLoading,
  setError,
} = productSlice.actions;

export default productSlice.reducer;