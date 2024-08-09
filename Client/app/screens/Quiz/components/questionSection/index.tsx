import React from "react";
import { View, StyleSheet, Animated } from "react-native";
import { Text } from "react-native-paper";
import { CustomProgressCircle, CustomProgressBar } from "../progressComponents";

interface QuestionSectionProps {
  question: string;
  timerValue: number;
  progress: Animated.Value;
  currentQuestionIndex: number;
  totalQuestions: number;
}

const QuestionSection: React.FC<QuestionSectionProps> = ({
  question,
  timerValue,
  progress,
  currentQuestionIndex,
  totalQuestions,
}) => {
  return (
    <View style={styles.container}>
      <CustomProgressBar
        progress={progress}
        width={380}
        height={45}
        color="#FF9F41"
        currentQuestionIndex={currentQuestionIndex}
        totalQuestions={totalQuestions}
      />
      <View style={styles.questionCard}>
        <CustomProgressCircle
          progressValue={timerValue / 30}
          textColor="white"
        />
        <Text style={styles.questionText}>{question}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
  },
  questionCard: {
    width: "100%",
    padding: 32,
    marginVertical: 18,
    marginTop: 32,
    borderRadius: 12,
    backgroundColor: "#323232",
    position: "relative",
    justifyContent: "center",
    alignItems: "center",
  },
  questionText: {
    fontSize: 18,
    marginBottom: 16,
    color: "#fff",
    textAlign: "left",
    letterSpacing: 1.5,
  },
});

export default QuestionSection;
