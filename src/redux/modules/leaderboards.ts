import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { AxiosError } from "axios";
import api from "../../config/axios.config";
import { ILeaderboard, ILeaderboardEntry } from "../../interfaces";
import { showAlert } from "./Alerts";
import { startLoading, stopLoading } from "./loading";

const url = "https://afkat-a734fcb61a41.herokuapp.com/api/v1/games/afk-service";

export const loadLeaderboards = createAsyncThunk(
  "leaderboards/load",
  async (_, { dispatch, rejectWithValue }) => {
    try {
      dispatch(startLoading("achievements/load"));

      const res = await api.get(`${url}/afk_services/afk_leaderboard`);

      console.log(res);

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

export const loadLeaderboardsEntries = createAsyncThunk(
  "leaderboards/load-entries",
  async (_, { dispatch, rejectWithValue }) => {
    try {
      dispatch(startLoading("leaderboards/load-entries"));

      const res = await api.get(
        `${url}/afk_services/afk_leaderboard_entries/9`,
      );

      // console.log(res);

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
  Leaderboards: [] as ILeaderboard[],
  Leaderboard: null as ILeaderboard | null,
  Entries: [] as ILeaderboardEntry[],
};

export const leaderboardSlice = createSlice({
  name: "leaderboards",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(loadLeaderboards.fulfilled, (state, action) => {
      state.Leaderboards = action.payload.entries;
    });
    builder.addCase(loadLeaderboards.rejected, (state) => {
      state.Leaderboards = [];
    });

    builder.addCase(loadLeaderboardsEntries.fulfilled, (state, action) => {
      state.Entries = action.payload.entries;
    });
    builder.addCase(loadLeaderboardsEntries.rejected, (state) => {
      state.Entries = [];
    });
  },
});

export default leaderboardSlice.reducer;
