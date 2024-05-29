import { createSlice } from "@reduxjs/toolkit";
import {
  fetchCakesThunk,
  addCakeThunk,
  updateCakeThunk,
  deleteCakeThunk,
  fetchIngredientsThunk,
} from "./cakesOperations";

const initialState = {
  cakes: [],
  ingredients: [],
  isLoading: false,
  isError: false,
  totalPages: 1,
};

const cakesSlice = createSlice({
  name: "cakes",
  initialState,
  reducers: {
    addCake: (state, action) => {
      state.cakes.push(action.payload);
    },
    updateCake: (state, action) => {
      const index = state.cakes.findIndex(
        (cake) => cake._id === action.payload._id,
      );
      if (index !== -1) {
        state.cakes[index] = action.payload;
      }
    },
    deleteCake: (state, action) => {
      state.cakes = state.cakes.filter((cake) => cake._id !== action.payload);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCakesThunk.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
      })
      .addCase(fetchCakesThunk.fulfilled, (state, { payload }) => {
        state.cakes = payload.cakes;
        state.totalPages = payload.totalPages;
        state.isLoading = false;
      })
      .addCase(fetchCakesThunk.rejected, (state, { payload }) => {
        state.isError = payload;
        state.isLoading = false;
      })
      .addCase(addCakeThunk.fulfilled, (state, { payload }) => {
        state.cakes.push(payload);
      })
      .addCase(updateCakeThunk.fulfilled, (state, { payload }) => {
        const index = state.cakes.findIndex((cake) => cake._id === payload._id);
        if (index !== -1) {
          state.cakes[index] = payload;
        }
      })
      .addCase(deleteCakeThunk.fulfilled, (state, { payload }) => {
        state.cakes = state.cakes.filter((cake) => cake._id !== payload);
      })
      .addCase(fetchIngredientsThunk.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
      })
      .addCase(fetchIngredientsThunk.fulfilled, (state, { payload }) => {
        state.ingredients = payload.map((ingredient) => ({
          value: ingredient,
          label: ingredient,
        }));
        state.isLoading = false;
      })
      .addCase(fetchIngredientsThunk.rejected, (state, { payload }) => {
        state.isError = payload;
        state.isLoading = false;
      });
  },
});

export const { addCake, updateCake, deleteCake } = cakesSlice.actions;
export const cakesReducer = cakesSlice.reducer;

export const selectCakes = (state) => state.cakes.cakes;
export const selectIsLoadingCakes = (state) => state.cakes.isLoading;
export const selectIsErrorCakes = (state) => state.cakes.isError;
export const selectTotalPages = (state) => state.cakes.totalPages;
export const selectIngredients = (state) => state.cakes.ingredients;
