import { combineReducers, configureStore } from "@reduxjs/toolkit";
import meSlice from "./Slices/meSlice";
import allPostsSlice from "./Slices/allPostsSlice";
import publicSlice from "./Slices/publicSlice";
import postSlice from "./Slices/postSlice";
import getFilesSlice from "./Slices/getFilesSlice";
import deleteFileSlice from "./Slices/deleteFileSlice";
import deletePublishedFileSlice from "./Slices/deletePublishedFileSlice";
import resetPassword from "./Slices/resetPassword";
import a11ySlice from "./Slices/a11ySlice";

const reducer = combineReducers({
  a11ySlice,
  meSlice,
  allPostsSlice,
  publicSlice,
  postSlice,
  getFilesSlice,
  deleteFileSlice,
  deletePublishedFileSlice,
  resetPassword,
});

export const store = configureStore({ reducer });
