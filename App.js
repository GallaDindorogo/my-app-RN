import * as React from "react";
import * as Font from "expo-font";
import { useState, useEffect } from "react";
import { useCallback } from "react";

import { GestureHandlerRootView } from "react-native-gesture-handler";

import { Provider } from "react-redux";

import { View } from "react-native";

import * as SplashScreen from "expo-splash-screen";

import { store } from "./src/Redux/store";

import Main from "./src/components/Main";

SplashScreen.preventAutoHideAsync();

export default function App() {
  const [appIsReady, setAppIsReady] = useState(false);
  const [user, setUser] = useState(null);

  useEffect(() => {
    async function prepare() {
      try {
        await Font.loadAsync({
          "Roboto-Regulat": require("./assets/fonts/Roboto-Regular.ttf"),
          "Roboto-Bold": require("./assets/fonts/Roboto-Bold.ttf"),
        });
      } catch (e) {
        console.warn(e);
      } finally {
        setAppIsReady(true);
      }
    }
    prepare();
  }, []);

  const onLayoutRootView = useCallback(async () => {
    if (appIsReady) {
      await SplashScreen.hideAsync();
    }
  }, [appIsReady]);

  if (!appIsReady) {
    return null;
  }

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <Provider store={store}>
        <View
          style={{ flex: 1, backgroundColor: "#fff" }}
          onLayout={onLayoutRootView}
        >
          <Main />
        </View>
      </Provider>
    </GestureHandlerRootView>
  );
}
