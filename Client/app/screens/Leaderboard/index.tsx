import React, { useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import BoardList from "./components/boardList";
import LeaderList from "./components/leaderList";

const LeaderboardScreen = () => {
  const [selectedCategoryId, setSelectedCategoryId] = useState<number | null>(
    null
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Leaderboard</Text>
      <BoardList onCategorySelect={setSelectedCategoryId} />
      <LeaderList categoryId={selectedCategoryId} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#141414",
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    textAlign: "center",
    marginTop: 44,
    color: "#fff",
  },
});

export default LeaderboardScreen;
