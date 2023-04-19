import React from "react";
import { useState, useEffect } from "react";
import { View, StyleSheet, FlatList, Image, Button, Text } from "react-native";

import { db } from "../../firebase/config";
import { collection, query, onSnapshot, orderBy } from "firebase/firestore";

const DefaultScreenPosts = ({ route, navigation }) => {
  const [posts, setPosts] = useState([]);
  console.log("route", route.params);

  useEffect(() => {
    const q = query(collection(db, "posts"));
    const unsubscribe = onSnapshot(q, (data) => {
      const posts = data.docs.map((post) => ({
        ...post.data(),
        id: post.id,
      }));
      setPosts(posts);
    });
    return () => {
      unsubscribe();
    };
  }, []);

  console.log("new posts", posts);

  return (
    <View style={styles.container}>
      <FlatList
        data={posts}
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
            <View>
              <Text>{item.comment}</Text>
            </View>
            <View>
              <Button
                title="Location"
                onPress={() =>
                  navigation.navigate("Map", { location: item.location })
                }
              />
              <Button
                title="Comments"
                onPress={() =>
                  navigation.navigate("Comments", { postId: item.id })
                }
              />
            </View>
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

export default DefaultScreenPosts;
