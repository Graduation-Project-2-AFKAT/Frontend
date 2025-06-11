import { createAsyncThunk, createSlice, isAnyOf } from "@reduxjs/toolkit";
import { AxiosError } from "axios";
import api from "../../config/axios.config";
import { IPost } from "../../interfaces";
import { showAlert } from "./Alerts";
import { startLoading, stopLoading } from "./loading";

export const loadPosts = createAsyncThunk(
  "posts/load",
  async (_, { dispatch, rejectWithValue }) => {
    try {
      dispatch(startLoading("posts/load"));

      const res = await api.get("/home/posts");

      // console.log(res.data);

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

export const loadMyPosts = createAsyncThunk(
  "posts/loadMy",
  async (_, { dispatch, rejectWithValue }) => {
    try {
      dispatch(startLoading("posts/mine"));

      const res = await api.get("/home/posts/mine");

      // console.log(res.data);

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

export const loadPostsById = createAsyncThunk(
  "posts/view",
  async (id: string, { dispatch, rejectWithValue }) => {
    try {
      dispatch(startLoading("posts/view"));

      const res = await api.get(`/auth/users/${id}/posts`);

      // console.log(res.data);

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
      dispatch(startLoading("posts/create"));

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
    builder.addCase(loadMyPosts.fulfilled, (state, action) => {
      state.Posts = action.payload.results;
    });

    builder.addCase(loadPosts.fulfilled, (state, action) => {
      state.Posts = action.payload.results;
    });

    builder.addCase(loadPostsById.fulfilled, (state, action) => {
      state.Posts = action.payload.results;
    });

    builder.addCase(loadPostsById.rejected, (state) => {
      state.Posts = [];
    });

    builder.addCase(createPost.fulfilled, (state, action) => {
      if (action.payload) {
        state.Posts = [action.payload, ...state.Posts];
      }
    });

    builder.addMatcher(
      isAnyOf(loadPosts.rejected, loadMyPosts.rejected),
      (state) => {
        state.Posts = [];
      },
    );
  },
});

// export const { setDownloadProgress } = postsSlice.actions;

export default postsSlice.reducer;
