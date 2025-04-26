import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  show: false,
  msgs: {},
  type: "info",
};

export const alertSlice = createSlice({
  name: "alert",
  initialState,
  reducers: {
    showAlert: (state, action) => {
      state.show = true;
      state.msgs = action.payload.msg;
      state.type = action.payload.type;
    },

    resetAlertMsg: (state) => {
      state.show = false;
      state.msgs = {};
    },
  },
});

export const { showAlert, resetAlertMsg } = alertSlice.actions;
export default alertSlice.reducer;
