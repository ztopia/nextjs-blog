import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";
import thunk from "redux-thunk";
import appReducer from "./modules/appSlice";
import contractReducer from "./modules/contractSlice";

export function makeStore() {
  return configureStore({
    reducer: { app: appReducer, contract: contractReducer },
    middleware: [thunk],
  });
}

const store = makeStore();

export type AppState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;

export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  AppState,
  unknown,
  Action<string>
>;

export default store;
