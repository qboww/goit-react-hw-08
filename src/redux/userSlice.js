// userSlice.js
import { createSlice } from "@reduxjs/toolkit";
import { fetchUsersThunk } from "./userOperations";

const initialState = {
  users: [],
  isLoading: false,
  isError: false,
};

const userSlice = createSlice({
  name: "users",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchUsersThunk.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
      })
      .addCase(fetchUsersThunk.fulfilled, (state, { payload }) => {
        state.users = payload;
        state.isLoading = false;
      })
      .addCase(fetchUsersThunk.rejected, (state, { payload }) => {
        state.isError = payload;
        state.isLoading = false;
      });
  },
});

export const selectUsers = (state) => state.users.users;
export const selectIsLoadingUsers = (state) => state.users.isLoading;
export const selectIsErrorUsers = (state) => state.users.isError;

export const userReducer = userSlice.reducer;
