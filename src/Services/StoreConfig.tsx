import { combineReducers, configureStore } from "@reduxjs/toolkit";
import meSlice from "./Slices/meSlice";
import allPostsSlice from "./Slices/allPostsSlice";
import publicSlice from "./Slices/publicSlice";
import postSlice from "./Slices/postSlice";
import getFilesSlice from "./Slices/getFilesSlice";
import deleteFileSlice from "./Slices/deleteFileSlice";
import resetPassword from "./Slices/resetPassword";

const reducer = combineReducers({
  meSlice,
  allPostsSlice,
  publicSlice,
  postSlice,
  getFilesSlice,
  deleteFileSlice,
  resetPassword,
});

export const store = configureStore({ reducer });
