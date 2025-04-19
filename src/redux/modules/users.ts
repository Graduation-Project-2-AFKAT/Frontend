import { createSlice, createAsyncThunk, isAnyOf } from "@reduxjs/toolkit";
import { setAuthToken } from "../../utils";
import api from "../../utils/api.ts";
import { showAlert } from "./alerts.ts";
import { AxiosError } from "axios";
import { IInputs } from "../../interfaces";
import { startLoading, stopLoading } from "./loading.ts";

export const loadUser = createAsyncThunk(
  "user/load",
  async (_, { dispatch, rejectWithValue }) => {
    dispatch(startLoading("user"));

    try {
      const res = await api.get(`/auth/user`);

      // console.log(res);

      return res.data;
    } catch (err: unknown) {
      const error = err as AxiosError;
      dispatch(showAlert({ msg: error.response?.data, type: "error" }));
      console.log("ERROR:", error.response);
      return rejectWithValue(error.response?.data);
    } finally {
      dispatch(stopLoading());
    }
  },
);

export const registerUser = createAsyncThunk(
  "user/register",
  async (userData: IInputs, { dispatch, rejectWithValue }) => {
    try {
      dispatch(startLoading("user"));

      const res = await api.post("/auth/register/", userData);

      // console.log(res);

      dispatch(showAlert({ msg: "Registration successful", type: "success" }));

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

export const loginUser = createAsyncThunk(
  "user/login",
  async (userData: IInputs, { dispatch, rejectWithValue }) => {
    try {
      dispatch(startLoading("user"));

      const res = await api.post("/auth/login", userData);

      // await dispatch(loadUser());
      dispatch(showAlert({ msg: "Login successful", type: "success" }));

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

const resetAuthState = (state: typeof initialState) => {
  setAuthToken();
  state.user = null;
  state.isAuth = false;
  state.token = {
    access: null,
    refresh: null,
  };
};

const initialState = {
  token: {
    access: null as string | null,
    refresh: null as string | null,
  }, //localStorage.getItem("token")
  user: null as {
    username: string;
    email: string;
    userProfile: {
      country: string;
      github_link: string;
      linkedin_link: string;
      phone: string;
      profile_image: string;
    };
  } | null,
  isAuth: false,
};

export const userSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    logout: resetAuthState,
  },
  extraReducers: (builder) => {
    builder.addCase(loadUser.fulfilled, (state, action) => {
      state.isAuth = true;
      state.user = action.payload;
    });

    builder.addMatcher(
      isAnyOf(loginUser.fulfilled, registerUser.fulfilled),
      (state, action) => {
        const token = {
          access: action.payload.access,
          refresh: action.payload.refresh,
        };
        setAuthToken(token);
        state.token = token;
        state.user = action.payload.user;
        state.isAuth = true;
      },
    );

    builder.addMatcher(
      isAnyOf(loginUser.rejected, registerUser.rejected, loadUser.rejected),
      (state) => {
        resetAuthState(state);
      },
    );
  },
});

export const { logout } = userSlice.actions;

export default userSlice.reducer;
