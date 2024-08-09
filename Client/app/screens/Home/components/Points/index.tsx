import React, { useEffect, useState } from "react";
import { View, StyleSheet, Dimensions, Platform } from "react-native";
import { Card, Text } from "react-native-paper";
import LottieView from "lottie-react-native";
import { useAuth } from "@/app/context/AuthContext";
import {
  getUserStatisticsByUserId,
  getUserStatisticsTotalPoints,
} from "@/app/services/api/user-statistics/endpoints";
import { UserTotalPointsDTO } from "@/app/services/api/user-statistics/types";

const { width } = Dimensions.get("window");

const Points = () => {
  const { user } = useAuth();
  const [points, setPoints] = useState<number>(0);
  const [rank, setRank] = useState<number | null>(null);

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

    const fetchUserRank = async () => {
      if (user) {
        try {
          const response = await getUserStatisticsTotalPoints();
          const userTopStatistics = response.data.result;
          const userRank = userTopStatistics.findIndex(
            (u: UserTotalPointsDTO) => u.userId === user.userId
          );
          setRank(userRank);
        } catch (error) {
          console.error("Failed to fetch user rank", error);
        }
      }
    };

    fetchUserStatistics();
    fetchUserRank();
  }, [user]);

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
            <Text style={styles.labelText}>Points</Text>
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
            <Text style={styles.labelText}>Rank</Text>
            <Text style={styles.pointsText}>
              {rank !== null ? rank : "N/A"}
            </Text>
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
    justifyContent: "space-around",
    alignItems: "center",
    flexWrap: "wrap",
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
  },
  animation: {
    width: width * 0.2,
    height: width * 0.175,
    marginBottom: 15,
  },
  animation2: {
    width: width * 0.2,
    height: width * 0.12,
  },
  textContainer: {
    alignItems: "center",
    justifyContent: "center",
  },
  labelText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#CCCCCC",
    fontFamily: "Roboto-Mono",
  },
  pointsText: {
    fontSize: 18,
    fontWeight: "bold",
    fontFamily: "Roboto",
    color: "#3CADC8",
  },
});

export default Points;
