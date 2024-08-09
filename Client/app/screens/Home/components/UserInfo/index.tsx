import React from "react";
import { View, StyleSheet } from "react-native";
import { Avatar, Text } from "react-native-paper";
import { useAuth } from "@/app/context/AuthContext";
import Loading from "@/app/components/Loading";

const UserInfo: React.FC = () => {
  const { user } = useAuth();

  if (!user) {
    return <Loading message="Loading user information..." />;
  }

  return (
    <View style={styles.container}>
      <View style={styles.textContainer}>
        <Text style={styles.greeting}>Hi, {user.username}</Text>
        <Text style={styles.subtitle}>Welcome to Mind Challenge!</Text>
      </View>
      <Avatar.Image
        source={{ uri: user.profilePicture }}
        size={70}
        style={styles.profilePicture}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 10,
    marginVertical: 25,
  },
  textContainer: {
    flexDirection: "column",
  },
  profilePicture: {
    backgroundColor: "#f5f5f5",
  },
  greeting: {
    fontSize: 20,
    color: "#f5f5f5",
    fontWeight: "900",
    fontFamily: "Roboto-Serif",
    letterSpacing: 1.5,
  },
  subtitle: {
    marginVertical: 5,
    fontSize: 14,
    fontFamily: "Roboto-Mono",
    color: "#CCCCCC",
    letterSpacing: 0.5,
  },
});

export default UserInfo;
