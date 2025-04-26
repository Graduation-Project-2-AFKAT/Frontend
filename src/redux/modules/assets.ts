import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { showAlert } from "./alerts";
import { AxiosError } from "axios";
import api from "../../config/axios.config.ts";
import { startLoading, stopLoading } from "./loading";

export const loadAssets = createAsyncThunk(
  "assets/load",
  async (_, { dispatch, rejectWithValue }) => {
    try {
      dispatch(startLoading("assets"));

      const res = await api.get("/art/art");

      // console.log(res.data);

      return res.data;
    } catch (err: unknown) {
      const error = err as AxiosError;
      dispatch(showAlert({ msg: error.response?.data, type: "error" }));
      return rejectWithValue(error.response?.data); //TODO: errors should be in Error redux module
    } finally {
      dispatch(stopLoading());
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
      console.log("Action:", action.payload);

      state.Assets = action.payload.results;
      state.isLoading = false;
    });

    builder.addCase(loadAssets.rejected, (state) => {
      state.Assets = [];
      state.isLoading = false;
    });
  },
});

// export const { showAlert } = assetsSlice.actions;

export default assetsSlice.reducer;
