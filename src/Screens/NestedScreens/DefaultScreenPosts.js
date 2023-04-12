import React from "react";
import { useState, useEffect } from "react";
import { View, StyleSheet, FlatList, Image, Button, Text } from "react-native";

const DefaultScreenPosts = ({ route, navigation }) => {
  const [posts, setPosts] = useState([]);
  console.log("route", route.params);

  useEffect(() => {
    if (route.params) {
      setPosts((prevState) => [...prevState, route.params]);
    }
  }, [route.params]);
  console.log("posts", posts);

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
          </View>
        )}
      />
      <Button title="Location" onPress={() => navigation.navigate("Map")} />
      <Button
        title="Comments"
        onPress={() => navigation.navigate("Comments")}
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
