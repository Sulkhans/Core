import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { CartItem, ShippingAddressType } from "../../types/types";

interface CartState {
  cartItems: CartItem[];
  shippingAddress: ShippingAddressType | null;
}

const initialState: CartState = {
  cartItems: localStorage.getItem("cartItems")
    ? JSON.parse(localStorage.getItem("cartItems") || "[]")
    : [],
  shippingAddress: localStorage.getItem("shippingAddress")
    ? JSON.parse(localStorage.getItem("shippingAddress") || "null")
    : null,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action: PayloadAction<CartItem>) => {
      const existingItem = state.cartItems.some(
        (item) => item._id === action.payload._id
      );
      if (!existingItem)
        state.cartItems.push({ ...action.payload, quantity: 1 });
      localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
    },
    removeFromCart: (state, action: PayloadAction<string>) => {
      state.cartItems = state.cartItems.filter(
        (item) => item._id !== action.payload
      );
      localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
    },
    updateQuantity: (
      state,
      action: PayloadAction<{ id: string; quantity: number }>
    ) => {
      const index = state.cartItems.findIndex(
        (item) => item._id === action.payload.id
      );
      if (index > -1) {
        state.cartItems[index].quantity = action.payload.quantity;
        localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
      }
    },
    clearCart: (state) => {
      state.cartItems = [];
      localStorage.removeItem("cartItems");
    },

    setShippingAddress: (state, action: PayloadAction<ShippingAddressType>) => {
      state.shippingAddress = action.payload;
      localStorage.setItem("shippingAddress", JSON.stringify(action.payload));
    },
    clearShippingAddress: (state) => {
      state.shippingAddress = null;
      localStorage.removeItem("shippingAddress");
    },
  },
});

export const {
  addToCart,
  removeFromCart,
  updateQuantity,
  clearCart,
  setShippingAddress,
  clearShippingAddress,
} = cartSlice.actions;
export default cartSlice.reducer;
