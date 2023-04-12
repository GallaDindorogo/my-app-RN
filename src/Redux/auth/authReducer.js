import { createSlice } from "@reduxjs/toolkit";

const state = {
  userID: null,
  username: null,
  email: null,
  photoURL: null,
  stateChange: false,
};

export const authSlice = createSlice({
  name: "auth",
  initialState: state,
  reducers: {
    updateUserProfile: (state, { payload }) => ({
      ...state,
      userID: payload.userID,
      username: payload.username,
      email: payload.email,
    }),

    authStateChange: (state, { payload }) => ({
      ...state,
      stateChange: payload.stateChange,
    }),
    authSignOut: () => state,
  },
});
console.log("AR updateUserProfile", state);
