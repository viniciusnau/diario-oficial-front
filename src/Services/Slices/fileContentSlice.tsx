import { createSlice } from "@reduxjs/toolkit";
import services from "../services";

interface FileContentState {
  data: string;
  loading: boolean;
  error: boolean | any[];
}

const initialState: FileContentState = {
  data: "",
  loading: false,
  error: false,
};

const fileContentSlice = createSlice({
  name: "fileContentSlice",
  initialState,
  reducers: {
    getFileContent: (state) => {
      state.loading = true;
      state.error = false;
      state.data = "";
    },
    getFileContentSuccess: (state, actions) => {
      state.loading = false;
      state.error = false;
      state.data = actions.payload;
    },
    getFileContentFailure: (state, actions) => {
      state.loading = false;
      state.error = actions.payload ? actions.payload : true;
      state.data = "";
    },
  },
});

export const {
  getFileContent,
  getFileContentSuccess,
  getFileContentFailure,
} = fileContentSlice.actions;

export default fileContentSlice.reducer;

export const fetchFileContent =
  (fileKey: string|undefined) =>
  async (
    dispatch: (arg0: {
      payload: any;   
      type:
        | "fileContentSlice/getFileContent"
        | "fileContentSlice/getFileContentSuccess"
        | "fileContentSlice/getFileContentFailure";
    }) => void
  ) => {
    dispatch(getFileContent());
    try {
      const response = await services.getFileContentBase64(fileKey);
      dispatch(getFileContentSuccess(response));
    } catch (err) {
      console.log("err: ", err);
      dispatch(getFileContentFailure({ status: 503 }));
    }
  };
