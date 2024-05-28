// tasksSlice.js
import { createSlice, isAnyOf } from "@reduxjs/toolkit";
import {
  addTaskThunk,
  deleteTaskThunk,
  editTaskThunk,
  fetchTasksThunk,
  fetchTasksWithPaginationThunk,
  searchTasksThunk,
} from "./tasksOperations";
import toast from "react-hot-toast";
import { createSelector } from "@reduxjs/toolkit";
import { selectNameFilter, selectNumberFilter } from "./filtersSlice";

const initialState = {
  items: [],
  totalPages: 1,
  limit: 10,
  isLoading: false,
  isError: false,
  matchedTask: null,
};

const tasksSlice = createSlice({
  name: "tasks",
  initialState,
  reducers: {
    addTask: (state, action) => {
      state.items.push(action.payload);
    },
    updateTask: (state, action) => {
      const index = state.items.findIndex(
        (task) => task._id === action.payload._id,
      );
      if (index !== -1) {
        state.items[index] = action.payload;
      }
    },
    deleteTask: (state, action) => {
      state.items = state.items.filter(
        (task) => task._id !== action.payload.id,
      );
    },
    setMatchedTask: (state, action) => {
      state.matchedTask = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(
        fetchTasksWithPaginationThunk.fulfilled,
        (state, { payload }) => {
          state.items = payload.tasks;
          state.totalPages = payload.totalPages;
          state.limit = payload.limit;
          state.isLoading = false;
        },
      )
      .addCase(searchTasksThunk.fulfilled, (state, { payload }) => {
        state.matchedTask = payload.length > 0 ? payload[0] : null;
        state.isLoading = false;
      })
      .addMatcher(
        isAnyOf(
          fetchTasksThunk.pending,
          fetchTasksWithPaginationThunk.pending,
          searchTasksThunk.pending,
        ),
        (state) => {
          state.isLoading = true;
          state.isError = false;
        },
      )
      .addMatcher(
        isAnyOf(
          fetchTasksThunk.rejected,
          fetchTasksWithPaginationThunk.rejected,
          searchTasksThunk.rejected,
        ),
        (state, { payload }) => {
          state.isError = payload;
          state.isLoading = false;
        },
      );
  },
});

export const { addTask, updateTask, deleteTask, setMatchedTask } =
  tasksSlice.actions;

export const tasksReducer = tasksSlice.reducer;
export const selectTasks = (state) => state.tasks.items;
export const selectIsLoading = (state) => state.tasks.isLoading;
export const selectIsError = (state) => state.tasks.isError;
export const selectMatchedTask = (state) => state.tasks.matchedTask;

export const selectFilteredTasks = createSelector(
  [selectTasks, selectNameFilter, selectNumberFilter],
  (items, filter, number) => {
    return items.filter(
      (item) =>
        item.taskName.toLowerCase().includes(filter.toLowerCase()) ||
        item.taskDescription.toLowerCase().includes(number.toLowerCase()),
    );
  },
);
