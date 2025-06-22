import { createSlice,createAsyncThunk } from "@reduxjs/toolkit";
import {axiosInstance} from "../../axios/axiosInstance";


// Retrive user info and token from localStorage
const userInfoFromStorage = localStorage.getItem("userInfo")
  ? JSON.parse(localStorage.getItem("userInfo"))
  : null;

  //Check for an existing guest ID in the localStorage
const initialGuestId = localStorage.getItem("guestId") || `guest_${new Date().getTime()}`;

localStorage.setItem("guestId", initialGuestId);

// Initial state for the auth slice
const initialState = {
  user: userInfoFromStorage,
  guestId: initialGuestId,
  loading: false,
  error: null,
};


// Async thunk for user login
export const loginUser = createAsyncThunk(
  "auth/loginUser",
  async (userData, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post("/api/user/login", userData);

      if (response.status !== 200) {
        return rejectWithValue(response.data.message || 'Login failed');
      }

      const data = response.data;

      // Ensure we're getting the expected properties
      if (!data.user || !data.token) {
  
        return rejectWithValue('Invalid response from server');
      }
      
      localStorage.setItem("userInfo", JSON.stringify(data.user));
      localStorage.setItem("userToken", data.token);
      return data.user;
    } catch (error) {
      console.error("Login error:", error);
      return rejectWithValue(
        error.response?.data?.message || error.message || 'An error occurred during login'
      );
    }
  }
);

// Async thunk for user registration
export const registerUser = createAsyncThunk(
  "auth/registerUser",
  async (userData, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post("/api/user/register", userData);

      if (response.status !== 201) {
        return rejectWithValue(response.data.message);
      }

      const data = response.data;
      localStorage.setItem("userInfo", JSON.stringify(data.user));
      localStorage.setItem("userToken", data.token);
      return data.user;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);


//slice 
const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
   logout: (state) => {
      state.user = null;
      state.guestId = `guest_${new Date().getTime()}`; 
      localStorage.removeItem("userInfo");
      localStorage.removeItem("userToken");
     localStorage.setItem("guestId", state.guestId);
    },
    generateNewGuestId: (state) => {
      const newGuestId = `guest_${new Date().getTime()}`;
      state.guestId = newGuestId;
      localStorage.setItem("guestId", newGuestId);
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
        state.error = null;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(registerUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
  },
});

export const { logout, generateNewGuestId } = authSlice.actions;

export default authSlice.reducer;