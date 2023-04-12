import React from "react";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
// import {} from "react-native";

import { NavigationContainer } from "@react-navigation/native";

import { useRoute } from "../../router";
import { authStateChangeUser } from "../Redux/auth/authOperation";

const Main = () => {
  const { stateChange } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  console.log("stateChange", stateChange);

  useEffect(() => {
    dispatch(authStateChangeUser());
  }, []);

  const routing = useRoute(stateChange);

  return <NavigationContainer>{routing}</NavigationContainer>;
};

export default Main;
