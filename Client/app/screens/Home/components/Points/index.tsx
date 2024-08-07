import React, { useEffect, useState } from "react";
import { View, StyleSheet, Dimensions, Platform } from "react-native";
import { Card, Text } from "react-native-paper";
import LottieView from "lottie-react-native";
import { useAuth } from "@/app/context/AuthContext";
import { getUserStatisticsByUserId } from "@/app/services/api/user-statistics/endpoints";

const { width } = Dimensions.get("window");

const Points = () => {
  const { user } = useAuth();
  const [points, setPoints] = useState<number | null>(null);

  useEffect(() => {
    const fetchUserStatistics = async () => {
      if (user) {
        try {
          const response = await getUserStatisticsByUserId(Number(user.userId));
          const userStats = response.data;
          setPoints(userStats.result[0].totalPoints);
        } catch (error) {
          console.error("Failed to fetch user statistics", error);
        }
      }
    };

    fetchUserStatistics();
  }, [user]);

  if (points === null) {
    return (
      <Card style={styles.card}>
        <View style={styles.centeredContainer}>
          <Text style={styles.loadingText}>Loading...</Text>
        </View>
      </Card>
    );
  }

  return (
    <Card style={styles.card}>
      <View style={styles.rowContainer}>
        <View style={styles.infoContainer}>
          {Platform.OS !== "web" && (
            <LottieView
              source={require("../../../../assets/animations/home/pointsAnimation.json")}
              autoPlay
              loop
              style={styles.animation}
            />
          )}
          <View style={styles.textContainer}>
            <Text style={styles.labelText}>Puan</Text>
            <Text style={styles.pointsText}>{points}</Text>
          </View>
        </View>
        <View style={styles.verticalLine} />
        <View style={styles.infoContainer}>
          {Platform.OS !== "web" && (
            <LottieView
              source={require("../../../../assets/animations/home/rankAnimation.json")}
              autoPlay
              loop
              style={styles.animation2}
            />
          )}
          <View style={styles.textContainer}>
            <Text style={styles.labelText}>Sıralama</Text>
            <Text style={styles.pointsText}>15</Text>
          </View>
        </View>
      </View>
    </Card>
  );
};

const styles = StyleSheet.create({
  card: {
    margin: 10,
    borderRadius: 8,
    backgroundColor: "#323232",
    elevation: 3,
  },
  centeredContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  loadingText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
  },
  rowContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    flexWrap: "wrap",
    margin: 10,
  },
  infoContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  verticalLine: {
    width: 1,
    height: "70%",
    backgroundColor: "#CCCCCC",
    marginHorizontal: 10,
  },
  animation: {
    width: width * 0.2,
    height: width * 0.2,
    marginHorizontal: 10,
  },
  animation2: {
    width: width * 0.1,
    height: width * 0.1,
    marginTop: 15,
  },
  textContainer: {
    alignItems: "center",
    justifyContent: "center",
  },
  labelText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#CCCCCC",
  },
  pointsText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#3CADC8",
  },
});

export default Points;
