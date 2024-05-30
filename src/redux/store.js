// store.js
import { configureStore } from "@reduxjs/toolkit";
import { cakesReducer } from "./cakesSlice";
import { authReducer } from "./authSlice";
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
import storage from "redux-persist/lib/storage";

const persistConfig = {
  key: "auth",
  version: 1,
  storage,
  whitelist: ["token"],
};

export const store = configureStore({
  reducer: {
    cakes: cakesReducer,
    auth: persistReducer(persistConfig, authReducer),
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export const persistor = persistStore(store);
