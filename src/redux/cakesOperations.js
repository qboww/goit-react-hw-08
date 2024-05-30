import { createAsyncThunk } from "@reduxjs/toolkit";
import goitApi from "../config/goitApi";
import axios from "axios";

const fetchAllCakes = async () => {
  let allCakes = [];
  let currentPage = 1;
  let totalPages = 1;

  while (currentPage <= totalPages) {
    const { data } = await goitApi.get(`/cakes?page=${currentPage}`);
    allCakes = [...allCakes, ...data.cakes];
    totalPages = data.totalPages;
    currentPage += 1;
  }

  return allCakes;
};

export const fetchCakesThunk = createAsyncThunk(
  "cakes/fetchAll",
  async (
    { page = 1, sortBy = "name", order = "asc", search = "", ingredients = [] },
    thunkApi,
  ) => {
    try {
      const queryString = new URLSearchParams({
        page,
        sortBy,
        order,
        search,
        ingredients: ingredients.join(","),
      }).toString();
      const { data } = await goitApi.get(`/cakes?${queryString}`);
      return data;
    } catch (error) {
      return thunkApi.rejectWithValue(error.message);
    }
  },
);

export const fetchIngredientsThunk = createAsyncThunk(
  "cakes/fetchIngredients",
  async (_, thunkApi) => {
    try {
      const response = await axios.get("http://localhost:5000/ingredients");
      return response.data;
    } catch (error) {
      return thunkApi.rejectWithValue(error.message);
    }
  },
);

export const addCakeThunk = createAsyncThunk(
  "cakes/add",
  async (cake, thunkApi) => {
    try {
      const { data } = await goitApi.post("/cakes", cake);
      return data;
    } catch (error) {
      return thunkApi.rejectWithValue(error.message);
    }
  },
);

export const updateCakeThunk = createAsyncThunk(
  "cakes/update",
  async ({ id, cake }, thunkApi) => {
    try {
      const { data } = await goitApi.patch(`/cakes/${id}`, cake);
      return data;
    } catch (error) {
      return thunkApi.rejectWithValue(error.message);
    }
  },
);

export const deleteCakeThunk = createAsyncThunk(
  "cakes/delete",
  async (id, thunkApi) => {
    try {
      await goitApi.delete(`/cakes/${id}`);
      return id;
    } catch (error) {
      return thunkApi.rejectWithValue(error.message);
    }
  },
);

export const fetchAllCakesThunk = createAsyncThunk(
  "cakes/fetchAllCakes",
  async (_, thunkApi) => {
    try {
      const allCakes = await fetchAllCakes();
      return allCakes;
    } catch (error) {
      return thunkApi.rejectWithValue(error.message);
    }
  },
);
