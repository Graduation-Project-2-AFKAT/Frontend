import { createAsyncThunk, createSlice, isAnyOf } from "@reduxjs/toolkit";
import { AxiosError } from "axios";
import api from "../../config/axios.config";
import { IPost } from "../../interfaces";
import { showAlert } from "./Alerts";
import { startLoading, stopLoading } from "./loading";

export const loadPosts = createAsyncThunk(
  "posts/load",
  async (params: { search?: string }, { dispatch, rejectWithValue }) => {
    try {
      dispatch(startLoading("posts/load"));

      const res = await api.get(
        `/home/posts${params.search ? `?content=${params.search}` : ""}`,
      );

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

export const deletePost = createAsyncThunk(
  "posts/delete",
  async (id: number | undefined, { dispatch, rejectWithValue }) => {
    try {
      dispatch(startLoading("posts/delete"));

      await api.delete(`/home/posts/${id}/`);

      // console.log(res);
      dispatch(
        showAlert({
          msg: "Post deleted successfully.",
          type: "success",
        }),
      );

      return id;
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

export const loadPostComments = createAsyncThunk(
  "posts/comments",
  async (postId: string, { dispatch, rejectWithValue }) => {
    try {
      dispatch(startLoading("posts/comments"));

      const res = await api.get(`/home/posts/${postId}`);

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

export const commentPost = createAsyncThunk(
  "posts/comment",
  async (
    data: { comment: string; postId: string },
    { dispatch, rejectWithValue },
  ) => {
    try {
      dispatch(startLoading("posts/comment"));

      const res = await api.patch(`/home/posts/${data.postId}/`, {
        comments: [
          {
            content: data.comment,
          },
        ],
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

export const likePost = createAsyncThunk(
  "posts/like",
  async (id: string, { dispatch, rejectWithValue }) => {
    try {
      dispatch(startLoading("posts/like"));

      const res = await api.post(`/home/posts/${id}/like/`);

      // console.log(res.data);
      // dispatch(showAlert({ msg: "Post liked successfully!", type: "success" }));

      return { data: res.data, postId: Number(id) };
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
  reducers: {
    clearPostComments: (state) => {
      if (state.Post) {
        state.Post.comments = [];
      }
    },
  },
  extraReducers: (builder) => {
    builder.addCase(createPost.fulfilled, (state, action) => {
      if (action.payload) {
        state.Posts = [action.payload, ...state.Posts];
      }
    });

    builder.addCase(loadPostComments.fulfilled, (state, action) => {
      state.Post = action.payload;
    });

    builder.addCase(commentPost.fulfilled, (state, action) => {
      if (state.Post) {
        state.Post.comments = action.payload.comments;
      }
    });

    builder.addCase(deletePost.fulfilled, (state, action) => {
      state.Posts = state.Posts.filter((post) => post.id !== action.payload);
    });

    builder.addCase(likePost.fulfilled, (state, action) => {
      const postId = action.payload.postId;
      const postIndex = state.Posts.findIndex((p: IPost) => p.id === postId);

      if (postIndex !== -1) {
        const updatedPost = { ...state.Posts[postIndex] };
        updatedPost.is_liked_by_user = action.payload.data.liked;
        updatedPost.likes_count = action.payload.data.likes_count;

        state.Posts[postIndex] = updatedPost;
      }
    });

    builder.addMatcher(
      isAnyOf(
        loadPosts.fulfilled,
        loadMyPosts.fulfilled,
        loadPostsById.fulfilled,
      ),
      (state, action) => {
        state.Posts = action.payload.results;
      },
    );

    builder.addMatcher(
      isAnyOf(loadPosts.rejected, loadMyPosts.rejected, loadPostsById.rejected),
      (state) => {
        state.Posts = [];
      },
    );
  },
});

export const { clearPostComments } = postsSlice.actions;

export default postsSlice.reducer;
