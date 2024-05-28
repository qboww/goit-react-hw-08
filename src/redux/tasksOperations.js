// tasksOperations.js
import { createAsyncThunk } from "@reduxjs/toolkit";
import goitApi from "../config/goitApi";

export const fetchTasksWithPaginationThunk = createAsyncThunk(
  "tasks/fetchWithPagination",
  async (page, thunkApi) => {
    try {
      const { data } = await goitApi.get(`tasks/paginated?page=${page}`);
      return data;
    } catch (error) {
      return thunkApi.rejectWithValue(error.message);
    }
  },
);

export const searchTasksThunk = createAsyncThunk(
  "tasks/search",
  async (query, thunkApi) => {
    try {
      const { data } = await goitApi.get(`tasks/search?query=${query}`);
      return data;
    } catch (error) {
      return thunkApi.rejectWithValue(error.message);
    }
  },
);

export const fetchTasksThunk = createAsyncThunk(
  "tasks/fetchAll",
  async (_, thunkApi) => {
    try {
      const { data } = await goitApi.get("tasks");
      return data;
    } catch (error) {
      return thunkApi.rejectWithValue(error.message);
    }
  },
);

export const deleteTaskThunk = createAsyncThunk(
  "tasks/Delete",
  async (id, thunkApi) => {
    try {
      await goitApi.delete(`tasks/${id}`);
      return id;
    } catch (error) {
      return thunkApi.rejectWithValue(error.message);
    }
  },
);

export const addTaskThunk = createAsyncThunk(
  "tasks/Add",
  async (body, thunkApi) => {
    try {
      const { data } = await goitApi.post("tasks", body);
      return data;
    } catch (error) {
      return thunkApi.rejectWithValue(error.message);
    }
  },
);

export const editTaskThunk = createAsyncThunk(
  "tasks/Edit",
  async (body, thunkApi) => {
    try {
      const { data } = await goitApi.patch(`tasks/${body.id}`, body);
      return data;
    } catch (error) {
      return thunkApi.rejectWithValue(error.message);
    }
  },
);

export const fetchAllTasksThunk = createAsyncThunk(
  "tasks/fetchAllAdmin",
  async (_, thunkApi) => {
    try {
      const { data } = await goitApi.get("tasks/admin");
      return data;
    } catch (error) {
      return thunkApi.rejectWithValue(error.message);
    }
  },
);

export const deleteTaskAdminThunk = createAsyncThunk(
  "tasks/deleteAdmin",
  async (id, thunkApi) => {
    try {
      await goitApi.delete(`tasks/${id}`);
      return id;
    } catch (error) {
      return thunkApi.rejectWithValue(error.message);
    }
  },
);

export const editTaskAdminThunk = createAsyncThunk(
  "tasks/editAdmin",
  async (body, thunkApi) => {
    try {
      const { data } = await goitApi.patch(`tasks/${body.id}`, body);
      return data;
    } catch (error) {
      return thunkApi.rejectWithValue(error.message);
    }
  },
);

export const createTaskAdminThunk = createAsyncThunk(
  "tasks/createAdmin",
  async (body, thunkApi) => {
    try {
      const { data } = await goitApi.post("tasks", body);
      return data;
    } catch (error) {
      return thunkApi.rejectWithValue(error.message);
    }
  },
);
