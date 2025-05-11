import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { showAlert } from "./alerts";
import { AxiosError } from "axios";
import api from "../../config/axios.config.ts";
import { IJam } from "../../interfaces/index.tsx";
import { startLoading, stopLoading } from "./loading.ts";

export const loadJams = createAsyncThunk(
  "gameJams/load",
  async (
    status: "active" | "upcoming" | "past",
    { dispatch, rejectWithValue },
  ) => {
    try {
      dispatch(startLoading("gameJams/load"));

      const res = await api.get(`/games/jams?status=${status}`);

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
  Jams: [] as IJam[],
};

export const gameJamsSlice = createSlice({
  name: "gameJams",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(loadJams.fulfilled, (state, action) => {
      state.Jams = action.payload.results;
    });

    builder.addCase(loadJams.rejected, (state) => {
      state.Jams = [];
    });
  },
});

// export const { showAlert } = gameJamsSlice.actions;

export default gameJamsSlice.reducer;
