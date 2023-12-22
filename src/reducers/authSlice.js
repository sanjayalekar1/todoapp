import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  token:null,
  user: null,
  isAuthenticated: false,
  loading: false,
  error: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setToken:(state,action) =>{
      state.token = action.payload;
      localStorage.setItem('token',action.payload);
    },
    setUser: (state, action) => {
      state.user = action.payload;
      state.isAuthenticated = true;
      state.loading = false;
      state.error = null;
      localStorage.setItem('isAuthenticated',state.isAuthenticated);
      localStorage.setItem('user',JSON.stringify(action.payload));
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setError: (state, action) => {
      state.loading = false; 
      state.error = action.payload;
      state.isAuthenticated = false;
    },
    setAuthenticated: (state, action) => {
      state.loading = false; 
      state.isAuthenticated = true;
    },
    logout: (state) => {
      state.user = null;
      state.isAuthenticated = false;
      state.loading = false;
      state.error = null;
      localStorage.removeItem('isAuthenticated');
      localStorage.removeItem('user');
      localStorage.removeItem('token');
    },
  },
});

export const { setUser, setLoading, setError,logout ,setToken} = authSlice.actions;
export const selectToken = (state) => state.auth.auth.token;
export const selectUser = (state) => state.auth.auth.user;
export const selectIsAuthenticated = (state) => state.auth.auth.isAuthenticated;
export const selectLoading = (state) => state.auth.auth.loading;
export const selectError = (state) => state.auth.auth.error;

export default authSlice.reducer;
