import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { AxiosError } from "axios";
import api from "../../config/axios.config";
import { ILeaderboard } from "../../interfaces";
import { showAlert } from "./Alerts";
import { startLoading, stopLoading } from "./loading";

const url = "https://afkat-a734fcb61a41.herokuapp.com/api/v1/games/afk-service";

export const loadPlayerAchievements = createAsyncThunk(
  "leaderboards/player-view",
  async (userId: number, { dispatch, rejectWithValue }) => {
    try {
      dispatch(startLoading("achievements/load-player"));

      const res = await api.get(
        `${url}/afk_services/afk_player_achievements/player/${userId}`,
      );

      //   console.log(res);

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

export const loadLeaderboards = createAsyncThunk(
  "leaderboards/load",
  async (_, { dispatch, rejectWithValue }) => {
    try {
      dispatch(startLoading("achievements/load"));

      const res = await api.get(`${url}/afk_services/afk_leaderboard/`);

      //   console.log(res);

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
  },
});

export default leaderboardSlice.reducer;
