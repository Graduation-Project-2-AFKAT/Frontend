import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { AxiosError } from "axios";
import api from "../../config/axios.config";
import { IJam } from "../../interfaces/index";
import { showAlert } from "./Alerts";
import { startLoading, stopLoading } from "./loading";

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

export const createJams = createAsyncThunk(
  "gameJams/create",
  async (jamData: FormData, { dispatch, rejectWithValue }) => {
    try {
      dispatch(startLoading("gameJams/create"));

      await api.post(`/games/jams/`, jamData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      // console.log(res.data);

      dispatch(
        showAlert({
          msg: "Game jam created successfully! Players can now see and participate in your jam.",
          type: "success",
        }),
      );

      setTimeout(() => {
        window.location.href = "/jams";
      }, 500);

      // return res.data;
    } catch (err: unknown) {
      const error = err as AxiosError;
      dispatch(showAlert({ msg: error.response?.data, type: "error" }));
      return rejectWithValue(error.response?.data); //TODO: errors should be in Error redux module
    } finally {
      dispatch(stopLoading());
    }
  },
);

export const participateInJam = createAsyncThunk(
  "gameJams/participate",
  async (
    data: { action: string; jamId: number | undefined },
    { dispatch, rejectWithValue },
  ) => {
    try {
      dispatch(startLoading("gameJams/load"));

      await api.post(`/games/jams/${data.jamId}/participate/`, {
        action: data.action,
      });

      // console.log(res.data);

      // return res.data;
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
