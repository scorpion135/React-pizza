import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { getCartFromLS } from "../../utils/getCartFromLS";
import { calcTotalPrice } from "../../utils/calcTotalPrice";
import { CartItemProps, CartSliceState } from "./types";

const { itemsPrice, items } = getCartFromLS();

const initialState: CartSliceState = {
  itemsPrice,
  items,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addItem(state, action: PayloadAction<CartItemProps>) {
      const findItem = state.items.find(
        (obj) =>
          obj.id === action.payload.id &&
          obj.type === action.payload.type &&
          obj.size === action.payload.size
      );

      if (findItem) {
        findItem.count++;
        console.log(state.items);
      } else {
        state.items.push({
          ...action.payload,
          count: 1,
        });
      }

      state.itemsPrice = calcTotalPrice(state.items);
    },

    cancelItem(state, action: PayloadAction<CartItemProps>) {
      const findItem = state.items.find(
        (obj) =>
          obj.id === action.payload.id &&
          obj.type === action.payload.type &&
          obj.size === action.payload.size
      );

      if (findItem) {
        if (findItem.count > 1) {
          findItem.count--;
          state.itemsPrice -= findItem.price;
        }
      }
    },

    removeItem(state, action: PayloadAction<number>) {
      const item = state.items.find((obj) => obj.id === action.payload);
      state.itemsPrice -= item.price;

      const index = state.items.findIndex((obj) => obj.id === action.payload);
      state.items.splice(index, 1);
      state.items = state.items;
    },

    clearCart(state) {
      state.items = [];
      state.itemsPrice = 0;
    },
  },
});

export const { addItem, cancelItem, removeItem, clearCart } = cartSlice.actions;

export default cartSlice.reducer;
