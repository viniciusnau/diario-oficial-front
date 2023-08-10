import { createSlice } from "@reduxjs/toolkit";
import services from "../services";

interface PublicState {
  data: any[];
  loading: boolean;
  error: boolean;
}

const initialState: PublicState = {
  data: [],
  loading: false,
  error: false,
};

const publicSlice = createSlice({
  name: "public",
  initialState,
  reducers: {
    getPublic: (state) => {
      state.loading = true;
      state.error = false;
      state.data = [];
    },
    getPublicSuccess: (state, actions) => {
      state.loading = false;
      state.error = false;
      state.data = actions.payload;
    },
    getPublicFailure: (state) => {
      state.loading = false;
      state.error = true;
      state.data = [];
    },
  },
});

export const { getPublic, getPublicSuccess, getPublicFailure } =
  publicSlice.actions;

export default publicSlice.reducer;

export const fetchPublic =
  (body: any, page?: string) =>
  async (
    dispatch: (arg0: {
      payload: any;
      type:
        | "public/getPublic"
        | "public/getPublicSuccess"
        | "public/getPublicFailure";
    }) => void
  ) => {
    dispatch(getPublic());
    try {
      const response = await services.getPublic(body, page);
      dispatch(getPublicSuccess(response.data));
    } catch (err) {
      console.log("err: ", err);
      dispatch(getPublicFailure());
    }
  };
