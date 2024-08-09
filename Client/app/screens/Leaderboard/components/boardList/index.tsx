import React, { useState } from "react";
import { StyleSheet, FlatList } from "react-native";
import { Text, Card, TouchableRipple } from "react-native-paper";
import { getCategories } from "@/app/screens/Home/components/Category";

interface BoardListProps {
  onCategorySelect: (categoryId: number) => void;
}

const BoardList: React.FC<BoardListProps> = ({ onCategorySelect }) => {
  const [selectedId, setSelectedId] = useState<number | null>(null);
  const categories = getCategories();

  const allCategories = [{ categoryId: 0, name: "Top List" }, ...categories];

  return (
    <FlatList
      data={allCategories}
      renderItem={({ item }) => (
        <TouchableRipple
          style={styles.TouchableRipple}
          rippleColor="rgba(255, 255, 255, 0.32)"
          onPress={() => {
            setSelectedId(item.categoryId);
            onCategorySelect(item.categoryId);
          }}
        >
          <Card
            style={[
              styles.card,
              item.categoryId === selectedId && styles.selectedCard,
            ]}
          >
            <Card.Content>
              <Text style={styles.cardText}>{item.name}</Text>
            </Card.Content>
          </Card>
        </TouchableRipple>
      )}
      keyExtractor={(item) => item.categoryId.toString()}
      numColumns={2}
      contentContainerStyle={styles.grid}
    />
  );
};

const styles = StyleSheet.create({
  grid: {
    justifyContent: "center",
    paddingVertical: 10,
  },
  TouchableRipple: {
    flex: 1,
    margin: 10,
    maxHeight: 50,
    maxWidth: "45%",
  },
  card: {
    backgroundColor: "#1C1C1C",
    borderRadius: 8,
    elevation: 5,
  },
  selectedCard: {
    backgroundColor: "#3EB7D4",
  },
  cardText: {
    fontSize: 12.5,
    letterSpacing: 0.6,
    fontWeight: "700",
    color: "#fff",
    textAlign: "center",
    fontFamily: "Roboto-Mono",
  },
});

export default BoardList;
