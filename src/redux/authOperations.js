// authOperations.js
import { createAsyncThunk } from "@reduxjs/toolkit";
import backendApi, { clearToken, setToken } from "../config/backendApi";

export const registerThunk = createAsyncThunk(
  "auth/register",
  async (credentials, thunkApi) => {
    try {
      const { data } = await backendApi.post("/users/signup", credentials);
      setToken(data.token);
      return data;
    } catch (error) {
      return thunkApi.rejectWithValue(error.message);
    }
  },
);

export const loginThunk = createAsyncThunk(
  "auth/login",
  async (credentials, thunkApi) => {
    try {
      const { data } = await backendApi.post("/users/login", credentials);
      setToken(data.token);
      return data;
    } catch (error) {
      return thunkApi.rejectWithValue(error.message);
    }
  },
);

export const logoutThunk = createAsyncThunk(
  "auth/logout",
  async (_, thunkApi) => {
    try {
      await backendApi.post("/users/logout");
      clearToken();
    } catch (error) {
      return thunkApi.rejectWithValue(error.message);
    }
  },
);

export const refreshThunk = createAsyncThunk(
  "auth/refresh",
  async (_, thunkApi) => {
    const token = thunkApi.getState().auth.token;
    if (!token) {
      return thunkApi.rejectWithValue("No token exist!");
    }
    setToken(token);
    try {
      const { data } = await backendApi.get("/users/current");
      return data;
    } catch (error) {
      return thunkApi.rejectWithValue(error.message);
    }
  },
);
