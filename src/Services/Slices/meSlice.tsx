import { createSlice } from "@reduxjs/toolkit";
import services from "../services";

interface MeState {
  data: any[];
  loading: boolean;
  error: boolean;
}

interface Body {
  username: string;
  password: string;
}

const initialState: MeState = {
  data: [],
  loading: false,
  error: false,
};

const meSlice = createSlice({
  name: "me",
  initialState,
  reducers: {
    getMe: (state) => {
      state.loading = true;
      state.error = false;
      state.data = [];
    },
    getMeSuccess: (state, actions) => {
      state.loading = false;
      state.error = false;
      state.data = actions.payload;
    },
    getMeFailure: (state) => {
      state.loading = false;
      state.error = true;
      state.data = [];
    },
  },
});

export const { getMe, getMeSuccess, getMeFailure } = meSlice.actions;

export default meSlice.reducer;

export const fetchMe =
  (body: Body) =>
  async (
    dispatch: (arg0: {
      payload: any;
      type: "me/getMe" | "me/getMeSuccess" | "me/getMeFailure";
    }) => void
  ) => {
    dispatch(getMe());
    try {
      const response = await services.getMe(body);
      dispatch(getMeSuccess(response.data));
    } catch (err) {
      console.log("err: ", err);
      dispatch(getMeFailure());
    }
  };
