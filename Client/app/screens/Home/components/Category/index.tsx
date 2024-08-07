import React from "react";
import { View, StyleSheet, Dimensions, TouchableOpacity } from "react-native";
import { Card, Text } from "react-native-paper";
import { useNavigation, NavigationProp } from "@react-navigation/native";

type RootStackParamList = {
  Quiz: { category: string };
};

const getCategories = () => {
  return [
    {
      name: "Genel Kültür",
      image: require("../../../../assets/category/Genel_Kültür2.jpg"),
      key: "general_knowledge",
    },
    {
      name: "Bilgisayar Bilimi",
      image: require("../../../../assets/category/Bilgisayar.jpg"),
      key: "computer_science",
    },
    {
      name: "Müzik",
      image: require("../../../../assets/category/Müzik.jpg"),
      key: "music",
    },
    {
      name: "Sinema",
      image: require("../../../../assets/category/Film.png"),
      key: "cinema",
    },
    {
      name: "Video Oyunu",
      image: require("../../../../assets/category/Video_Oyunu.jpg"),
      key: "video_games",
    },
    {
      name: "Anime",
      image: require("../../../../assets/category/Anime.jpg"),
      key: "anime",
    },
    {
      name: "Tarih",
      image: require("../../../../assets/category/Tarih.jpg"),
      key: "history",
    },
    {
      name: "Spor",
      image: require("../../../../assets/category/Spor.jpg"),
      key: "sport",
    },
    {
      name: "Coğrafya",
      image: require("../../../../assets/category/Coğrafya.jpg"),
      key: "geography",
    },
  ];
};

const Category = () => {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const categories = getCategories();

  return (
    <View style={styles.grid}>
      {categories.map((category, index) => (
        <TouchableOpacity
          key={index}
          onPress={() =>
            navigation.navigate("Quiz", { category: category.key })
          }
        >
          <Card style={styles.card}>
            <Card.Cover source={category.image} style={styles.image} />
            <View style={styles.overlay}>
              <Text style={styles.categoryText}>{category.name}</Text>
            </View>
          </Card>
        </TouchableOpacity>
      ))}
    </View>
  );
};

const { width } = Dimensions.get("window");
const CARD_WIDTH = width * 0.3;
const CARD_HEIGHT = CARD_WIDTH * 1.2;

const styles = StyleSheet.create({
  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-around",
    padding: 5,
    backgroundColor: "#141414", // 1C1C1C = acık siyah
  },
  card: {
    width: CARD_WIDTH,
    marginVertical: 15,
    borderRadius: 10,
    overflow: "hidden",
    shadowColor: "#323232",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 8,
    borderColor: "#A9A9A9",
    borderWidth: 1,
  },
  image: {
    height: CARD_HEIGHT,
  },
  overlay: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  categoryText: {
    fontSize: 14,
    fontWeight: "600",
    fontFamily: "Roboto-Serif",
    color: "#fff",
    textAlign: "center",
    padding: 10,
    margin: 5,
  },
});

export default Category;
