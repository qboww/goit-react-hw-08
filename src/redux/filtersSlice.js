import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  name: "",
  number: "",
  isLoading: false,
  isError: false,
};

const filtersSlice = createSlice({
  name: "filters",
  initialState,
  reducers: {
    changeFilter: (state, { payload }) => {
      state.name = payload;
      state.number = payload;
    },
  },
});

export const filtersReducer = filtersSlice.reducer;
export const { changeFilter } = filtersSlice.actions;

export const selectNameFilter = (state) => state.filters.name;
export const selectNumberFilter = (state) => state.filters.number;
