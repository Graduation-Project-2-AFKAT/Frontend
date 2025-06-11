import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { AxiosError } from "axios";
import api from "../../config/axios.config";
import { IAsset, IComment } from "../../interfaces/index";
import { showAlert } from "./Alerts";
import { startLoading, stopLoading } from "./loading";

export const loadAssets = createAsyncThunk(
  "assets/loadAll",
  async (
    params: { tags?: string; search?: string },
    { dispatch, rejectWithValue },
  ) => {
    try {
      dispatch(startLoading("assets/load"));

      const res = await api.get(
        `/arts${params.tags ? `?tag=${params.tags}` : params.search ? `?search=${params.search}` : ""}`,
      );

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

export const loadAssetById = createAsyncThunk(
  "assets/view",
  async (id: number | string, { dispatch, rejectWithValue }) => {
    try {
      dispatch(startLoading("assets/view"));

      const res = await api.get(`/arts/${id}`);

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

export const downloadAsset = createAsyncThunk(
  "assets/download",
  async (
    {
      id,
      assetTitle,
      assetFile,
    }: { id: number; assetTitle: string; assetFile: string },
    { dispatch, rejectWithValue },
  ) => {
    console.log("downloading asset...");
    dispatch(startLoading("assets/download"));

    // Add progress state to your slice
    dispatch(setDownloadProgress({ downloadProgress: 0, estimatedTime: null }));

    try {
      const res = await api.get(`/arts/${id}/download`, {
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

      console.log("Downloading asset file...");

      // Get filename by using default asset title
      const fileName = assetTitle.replace(" ", "-");

      const assetFilePathParts = assetFile.split(".");
      const assetExtension = assetFilePathParts[assetFilePathParts.length - 1];

      const filename = `${fileName}.${assetExtension}`;

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
      return rejectWithValue(
        error.response?.data || "Failed to download asset",
      );
    } finally {
      dispatch(stopLoading());
    }
  },
);

export const createAsset = createAsyncThunk(
  "assets/create",
  async (assetData: FormData, { dispatch, rejectWithValue }) => {
    try {
      dispatch(startLoading("assets/create"));

      const res = await api.post(`/arts/`, assetData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      console.log(res.data);
      dispatch(
        showAlert({
          msg: "3D model uploaded successfully! Our team will review it shortly.",
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

export const updateAsset = createAsyncThunk(
  "assets/update",
  async (assetData: FormData, { dispatch, rejectWithValue }) => {
    try {
      dispatch(startLoading("assets/update"));

      const res = await api.patch(`/arts/${assetData.get("id")}/`, assetData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      console.log(res.data);
      dispatch(
        showAlert({
          msg: "3D model updated successfully! Our team will review it shortly.",
          type: "success",
        }),
      );

      setTimeout(() => {
        window.location.href = "/arts";
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

export const deleteAsset = createAsyncThunk(
  "Assets/delete",
  async (id: number | undefined, { dispatch, rejectWithValue }) => {
    try {
      dispatch(startLoading("Assets/delete"));

      const res = await api.delete(`/arts/${id}/`);

      console.log(res.data);
      dispatch(
        showAlert({
          msg: "Asset deleted successfully.",
          type: "success",
        }),
      );

      setTimeout(() => {
        window.location.href = "/arts";
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

export const loadAssetComments = createAsyncThunk(
  "assets/comments",
  async (assetId: number, { dispatch, rejectWithValue }) => {
    try {
      dispatch(startLoading("assets/comments"));

      const res = await api.get(`/arts/${assetId}/comments`);

      // console.log(res);

      return res.data;
    } catch (err: unknown) {
      const error = err as AxiosError;
      dispatch(showAlert({ msg: error.response?.data, type: "error" }));
      return rejectWithValue(error.response?.data || "Failed to load asset");
    } finally {
      dispatch(stopLoading());
    }
  },
);

export const commentAsset = createAsyncThunk(
  "assets/comment",
  async (
    data: { comment: string; assetId: number },
    { dispatch, rejectWithValue },
  ) => {
    try {
      dispatch(startLoading("assets/comment"));

      const res = await api.post(`/arts/${data.assetId}/comment/`, {
        content: data.comment,
      });

      // console.log("comment:", res.data);

      return res.data;
    } catch (err: unknown) {
      const error = err as AxiosError;
      dispatch(showAlert({ msg: error.response?.data, type: "error" }));
      return rejectWithValue(error.response?.data || "Failed to load asset");
    } finally {
      dispatch(stopLoading());
    }
  },
);

// export const rateAsset = createAsyncThunk(
//   "assets/rate",
//   async (
//     data: { rate: number; assetId: number },
//     { dispatch, rejectWithValue },
//   ) => {
//     try {
//       dispatch(startLoading("assets/rate"));

//       const res = await api.post(`/arts/${data.assetId}/rate/`, data.rate);

//       console.log("rate:", res);

//       // return res.data;
//     } catch (err: unknown) {
//       const error = err as AxiosError;
//       dispatch(showAlert({ msg: error.response?.data, type: "error" }));
//       return rejectWithValue(error.response?.data || "Failed to load asset");
//     } finally {
//       dispatch(stopLoading());
//     }
//   },
// );

const initialState = {
  Assets: [] as IAsset[],
  Asset: null as IAsset | null,
  Comments: [] as IComment[],
  downloadProgress: 0,
  estimatedTime: null as number | null,
};

export const assetsSlice = createSlice({
  name: "assets",
  initialState,
  reducers: {
    setDownloadProgress: (state, action) => {
      state.downloadProgress = action.payload.downloadProgress;
      state.estimatedTime = action.payload.estimatedTime;
    },
    resetAsset: (state) => {
      state.Asset = null;
      state.Comments = [];
    },
  },
  extraReducers: (builder) => {
    builder.addCase(loadAssets.fulfilled, (state, action) => {
      state.Assets = action.payload.results;
    });

    builder.addCase(loadAssets.rejected, (state) => {
      state.Assets = [];
    });

    builder.addCase(loadAssetById.fulfilled, (state, action) => {
      state.Asset = action.payload;
    });

    builder.addCase(loadAssetById.rejected, (state) => {
      state.Asset = null;
    });

    builder.addCase(loadAssetComments.fulfilled, (state, action) => {
      state.Comments = action.payload;
    });

    builder.addCase(loadAssetComments.rejected, (state) => {
      state.Comments = [];
    });

    builder.addCase(commentAsset.fulfilled, (state, action) => {
      state.Comments = [action.payload, ...state.Comments];
    });
  },
});

export const { setDownloadProgress, resetAsset } = assetsSlice.actions;

export default assetsSlice.reducer;
