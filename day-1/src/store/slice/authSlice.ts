import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isLoggedIn: false,
  user: {},
  allUser: [],
  value: 0,
  threads: [],
  detailThreads: {},
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
    detailFetched: (state, action) => {
      state.detailThreads = action.payload;
    },
    allUserFetch: (state, action) => {
      state.allUser = action.payload;
    },
    login: (state) => {
      state.isLoggedIn = true;
    },
    logout: (state) => {
      state.isLoggedIn = false;
      state.user = {}
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
  detailFetched
} = authSlice.actions;
export default authSlice.reducer;
