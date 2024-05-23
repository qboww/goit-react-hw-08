import { createSlice } from "@reduxjs/toolkit";
import { selectNameFilter, selectNumberFilter } from "./selectors";

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
export { selectNameFilter, selectNumberFilter };
