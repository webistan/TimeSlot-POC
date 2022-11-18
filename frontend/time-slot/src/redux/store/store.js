import { configureStore } from "@reduxjs/toolkit";
import slot from "../reducer/index";

export const createStore = () =>
  configureStore({
    reducer: {
      slotReducer: slot,
    },
  });
