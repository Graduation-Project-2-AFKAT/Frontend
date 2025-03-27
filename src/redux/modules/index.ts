import { combineReducers } from "@reduxjs/toolkit";
import alertReducer from "./Alerts";
import userReducer from "./users";

export default combineReducers({
  alerts: alertReducer,
  users: userReducer,
});
