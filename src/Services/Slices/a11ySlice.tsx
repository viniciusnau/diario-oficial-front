import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface A11yState {
  colorInverted: boolean;
}

const initialState: A11yState = {
  colorInverted: false,
};

const a11ySlice = createSlice({
  name: "a11y",
  initialState,
  reducers: {
    setColorInverted: (state, action: PayloadAction<boolean>) => {
      state.colorInverted = action.payload;
    },
    toggleColorInversion: (state) => {
      state.colorInverted = !state.colorInverted;
    },
  },
});

export const { setColorInverted, toggleColorInversion } = a11ySlice.actions;
export default a11ySlice.reducer;