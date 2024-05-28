import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { FilterSliceState, Sort } from "./types";

const initialState: FilterSliceState = {
  categoryId: 0,
  page: 1,
  sort: {
    name: "популярности (ASC)",
    sortProperty: "rating",
  },
};

const filterSlice = createSlice({
  name: "filter",
  initialState,
  reducers: {
    setCategoryId(state, action: PayloadAction<number>) {
      state.categoryId = action.payload;
    },
    setSort(state, action: PayloadAction<Sort>) {
      state.sort = action.payload;
    },
    setPage(state, action: PayloadAction<number>) {
      state.page = action.payload;
    },
    setFilters(state, action: PayloadAction<FilterSliceState>) {
      state.sort = action.payload.sort;
      state.categoryId = Number(action.payload.categoryId);
      state.page = Number(action.payload.page);
    },
  },
});

export const { setCategoryId, setSort, setPage, setFilters } =
  filterSlice.actions;

export default filterSlice.reducer;
