import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import React from "react";
import { View, Text, StyleSheet } from "react-native";

import { Feather } from "@expo/vector-icons";

import PostsScreen from "./PostsScreen";
import { TouchableOpacity } from "react-native-gesture-handler";

const BottomTabs = createBottomTabNavigator();

const HomeScreen = ({ navigation }) => {
  return (
    <BottomTabs.Navigator
      initialRouteName="Posts"
      screenOptions={{ tabBarShowLabel: false }}
    >
      <BottomTabs.Screen
        name="PostsScreen"
        component={PostsScreen}
        options={{
          title: "Публікації",
          headerTintColor: "#000",
          headerTitleStyle: {
            fontWeight: "bold",
            fontSize: 20,
          },
          headerRight: () => (
            <TouchableOpacity
              style={styles.logoutButton}
              activeOpacity={0.5}
              onPress={() => navigation.navigate("Log in")}
            >
              <Feather name="log-out" size={24} color="gray" />
            </TouchableOpacity>
          ),
        }}
      ></BottomTabs.Screen>
    </BottomTabs.Navigator>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  logoutButton: {
    marginRight: 16,
  },
});
export default HomeScreen;
