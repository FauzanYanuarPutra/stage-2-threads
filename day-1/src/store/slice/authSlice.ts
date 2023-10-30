// authSlice.js

import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { useDispatch } from "react-redux";

const initialState = {
  isLoggedIn: false,
  user: {},
  allUser: [],
  value: 0,
  threads: [],
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    incremented: state => {
      state.value += 1;
    },
    decremented: state => {
      state.value -= 1;
    },
    userFetched: (state, action) => {
      state.user = action.payload;
    },
    threadsFetched: (state, action) => {
      state.threads = action.payload;
    },
    allUserFetch: (state, action) => {
      state.allUser = action.payload;
    },
    login: (state) => {
      state.isLoggedIn = true;
    },
    // follow: (state, action) => { ... }
    // check: (_, action) => {
    //   const payload = action.payload;
    //   const user = {
    //     id: payload.id,
    //   };
    //   return user;
    // },
    logout: (state) => {
      state.isLoggedIn = false;
    },
  },
});

export const {
  login,
  logout,
  // check,
  // follow,
  allUserFetch,
  incremented,
  decremented,
  userFetched,
  threadsFetched,
} = authSlice.actions;
export default authSlice.reducer;
