import { createSlice } from "@reduxjs/toolkit";
import services from "../services";

interface getFilesState {
  data: any[];
  loading: boolean;
  error: boolean;
}

const initialState: getFilesState = {
  data: [],
  loading: false,
  error: false,
};

const getFilesSlice = createSlice({
  name: "getFiles",
  initialState,
  reducers: {
    getFiles: (state) => {
      state.loading = true;
      state.error = false;
      state.data = [];
    },
    getFilesSuccess: (state, actions) => {
      state.loading = false;
      state.error = false;
      state.data = actions.payload;
    },
    getFilesFailure: (state) => {
      state.loading = false;
      state.error = true;
      state.data = [];
    },
  },
});

export const { getFiles, getFilesSuccess, getFilesFailure } =
  getFilesSlice.actions;

export default getFilesSlice.reducer;

export const fetchGetFiles =
  (page: string) =>
  async (
    dispatch: (arg0: {
      payload: any;
      type:
        | "getFiles/getFiles"
        | "getFiles/getFilesSuccess"
        | "getFiles/getFilesFailure";
    }) => void
  ) => {
    dispatch(getFiles());
    try {
      const response = await services.getFiles(page);
      dispatch(getFilesSuccess(response.data));
    } catch (err) {
      console.log("err: ", err);
      dispatch(getFilesFailure());
    }
  };
