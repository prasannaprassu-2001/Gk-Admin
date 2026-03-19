import { configureStore } from "@reduxjs/toolkit";
import rootReducer from "./rootReducer";

const preloadedState = {
  auth: {
    token: localStorage.getItem("access") || null,
    user: JSON.parse(localStorage.getItem("userData")) || null,
    loading: false,
    error: null,
  },
};

export const store = configureStore({
  reducer: rootReducer,
  preloadedState,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});