import { createSlice, isAnyOf } from "@reduxjs/toolkit";
import {
  addContactsThunk,
  deleteContactsThunk,
  editContactsThunk,
  fetchContactsThunk,
  fetchAllContactsThunk,
  deleteContactAdminThunk,
  editContactAdminThunk,
} from "./contactsOperations";
import { logoutThunk } from "./authOperations";
import toast from "react-hot-toast";

import { createSelector } from "@reduxjs/toolkit";
import { selectNameFilter, selectNumberFilter } from "./filtersSlice";

const initialState = {
  items: [],
  isLoading: false,
  isError: false,
};

const contactsSlice = createSlice({
  name: "contacts",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchContactsThunk.fulfilled, (state, { payload }) => {
        state.items = payload;
        state.isLoading = false;
      })
      .addCase(fetchAllContactsThunk.fulfilled, (state, { payload }) => {
        state.items = payload;
        state.isLoading = false;
      })
      .addCase(deleteContactsThunk.fulfilled, (state, { payload }) => {
        state.items = state.items.filter((item) => item._id !== payload);
        state.isLoading = false;
        toast.error(`Contact was deleted`);
      })
      .addCase(deleteContactAdminThunk.fulfilled, (state, { payload }) => {
        state.items = state.items.filter((item) => item._id !== payload);
        state.isLoading = false;
        toast.error(`Contact was deleted`);
      })
      .addCase(addContactsThunk.fulfilled, (state, { payload }) => {
        state.items.push(payload);
        state.isLoading = false;
        toast.success(`${payload.name} Contact was added`);
      })
      .addCase(editContactsThunk.fulfilled, (state, { payload }) => {
        const item = state.items.find((item) => item._id === payload._id);
        if (item) {
          item.name = payload.name;
          item.number = payload.number;
        }
      })
      .addCase(editContactAdminThunk.fulfilled, (state, { payload }) => {
        const item = state.items.find((item) => item._id === payload._id);
        if (item) {
          item.name = payload.name;
          item.number = payload.number;
        }
      })
      .addCase(logoutThunk.fulfilled, () => {
        return initialState;
      })
      .addMatcher(
        isAnyOf(
          fetchContactsThunk.pending,
          deleteContactsThunk.pending,
          addContactsThunk.pending,
          fetchAllContactsThunk.pending,
          deleteContactAdminThunk.pending,
          editContactAdminThunk.pending,
        ),
        (state) => {
          state.isLoading = true;
          state.isError = false;
        },
      )
      .addMatcher(
        isAnyOf(
          fetchContactsThunk.rejected,
          deleteContactsThunk.rejected,
          addContactsThunk.rejected,
          fetchAllContactsThunk.rejected,
          deleteContactAdminThunk.rejected,
          editContactAdminThunk.rejected,
        ),
        (state, { payload }) => {
          state.isError = payload;
          state.isLoading = false;
        },
      );
  },
});

export const contactsReducer = contactsSlice.reducer;
export const selectContacts = (state) => state.contacts.items;
export const selectIsLoading = (state) => state.contacts.isLoading;
export const selectIsError = (state) => state.contacts.isError;

export const selectFilteredContacts = createSelector(
  [selectContacts, selectNameFilter, selectNumberFilter],
  (items, filter, number) => {
    const filteredItems = items.filter(
      (item) =>
        item.name.toLowerCase().includes(filter.toLowerCase()) ||
        item.number.includes(number),
    );
    return filteredItems;
  },
);
