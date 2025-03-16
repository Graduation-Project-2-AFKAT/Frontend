import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./modules/users";

export default configureStore({
  reducer: {
    user: userReducer,
  },
});
