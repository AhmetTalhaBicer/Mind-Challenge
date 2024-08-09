import React, { useState } from "react";
import {
  View,
  StyleSheet,
  Linking,
  Text,
  Modal,
  Pressable,
} from "react-native";
import { List, Divider, Button } from "react-native-paper";
import * as ImagePicker from "expo-image-picker";
import { useAuth } from "@/app/context/AuthContext";
import { postChangeProfilePicture } from "@/app/services/api/auth/endpoints";
import Toast from "react-native-toast-message";
import COLORS from "@/app/screens/Welcome/constants/color";
import useNotification from "@/app/hooks/useNotification";
import PasswordChangeModal from "./modal";
import { useNavigation } from "@react-navigation/native";

interface ProfileOptionsProps {
  setModalVisible: (visible: boolean) => void;
  modalVisible: boolean;
}

const ProfileOptions: React.FC<ProfileOptionsProps> = ({
  setModalVisible,
  modalVisible,
}) => {
  const { user, setUser, handleLogout } = useAuth();
  const navigation = useNavigation();
  const [loading, setLoading] = useState(false);
  const [passwordModalVisible, setPasswordModalVisible] = useState(false);
  const toastConfig = useNotification();

  const handleImagePick = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== "granted") {
      Toast.show({
        type: "error",
        text1: "Permission Required",
        text2: "The app needs permission to access your photos!",
      });
      return;
    }

    const pickerResult = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (
      !pickerResult.canceled &&
      pickerResult.assets &&
      pickerResult.assets.length > 0
    ) {
      await saveProfilePic(pickerResult.assets[0].uri);
    }
  };

  const saveProfilePic = async (uri: string) => {
    if (!user) return;

    try {
      setLoading(true);
      const response = await postChangeProfilePicture(Number(user.userId), uri);
      setUser((prev: any) => ({
        ...prev,
        profilePicture: response.profilePicture,
      }));
      Toast.show({
        type: "success",
        text1: "Success",
        text2: "Profile picture updated!",
      });
      setModalVisible(false); // Close the modal
    } catch (error) {
      console.error("Error updating profile picture:", error);
      Toast.show({
        type: "error",
        text1: "Error",
        text2: "Failed to update profile picture.",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleLogoutPress = () => {
    handleLogout();
    navigation.navigate("Welcome Screen" as never);
  };

  return (
    <View style={styles.container}>
      <PasswordChangeModal
        visible={passwordModalVisible}
        onClose={() => setPasswordModalVisible(false)}
      />
      <List.Section>
        <List.Item
          title="Change Profile Picture"
          titleStyle={styles.listItemTitle}
          left={() => <List.Icon icon="camera" color="#FFFFFF" />}
          onPress={() => setModalVisible(true)}
        />
        <Divider style={styles.divider} />
        <List.Item
          title="Change Password"
          titleStyle={styles.listItemTitle}
          left={() => <List.Icon icon="lock" color="#FFFFFF" />}
          onPress={() => setPasswordModalVisible(true)}
        />
        <Divider style={styles.divider} />
        <List.Item
          title="Invite Friends"
          titleStyle={styles.listItemTitle}
          left={() => <List.Icon icon="account-multiple" color="#FFFFFF" />}
          onPress={() => {
            Linking.openURL(
              "https://github.com/AhmetTalhaBicer/Mind-Challenge"
            );
          }}
        />
        <Divider style={styles.divider} />
        <List.Item
          title="Help & Support"
          titleStyle={styles.listItemTitle}
          left={() => <List.Icon icon="help-circle" color="#FFFFFF" />}
          onPress={() => {
            Linking.openURL("https://github.com/AhmetTalhaBicer");
          }}
        />
        <Divider style={styles.divider} />
        <List.Item
          title="Feedback"
          titleStyle={styles.listItemTitle}
          left={() => <List.Icon icon="message-text" color="#FFFFFF" />}
          onPress={() => {
            Linking.openURL(
              "https://github.com/AhmetTalhaBicer/Mind-Challenge/issues"
            );
          }}
        />
        <Divider style={styles.divider} />
        <Button
          mode="contained"
          style={styles.logoutButton}
          onPress={handleLogoutPress}
          icon="logout"
        >
          <Text style={styles.logoutText}>Logout</Text>
        </Button>
      </List.Section>

      {/* Modal for profile picture change */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalView}>
            <Text style={styles.modalText}>
              This app wants to access your gallery to select a profile picture.
              Do you allow it?
            </Text>
            <View style={styles.modalButtons}>
              <Pressable
                style={[styles.modalButton, styles.buttonCancel]}
                onPress={() => setModalVisible(false)}
              >
                <Text style={styles.textStyle}>No</Text>
              </Pressable>
              <Pressable
                style={[styles.modalButton, styles.buttonAccept]}
                onPress={handleImagePick}
              >
                <Text style={styles.textStyle}>Yes</Text>
              </Pressable>
            </View>
          </View>
        </View>
      </Modal>
      <Toast config={toastConfig} position="top" topOffset={20} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 10,
  },
  listItemTitle: {
    color: "#FFFFFF",
    fontSize: 18,
    fontFamily: "Roboto-Serif",
    margin: 15,
    marginTop: 10,
  },
  divider: {
    backgroundColor: "#333333",
  },
  logoutButton: {
    padding: 5,
    backgroundColor: "#1E3A8A",
  },
  logoutText: {
    color: "#FFFFFF",
    fontSize: 18,
    fontWeight: "bold",
    fontFamily: "Roboto-Mono",
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center",
    fontSize: 18,
    color: COLORS.black,
  },
  modalButtons: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
  },
  modalButton: {
    borderRadius: 10,
    padding: 10,
    elevation: 2,
    width: "45%",
    alignItems: "center",
  },
  buttonCancel: {
    backgroundColor: "red",
  },
  buttonAccept: {
    backgroundColor: COLORS.primary,
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
});

export default ProfileOptions;
