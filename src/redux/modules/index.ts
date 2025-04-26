import { combineReducers } from "@reduxjs/toolkit";
import loadingReducer from "./loading";
import alertReducer from "./alerts";
import userReducer from "./users";
import postsReducer from "./posts";
import gamesReducer from "./games";
import assetsReducer from "./assets";
import gameJamsReducer from "./gameJams";

export default combineReducers({
  loading: loadingReducer,
  alerts: alertReducer,
  users: userReducer,
  posts: postsReducer,
  games: gamesReducer,
  assets: assetsReducer,
  gameJams: gameJamsReducer,
});
