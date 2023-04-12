import db from "../../firebase/config";

import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
  onAuthStateChanged,
  signOut,
} from "firebase/auth";

import { authSlice } from "./authReducer";

const auth = getAuth(db);

const { updateUserProfile, authSignOut, authStateChange } = authSlice.actions;

export const authSignUpUser =
  ({ email, password, username, photo }) =>
  async (dispatch, getState) => {
    console.log("SignUp", email, password, username, photo);
    try {
      await createUserWithEmailAndPassword(auth, email, password);

      await updateProfile(auth.currentUser, {
        displayName: username,
      });

      const {
        uid,
        displayName,
        email: userEmail,
        photoURL,
      } = await auth.currentUser;

      dispatch(
        updateUserProfile({
          userID: uid,
          username: displayName,
          email: userEmail,
          photoURL,
        })
      );
    } catch (error) {
      console.log("error Op", error);
      console.log("error Op.message", error.message);
    }
  };

export const authSignInUser =
  ({ email, password }) =>
  async (dispatch, getState) => {
    console.log("SignIn", email, password);

    try {
      const user = await signInWithEmailAndPassword(auth, email, password);

      console.log("sigIn user", user);
    } catch (error) {
      console.log("error", error);
      console.log("error.message", error.message);
    }
  };

export const authSignOutUser = () => async (dispatch, getState) => {
  try {
    await auth.signOut();
    dispatch(authSignOut());
  } catch (error) {
    console.log("error.message", error.message);
  }
};

export const authStateChangeUser = () => async (dispatch, getState) => {
  try {
    await onAuthStateChanged(auth, (user) => {
      if (user) {
        const userUpdateProfile = {
          username: user.displayName,
          userID: user.uid,
          email: user.email,
          photoURL: user.photoURL,
        };
        dispatch(updateUserProfile(userUpdateProfile));
        dispatch(authStateChange({ stateChange: true }));

        console.log("userUpdateProfile", userUpdateProfile);
        console.log("stateChange");
      }
    });
  } catch (error) {
    console.log("error.message", error.message);
  }
};
