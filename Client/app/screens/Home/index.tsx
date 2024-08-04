import React from "react";
import { View, StyleSheet, Text } from "react-native";
import UserInfo from "./components/UserInfo";
import { useAuth } from "../../context/AuthContext";
import Loading from "@/app/components/Loading";
import Points from "./components/Points";
import Category from "./components/Category";

const Home = () => {
  const { user } = useAuth();

  if (!user) {
    return (
      <View style={styles.container}>
        <Loading message="Loading user information..." />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <UserInfo username={user.username} profilePicture={user.profilePicture} />
      <Points />
      <Text style={styles.heading}>Haydi Kategorilere Göz At</Text>
      <Category />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginVertical: 30,
  },
  heading: {
    fontSize: 18,
    fontWeight: "bold",
    fontFamily: "Roboto-Mono",
    letterSpacing: 0.1,
    textAlign: "left",
    marginLeft: 15,
  },
});

export default Home;
