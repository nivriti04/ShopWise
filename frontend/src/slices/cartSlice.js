import { createSlice } from "@reduxjs/toolkit";
import { updateCart } from "../utils/cartUtils";

const initialState = localStorage.getItem("cart")
  ? JSON.parse(localStorage.getItem("cart"))
  : { cartItems: [] };


const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    //reducer function, state: current cart state,
    //action: data inside a payload object
    addToCart: (state, action) => {
      const item = action.payload;

      const existItem = state.cartItems.find((x) => x._id === item._id);

      if (existItem) {
        state.cartItems = state.cartItems.map((x) =>
          x._id === existItem._id ? item : x
        );
      } else {
        //we dont use push vecause state is immutable so we make a copy with the spread
        //operator and add the item
        state.cartItems = [...state.cartItems, item];
      }

      return updateCart(state);
    },
    removeFromCart: (state, action) => {
      //figure out which one to remove
      state.cartItems = state.cartItems.filter((x) => x._id !== action.payload);
      return updateCart(state);
    }
  },
});

export const { addToCart, removeFromCart } = cartSlice.actions;

export default cartSlice.reducer;