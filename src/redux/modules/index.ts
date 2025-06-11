import { combineReducers } from "@reduxjs/toolkit";
import achievementsReducer from "./achievements";
import alertReducer from "./Alerts";
import assetsReducer from "./assets";
import gameJamsReducer from "./gameJams";
import gamesReducer from "./games";
import leaderboardsReducer from "./leaderboards";
import loadingReducer from "./loading";
import postsReducer from "./posts";
import themeReducer from "./themes";
import userReducer from "./users";

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
