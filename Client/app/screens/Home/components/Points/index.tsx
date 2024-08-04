import React from "react";
import { View, StyleSheet } from "react-native";
import { Card, Text } from "react-native-paper";
import LottieView from "lottie-react-native";

const Points = () => {
  return (
    <Card style={styles.card}>
      <View style={styles.container}>
        <LottieView
          source={require("../../../../assets/animations/home/pointsAnimation.json")}
          autoPlay
          loop
          style={styles.animation}
        />
        <View style={styles.textContainer}>
          <Text style={styles.text}>Puanlar: 1200</Text>
        </View>
        <LottieView
          source={require("../../../../assets/animations/home/rankAnimation.json")}
          autoPlay
          loop
          style={styles.animation2}
        />
        <View style={styles.textContainer}>
          <Text style={styles.text}>Sıralama: 15</Text>
        </View>
      </View>
    </Card>
  );
};

const styles = StyleSheet.create({
  card: {
    margin: 12,
    borderRadius: 8,
    backgroundColor: "#f5f5f5",
  },
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  animation: {
    width: 75,
    height: 75,
  },
  animation2: {
    width: 50,
    height: 50,
    marginTop: 10,
  },
  textContainer: {
    flex: 1,
    alignItems: "center",
  },
  text: {
    fontSize: 14,
    fontWeight: "bold",
  },
});

export default Points;
