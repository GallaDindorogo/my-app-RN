import React, { useState, useCallback, useContext } from "react";

import {
  StyleSheet,
  ImageBackground,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Image,
  KeyboardAvoidingView,
  Keyboard,
  TouchableWithoutFeedback,
  Button,
} from "react-native";

import { useDispatch } from "react-redux";
import { authSignInUser } from "../../Redux/auth/authOperation";

import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";

SplashScreen.preventAutoHideAsync();

const initialState = {
  email: "",
  password: "",
};

const LoginScreen = ({ navigation }) => {
  const [state, setstate] = useState(initialState);
  const [isShowKeyboard, setIsShowKeyboard] = useState(false);

  const dispatch = useDispatch();

  const handleSubmit = () => {
    setIsShowKeyboard(false);
    Keyboard.dismiss();
    dispatch(authSignInUser(state));
    setstate(initialState);
  };

  const [fontsLoaded] = useFonts({
    RobotoRegular: require("../../../assets/fonts/Roboto-Regular.ttf"),
    RobotoMedium: require("../../../assets/fonts/Roboto-Medium.ttf"),
  });

  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded) {
      await SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) {
    return null;
  }

  return (
    <TouchableWithoutFeedback onPress={handleSubmit}>
      <View style={styles.container}>
        <ImageBackground
          style={styles.image}
          source={require("../../../assets/bg.jpg")}
        >
          <KeyboardAvoidingView
            behavior={Platform.OS === "ios" ? "padding" : "height"}
          >
            <View
              onLayout={onLayoutRootView}
              style={{
                ...styles.formWrapper,
                marginTop: isShowKeyboard ? 147 : 263,
              }}
            >
              <View style={styles.imgBox}>
                <Image
                  style={styles.icon}
                  source={require("../../../assets/add.png")}
                />
              </View>
              <View style={styles.form}>
                <View style={{ marginTop: 16 }}>
                  <TextInput
                    style={styles.input}
                    textAlign={"left"}
                    placeholder={"Адреса електронної пошти"}
                    placeholderTextColor={"#BDBDBD"}
                    onFocus={() => {
                      setIsShowKeyboard(true);
                    }}
                    value={state.email}
                    onChangeText={(value) =>
                      setstate((prevState) => ({
                        ...prevState,
                        email: value,
                      }))
                    }
                  ></TextInput>
                </View>
                <View style={{ marginTop: 16 }}>
                  <TextInput
                    style={styles.input}
                    textContentType="password"
                    textAlign={"left"}
                    placeholder={"Пароль"}
                    placeholderTextColor={"#BDBDBD"}
                    secureTextEntry={true}
                    onFocus={() => {
                      setIsShowKeyboard(true);
                    }}
                    value={state.password}
                    onChangeText={(value) =>
                      setstate((prevState) => ({
                        ...prevState,
                        password: value,
                      }))
                    }
                  />
                  <Text style={styles.showPass}>{"Показати"}</Text>
                </View>
              </View>
              <TouchableOpacity style={styles.button} onPress={handleSubmit}>
                <Text style={styles.textButton}>Увійти</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => navigation.navigate("Register")}>
                <Text style={styles.aside}>
                  Ще немає аккаунта? Зареєструватися
                </Text>
              </TouchableOpacity>
            </View>
          </KeyboardAvoidingView>
        </ImageBackground>
      </View>
    </TouchableWithoutFeedback>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  image: {
    flex: 1,
    resizeMode: "cover",
    justifyContent: "center",
  },
  formWrapper: {
    marginTop: 263,
    paddingTop: 92,
    paddingBottom: 78,
    paddingLeft: 16,
    paddingRight: 16,
    backgroundColor: "#FFFFFF",
    borderTopRightRadius: 25,
    borderTopLeftRadius: 25,
    justifyContent: "center",
  },
  form: {
    marginHorizontal: 40,
  },
  title: {
    fontFamily: "RobotoMedium",
    fontStyle: "normal",
    fontSize: 30,
    lineHeight: 35,
    letterSpacing: 0.16,
    color: "#212121",
    textAlign: "center",
  },
  input: {
    fontFamily: "RobotoRegular",
    fontStyle: "normal",
    fontSize: 16,
    lineHeight: 19,
    color: "#212121",
    paddingLeft: 16,
    borderWidth: 1,
    height: 50,
    borderRadius: 8,
  },

  inputTitle: {
    color: "#f0f8ff",
    marginBottom: 10,
    fontSize: 18,
  },
  showPass: {
    fontFamily: "RobotoRegular",
    fontStyle: "normal",
    lineHeight: 19,
    fontSize: 16,
    position: "absolute",
    top: 16,
    left: 230,
    color: "#1B4371",
  },
  button: {
    marginTop: 32,
    backgroundColor: "#FF6C00",
    height: 61,
    borderRadius: 100,
    justifyContent: "center",
    alignItems: "center",
  },
  textButton: {
    fontFamily: "RobotoRegular",
    fontStyle: "normal",
    lineHeight: 19,
    color: "#FFFFFF",
  },
  aside: {
    fontFamily: "RobotoRegular",
    fontStyle: "normal",
    lineHeight: 19,
    marginTop: 16,
    textAlign: "center",
    color: "#1B4371",
  },
  imgBox: {
    position: "absolute",
    left: "35%",
    top: "-15%",
    width: 120,
    height: 120,
    backgroundColor: "#F6F6F6",
    borderRadius: 16,
  },
  avatar: {
    width: 120,
    height: 120,
  },
  icon: {
    position: "absolute",
    left: "90%",
    top: "65%",
    width: 25,
    height: 25,
  },
});
