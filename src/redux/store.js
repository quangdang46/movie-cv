import { combineReducers, configureStore } from "@reduxjs/toolkit";
import userReducer from "./userSlice";
import modalReducer from "./modalSlice";

const reducer = combineReducers({
  auth: userReducer,
  modal: modalReducer,
});
export const store = configureStore({
  reducer,
});
