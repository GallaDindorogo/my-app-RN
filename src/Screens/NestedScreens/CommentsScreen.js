// import { async } from "@firebase/util";
import {
  addDoc,
  collection,
  doc,
  onSnapshot,
  orderBy,
  query,
} from "firebase/firestore";
import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  SafeAreaView,
  Image,
} from "react-native";
import { TextInput, TouchableOpacity } from "react-native-gesture-handler";

import { useSelector } from "react-redux";

import { db } from "../../firebase/config";

const CommentsScreen = ({ route }) => {
  const { postId } = route.params;
  const [comment, setComment] = useState("");
  const [comments, setComments] = useState([]);
  const [commentsCount, setCommentsCount] = useState(null);
  const { username, photoURL } = useSelector((state) => state.auth);

  useEffect(() => {
    getAllComments();
  }, []);

  const createPost = async () => {
    const date = new Date().toLocaleString();
    try {
      const postRef = doc(db, "posts", postId);
      await addDoc(collection(postRef, `comments`), {
        username,
        photoURL,
        comment,
        date,
      });
      setComment("");
    } catch (error) {
      console.log(error);
    }
  };

  const getAllComments = async () => {
    const docRef = doc(db, "posts", postId);
    const q = query(collection(docRef, `comments`), orderBy("date"));
    await onSnapshot(q, (data) => {
      const commentsData = data.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));
      setComments(commentsData);
      setCommentsCount(commentsData.length);
    });
  };

  return (
    <View style={styles.container}>
      <SafeAreaView style={styles.commentContainer}>
        <FlatList
          data={comments}
          renderItem={({ item }) => (
            <View style={styles.comment}>
              <Image source={{ uri: item.photoURL }} style={styles.avatar} />
              <Text style={styles.commentUser}>{item.username}</Text>
              <Text style={styles.commentText}>{item.comment}</Text>

              <Text style={styles.commentDate}>{item.date}</Text>
            </View>
          )}
          keyExtractor={(item) => item.id}
        />
      </SafeAreaView>

      <View style={styles.postForm}>
        <TextInput
          style={styles.postName}
          placeholder="Коментар..."
          onChangeText={(value) => setComment(value)}
        />
      </View>
      <View>
        <TouchableOpacity
          style={styles.buttonActive}
          activeOpacity={0.8}
          onPress={createPost}
        >
          <Text style={styles.buttonTextActive}>Додати пост</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-end",
    marginHorizontal: 16,
  },
  commentContainer: {
    display: "flex",
    flexDirection: "row",
    padding: 10,
    margin: 10,
    marginBottom: 130,
  },

  postForm: {
    width: "100%",
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    marginTop: 20,
    marginBottom: 16,
  },
  postName: {
    width: 343,
    height: 50,
    borderRadius: 8,
    marginBottom: 111,
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
    marginBottom: 20,
    backgroundColor: "#F6F6F6",
    height: 61,
    borderRadius: 100,
    justifyContent: "center",
    alignItems: "center",
  },
  buttonActive: {
    marginBottom: 20,
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
  avatar: {
    width: 28,
    height: 28,
    borderRadius: 50,
    marginRight: 16,
  },
  comment: {
    backgroundColor: "rgba(0, 0, 0, 0.02)",
    borderWidth: 1,
    borderColor: `#e6e6fa`,
    borderRadius: 4,
    margin: 5,
  },
  commentText: {
    // fontFamily: "Roboto-Regulat",
    fontSize: 12,
    paddingHorizontal: 10,
    marginBottom: 8,
  },
  commentUser: {
    // fontFamily: "Roboto-Regulat",
    fontSize: 14,
    color: `#0000ff`,
    paddingHorizontal: 10,
    marginBottom: 8,
  },
  commentDate: {
    // fontFamily: "Roboto-Regulat",
    fontSize: 10,
    color: "#483d8b",
    textAlign: "right",
    marginRight: 10,
  },
});
export default CommentsScreen;
