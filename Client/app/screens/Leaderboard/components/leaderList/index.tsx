import {
  getUserStatisticsByCategoryId,
  getUserStatisticsTotalPoints,
} from "@/app/services/api/user-statistics/endpoints";
import {
  UserStatisticsDTO,
  UserTotalPointsDTO,
} from "@/app/services/api/user-statistics/types";
import { baseURL } from "@/app/services/base";
import React, { useEffect, useState } from "react";
import { View, StyleSheet } from "react-native";
import { Text, Card, Avatar } from "react-native-paper";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";

interface LeaderListProps {
  categoryId: number | null;
}

const LeaderList: React.FC<LeaderListProps> = ({ categoryId }) => {
  const [leaders, setLeaders] = useState<
    (UserStatisticsDTO | UserTotalPointsDTO)[]
  >([]);

  useEffect(() => {
    if (categoryId === null) {
      return;
    }

    const fetchTopListLeaders = async () => {
      try {
        let userTopStatistics: UserTotalPointsDTO[] = [];
        const response = await getUserStatisticsTotalPoints();
        userTopStatistics = response.data.result;
        userTopStatistics = userTopStatistics.sort(
          (a: UserTotalPointsDTO, b: UserTotalPointsDTO) =>
            b.totalPoints - a.totalPoints
        );

        const sortedLeaders = userTopStatistics.slice(0, 5); // Taking the top 5
        setLeaders(sortedLeaders);
      } catch (error) {
        console.error("Failed to fetch user statistics", error);
      }
    };

    const fetchCategoryLeaders = async () => {
      try {
        let userStatistics: UserStatisticsDTO[] = [];
        const response = await getUserStatisticsByCategoryId(categoryId);
        userStatistics = response.data.result;
        userStatistics = userStatistics.sort(
          (a: UserStatisticsDTO, b: UserStatisticsDTO) =>
            b.categoryPoints - a.categoryPoints
        );

        const sortedLeaders = userStatistics.slice(0, 5); // Taking the top 5
        setLeaders(sortedLeaders);
      } catch (error) {
        console.error("Failed to fetch user statistics", error);
      }
    };

    if (categoryId === 0) {
      fetchTopListLeaders();
    } else {
      fetchCategoryLeaders();
    }
  }, [categoryId]);

  const isUserStatisticsDTO = (
    leader: UserStatisticsDTO | UserTotalPointsDTO
  ): leader is UserStatisticsDTO => {
    return (leader as UserStatisticsDTO).id !== undefined;
  };

  const getTrophyIcon = (index: number) => {
    switch (index) {
      case 0:
        return "trophy";
      case 1:
        return "medal";
      case 2:
        return "medal-outline";
      default:
        return "";
    }
  };

  return (
    <View style={styles.container}>
      {leaders.length > 0 && (
        <>
          <Text style={styles.title}>Top Leaders</Text>
          {leaders.map((leader, index) => (
            <Card
              key={isUserStatisticsDTO(leader) ? leader.id : index}
              style={styles.card}
            >
              <Card.Content style={styles.cardContent}>
                <Text style={styles.rankText}>{index + 1}</Text>
                <Avatar.Image
                  source={{
                    uri: `${baseURL}/profile_pics/${leader.profilePicture}`,
                  }}
                  size={45}
                  style={styles.profilePicture}
                />
                <Text style={styles.nameText}>{leader.username}</Text>
                {index < 3 && (
                  <Icon
                    name={getTrophyIcon(index)}
                    size={30}
                    color={
                      index === 0
                        ? "#FFD700"
                        : index === 1
                        ? "#C0C0C0"
                        : "#cd7f32"
                    }
                    style={styles.icon}
                  />
                )}
                <Text style={styles.scoreText}>
                  {isUserStatisticsDTO(leader)
                    ? leader.categoryPoints
                    : leader.totalPoints}
                </Text>
              </Card.Content>
            </Card>
          ))}
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 10,
    marginBottom: 8,
  },
  title: {
    fontSize: 20,
    textAlign: "center",
    fontWeight: "bold",
    fontFamily: "Roboto-Serif",
    letterSpacing: 2,
    color: "#fff",
    marginBottom: 5,
  },
  card: {
    marginVertical: 5,
    backgroundColor: "#2C2C2C",
    borderRadius: 12,
    elevation: 2,
  },
  cardContent: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 8,
    paddingHorizontal: 10,
    gap: 30,
  },
  rankText: {
    fontSize: 16,
    fontFamily: "Roboto-Mono",
    color: "#fff",
  },
  profilePicture: {},
  nameText: {
    fontSize: 15,
    fontFamily: "Roboto-Mono",
    color: "#fff",
    flex: 1,
  },
  scoreText: {
    fontSize: 15,
    fontFamily: "Roboto-Mono",
    letterSpacing: 1,
    color: "#3EB7D4",
  },
  icon: {
    marginRight: 0,
    alignSelf: "center",
  },
});

export default LeaderList;
