import { createSlice, createAsyncThunk, isAnyOf } from "@reduxjs/toolkit";
import { api, setAuthToken } from "../../utils/index.ts";
import { showAlert } from "./Alerts.ts";

export const loadUser = createAsyncThunk("user/load", async (id) => {
  const res = await api.get(`http://localhost:3000/users/10`);

  return res.data;
});

export const userRegister = createAsyncThunk(
  "user/register",
  async (userData, { dispatch, rejectWithValue }) => {
    //https://ec62-2a01-9700-4200-4700-33de-9eba-4faa-1df2.ngrok-free.app/dra/reg/
    try {
      const res = await api.post(
        "http://localhost:3000/users/register",
        userData,
      );

      // After successful registration, load the user data
      await dispatch(loadUser());

      return res.data;
    } catch (error: any) {
      dispatch(showAlert({ msg: error.response.data, type: "error" }));
      return rejectWithValue(error.response.data); //TODO: errors should be in Error redux module
    }
  },
);

export const userLogin = createAsyncThunk(
  "user/login",
  async (userData, { dispatch, rejectWithValue }) => {
    try {
      const res = await api.post("http://localhost:3000/users/login", userData);

      await dispatch(loadUser());

      return res.data;
    } catch (error: any) {
      dispatch(showAlert({ msg: error.response.data, type: "error" }));
      return rejectWithValue(error.response.data); //TODO: errors should be in Error redux module
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
    access: null,
    refresh: null,
  }, //localStorage.getItem("token")
  user: null,
  isAuth: false,
  loading: false,
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    logout: resetAuthState,
  },
  extraReducers: (builder) => {
    builder.addCase(loadUser.fulfilled, (state, action) => {
      state.isAuth = true;
      state.loading = false;
      state.user = action.payload;
    });

    builder.addMatcher(
      isAnyOf(userLogin.fulfilled, userRegister.fulfilled),
      (state, action) => {
        setAuthToken(action.payload.token);
        // state.token = {
        //   access: action.payload.token.access,
        //   refresh: action.payload.token.refresh,
        // };
        state.isAuth = true;
        state.loading = false;
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
