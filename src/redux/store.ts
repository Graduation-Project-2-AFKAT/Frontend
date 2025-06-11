import { configureStore } from "@reduxjs/toolkit";
import rootReducer from "./modules";
// import { setAuthToken } from "../utils";

const isProduction = import.meta.env.MODE === "production";

const store = configureStore({
  reducer: rootReducer,
  devTools: !isProduction,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [
          "games/setDownloadProgress",
          "games/download/pending",
          "games/download/fullfilled",
          "games/download/rejected",
        ],
        ignoredPath: ["games.downloadBlob"],
      },
    }),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;

// TODO
// let currentState = store.getState();

// store.subscribe(() => {
//   const previousState = currentState;
//   currentState = store.getState();

//   if (previousState.users.token !== currentState.users.token) {
//     const token = currentState.users.token;
//     setAuthToken(token);
//   }
// });
