import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { showAlert } from "./alerts";
import { AxiosError } from "axios";
import api from "../../config/axios.config.ts";
import { startLoading, stopLoading } from "./loading";
import { IGame } from "../../interfaces";

export const loadGames = createAsyncThunk(
  "games/loadAll",
  async (_, { dispatch, rejectWithValue }) => {
    try {
      dispatch(startLoading("load-games"));

      const res = await api.get("/games");

      return res.data;
    } catch (err: unknown) {
      const error = err as AxiosError;
      dispatch(showAlert({ msg: error.response?.data, type: "error" }));
      return rejectWithValue(error.response?.data || "Failed to load games");
    } finally {
      dispatch(stopLoading());
    }
  },
);

export const loadGame = createAsyncThunk(
  "games/view",
  async (id: string, { dispatch, rejectWithValue }) => {
    try {
      dispatch(startLoading("load-game"));

      const res = await api.get(`/games/${id}`);

      return res.data;
    } catch (err: unknown) {
      const error = err as AxiosError;
      dispatch(showAlert({ msg: error.response?.data, type: "error" }));
      return rejectWithValue(error.response?.data || "Failed to load game");
    } finally {
      dispatch(stopLoading());
    }
  },
);

export const downloadAGame = createAsyncThunk(
  "games/download",
  async (
    {
      id,
      gameTitle,
      gameFile,
    }: { id: number; gameTitle: string; gameFile: string },
    { dispatch, rejectWithValue },
  ) => {
    console.log("downloading game...");
    dispatch(startLoading("games/download"));

    // Add progress state to your slice
    dispatch(setDownloadProgress({ downloadProgress: 0, estimatedTime: null }));

    try {
      const res = await api.get(`/games/${id}/download`, {
        responseType: "blob",
        onDownloadProgress: (progressEvent) => {
          const progress =
            progressEvent.progress ??
            (progressEvent.loaded && progressEvent.total
              ? progressEvent.loaded / progressEvent.total
              : 0);

          const roundedProgress = Math.round(progress * 100);

          const estimatedTime = progressEvent.estimated
            ? Math.round(progressEvent.estimated * 10)
            : null;

          dispatch(
            setDownloadProgress({
              downloadProgress: roundedProgress,
              estimatedTime,
            }),
          );
        },
      });

      console.log("Downloading game file...");

      // Get filename by using default game title
      const fileName = gameTitle.replace(" ", "-");

      const gameFilePathParts = gameFile.split(".");
      const gameExtension = gameFilePathParts[gameFilePathParts.length - 1];

      const filename = `${fileName}.${gameExtension}`;

      // Create a blob from the binary data
      const blob = new Blob([res.data]);

      // Create a download link and trigger download
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", filename);
      document.body.appendChild(link);
      link.click();

      // Clean up
      link.parentNode?.removeChild(link);
      window.URL.revokeObjectURL(url);

      dispatch(
        showAlert({ msg: "Download completed successfully", type: "success" }),
      );

      // Reset progress after complete
      dispatch(
        setDownloadProgress({ downloadProgress: 0, estimatedTime: null }),
      );

      return { id, filename };
    } catch (err: unknown) {
      const error = err as AxiosError;
      dispatch(showAlert({ msg: error.response?.data, type: "error" }));
      // Reset progress on error
      dispatch(
        setDownloadProgress({ downloadProgress: 0, estimatedTime: null }),
      );
      return rejectWithValue(error.response?.data || "Failed to download game");
    } finally {
      dispatch(stopLoading());
    }
  },
);

const initialState = {
  Games: [] as IGame[],
  Game: null as IGame | null,
  downloadProgress: 0,
  estimatedTime: null as number | null,
};

export const gamesSlice = createSlice({
  name: "games",
  initialState,
  reducers: {
    setDownloadProgress: (state, action) => {
      state.downloadProgress = action.payload.downloadProgress;
      state.estimatedTime = action.payload.estimatedTime;
    },
    resetGame: (state) => {
      state.Game = null;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(loadGames.fulfilled, (state, action) => {
      state.Games = action.payload.results;
    });

    builder.addCase(loadGames.rejected, (state) => {
      state.Games = [];
    });

    builder.addCase(loadGame.fulfilled, (state, action) => {
      state.Game = action.payload;
    });

    builder.addCase(loadGame.rejected, (state) => {
      state.Game = null;
    });
  },
});

export const { setDownloadProgress, resetGame } = gamesSlice.actions;

export default gamesSlice.reducer;
