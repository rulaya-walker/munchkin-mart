import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { axiosInstance, axiosTokenInstance } from "../../axios/axiosInstance";

// Helper function to get cart from localStorage
const getCartFromStorage = () => {
  try {
    const storeCart = localStorage.getItem("cart");
    return storeCart ? JSON.parse(storeCart) : {products:[], totalPrice: 0};
  } catch (error) {
    console.error("Error parsing cart from localStorage:", error);
    return {products:[], totalPrice: 0};
  }
};

const saveCartToStorage = (cart) => {
  try {
    if (cart) {
      localStorage.setItem("cart", JSON.stringify(cart));
    }
  } catch (error) {
    console.error("Error saving cart to localStorage:", error);
  }
};


export const fetchCart = createAsyncThunk(
  "cart/fetchCart",
  async ({userId, guestId}, { rejectWithValue }) => {
    try {
      // Use axiosTokenInstance if userId exists (user is logged in)
      const axiosClient = userId ? axiosTokenInstance : axiosInstance;
      
      const response = await axiosClient.get(`/api/cart`, {
        params: { userId, guestId }
      });
      
      return response.data;
    } catch (error) {
      console.error("Cart fetch error:", error.response?.data || error.message);
      return rejectWithValue(error.response?.data || { message: error.message });
    }
  }
);

export const addToCart = createAsyncThunk(
  "cart/addToCart",
  async ({ productId, quantity, size, color, userId, guestId }, { rejectWithValue }) => {
    try {
      // Use axiosTokenInstance if userId exists (user is logged in)
      const axiosClient = userId ? axiosTokenInstance : axiosInstance;
      
      console.log("Sending cart data:", { productId, quantity, size, color, userId, guestId });
      
      const response = await axiosClient.post(`/api/cart`, {
        productId,
        quantity,
        size,
        color,
        userId,
        guestId
      });
      
      console.log("Cart response:", response.data);
      return response.data;
    } catch (error) {
      console.error("Add to cart error:", error.response?.data || error.message);
      return rejectWithValue(error.response?.data || { message: error.message });
    }
  }
);

//update the quantity of a product in the cart
export const updateCartItemQuantity = createAsyncThunk(
  "cart/updateCartItemQuantity",
  async ({ productId, quantity, userId, guestId, size, color }, { rejectWithValue }) => {
    try {
      console.log("Updating cart item quantity:", { productId, quantity, userId, guestId, size, color });
      
      // Use axiosTokenInstance if userId exists (user is logged in)
      const axiosClient = userId ? axiosTokenInstance : axiosInstance;
      
      const response = await axiosClient.put(`/api/cart`, {
        productId,
        quantity,
        userId,
        guestId,
        size,
        color
      });
      
      console.log("Cart update response:", response.data);
      return response.data;
    } catch (error) {
      console.error("Update cart error:", error.response?.data || error.message);
      return rejectWithValue(error.response?.data || { message: error.message });
    }
  }
);

//Remove an item from the cart
export const removeFromCart = createAsyncThunk(
  "cart/removeFromCart",
  async ({ productId, userId, guestId, size, color }, { rejectWithValue }) => {
    try {
      console.log("Removing item from cart:", { productId, userId, guestId, size, color });
      
      // Use axiosTokenInstance if userId exists (user is logged in)
      const axiosClient = userId ? axiosTokenInstance : axiosInstance;
      
      const response = await axiosClient.delete(`/api/cart`, {
        data: { productId, userId, guestId, size, color }
      });
      
      return response.data;
    } catch (error) {
      console.error("Remove from cart error:", error.response?.data || error.message);
      return rejectWithValue(error.response?.data || { message: error.message });
    }
  }
);

//Merge guest cart with user cart
export const mergeCarts = createAsyncThunk(
    "cart/mergeCarts",
    async ({ guestId, user }, { rejectWithValue }) => {
      try {
        if (!guestId) {
          console.error("No guestId provided for cart merge");
          return rejectWithValue("No guest ID provided");
        }
        
        const response = await axiosTokenInstance.post(`/api/cart/merge`, {
          guestId,
          user
        });
        return response.data;
      } catch (error) {
        console.error("Merge carts error:", error.response?.data || error.message);
        return rejectWithValue(error.response?.data || { message: error.message });
      }
    }
);


const cartSlice = createSlice({
  name: "cart",
  initialState: {
    cart: getCartFromStorage(),
    loading: false,
    error: null,
  },
  reducers: {
    resetCart: (state) => {
      state.cart = { products: [] };
      localStorage.removeItem("cart");
    },
  },
  extraReducers: (builder) => { 
    builder
      .addCase(fetchCart.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCart.fulfilled, (state, action) => {
        state.loading = false;
        state.cart = action.payload;
        saveCartToStorage(action.payload);
      })
      .addCase(fetchCart.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to fetch cart";
      })
      .addCase(addToCart.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addToCart.fulfilled, (state, action) => {
        state.loading = false;
        state.cart = action.payload;
        saveCartToStorage(action.payload);
      })
      .addCase(addToCart.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message || "Failed to add item to cart";
      })
      .addCase(updateCartItemQuantity.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateCartItemQuantity.fulfilled, (state, action) => {
        state.loading = false;
        state.cart = action.payload;
        saveCartToStorage(action.payload);
      })
      .addCase(updateCartItemQuantity.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message || "Failed to update cart item quantity";
      })
      .addCase(removeFromCart.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(removeFromCart.fulfilled, (state, action) => {
        state.loading = false;
        state.cart = action.payload;
        saveCartToStorage(action.payload);
      })
      .addCase(removeFromCart.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message || "Failed to remove item from cart";
      })
      .addCase(mergeCarts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(mergeCarts.fulfilled, (state, action) => {
        state.loading = false;
        // Check if the response is the full cart object or contains a cart property
        state.cart = action.payload?.cart || action.payload;
        saveCartToStorage(state.cart);
      })
      .addCase(mergeCarts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message || action.error?.message || "Failed to merge carts";
        console.error("Cart merge error in reducer:", state.error);
      });
  },
});

export const { resetCart } = cartSlice.actions;

export default cartSlice.reducer;