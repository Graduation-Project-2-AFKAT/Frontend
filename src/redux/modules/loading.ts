import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isLoading: false,
  type: "",
};

export const loadingSlice = createSlice({
  name: "loading",
  initialState,
  reducers: {
    startLoading: (state, action) => {
      state.isLoading = true;
      state.type = action.payload;
    },
    stopLoading: (state) => {
      state.isLoading = false;
    },
  },
});

export const { startLoading, stopLoading } = loadingSlice.actions;

export default loadingSlice.reducer;
