import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { AxiosError } from "axios";
import api from "../../config/axios.config.ts";
import { IAchievement } from "../../interfaces";
import { showAlert } from "./alerts.ts";
import { startLoading, stopLoading } from "./loading.ts";

const url = "https://afkat-a734fcb61a41.herokuapp.com/api/v1/games/afk-service";

export const loadPlayerAchievements = createAsyncThunk(
  "achievements/player-view",
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
    // builder.addCase(unfollowUser.fulfilled, (state, action) => {
    //   if (action.payload === 200 && state.author) {
    //     state.author.is_following = false;
    //     state.author.followers_count--;
    //   }
    // });
    // builder.addMatcher(
    //   isAnyOf(loadMyUser.fulfilled, updateUserProfile.fulfilled),
    //   (state, action) => {
    //     state.isAuth = true;
    //     state.user = action.payload;
    //   },
    // );
    // builder.addMatcher(
    //   isAnyOf(loginUser.fulfilled, registerUser.fulfilled),
    //   (state, action) => {
    //     const token = {
    //       access: action.payload.access,
    //       refresh: action.payload.refresh,
    //     };
    //     setAuthToken(token);
    //     state.token = token;
    //     state.user = action.payload.user;
    //     state.isAuth = true;
    //   },
    // );
    // builder.addMatcher(
    //   isAnyOf(
    //     loginUser.rejected,
    //     registerUser.rejected,
    //     loadMyUser.rejected,
    //     updateUserProfile.rejected,
    //   ),
    //   (state) => {
    //     resetAuthState(state);
    //   },
    // );
  },
});

export default achievementSlice.reducer;
