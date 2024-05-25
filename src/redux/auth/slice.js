import { createSlice } from "@reduxjs/toolkit";
import {
  loginThunk,
  logoutThunk,
  refreshThunk,
  registerThunk,
} from "./operations";
import {
  selectUserName,
  selectToken,
  selectIsLoggedIn,
  selectIsRefreshing,
  selectUserRole,
} from "./selectors";

const initialState = {
  user: {
    name: "",
    email: "",
    role: "", // Add role here
  },
  isLoggedIn: false,
  error: false,
  isLoading: false,
  token: null,
  isRefreshing: false,
};

const slice = createSlice({
  name: "auth",
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(registerThunk.fulfilled, (state, action) => {
        state.user = action.payload.user;
        state.token = action.payload.token;
        state.isLoggedIn = true;
      })
      .addCase(loginThunk.fulfilled, (state, action) => {
        state.user = action.payload.user;
        state.token = action.payload.token;
        state.isLoggedIn = true;
      })
      .addCase(logoutThunk.fulfilled, () => {
        return initialState;
      })
      .addCase(refreshThunk.fulfilled, (state, action) => {
        state.user = action.payload;
        state.isLoggedIn = true;
        state.isRefreshing = false;
      })
      .addCase(refreshThunk.pending, (state) => {
        state.isRefreshing = true;
      })
      .addCase(refreshThunk.rejected, (state) => {
        state.isRefreshing = false;
      });
  },
});

export const authReducer = slice.reducer;
export {
  selectIsLoggedIn,
  selectToken,
  selectUserName,
  selectIsRefreshing,
  selectUserRole,
};