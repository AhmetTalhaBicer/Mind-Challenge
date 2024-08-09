import React from "react";
import { View, StyleSheet, Text } from "react-native";
import UserInfo from "./components/UserInfo";
import Points from "./components/Points";
import Category from "./components/Category";

const Home = () => {
  return (
    <View style={styles.container}>
      <UserInfo />
      <Points />
      <Text style={styles.heading}>Let's Browse Categories</Text>
      <Category />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#141414", // 1C1C1C = acık siyah
  },
  heading: {
    fontSize: 20,
    fontWeight: "bold",
    fontFamily: "Roboto-Mono",
    color: "#f5f5f5",
    letterSpacing: 0.1,
    textAlign: "left",
    marginLeft: 15,
  },
});

export default Home;
