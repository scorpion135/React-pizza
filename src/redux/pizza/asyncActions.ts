import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { FetchPizzaArgs, Pizza } from "./types";

export const fetchPizzas = createAsyncThunk<Pizza[], FetchPizzaArgs>(
  "pizza/fetchPizzasStatus",
  async (params) => {
    const { category, page, sort } = params;

    const { data } = await axios.get(
      `http://localhost:3000/items?_page=${page}&_per_page=4${category}&_sort=${sort}`
    );

    return data.data as Pizza[];
  }
);
