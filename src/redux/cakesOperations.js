import { createAsyncThunk } from "@reduxjs/toolkit";
import goitApi from "../config/goitApi";

export const fetchCakesThunk = createAsyncThunk(
  "cakes/fetchAll",
  async ({ page = 1 }, thunkApi) => {
    try {
      const { data } = await goitApi.get(`/cakes?page=${page}`);
      return data;
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