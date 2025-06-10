import { combineReducers } from "@reduxjs/toolkit";
import loadingReducer from "./loading";
import alertReducer from "./alerts";
import themeReducer from "./themes";
import userReducer from "./users";
import achievementsReducer from "./achievements";
import leaderboardsReducer from "./leaderboards";
import postsReducer from "./posts";
import gamesReducer from "./games";
import assetsReducer from "./assets";
import gameJamsReducer from "./gameJams";

export default combineReducers({
  loading: loadingReducer,
  alerts: alertReducer,
  themes: themeReducer,
  users: userReducer,
  achievements: achievementsReducer,
  leaderboards: leaderboardsReducer,
  posts: postsReducer,
  games: gamesReducer,
  assets: assetsReducer,
  gameJams: gameJamsReducer,
});
