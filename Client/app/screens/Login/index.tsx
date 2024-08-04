import React, { useState } from "react";
import { useForm, Controller, SubmitHandler } from "react-hook-form";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  Pressable,
  SafeAreaView,
} from "react-native";
import { useAuth } from "../../context/AuthContext";
import { useNavigation } from "@react-navigation/native";
import Icon from "react-native-vector-icons/FontAwesome";
import COLORS from "../Welcome/constants/color";
import LottieView from "lottie-react-native";
import Toast from "react-native-toast-message";
import useNotification from "@/app/hooks/useNotification";
import Loading from "@/app/components/Loading";

interface LoginFormInputs {
  username: string;
  password: string;
}

const loginAnimation = require("../../assets/animations/auth/loginAnimation.json");
const successAnimation = require("../../assets/animations/auth/successAnimation.json");

const LoginForm = () => {
  const { handleLogin } = useAuth();
  const toastConfig = useNotification();
  const [loading, setLoading] = useState(false);
  const [showSuccessAnimation, setShowSuccessAnimation] = useState(false);
  const [passwordVisible, setPasswordVisible] = useState(false);
  const navigation = useNavigation();
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormInputs>({
    defaultValues: {
      username: "",
      password: "",
    },
  });

  const onSubmit: SubmitHandler<LoginFormInputs> = async (data) => {
    try {
      setLoading(true);
      await handleLogin(data);
      setShowSuccessAnimation(true);
      setTimeout(() => {
        setShowSuccessAnimation(false);
        navigation.navigate("MainTabs" as never);
      }, 3000);
    } catch (error) {
      console.error("Login error:", error);
      Toast.show({
        type: "error",
        text1: "Hata",
        text2: "Giriş başarısız!",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        {showSuccessAnimation ? (
          <View style={styles.successAnimationContainer}>
            <LottieView
              source={successAnimation}
              autoPlay
              loop={false}
              style={styles.successAnimation}
            />
          </View>
        ) : (
          <>
            <Text style={styles.header}>Giriş Yap</Text>
            <View style={styles.animationContainer}>
              <LottieView
                source={loginAnimation}
                autoPlay
                loop
                style={styles.loginAnimation}
              />
            </View>
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

            <View style={styles.bottomContainer}>
              {loading ? (
                <Loading message="Giriş yapılıyor..." />
              ) : (
                <Pressable
                  style={styles.button}
                  onPress={handleSubmit(onSubmit)}
                >
                  <Text style={styles.buttonText}>Giriş Yap</Text>
                </Pressable>
              )}
              <View style={styles.footer}>
                <Text style={styles.footerText}>Hesabınız yok mu?</Text>
                <Pressable
                  onPress={() => navigation.navigate("Kayıt Ekranı" as never)}
                >
                  <Text style={styles.linkText}>Kayıt Ol</Text>
                </Pressable>
              </View>
            </View>
          </>
        )}
      </View>
      <Toast config={toastConfig} position="top" topOffset={20} />
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
  animationContainer: {
    alignItems: "center",
  },
  loginAnimation: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    width: 300,
    height: 300,
  },
  successAnimationContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  successAnimation: {
    width: 450,
    height: 450,
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    width: "100%",
    height: 60,
    borderColor: COLORS.black,
    borderWidth: 1,
    borderRadius: 8,
    paddingLeft: 20,
    marginBottom: 0,
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

export default LoginForm;
