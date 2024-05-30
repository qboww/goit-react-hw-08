import { createAsyncThunk } from "@reduxjs/toolkit";
import backendApi from "../config/backendApi";

export const fetchUsersThunk = createAsyncThunk(
  "users/fetchAll",
  async (_, thunkApi) => {
    try {
      const { data } = await backendApi.get("users");
      return data;
    } catch (error) {
      return thunkApi.rejectWithValue(error.message);
    }
  },
);
