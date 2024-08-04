import React from "react";
import { View, StyleSheet, Dimensions } from "react-native";
import { Card, Text } from "react-native-paper";

const getCategories = () => {
  return [
    {
      name: "Genel Kültür",
      image: require("../../../../assets/category/Genel_Kültür2.jpg"),
    },
    {
      name: "Bilgisayar Bilimi",
      image: require("../../../../assets/category/Bilgisayar.jpg"),
    },
    { name: "Müzik", image: require("../../../../assets/category/Müzik.jpg") },
    { name: "Sinema", image: require("../../../../assets/category/Film.png") },
    {
      name: "Video Oyunu",
      image: require("../../../../assets/category/Video_Oyunu.jpg"),
    },
    { name: "Anime", image: require("../../../../assets/category/Anime.jpg") },
    { name: "Tarih", image: require("../../../../assets/category/Tarih.jpg") },
    { name: "Spor", image: require("../../../../assets/category/Spor.jpg") },
    {
      name: "Coğrafya",
      image: require("../../../../assets/category/Coğrafya.jpg"),
    },
  ];
};

const Category = () => {
  const categories = getCategories();

  return (
    <View style={styles.grid}>
      {categories.map((category, index) => (
        <Card key={index} style={styles.card}>
          <Card.Cover source={category.image} style={styles.image} />
          <View style={styles.overlay}>
            <Text style={styles.categoryText}>{category.name}</Text>
          </View>
        </Card>
      ))}
    </View>
  );
};

const { width } = Dimensions.get("window");
const CARD_WIDTH = width * 0.3;
const CARD_HEIGHT = CARD_WIDTH * 1.25;

const styles = StyleSheet.create({
  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-around",
    padding: 5,
  },
  card: {
    width: CARD_WIDTH,
    marginVertical: 15,
    borderRadius: 10,
    overflow: "hidden",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 8,
    borderColor: "#ccc",
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
