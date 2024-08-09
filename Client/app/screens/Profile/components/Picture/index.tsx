import React from "react";
import { View, StyleSheet, Text } from "react-native";
import { Avatar } from "react-native-paper";
import { useAuth } from "@/app/context/AuthContext";
import Loading from "@/app/components/Loading";

const ProfileAvatar: React.FC = ({}) => {
  const { user } = useAuth();

  if (!user) {
    return <Loading message="Loading user information..." />;
  }

  return (
    <View style={styles.container}>
      <Avatar.Image
        size={180}
        source={{ uri: user.profilePicture }}
        style={styles.avatar}
      />
      <Text style={styles.username}>{user.username}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    marginVertical: 25,
  },
  avatar: {
    backgroundColor: "#1E3A8A",
  },
  username: {
    marginTop: 5,
    fontSize: 26,
    fontFamily: "Roboto-Serif",
    letterSpacing: 0.5,
    color: "#FFFFFF",
  },
});

export default ProfileAvatar;
