import React, { useState, useEffect } from "react";
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
  phoneNumber: string;
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
      phoneNumber: "",
      password: "",
    },
  });

  useEffect(() => {
    if (showSuccessAnimation) {
      const timer = setTimeout(() => {
        setShowSuccessAnimation(false);
      }, 3000); // 3 saniye boyunca animasyon gösterilir
      return () => clearTimeout(timer);
    }
  }, [showSuccessAnimation]);

  const onSubmit: SubmitHandler<LoginFormInputs> = async (data) => {
    try {
      setLoading(true);
      await handleLogin(data);
      setShowSuccessAnimation(true);
    } catch (error) {
      console.error("Login error:", error);
      Toast.show({
        type: "error",
        text1: "Error",
        text2: "Login failed!",
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
              onAnimationFinish={() => navigation.navigate("MainTabs" as never)}
            />
          </View>
        ) : (
          <>
            <Text style={styles.header}>Login</Text>
            <View style={styles.animationContainer}>
              <LottieView
                source={loginAnimation}
                autoPlay
                loop
                style={styles.loginAnimation}
              />
            </View>
            <View style={styles.inputContainer}>
              <Icon name="phone" size={26} color={COLORS.primary} />
              <Controller
                control={control}
                rules={{ required: "Phone number is required" }}
                render={({ field: { onChange, onBlur, value } }) => (
                  <TextInput
                    placeholder="Phone number"
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
                <Text style={styles.errorText}>
                  {errors.phoneNumber.message}
                </Text>
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

            <View style={styles.bottomContainer}>
              {loading ? (
                <Loading message="Logging in..." />
              ) : (
                <Pressable
                  style={styles.button}
                  onPress={handleSubmit(onSubmit)}
                >
                  <Text style={styles.buttonText}>Login</Text>
                </Pressable>
              )}
              <View style={styles.footer}>
                <Text style={styles.footerText}>Don't have an account?</Text>
                <Pressable
                  onPress={() => navigation.navigate("Signup Screen" as never)}
                >
                  <Text style={styles.linkText}>Sign up</Text>
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
    color: COLORS.primary,
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
    borderColor: COLORS.primary,
    borderWidth: 1,
    borderRadius: 8,
    paddingLeft: 20,
    marginBottom: 15,
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
