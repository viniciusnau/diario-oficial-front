import { createSlice } from "@reduxjs/toolkit";
import services from "../services";

interface deleteFileState {
  data: any[];
  loading: boolean;
  error: boolean;
}

const initialState: deleteFileState = {
  data: [],
  loading: false,
  error: false,
};

const deleteFileSlice = createSlice({
  name: "deleteFile",
  initialState,
  reducers: {
    deleteFile: (state) => {
      state.loading = true;
      state.error = false;
      state.data = [];
    },
    deleteFileSuccess: (state, actions) => {
      state.loading = false;
      state.error = false;
      state.data = actions.payload;
    },
    deleteFileFailure: (state) => {
      state.loading = false;
      state.error = true;
      state.data = [];
    },
  },
});

export const { deleteFile, deleteFileSuccess, deleteFileFailure } =
  deleteFileSlice.actions;

export default deleteFileSlice.reducer;

export const fetchDeleteFile =
  (file: any) =>
  async (
    dispatch: (arg0: {
      payload: any;
      type:
        | "deleteFile/deleteFile"
        | "deleteFile/deleteFileSuccess"
        | "deleteFile/deleteFileFailure";
    }) => void
  ) => {
    dispatch(deleteFile());
    try {
      const response = await services.deleteFile(file);
      dispatch(deleteFileSuccess({ response: "Arquivo deletado com sucesso" }));
    } catch (err) {
      console.log("err: ", err);
      dispatch(deleteFileFailure());
    }
  };
