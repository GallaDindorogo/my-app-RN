import React, { useState, useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import { View, Text, StyleSheet, Image, TextInput } from "react-native";
import { Camera } from "expo-camera";
import * as Location from "expo-location";
import { TouchableOpacity } from "react-native-gesture-handler";

import { FontAwesome, EvilIcons } from "@expo/vector-icons";

import { storage, db } from "../../firebase/config";
import { getFirestore, collection, addDoc } from "firebase/firestore";
import { uploadBytes, ref, getDownloadURL } from "firebase/storage";
import { async } from "@firebase/util";

const CreatePostsScreen = ({ navigation }) => {
  const [camera, setCamera] = useState(null);
  const [photo, setPhoto] = useState(null);
  const [comment, setComment] = useState("");
  const [isCameraReady, setIsCameraReady] = useState(false);
  const [location, setLocation] = useState(null);
  const [formValues, setFormValues] = useState({ title: "", location: "" });
  const [hasCamPermission, setHasCamPermission] = useState(false);
  const [hasLocationPermission, setHasLocationPermission] = useState(false);

  const { userID, username } = useSelector((store) => store.auth);

  const cameraRef = useRef();

  const cameraReady = () => {
    setCamera(!camera);
  };

  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();

      setHasCamPermission(status === "granted");

      const locationStatus = await Location.requestForegroundPermissionsAsync();
      if (locationStatus.status) {
        setHasLocationPermission(locationStatus.status === "granted");
      }
      let locationData = await Location.getCurrentPositionAsync({});
      setLocation(locationData);
    })();
  }, []);

  const takePhoto = async () => {
    if (camera && cameraRef) {
      try {
        // const photo = await cameraRef.current.takePictureAsync();
        const photo = await camera.takePictureAsync();
        setPhoto(photo.uri);
        cameraReady();

        let location = await Location.getCurrentPositionAsync({});
        const coords = {
          latitude: location.coords.latitude,
          longitude: location.coords.longitude,
        };
        setLocation(coords);
        console.log("foto", photo.uri);
        console.log("coords", coords);
        console.log("comment", comment);
        console.log(isCameraReady);
      } catch (error) {
        console.log("Failed to take photo", error);
      }
    } else {
      console.log("Camera is not ready yet");
    }
  };

  const uploadFotoToServer = async () => {
    const response = await fetch(photo);
    const file = await response.blob();
    const uniquePostId = Date.now().toString();
    const storageRef = ref(storage, `postImage/${uniquePostId}`);
    await uploadBytes(storageRef, file);
    const processedPhoto = await getDownloadURL(
      ref(storage, `postImage/${uniquePostId}`)
    );
    console.log("processedPhoto", processedPhoto);
    return processedPhoto;
  };

  const uploadPostToServer = async () => {
    const photo = await uploadFotoToServer();
    try {
      const db = getFirestore();

      const createPost = await addDoc(collection(db, "posts"), {
        userID,
        username,
        photo,
        location,
        comment,
      });
      console.log("Document written with ID: ", createPost.id);
    } catch (error) {
      console.error(error.message);
    }
  };

  const sendPhoto = () => {
    uploadPostToServer();
    console.log("navigation", navigation);
    navigation.navigate("DefaultScreen", { photo });
    setPhoto("");
  };

  return (
    <View style={styles.container}>
      <Camera
        style={styles.camera}
        ref={(ref) => setCamera(ref)}
        onCameraReady={cameraReady}
      >
        {photo && (
          <View style={styles.previewPhotoContainer}>
            <Image
              source={{ uri: photo }}
              style={{ height: 100, width: 100 }}
            />
          </View>
        )}
        <TouchableOpacity style={styles.icon} onPress={takePhoto}>
          <FontAwesome name="camera" size={20} color="#BDBDBD" />
        </TouchableOpacity>
      </Camera>
      <Text style={styles.postImgText}>Завантажте фото</Text>
      <View style={styles.postForm}>
        <TextInput
          style={styles.postName}
          placeholder="Назва..."
          onChangeText={setComment}
        />
        <TextInput style={styles.postNameLocation} placeholder="Локація" />
        <EvilIcons
          name="location"
          size={24}
          color="#BDBDBD"
          style={styles.postIcon}
        />
      </View>
      <View>
        {photo ? (
          <TouchableOpacity
            style={styles.buttonActive}
            activeOpacity={0.8}
            onPress={sendPhoto}
          >
            <Text style={styles.buttonTextActive}>Опубликовать</Text>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity
            style={styles.button}
            activeOpacity={0.8}
            onPress={sendPhoto}
          >
            <Text style={styles.buttonText}>Опубликовать</Text>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginHorizontal: 16,
  },
  camera: {
    height: "40%",
    marginTop: 32,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  icon: {
    width: 60,
    height: 60,
    backgroundColor: "rgba(255, 255, 255, 0.3)",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 50,
    zIndex: 1,
  },
  previewPhotoContainer: {
    position: "absolute",
    marginTop: 32,

    borderColor: "#fff",
    borderWidth: 1,
  },
  postImgText: {
    alignItems: "flex-start",
    color: "#808080",
    marginTop: 6,
  },
  postForm: {
    flex: 3,
  },
  postIcon: {
    marginTop: -35,
  },
  postName: {
    width: 343,
    height: 50,
    borderRadius: 8,
    marginTop: 23,
    padding: 16,
    fontStyle: "normal",
    fontWeight: "400",
    fontSize: 16,
    lineHeight: 19,
    borderBottomColor: "#E8E8E8",
    borderBottomWidth: 2,
  },
  postNameLocation: {
    width: 343,
    height: 50,
    borderRadius: 8,
    marginTop: 23,
    marginLeft: 10,
    padding: 16,
    fontStyle: "normal",
    fontWeight: "400",
    fontSize: 16,
    lineHeight: 19,
    borderBottomColor: "#E8E8E8",
    borderBottomWidth: 2,
  },

  button: {
    marginBottom: 111,
    backgroundColor: "#F6F6F6",
    height: 61,
    borderRadius: 100,
    justifyContent: "center",
    alignItems: "center",
  },
  buttonActive: {
    marginBottom: 111,
    backgroundColor: "#FF6C00",
    height: 61,
    borderRadius: 50,
    justifyContent: "center",
    alignItems: "center",
  },
  buttonText: {
    color: "#BDBDBD",
  },
  buttonTextActive: {
    color: "#fff",
  },
});
export default CreatePostsScreen;
