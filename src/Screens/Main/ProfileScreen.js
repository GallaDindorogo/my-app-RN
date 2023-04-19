import React from "react";
import { useEffect, useState } from "react";
import { View, Text, StyleSheet, Button, FlatList, Image } from "react-native";
import { useDispatch, useSelector } from "react-redux";

import { authSignOutUser } from "../../Redux/auth/authOperation";

import { db } from "../../firebase/config";
import { async } from "@firebase/util";
import {
  collection,
  query,
  where,
  getDocs,
  onSnapshot,
} from "firebase/firestore";

const ProfileScreen = () => {
  const dispatch = useDispatch();
  const { userID } = useSelector((state) => state.auth);
  const [userPosts, setUserPosts] = useState(null);

  useEffect(() => {
    getUserPost();
  }, []);

  const getUserPost = async () => {
    const userPostsRef = collection(db, "posts");
    const q = query(userPostsRef, where("userID", "==", userID));

    await onSnapshot(q, (querySnapshot) => {
      const userPosts = querySnapshot.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));
      setUserPosts(userPosts);
    });

    // const querySnapshot = await getDocs(q);
    // querySnapshot.forEach((doc) => {
    //   console.log(doc.id, " => ", doc.data());
    // });
  };

  const signOut = () => {
    dispatch(authSignOutUser());
  };

  return (
    <View style={styles.container}>
      <Button title="signOut" onPress={signOut} />

      <FlatList
        data={userPosts}
        keyExtractor={(item, indx) => indx.toString()}
        renderItem={({ item }) => (
          <View
            style={{
              marginBottom: 10,
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Image
              source={{ uri: item.photo }}
              style={{ width: 350, height: 200, borderRadius: 10 }}
            ></Image>
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
export default ProfileScreen;
