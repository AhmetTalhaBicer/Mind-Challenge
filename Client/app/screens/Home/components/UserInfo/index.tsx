import React from "react";
import { View, StyleSheet } from "react-native";
import { Avatar, Text } from "react-native-paper";

interface UserInfoProps {
  username: string;
  profilePicture: string;
}

const UserInfo: React.FC<UserInfoProps> = ({ username, profilePicture }) => {
  return (
    <View style={styles.container}>
      <View style={styles.textContainer}>
        <Text style={styles.greeting}>Merhaba, {username}</Text>
        <Text style={styles.subtitle}>Mind Challenge'a Hoşgeldiniz!</Text>
      </View>
      <Avatar.Image
        source={{ uri: profilePicture }}
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
  },
  textContainer: {
    flexDirection: "column",
  },
  profilePicture: {},
  greeting: {
    fontSize: 20,
    color: "black",
    fontWeight: "900",
    fontFamily: "Roboto-Serif",
  },
  subtitle: {
    marginVertical: 5,
    fontSize: 14,
    fontFamily: "Roboto-Mono",
    color: "gray",
  },
});

export default UserInfo;
