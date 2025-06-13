import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { AxiosError } from "axios";
import api from "../../config/axios.config";
import { IComment, IGame } from "../../interfaces";
import { showAlert } from "./Alerts";
import { startLoading, stopLoading } from "./loading";

export const loadGames = createAsyncThunk(
  "games/loadAll",
  async (
    params: { tags?: string; search?: string },
    { dispatch, rejectWithValue },
  ) => {
    try {
      dispatch(startLoading("games/load"));

      const res = await api.get(
        `/games${params.tags ? `?tag=${params.tags}` : params.search ? `?search=${params.search}` : ""}`,
      );

      // console.log(res.data);

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

export const loadGameById = createAsyncThunk(
  "games/view",
  async (id: string, { dispatch, rejectWithValue }) => {
    try {
      dispatch(startLoading("games/view"));

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

export const downloadGame = createAsyncThunk(
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

      const fileName = gameTitle.replace(/ /g, "-");

      const gameFilePathParts = gameFile.split(".");
      const gameExtension = gameFilePathParts[gameFilePathParts.length - 1];
      console.log("Downloading game file...");

      const filename = `${fileName}.${gameExtension}`;

      const blob = new Blob([res.data], {
        type: res.headers["content-type"] || "application/octet-stream",
      });

      const url = window.URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", filename);
      document.body.appendChild(link);
      link.click();

      link.parentNode?.removeChild(link);
      window.URL.revokeObjectURL(url);

      dispatch(
        showAlert({ msg: "Download completed successfully", type: "success" }),
      );
    } catch (err: unknown) {
      const error = err as AxiosError;
      dispatch(showAlert({ msg: error.response?.data, type: "error" }));
      dispatch(
        setDownloadProgress({ downloadProgress: 0, estimatedTime: null }),
      );
      return rejectWithValue(error.response?.data || "Failed to download game");
    } finally {
      dispatch(stopLoading());
    }
  },
);

export const createGame = createAsyncThunk(
  "games/create",
  async (gameData: FormData, { dispatch, rejectWithValue }) => {
    try {
      dispatch(startLoading("games/create"));

      const res = await api.post(`/games/`, gameData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      console.log(res.data);

      dispatch(
        showAlert({
          msg: "Game uploaded successfully! Our team will review it shortly.",
          type: "success",
        }),
      );

      // return res.data;
    } catch (err: unknown) {
      const error = err as AxiosError;
      dispatch(
        showAlert({
          msg: error.response?.data || "Failed to create post",
          type: "error",
        }),
      );
      return rejectWithValue(error.response?.data);
    } finally {
      dispatch(stopLoading());
    }
  },
);

export const updateGame = createAsyncThunk(
  "games/update",
  async (gameData: FormData, { dispatch, rejectWithValue }) => {
    try {
      dispatch(startLoading("Games/update"));

      const res = await api.patch(`/games/${gameData.get("id")}/`, gameData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      console.log(res.data);
      dispatch(
        showAlert({
          msg: "Game updated successfully! Our team will review it shortly.",
          type: "success",
        }),
      );

      setTimeout(() => {
        window.location.href = "/games";
      }, 500);

      // return res.data;
    } catch (err: unknown) {
      const error = err as AxiosError;
      dispatch(
        showAlert({
          msg: error.response?.data || "Failed to create post",
          type: "error",
        }),
      );
      return rejectWithValue(error.response?.data);
    } finally {
      dispatch(stopLoading());
    }
  },
);

export const deleteGame = createAsyncThunk(
  "games/delete",
  async (id: number | undefined, { dispatch, rejectWithValue }) => {
    try {
      dispatch(startLoading("Games/delete"));

      const res = await api.delete(`/games/${id}/`);

      console.log(res.data);
      dispatch(
        showAlert({
          msg: "Game deleted successfully.",
          type: "success",
        }),
      );

      setTimeout(() => {
        window.location.href = "/games";
      }, 500);

      // return res.data;
    } catch (err: unknown) {
      const error = err as AxiosError;
      dispatch(
        showAlert({
          msg: error.response?.data || "Failed to create post",
          type: "error",
        }),
      );
      return rejectWithValue(error.response?.data);
    } finally {
      dispatch(stopLoading());
    }
  },
);

export const loadGameComments = createAsyncThunk(
  "games/comments",
  async (gameId: number, { dispatch, rejectWithValue }) => {
    try {
      dispatch(startLoading("games/comments"));

      const res = await api.get(`/games/${gameId}/comments`);

      // console.log(res);

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

export const commentGame = createAsyncThunk(
  "games/comment",
  async (
    data: { comment: string; gameId: number },
    { dispatch, rejectWithValue },
  ) => {
    try {
      dispatch(startLoading("games/comment"));

      const res = await api.post(`/games/${data.gameId}/comment/`, {
        content: data.comment,
      });

      // console.log("comment:", res.data);

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

export const gameRatings = createAsyncThunk(
  "games/ratings",
  async (_, { dispatch, rejectWithValue }) => {
    try {
      dispatch(startLoading("games/ratings"));

      const res = await api.get(`/games/ratings`);

      console.log("rate:", res);

      // return res.data;
    } catch (err: unknown) {
      const error = err as AxiosError;
      dispatch(showAlert({ msg: error.response?.data, type: "error" }));
      return rejectWithValue(error.response?.data || "Failed to load game");
    } finally {
      dispatch(stopLoading());
    }
  },
);

export const rateGame = createAsyncThunk(
  "games/rate",
  async (
    data: { rate: number; gameId: number },
    { dispatch, rejectWithValue },
  ) => {
    try {
      dispatch(startLoading("games/rate"));

      const res = await api.post(`/games/${data.gameId}/rate/`, {
        rating: data.rate,
      });

      // console.log("rate:", res);
      // dispatch(
      //   showAlert({
      //     msg: `${data.rate === 0 ? "Your rate has been removed." : `Rated ${data.rate} stars.`}`,
      //     type: "success",
      //   }),
      // );

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

const initialState = {
  Games: [] as IGame[],
  Game: null as IGame | null,
  Comments: [] as IComment[],
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
      state.Comments = [];
    },
  },
  extraReducers: (builder) => {
    builder.addCase(loadGames.fulfilled, (state, action) => {
      state.Games = action.payload.results;
    });

    builder.addCase(loadGames.rejected, (state) => {
      state.Games = [];
    });

    builder.addCase(loadGameById.fulfilled, (state, action) => {
      state.Game = action.payload;
    });

    builder.addCase(loadGameById.rejected, (state) => {
      state.Game = null;
    });

    builder.addCase(loadGameComments.fulfilled, (state, action) => {
      state.Comments = action.payload;
    });

    builder.addCase(loadGameComments.rejected, (state) => {
      state.Comments = [];
    });

    builder.addCase(commentGame.fulfilled, (state, action) => {
      state.Comments = [action.payload, ...state.Comments];
    });

    builder.addCase(rateGame.fulfilled, (state, action) => {
      if (state.Game) {
        state.Game.user_rating = action.payload.rating.rating;
        state.Game.rating = action.payload.game_avg_rating;
      }
    });
  },
});

export const { setDownloadProgress, resetGame } = gamesSlice.actions;

export default gamesSlice.reducer;
