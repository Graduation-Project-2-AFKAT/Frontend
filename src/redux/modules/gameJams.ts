import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { showAlert } from "./alerts";
import { AxiosError } from "axios";
import api from "../../config/axios.config.ts";

export const loadJams = createAsyncThunk(
  "gameJams/load",
  async (_, { dispatch, rejectWithValue }) => {
    try {
      const res = await api.get("/game/game-jams");

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

export const gameJamsSlice = createSlice({
  name: "gameJams",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(loadJams.fulfilled, (state, action) => {
      console.log("Action:", action);

      state.isLoading = false;
      //   state.Games = action.payload;
    });

    builder.addCase(loadJams.rejected, (state) => {
      state.Assets = [];
      state.isLoading = false;
    });

    builder.addMatcher(
      (action) =>
        action.type.endsWith("/pending") && action.type.endsWith("gameJams"),
      (state) => {
        state.isLoading = true;
      },
    );
  },
});

// export const { showAlert } = gameJamsSlice.actions;

export default gameJamsSlice.reducer;
