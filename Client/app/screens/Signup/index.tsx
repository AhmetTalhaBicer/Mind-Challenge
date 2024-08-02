import React, { useState } from "react";
import { useForm, Controller, SubmitHandler } from "react-hook-form";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  Pressable,
  ActivityIndicator,
  SafeAreaView,
  Image,
} from "react-native";
import { useAuth } from "../../context/AuthContext";
import { useNavigation } from "@react-navigation/native";
import Icon from "react-native-vector-icons/FontAwesome";
import COLORS from "../Home/constants/color";
import * as ImagePicker from "expo-image-picker";
import { postProfilePic } from "@/app/services/api/auth/endpoints";

const profileplaceholder = require("../../assets/edit-profile.png");
const PROFILE_PIC_SIZE = 170;

interface SignupFormInputs {
  username: string;
  password: string;
  ProfilePicture: string;
  biography?: string;
}

const SignupForm = () => {
  const { handleSignup } = useAuth();
  const [loading, setLoading] = useState(false);
  const [profilePicture, setProfilePicture] = useState<string | undefined>();
  const navigation = useNavigation();
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<SignupFormInputs>();

  const onSubmit: SubmitHandler<SignupFormInputs> = async (data) => {
    try {
      setLoading(true);
      let profilePictureUrl =
        profilePicture ||
        "https://th.bing.com/th/id/OIP.audMX4ZGbvT2_GJTx2c4GgHaHw?rs=1&pid=ImgDetMain";

      if (profilePicture) {
        profilePictureUrl = await postProfilePic(profilePicture);
      }

      const formData = { ...data, ProfilePicture: profilePictureUrl };
      console.log("Submitting form data:", formData);
      await handleSignup(formData);
      navigation.navigate("Giriş Ekranı" as never);
    } catch (error) {
      console.error("Signup error:", error);
    } finally {
      setLoading(false);
    }
  };

  const selectProfilePic = async () => {
    const permissionResult =
      await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (permissionResult.granted === false) {
      alert("Uygulamanın fotoğraflarınıza erişim izni gerekiyor!");
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
        <Text style={styles.header}>Profil Oluştur</Text>
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
          <Icon name="user" size={26} color={COLORS.black} />
          <Controller
            control={control}
            rules={{ required: "Kullanıcı adı gerekli" }}
            render={({ field: { onChange, onBlur, value } }) => (
              <TextInput
                placeholder="Kullanıcı Adı"
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
          <Icon name="lock" size={26} color={COLORS.black} />
          <Controller
            control={control}
            rules={{
              required: "Şifre gerekli",
              minLength: {
                value: 3,
                message: "Şifre en az 3 karakter olmalıdır",
              },
            }}
            render={({ field: { onChange, onBlur, value } }) => (
              <TextInput
                placeholder="Şifre"
                secureTextEntry
                style={styles.textInput}
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
              />
            )}
            name="password"
          />
          {errors.password && (
            <Text style={styles.errorText}>{errors.password.message}</Text>
          )}
        </View>
        <View style={styles.inputContainer}>
          <Icon name="pencil" size={26} color={COLORS.black} />
          <Controller
            control={control}
            render={({ field: { onChange, onBlur, value } }) => (
              <TextInput
                placeholder="Hakkında... (isteğe bağlı)"
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
            <ActivityIndicator size="large" color={COLORS.primary} />
          ) : (
            <Pressable style={styles.button} onPress={handleSubmit(onSubmit)}>
              <Text style={styles.buttonText}>Profil Oluştur</Text>
            </Pressable>
          )}
          <View style={styles.footer}>
            <Text style={styles.footerText}>Zaten bir hesabınız var mı?</Text>
            <Pressable
              onPress={() => navigation.navigate("Giriş Ekranı" as never)}
            >
              <Text style={styles.linkText}>Giriş Yap</Text>
            </Pressable>
          </View>
        </View>
      </View>
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
    marginVertical: 36,
    color: COLORS.black,
    textAlign: "center",
  },
  profilePicContainer: {
    alignItems: "center",
    marginBottom: 20,
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
    borderColor: COLORS.black,
    borderWidth: 1,
    borderRadius: 8,
    marginBottom: 10,
    paddingLeft: 22,
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
});

export default SignupForm;
