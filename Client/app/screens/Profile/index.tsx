import React, { useState } from "react";
import { View, StyleSheet } from "react-native";
import ProfileAvatar from "./components/Picture";
import ProfileOptions from "./components/Options";

const ProfileScreen = () => {
  const [modalVisible, setModalVisible] = useState(false);

  return (
    <View style={styles.container}>
      <ProfileAvatar />
      <ProfileOptions
        modalVisible={modalVisible}
        setModalVisible={setModalVisible}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#1C1C1C",
  },
});

export default ProfileScreen;
