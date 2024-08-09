import { View, Image, Text, Pressable, StyleSheet } from "react-native";
import React from "react";
import { LinearGradient } from "expo-linear-gradient";
import COLORS from "./constants/color";
import { NavigationProp } from "@react-navigation/native";
import WelcomeButton from "./components/HomeButton";

const Welcome = ({ navigation }: { navigation: NavigationProp<any> }) => {
  return (
    <LinearGradient
      colors={[COLORS.secondary, COLORS.primary]}
      style={{ flex: 1 }}
    >
      <View style={{ flex: 1 }}>
        <View>
          <Image
            source={require("../../assets/welcome/science.png")}
            style={styles.image1}
          />
          <Image
            source={require("../../assets/welcome/kupa1.png")}
            style={styles.image2}
          />
          <Image
            source={require("../../assets/welcome/podium1.png")}
            style={styles.image3}
          />
          <Image
            source={require("../../assets/welcome/philosophy.png")}
            style={styles.image4}
          />
        </View>

        <View style={styles.welcomeContainer}>
          <Text style={styles.title}>Welcome to </Text>
          <Text style={styles.subtitle}>Mind Challenge</Text>

          <View style={styles.textContainer}>
            <Text style={styles.description}>
              Test your knowledge and have fun
            </Text>
            <Text style={styles.description}>
              Answer questions, increase your score
            </Text>
            <Text style={styles.description}>
              and compete with other players
            </Text>
          </View>
        </View>
      </View>
      <WelcomeButton
        title="Create Profile Now"
        onPress={() => navigation.navigate("Signup Screen")}
        style={styles.button}
      />

      <View style={styles.loginContainer}>
        <Text style={styles.loginText}>Already have an account?</Text>
        <Pressable onPress={() => navigation.navigate("Login Screen")}>
          <Text style={styles.loginButton}>Log In</Text>
        </Pressable>
      </View>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  image1: {
    width: 100,
    height: 100,
    borderRadius: 20,
    position: "absolute",
    top: 8,
    transform: [{ translateX: 20 }, { translateY: 50 }, { rotate: "-15deg" }],
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  image2: {
    width: 100,
    height: 100,
    borderRadius: 20,
    position: "absolute",
    top: -10,
    left: 100,
    transform: [{ translateX: 50 }, { translateY: 50 }, { rotate: "-5deg" }],
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  image3: {
    width: 100,
    height: 100,
    borderRadius: 20,
    position: "absolute",
    top: 130,
    left: -35,
    transform: [{ translateX: 50 }, { translateY: 50 }, { rotate: "15deg" }],
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  image4: {
    width: 200,
    height: 200,
    borderRadius: 20,
    position: "absolute",
    top: 110,
    left: 100,
    transform: [{ translateX: 50 }, { translateY: 50 }, { rotate: "-15deg" }],
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  welcomeContainer: {
    paddingHorizontal: 22,
    position: "absolute",
    top: 400,
    width: "100%",
  },
  title: {
    fontSize: 50,
    fontWeight: "800",
    color: COLORS.white,
    fontFamily: "Roboto-Mono",
    letterSpacing: 1.3,
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 46,
    fontWeight: "bold",
    color: COLORS.white,
    fontFamily: "Roboto",
    letterSpacing: 0.8,
  },
  textContainer: {
    marginVertical: 8,
  },
  description: {
    fontSize: 16,
    color: COLORS.white,
    marginVertical: 6,
    fontFamily: "Roboto-Serif",
    letterSpacing: 0.3,
  },
  button: {
    marginTop: 16,
    alignSelf: "center",
    width: "90%",
  },
  loginContainer: {
    flexDirection: "row",
    marginTop: 8,
    justifyContent: "center",
  },
  loginText: {
    marginBottom: 20,
    color: COLORS.white,
    fontSize: 16,
    fontFamily: "Roboto",
    letterSpacing: 0.5,
  },
  loginButton: {
    color: COLORS.white,
    fontSize: 16,
    fontWeight: "bold",
    marginLeft: 5,
    fontFamily: "Roboto",
  },
});

export default Welcome;
