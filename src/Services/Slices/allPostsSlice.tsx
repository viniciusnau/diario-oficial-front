import { createSlice } from "@reduxjs/toolkit";
import services from "../services";

interface AllPostsState {
  data: any[];
  loading: boolean;
  error: boolean;
}

const initialState: AllPostsState = {
  data: [],
  loading: false,
  error: false,
};

const allPostsSlice = createSlice({
  name: "allPosts",
  initialState,
  reducers: {
    getAllPosts: (state) => {
      state.loading = true;
      state.error = false;
      state.data = [];
    },
    getAllPostsSuccess: (state, actions) => {
      state.loading = false;
      state.error = false;
      state.data = actions.payload;
    },
    getAllPostsFailure: (state) => {
      state.loading = false;
      state.error = true;
      state.data = [];
    },
  },
});

export const { getAllPosts, getAllPostsSuccess, getAllPostsFailure } =
  allPostsSlice.actions;

export default allPostsSlice.reducer;

export const fetchAllPosts =
  (page: string, auth: boolean) =>
  async (
    dispatch: (arg0: {
      payload: any;
      type:
        | "allPosts/getAllPosts"
        | "allPosts/getAllPostsSuccess"
        | "allPosts/getAllPostsFailure";
    }) => void
  ) => {
    dispatch(getAllPosts());
    try {
      const response = await services.getAllPosts(page, auth);
      dispatch(getAllPostsSuccess(response.data));
    } catch (err) {
      console.log("err: ", err);
      dispatch(getAllPostsFailure());
    }
  };
