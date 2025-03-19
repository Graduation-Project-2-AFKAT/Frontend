import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  show: false,
  msg: "",
  type: "info",
};

export const alertSlice = createSlice({
  name: "alert",
  initialState,
  reducers: {
    showAlert: (state, action) => {
      state.show = true;
      state.msg = action.payload.msg;
      state.type = action.payload.type;
    },
  },
});

export const { showAlert } = alertSlice.actions;
export default alertSlice.reducer;
