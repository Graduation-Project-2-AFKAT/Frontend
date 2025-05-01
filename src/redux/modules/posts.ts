import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { showAlert } from "./alerts";
import { AxiosError } from "axios";
import api from "../../config/axios.config.ts";
import { startLoading, stopLoading } from "./loading";
import { IPost } from "../../interfaces";

export const loadPosts = createAsyncThunk(
  "games/load",
  async (_, { dispatch, rejectWithValue }) => {
    try {
      dispatch(startLoading("load-posts"));

      const res = await api.get("/home/posts");

      console.log(res.data);

      return res.data;
    } catch (err: unknown) {
      const error = err as AxiosError;
      dispatch(showAlert({ msg: error.response?.data, type: "error" }));
      return rejectWithValue(error.response?.data || "Failed to load posts");
    } finally {
      dispatch(stopLoading());
    }
  },
);

export const loadAPost = createAsyncThunk(
  "posts/view",
  async (id: string, { dispatch, rejectWithValue }) => {
    try {
      dispatch(startLoading("load-post"));

      const res = await api.get(`/home/posts/${id}`);

      console.log(res.data);

      return res.data;
    } catch (err: unknown) {
      const error = err as AxiosError;
      dispatch(showAlert({ msg: error.response?.data, type: "error" }));
      return rejectWithValue(error.response?.data || "Failed to load post");
    } finally {
      dispatch(stopLoading());
    }
  },
);

export const createPost = createAsyncThunk(
  "posts/create",
  async (postData: FormData, { dispatch, rejectWithValue }) => {
    try {
      dispatch(startLoading("create-post"));

      const res = await api.post(`/home/posts/`, postData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      // console.log(res.data);
      dispatch(
        showAlert({ msg: "Post created successfully!", type: "success" }),
      );

      return res.data;
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

const initialState = {
  Posts: [] as IPost[],
  Post: null as IPost | null,
};

export const postsSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(loadPosts.fulfilled, (state, action) => {
      state.Posts = action.payload.results;
      //   state.Post = null;
    });

    builder.addCase(loadPosts.rejected, (state) => {
      state.Posts = [];
    });

    builder.addCase(loadAPost.fulfilled, (state, action) => {
      state.Post = action.payload;
    });

    builder.addCase(loadAPost.rejected, (state) => {
      state.Post = null;
    });

    builder.addCase(createPost.fulfilled, (state, action) => {
      if (action.payload) {
        state.Posts = [action.payload, ...state.Posts];
      }
    });
  },
});

// export const { setDownloadProgress } = postsSlice.actions;

export default postsSlice.reducer;
