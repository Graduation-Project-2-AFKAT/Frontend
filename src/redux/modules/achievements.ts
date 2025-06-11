import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { AxiosError } from "axios";
import api from "../../config/axios.config";
import { IAchievement } from "../../interfaces";
import { showAlert } from "./Alerts";
import { startLoading, stopLoading } from "./loading";

const url = "https://afkat-a734fcb61a41.herokuapp.com/api/v1/games/afk-service";

export const loadPlayerAchievements = createAsyncThunk(
  "achievements/player-view",
  async (
    // TODO: use userId: number
    _,
    { dispatch, rejectWithValue },
  ) => {
    try {
      dispatch(startLoading("achievements/load-player"));

      const res = await api.get(
        `${url}/afk_services/afk_player_achievements/game/9/player/1`,
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

export const loadAchievement = createAsyncThunk(
  "achievements/view",
  async (userId: number, { dispatch, rejectWithValue }) => {
    try {
      dispatch(startLoading("achievements/load"));

      const res = await api.get(
        `${url}/afk_services/afk_player_achievements/player/${userId}`,
      );

      console.log(res);

      //   return res.data;
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
  Achievements: [] as IAchievement[],
  Achievement: null as IAchievement | null,
};

export const achievementSlice = createSlice({
  name: "achievements",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(loadPlayerAchievements.fulfilled, (state, action) => {
      state.Achievements = action.payload.entries;
    });
    builder.addCase(loadPlayerAchievements.rejected, (state) => {
      state.Achievements = [];
    });
  },
});

export default achievementSlice.reducer;
