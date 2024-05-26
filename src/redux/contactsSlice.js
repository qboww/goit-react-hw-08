import { createSlice, createSelector } from "@reduxjs/toolkit";
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
import { selectNameFilter, selectNumberFilter } from "./filtersSlice";

const initialState = {
  items: [],
  isLoading: false,
  isError: false,
};

const contactsSlice = createSlice({
  name: "contacts",
  initialState,
  reducers: {
    addContact: (state, action) => {
      state.items.push(action.payload);
    },
    updateContact: (state, action) => {
      const index = state.items.findIndex(
        (contact) => contact._id === action.payload._id,
      );
      if (index !== -1) {
        state.items[index] = action.payload;
      }
    },
    deleteContact: (state, action) => {
      state.items = state.items.filter(
        (contact) => contact._id !== action.payload.id,
      );
    },
  },
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
      .addCase(fetchContactsThunk.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
      })
      .addCase(deleteContactsThunk.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
      })
      .addCase(addContactsThunk.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
      })
      .addCase(fetchAllContactsThunk.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
      })
      .addCase(deleteContactAdminThunk.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
      })
      .addCase(editContactAdminThunk.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
      })
      .addCase(fetchContactsThunk.rejected, (state, { payload }) => {
        state.isError = payload;
        state.isLoading = false;
      })
      .addCase(deleteContactsThunk.rejected, (state, { payload }) => {
        state.isError = payload;
        state.isLoading = false;
      })
      .addCase(addContactsThunk.rejected, (state, { payload }) => {
        state.isError = payload;
        state.isLoading = false;
      })
      .addCase(fetchAllContactsThunk.rejected, (state, { payload }) => {
        state.isError = payload;
        state.isLoading = false;
      })
      .addCase(deleteContactAdminThunk.rejected, (state, { payload }) => {
        state.isError = payload;
        state.isLoading = false;
      })
      .addCase(editContactAdminThunk.rejected, (state, { payload }) => {
        state.isError = payload;
        state.isLoading = false;
      });
  },
});

export const { addContact, updateContact, deleteContact } =
  contactsSlice.actions;

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
