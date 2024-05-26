// tasksSlice.js
import { createSlice, isAnyOf } from "@reduxjs/toolkit";
import {
  addTaskThunk,
  deleteTaskThunk,
  editTaskThunk,
  fetchTasksThunk,
  fetchAllTasksThunk,
  deleteTaskAdminThunk,
  editTaskAdminThunk,
  createTaskAdminThunk,
} from "./tasksOperations";
import { logoutThunk } from "./authOperations";
import toast from "react-hot-toast";
import { createSelector } from "@reduxjs/toolkit";
import { selectNameFilter, selectNumberFilter } from "./filtersSlice";

const initialState = {
  items: [],
  isLoading: false,
  isError: false,
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
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchTasksThunk.fulfilled, (state, { payload }) => {
        state.items = payload;
        state.isLoading = false;
      })
      .addCase(fetchAllTasksThunk.fulfilled, (state, { payload }) => {
        state.items = payload;
        state.isLoading = false;
      })
      .addCase(deleteTaskThunk.fulfilled, (state, { payload }) => {
        state.items = state.items.filter((item) => item._id !== payload);
        state.isLoading = false;
        toast.error(`Task was deleted`);
      })
      .addCase(deleteTaskAdminThunk.fulfilled, (state, { payload }) => {
        state.items = state.items.filter((item) => item._id !== payload);
        state.isLoading = false;
        toast.error(`Task was deleted`);
      })
      .addCase(addTaskThunk.fulfilled, (state, { payload }) => {
        state.items.push(payload);
        state.isLoading = false;
        toast.success(`Task ${payload.taskName} was added`);
      })
      .addCase(createTaskAdminThunk.fulfilled, (state, { payload }) => {
        state.items.push(payload);
        state.isLoading = false;
        toast.success(`Task ${payload.taskName} was added by admin`);
      })
      .addCase(editTaskThunk.fulfilled, (state, { payload }) => {
        const item = state.items.find((item) => item._id === payload._id);
        if (item) {
          item.courseName = payload.courseName;
          item.taskName = payload.taskName;
          item.taskDescription = payload.taskDescription;
          item.deadlineDate = payload.deadlineDate;
          item.mark = payload.mark;
          item.state = payload.state;
        }
      })
      .addCase(editTaskAdminThunk.fulfilled, (state, { payload }) => {
        const item = state.items.find((item) => item._id === payload._id);
        if (item) {
          item.courseName = payload.courseName;
          item.taskName = payload.taskName;
          item.taskDescription = payload.taskDescription;
          item.deadlineDate = payload.deadlineDate;
          item.mark = payload.mark;
          item.state = payload.state;
        }
      })
      .addCase(logoutThunk.fulfilled, () => {
        return initialState;
      })
      .addMatcher(
        isAnyOf(
          fetchTasksThunk.pending,
          deleteTaskThunk.pending,
          addTaskThunk.pending,
          fetchAllTasksThunk.pending,
          deleteTaskAdminThunk.pending,
          editTaskAdminThunk.pending,
          createTaskAdminThunk.pending,
        ),
        (state) => {
          state.isLoading = true;
          state.isError = false;
        },
      )
      .addMatcher(
        isAnyOf(
          fetchTasksThunk.rejected,
          deleteTaskThunk.rejected,
          addTaskThunk.rejected,
          fetchAllTasksThunk.rejected,
          deleteTaskAdminThunk.rejected,
          editTaskAdminThunk.rejected,
          createTaskAdminThunk.rejected,
        ),
        (state, { payload }) => {
          state.isError = payload;
          state.isLoading = false;
        },
      );
  },
});

export const { addTask, updateTask, deleteTask } = tasksSlice.actions;

export const tasksReducer = tasksSlice.reducer;
export const selectTasks = (state) => state.tasks.items;
export const selectIsLoading = (state) => state.tasks.isLoading;
export const selectIsError = (state) => state.tasks.isError;

export const selectFilteredTasks = createSelector(
  [selectTasks, selectNameFilter, selectNumberFilter],
  (items, filter, number) => {
    const filteredItems = items.filter(
      (item) =>
        item.taskName.toLowerCase().includes(filter.toLowerCase()) ||
        item.taskDescription.toLowerCase().includes(number.toLowerCase()),
    );
    return filteredItems;
  },
);
