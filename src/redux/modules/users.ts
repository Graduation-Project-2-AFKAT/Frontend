import { createSlice, createAsyncThunk, isAnyOf } from "@reduxjs/toolkit";
import { api, setAuthToken } from "../../utils/index.ts";
import { showAlert } from "./Alerts.ts";
import { AxiosError } from "axios";
import { createRandomUser } from "../../Mocks/fakeUsers.ts";

const userData = createRandomUser();
console.log(userData);

export const loadUser = createAsyncThunk("user/load", async () => {
  // const res = await api.get(`http://localhost:3000/users/10`);

  return userData;
});

export const userRegister = createAsyncThunk(
  "user/register",
  async (userData, { dispatch, rejectWithValue }) => {
    try {
      const res = await api.post(
        "https://49fe-2a01-9700-42c6-8800-b127-b48b-ee34-8ddc.ngrok-free.app/api/v1/auth/register/",
        userData,
      );

      console.log(res);
      // After successful registration, load the user data
      await dispatch(
        showAlert({ msg: "Registration successful", type: "success" }),
      );

      return userData;
    } catch (err: unknown) {
      const error = err as AxiosError;
      dispatch(showAlert({ msg: error.response?.data, type: "error" }));
      return rejectWithValue(error.response?.data); //TODO: errors should be in Error redux module
    }
  },
);

export const userLogin = createAsyncThunk(
  "user/login",
  async (userData, { dispatch, rejectWithValue }) => {
    // https://49fe-2a01-9700-42c6-8800-b127-b48b-ee34-8ddc.ngrok-free.app/api/v1/auth/login
    try {
      const res = await api.post(
        "https://49fe-2a01-9700-42c6-8800-b127-b48b-ee34-8ddc.ngrok-free.app/api/v1/auth/login",
        userData,
      );

      console.log(res.data);

      // await dispatch(loadUser());
      await dispatch(showAlert({ msg: "Login successful", type: "success" }));

      return res.data;
    } catch (err: unknown) {
      const error = err as AxiosError;
      dispatch(showAlert({ msg: error.response?.data, type: "error" }));
      return rejectWithValue(error.response?.data); //TODO: errors should be in Error redux module
    }
  },
);

const resetAuthState = (state: typeof initialState) => {
  setAuthToken();
  state.user = null;
  state.isAuth = false;
  state.loading = false;
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
    userprofile: {
      country: string;
      github_link: string;
      linkedin_link: string;
      phone: string;
      profile_image: string;
    };
  } | null,
  isAuth: false,
  loading: false,
};

export const userSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    logout: resetAuthState,
  },
  extraReducers: (builder) => {
    builder.addCase(loadUser.fulfilled, (state, action) => {
      console.log(action.payload);
      state.isAuth = true;
      state.loading = false;
      // state.user = action.payload;
    });

    builder.addMatcher(
      isAnyOf(userLogin.fulfilled, userRegister.fulfilled),
      (state, action) => {
        const token = {
          access: action.payload.access,
          refresh: action.payload.refresh,
        };
        state.token = token;
        state.user = action.payload.user;
        state.isAuth = true;
        state.loading = false;
        setAuthToken(token);
      },
    );

    builder.addMatcher(
      isAnyOf(userLogin.rejected, userRegister.rejected, loadUser.rejected),
      (state) => {
        resetAuthState(state);
      },
    );

    builder.addMatcher(
      (action) => action.type.endsWith("/pending"),
      (state) => {
        state.loading = true;
      },
    );
  },
});

export const { logout } = userSlice.actions;

export default userSlice.reducer;
