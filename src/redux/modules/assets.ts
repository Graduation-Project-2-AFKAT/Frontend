import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { showAlert } from "./alerts";
import { AxiosError } from "axios";
import api from "../../utils/api.ts";

export const loadAssets = createAsyncThunk(
  "assets/load",
  async (_, { dispatch, rejectWithValue }) => {
    try {
      const res = await api.get("/asset/assets");

      console.log(res.data);

      return res.data;
    } catch (err: unknown) {
      const error = err as AxiosError;
      dispatch(showAlert({ msg: error.response?.data, type: "error" }));
      return rejectWithValue(error.response?.data); //TODO: errors should be in Error redux module
    }
  },
);

const initialState = {
  Assets: [],
  isLoading: false,
};

export const assetsSlice = createSlice({
  name: "assets",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(loadAssets.fulfilled, (state, action) => {
      console.log("Action:", action);

      //   state.Games = action.payload;
      state.isLoading = false;
    });

    builder.addCase(loadAssets.rejected, (state) => {
      state.Assets = [];
      state.isLoading = false;
    });

    builder.addMatcher(
      (action) => action.type.endsWith("/pending"),
      (state) => {
        state.isLoading = true;
      },
    );
  },
});

// export const { showAlert } = assetsSlice.actions;

export default assetsSlice.reducer;
