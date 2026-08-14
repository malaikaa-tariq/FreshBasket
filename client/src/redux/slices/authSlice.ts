import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import api from '../../api/client';
import type { User } from '../../types';

interface AuthState {
  user: User | null;
  token: string | null;
  loading: boolean;
  error: string | null;
}

const token = localStorage.getItem('freshbasket_token');
const storedUser = localStorage.getItem('freshbasket_user');

const initialState: AuthState = {
  user: storedUser ? JSON.parse(storedUser) as User : null,
  token,
  loading: false,
  error: null,
};

export const login = createAsyncThunk(
  'auth/login',
  async (payload: { email: string; password: string }, { rejectWithValue }) => {
    try {
      const { data } = await api.post('/auth/login', payload);
      return data as { token: string; user: User };
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Login failed');
    }
  }
);

export const register = createAsyncThunk(
  'auth/register',
  async (payload: { name: string; email: string; password: string }, { rejectWithValue }) => {
    try {
      const { data } = await api.post('/auth/register', payload);
      return data as { token: string; user: User };
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Registration failed');
    }
  }
);

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout(state) {
      state.user = null;
      state.token = null;
      localStorage.removeItem('freshbasket_token');
      localStorage.removeItem('freshbasket_user');
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => { state.loading = true; state.error = null; })
      .addCase(login.fulfilled, (state, action) => {
        state.loading = false;
        state.token = action.payload.token;
        state.user = action.payload.user;
        localStorage.setItem('freshbasket_token', action.payload.token);
        localStorage.setItem('freshbasket_user', JSON.stringify(action.payload.user));
      })
      .addCase(login.rejected, (state, action) => { state.loading = false; state.error = action.payload as string; })
      .addCase(register.pending, (state) => { state.loading = true; state.error = null; })
      .addCase(register.fulfilled, (state, action) => {
        state.loading = false;
        state.token = action.payload.token;
        state.user = action.payload.user;
        localStorage.setItem('freshbasket_token', action.payload.token);
        localStorage.setItem('freshbasket_user', JSON.stringify(action.payload.user));
      })
      .addCase(register.rejected, (state, action) => { state.loading = false; state.error = action.payload as string; });
  },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;
