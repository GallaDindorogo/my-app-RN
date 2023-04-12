import React from "react";

import { StatusBar } from "expo-status-bar";

import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import { AntDesign } from "@expo/vector-icons";
import { Feather } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";

import RegistrationScreen from "./src/Screens/Auth/RegistrationScreen";
import LoginScreen from "./src/Screens/Auth/LoginScreen";
import PostsScreen from "./src/Screens/Main/PostsScreen";
import CreatePostsScreen from "./src/Screens/Main/CreatePostsScreen";
import ProfileScreen from "./src/Screens/Main/ProfileScreen";
import HomeScreen from "./src/Screens/Main/Home";

const AuthStack = createStackNavigator();
const MainTab = createBottomTabNavigator();

export const useRoute = (isAuth) => {
  if (!isAuth) {
    return (
      <AuthStack.Navigator>
        <AuthStack.Screen
          options={{ headerShown: false }}
          name="Register"
          component={RegistrationScreen}
        />
        <AuthStack.Screen
          options={{ headerShown: false }}
          name="Log in"
          component={LoginScreen}
        />
        <AuthStack.Screen
          options={{ headerShown: false }}
          name="Home"
          component={HomeScreen}
        />
      </AuthStack.Navigator>
    );
  }
  return (
    <MainTab.Navigator
      initialRouteName="Register"
      screenOptions={{
        tabBarShowLabel: false,
        tabBarShowIcon: true,
        tabBarItemStyle: {
          borderTopColor: "#E5E5E5",
          borderTopWidth: 1,
        },
      }}
    >
      <MainTab.Screen
        name="Posts"
        component={PostsScreen}
        options={{
          tabBarIcon: ({ focused, color, size }) => {
            return (
              <Feather
                name="grid"
                size={24}
                color={focused ? "#FF6C00" : color}
              />
            );
          },
          tabBarIconStyle: {
            marginTop: 9,
          },
        }}
      />
      <MainTab.Screen
        name="Create"
        component={CreatePostsScreen}
        options={{
          tabBarIcon: ({ focused, color, size }) => {
            return <Ionicons name="add" size={24} color={"#FFFFFF"} />;
          },
          tabBarIconStyle: {
            marginTop: 9,
          },
          tabBarIconStyle: {
            backgroundColor: "#FF6C00",
            width: 70,
            height: 40,
            borderRadius: 50,
            marginTop: 9,
          },
        }}
      />
      <MainTab.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          tabBarIcon: ({ focused, color, size }) => {
            return (
              <Feather
                name="user"
                size={24}
                color={focused ? "#FF6C00" : color}
              />
            );
          },
          tabBarIconStyle: {},
        }}
      />
    </MainTab.Navigator>
  );
};
