import { configureStore } from "@reduxjs/toolkit";
import filter from "./filter/slice";
import search from "./slices/searchSlice";
import cart from "./cart/slice";
import pizza from "./pizza/slice";
import { useDispatch } from "react-redux";

export const store = configureStore({
  reducer: {
    filter,
    search,
    cart,
    pizza,
  },
});

export type RootState = ReturnType<typeof store.getState>;

type AppDispatch = typeof store.dispatch;

export const useAppDispatch = () => useDispatch<AppDispatch>();
