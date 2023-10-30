// rootReducer.js
import { combineReducers } from "@reduxjs/toolkit";
import authReducer from "./slice/authSlice"; // Ubah import ini

const rootReducer = combineReducers({
  auth: authReducer,
});

export default rootReducer;
