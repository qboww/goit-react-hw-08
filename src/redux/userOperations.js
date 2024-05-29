// userOperations.js
import { createAsyncThunk } from "@reduxjs/toolkit";
import goitApi from "../config/goitApi";

export const fetchUsersThunk = createAsyncThunk(
  "users/fetchAll",
  async (_, thunkApi) => {
    try {
      const { data } = await goitApi.get("users");
      return data;
    } catch (error) {
      return thunkApi.rejectWithValue(error.message);
    }
  },
);
