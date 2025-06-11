import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface ThemeState {
  current: string;
}

const initialState: ThemeState = {
  current: localStorage.getItem("theme") || "dark",
};

const themeSlice = createSlice({
  name: "theme",
  initialState,
  reducers: {
    setTheme: (state, action: PayloadAction<string>) => {
      state.current = action.payload;
      localStorage.setItem("theme", action.payload);
    },
  },
});

export const { setTheme } = themeSlice.actions;
export default themeSlice.reducer;
