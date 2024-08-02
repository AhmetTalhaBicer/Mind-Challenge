import { View, Text, StyleSheet } from "react-native";
import React from "react";

const Login = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Giriş Ekranı</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f5f5f5",
  },
  text: {
    fontSize: 20,
    color: "#333",
  },
});

export default Login;
