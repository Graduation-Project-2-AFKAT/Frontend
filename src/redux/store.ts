import { configureStore } from "@reduxjs/toolkit";
import rootReducer from "./modules";
// import { setAuthToken } from "../utils";

const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [
          "games/setDownloadProgress",
          "games/downloadGame/pending",
          "games/downloadGame/fullfiled",
          "games/downloadGame/rejected",
        ],
        ignoredPath: ["games.downloadBlob"],
      },
    }),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;

// let currentState = store.getState();

// store.subscribe(() => {
//   const previousState = currentState;
//   currentState = store.getState();

//   if (previousState.users.token !== currentState.users.token) {
//     const token = currentState.users.token;
//     setAuthToken(token);
//   }
// });
