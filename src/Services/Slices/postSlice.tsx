import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import services from "../services";

interface PostState {
  data: any[];
  loading: boolean;
  error: boolean;
}

const initialState: PostState = {
  data: [],
  loading: false,
  error: false,
};

const postSlice = createSlice({
  name: "post",
  initialState,
  reducers: {
    getPost: (state) => {
      state.loading = true;
      state.error = false;
      state.data = [];
    },
    getPostSuccess: (state, action: PayloadAction<any>) => {
      state.loading = false;
      state.error = false;
      state.data = action.payload;
    },
    getPostFailure: (state) => {
      state.loading = false;
      state.error = true;
      state.data = [];
    },
  },
});

export const { getPost, getPostSuccess, getPostFailure } = postSlice.actions;

export const fetchPost = (formData: FormData) => async (dispatch: any) => {
  dispatch(getPost());
  try {
    await services.doPost(formData);
    dispatch(getPostSuccess({ response: "Agendamento efetuado com sucesso" }));
    window.location.reload();
  } catch (err) {
    console.log("err: ", err);
    dispatch(getPostFailure());
  }
};

export default postSlice.reducer;
