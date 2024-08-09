import React, { useState } from "react";
import { useForm, Controller, SubmitHandler } from "react-hook-form";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  Pressable,
  SafeAreaView,
  Image,
  Modal,
  Platform,
} from "react-native";
import { useAuth } from "../../context/AuthContext";
import { useNavigation } from "@react-navigation/native";
import Icon from "react-native-vector-icons/FontAwesome";
import * as ImagePicker from "expo-image-picker";
import { postProfilePic } from "@/app/services/api/auth/endpoints";
import COLORS from "../Welcome/constants/color";
import useNotification from "@/app/hooks/useNotification";
import Toast from "react-native-toast-message";
import Loading from "@/app/components/Loading";

const profileplaceholder = require("../../assets/auth/edit-profile.png");
const PROFILE_PIC_SIZE = 170;

interface SignupFormInputs {
  username: string;
  password: string;
  phoneNumber: string;
  ProfilePicture?: string;
  biography?: string;
}

const SignupForm = () => {
  const { handleSignup } = useAuth();
  const toastConfig = useNotification();
  const [loading, setLoading] = useState(false);
  const [profilePicture, setProfilePicture] = useState<string | undefined>();
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const navigation = useNavigation();
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<SignupFormInputs>();

  const onSubmit: SubmitHandler<SignupFormInputs> = async (data) => {
    try {
      setLoading(true);
      let profilePictureUrl = profilePicture || "default.jpeg";

      if (profilePicture && profilePicture !== "default.jpeg") {
        profilePictureUrl = await postProfilePic(profilePicture);
      }

      const formData = { ...data, ProfilePicture: profilePictureUrl };
      await handleSignup(formData);
      navigation.navigate("Login Screen" as never);
      Toast.show({
        type: "success",
        text1: "Success",
        text2: "Signup successful!",
      });
    } catch (error) {
      console.error("Signup error:", error);
      Toast.show({
        type: "error",
        text1: "Error",
        text2: "Signup failed!",
      });
    } finally {
      setLoading(false);
    }
  };

  const selectProfilePic = async () => {
    if (Platform.OS === "web") {
      const input = document.createElement("input");
      input.type = "file";
      input.accept = "image/*";
      input.onchange = async (event: any) => {
        const file = event.target.files[0];
        if (file) {
          const reader = new FileReader();
          reader.onload = () => {
            saveProfilePic(reader.result as string);
          };
          reader.readAsDataURL(file);
        }
      };
      input.click();
    } else {
      setModalVisible(true);
    }
  };

  const handleGalleryPermission = async (grant: boolean) => {
    setModalVisible(false);
    if (grant) {
      const { status } =
        await ImagePicker.requestMediaLibraryPermissionsAsync();
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
        saveProfilePic(pickerResult.assets[0].uri);
      }
    }
  };

  const saveProfilePic = (profilePicture: string) => {
    try {
      setProfilePicture(profilePicture);
      console.log("Selected profile picture URL:", profilePicture);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <Text style={styles.header}>Create Profile</Text>
        <Pressable
          onPress={selectProfilePic}
          style={styles.profilePicContainer}
        >
          <Image
            source={
              profilePicture ? { uri: profilePicture } : profileplaceholder
            }
            style={styles.profilePic}
          />
        </Pressable>
        <View style={styles.inputContainer}>
          <Icon name="phone" size={26} color={COLORS.primary} />
          <Controller
            control={control}
            rules={{ required: "Phone number is required" }}
            render={({ field: { onChange, onBlur, value } }) => (
              <TextInput
                placeholder="Phone Number"
                style={styles.textInput}
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
                keyboardType="phone-pad"
              />
            )}
            name="phoneNumber"
          />
          {errors.phoneNumber && (
            <Text style={styles.errorText}>{errors.phoneNumber.message}</Text>
          )}
        </View>
        <View style={styles.inputContainer}>
          <Icon name="user" size={26} color={COLORS.primary} />
          <Controller
            control={control}
            rules={{ required: "Username is required" }}
            render={({ field: { onChange, onBlur, value } }) => (
              <TextInput
                placeholder="Username"
                style={styles.textInput}
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
              />
            )}
            name="username"
          />
          {errors.username && (
            <Text style={styles.errorText}>{errors.username.message}</Text>
          )}
        </View>
        <View style={styles.inputContainer}>
          <Icon name="lock" size={26} color={COLORS.primary} />
          <Controller
            control={control}
            rules={{
              required: "Password is required",
              minLength: {
                value: 3,
                message: "Password must be at least 3 characters",
              },
            }}
            render={({ field: { onChange, onBlur, value } }) => (
              <TextInput
                placeholder="Password"
                secureTextEntry={!passwordVisible}
                style={styles.textInput}
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
              />
            )}
            name="password"
          />
          <Pressable onPress={() => setPasswordVisible(!passwordVisible)}>
            <Icon
              name={passwordVisible ? "eye" : "eye-slash"}
              size={24}
              color={COLORS.black}
              style={{ marginRight: 15 }}
            />
          </Pressable>
          {errors.password && (
            <Text style={styles.errorText}>{errors.password.message}</Text>
          )}
        </View>
        <View style={styles.inputContainer}>
          <Icon name="pencil" size={26} color={COLORS.primary} />
          <Controller
            control={control}
            render={({ field: { onChange, onBlur, value } }) => (
              <TextInput
                placeholder="About... (optional)"
                style={styles.textInput}
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
              />
            )}
            name="biography"
          />
        </View>
        <View style={styles.bottomContainer}>
          {loading ? (
            <Loading message="Creating profile..." />
          ) : (
            <Pressable style={styles.button} onPress={handleSubmit(onSubmit)}>
              <Text style={styles.buttonText}>Create Profile</Text>
            </Pressable>
          )}
          <View style={styles.footer}>
            <Text style={styles.footerText}>Already have an account?</Text>
            <Pressable
              onPress={() => navigation.navigate("Login Screen" as never)}
            >
              <Text style={styles.linkText}>Log In</Text>
            </Pressable>
          </View>
        </View>
      </View>
      <Toast config={toastConfig} position="top" topOffset={20} />

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
                onPress={() => handleGalleryPermission(false)}
              >
                <Text style={styles.textStyle}>No</Text>
              </Pressable>
              <Pressable
                style={[styles.modalButton, styles.buttonAccept]}
                onPress={() => handleGalleryPermission(true)}
              >
                <Text style={styles.textStyle}>Yes</Text>
              </Pressable>
            </View>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  container: {
    flex: 1,
    marginHorizontal: 22,
    justifyContent: "space-between",
  },
  header: {
    fontSize: 36,
    fontWeight: "bold",
    fontFamily: "Roboto-Mono",
    marginVertical: 20,
    color: COLORS.black,
    textAlign: "center",
  },
  profilePicContainer: {
    alignItems: "center",
    marginBottom: 10,
  },
  profilePic: {
    width: PROFILE_PIC_SIZE,
    height: PROFILE_PIC_SIZE,
    borderRadius: PROFILE_PIC_SIZE / 2,
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    width: "100%",
    height: 60,
    borderColor: COLORS.primary,
    borderWidth: 1,
    borderRadius: 12,
    marginBottom: 10,
    paddingLeft: 20,
  },
  textInput: {
    flex: 1,
    marginLeft: 10,
    fontSize: 16,
    color: COLORS.black,
  },
  errorText: {
    color: "red",
    marginLeft: 10,
  },
  bottomContainer: {
    flexDirection: "column",
    justifyContent: "flex-end",
  },
  button: {
    backgroundColor: COLORS.primary,
    padding: 16,
    borderRadius: 8,
    alignItems: "center",
  },
  buttonText: {
    color: COLORS.white,
    fontSize: 20,
    fontWeight: "bold",
    fontFamily: "Roboto-Serif",
  },
  footer: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 12,
  },
  footerText: {
    color: COLORS.black,
    fontSize: 15,
    marginBottom: 12,
  },
  linkText: {
    color: COLORS.primary,
    marginLeft: 4,
    fontSize: 15,
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

export default SignupForm;
