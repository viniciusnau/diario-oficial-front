import { createSlice } from "@reduxjs/toolkit";
import services from "../services";

interface deletePublishedFileState {
  data: any[];
  loading: boolean;
  error: boolean;
}

const initialState: deletePublishedFileState = {
  data: [],
  loading: false,
  error: false,
};

const deletePublishedFileSlice = createSlice({
  name: "deletePublishedFile",
  initialState,
  reducers: {
    deletePublishedFile: (state) => {
      state.loading = true;
      state.error = false;
      state.data = [];
    },
    deletePublishedFileSuccess: (state, actions) => {
      state.loading = false;
      state.error = false;
      state.data = actions.payload;
    },
    deletePublishedFileFailure: (state) => {
      state.loading = false;
      state.error = true;
      state.data = [];
    },
  },
});

export const {
  deletePublishedFile,
  deletePublishedFileSuccess,
  deletePublishedFileFailure,
} = deletePublishedFileSlice.actions;

export default deletePublishedFileSlice.reducer;

export const fetchDeletePublishedFile =
  (file: any) =>
  async (
    dispatch: (arg0: {
      payload: any;
      type:
        | "deletePublishedFile/deletePublishedFile"
        | "deletePublishedFile/deletePublishedFileSuccess"
        | "deletePublishedFile/deletePublishedFileFailure";
    }) => void
  ) => {
    dispatch(deletePublishedFile());
    try {
      await services.deletePublishedFile(file);
      dispatch(
        deletePublishedFileSuccess({ response: "Arquivo deletado com sucesso" })
      );
    } catch (err) {
      console.log("err: ", err);
      dispatch(deletePublishedFileFailure());
    }
  };
