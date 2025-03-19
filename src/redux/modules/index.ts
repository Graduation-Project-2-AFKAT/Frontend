import { combineReducers } from "@reduxjs/toolkit";
import alertReducer from "./Alerts";
import userReducer from "./users";

export default combineReducers({
  alert: alertReducer,
  user: userReducer,
});
