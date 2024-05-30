// tasksOperations.js
import { createAsyncThunk } from "@reduxjs/toolkit";
import backendApi from "../config/backendApi";

export const fetchTasksWithPaginationThunk = createAsyncThunk(
  "tasks/fetchWithPagination",
  async (page, thunkApi) => {
    try {
      const { data } = await backendApi.get(`tasks/paginated?page=${page}`);
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
      const { data } = await backendApi.get(`tasks/search?query=${query}`);
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
      const { data } = await backendApi.get("tasks");
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
      await backendApi.delete(`tasks/${id}`);
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
      const { data } = await backendApi.post("tasks", body);
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
      const { data } = await backendApi.patch(`tasks/${body.id}`, body);
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
      const { data } = await backendApi.get("tasks/admin");
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
      await backendApi.delete(`tasks/${id}`);
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
      const { id, ...taskData } = body;
      const { data } = await backendApi.patch(`tasks/${id}`, taskData);
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
      const { data } = await backendApi.post("tasks", body);
      return data;
    } catch (error) {
      return thunkApi.rejectWithValue(error.message);
    }
  },
);
