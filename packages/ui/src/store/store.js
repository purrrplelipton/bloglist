import { configureStore } from "@reduxjs/toolkit";
import common from "./reducers/common";
import global from "./reducers/global";
import home from "./reducers/home";
import user from "./reducers/user";

const store = configureStore({
  reducer: { home, global, user, common },
  devTools: process.env.NODE_ENV !== "production",
});

export default store;
