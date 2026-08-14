import { createAsyncThunk, createSlice, isAnyOf } from '@reduxjs/toolkit';
import api from '../../api/client';
import type { Cart } from '../../types';

interface CartState {
  cart: Cart | null;
  loading: boolean;
  error: string | null;
}

const initialState: CartState = { cart: null, loading: false, error: null };

export const fetchCart = createAsyncThunk('cart/fetch', async (_, { rejectWithValue }) => {
  try {
    const { data } = await api.get('/cart');
    return data as Cart;
  } catch (error: any) {
    return rejectWithValue(error.response?.data?.message || 'Could not load cart');
  }
});

export const addToCart = createAsyncThunk('cart/add', async (payload: { productId: string; quantity?: number }, { rejectWithValue }) => {
  try {
    const { data } = await api.post('/cart/items', payload);
    return data as Cart;
  } catch (error: any) {
    return rejectWithValue(error.response?.data?.message || 'Could not add item');
  }
});

export const updateCartItem = createAsyncThunk('cart/update', async (payload: { productId: string; quantity: number }, { rejectWithValue }) => {
  try {
    const { data } = await api.patch(`/cart/items/${payload.productId}`, { quantity: payload.quantity });
    return data as Cart;
  } catch (error: any) {
    return rejectWithValue(error.response?.data?.message || 'Could not update item');
  }
});

export const removeCartItem = createAsyncThunk('cart/remove', async (productId: string, { rejectWithValue }) => {
  try {
    const { data } = await api.delete(`/cart/items/${productId}`);
    return data as Cart;
  } catch (error: any) {
    return rejectWithValue(error.response?.data?.message || 'Could not remove item');
  }
});

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: { clearLocalCart: (state) => { state.cart = null; } },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCart.fulfilled, (state, action) => { state.loading = false; state.cart = action.payload; })
      .addCase(addToCart.fulfilled, (state, action) => { state.loading = false; state.cart = action.payload; })
      .addCase(updateCartItem.fulfilled, (state, action) => { state.loading = false; state.cart = action.payload; })
      .addCase(removeCartItem.fulfilled, (state, action) => { state.loading = false; state.cart = action.payload; })
      .addMatcher(isAnyOf(fetchCart.pending, addToCart.pending, updateCartItem.pending, removeCartItem.pending), (state) => { state.loading = true; state.error = null; })
      .addMatcher(isAnyOf(fetchCart.rejected, addToCart.rejected, updateCartItem.rejected, removeCartItem.rejected), (state, action) => { state.loading = false; state.error = action.payload as string; });
  },
});

export const { clearLocalCart } = cartSlice.actions;
export default cartSlice.reducer;
