import { createAsyncThunk } from "@reduxjs/toolkit";
import goitApi from "../../config/goitApi";

export const fetchContactsThunk = createAsyncThunk(
  "contacts/fetchAll",
  async (_, thunkApi) => {
    try {
      const { data } = await goitApi.get("contacts");
      return data;
    } catch (error) {
      return thunkApi.rejectWithValue(error.message);
    }
  },
);

export const deleteContactsThunk = createAsyncThunk(
  "contacts/Delete",
  async (id, thunkApi) => {
    try {
      await goitApi.delete(`contacts/${id}`);
      return id; // Return the id directly
    } catch (error) {
      return thunkApi.rejectWithValue(error.message);
    }
  },
);

export const addContactsThunk = createAsyncThunk(
  "contacts/Add",
  async (body, thunkApi) => {
    try {
      const { data } = await goitApi.post("contacts", body);
      return data;
    } catch (error) {
      return thunkApi.rejectWithValue(error.message);
    }
  },
);

export const editContactsThunk = createAsyncThunk(
  "contacts/Edit",
  async (body, thunkApi) => {
    try {
      const { data } = await goitApi.patch(`contacts/${body.id}`, body);
      return data;
    } catch (error) {
      return thunkApi.rejectWithValue(error.message);
    }
  },
);

export const fetchAllContactsThunk = createAsyncThunk(
  "contacts/fetchAllAdmin",
  async (_, thunkApi) => {
    try {
      const { data } = await goitApi.get("contacts/admin");
      return data;
    } catch (error) {
      return thunkApi.rejectWithValue(error.message);
    }
  },
);

export const deleteContactAdminThunk = createAsyncThunk(
  "contacts/deleteAdmin",
  async (id, thunkApi) => {
    try {
      await goitApi.delete(`contacts/${id}`);
      return id;
    } catch (error) {
      return thunkApi.rejectWithValue(error.message);
    }
  },
);

export const editContactAdminThunk = createAsyncThunk(
  "contacts/editAdmin",
  async (body, thunkApi) => {
    try {
      const { data } = await goitApi.patch(`contacts/${body.id}`, body);
      return data;
    } catch (error) {
      return thunkApi.rejectWithValue(error.message);
    }
  },
);
