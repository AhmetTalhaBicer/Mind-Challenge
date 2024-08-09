import React from "react";
import { View, StyleSheet, TouchableOpacity } from "react-native";
import { Text, IconButton } from "react-native-paper";

interface AnswerSectionProps {
  answers: string[];
  selectedAnswer: string | null;
  isAnswerSelected: boolean;
  handleAnswer: (answer: string) => void;
  correctAnswer: string;
}

const AnswerSection: React.FC<AnswerSectionProps> = ({
  answers,
  selectedAnswer,
  isAnswerSelected,
  handleAnswer,
  correctAnswer,
}) => {
  return (
    <View style={styles.container}>
      {answers.map((answer, index) => {
        const isSelected = selectedAnswer === answer;
        const isCorrect = answer === correctAnswer;
        return (
          <TouchableOpacity
            key={index}
            style={[
              styles.answerButton,
              isSelected &&
                (isCorrect ? styles.correctAnswer : styles.incorrectAnswer),
              !isSelected &&
                isCorrect &&
                isAnswerSelected &&
                styles.correctAnswer,
            ]}
            onPress={() => handleAnswer(answer)}
            disabled={selectedAnswer !== null}
          >
            <Text
              style={[
                styles.buttonText,
                isSelected &&
                  (isCorrect
                    ? styles.correctAnswerText
                    : styles.incorrectAnswerText),
                !isSelected &&
                  isCorrect &&
                  isAnswerSelected &&
                  styles.correctAnswerText,
              ]}
            >
              {answer}
            </Text>
            {isSelected && (
              <IconButton
                icon={isCorrect ? "check-circle" : "close-circle"}
                iconColor={isCorrect ? "#3CADC8" : "red"}
                size={20}
              />
            )}
            {!isSelected && isCorrect && isAnswerSelected && (
              <IconButton icon="check-circle" iconColor="#3CADC8" size={20} />
            )}
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
  },
  answerButton: {
    width: "100%",
    padding: 16,
    marginVertical: 10,
    backgroundColor: "#1C1C1C",
    borderRadius: 12,
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-between",
    borderWidth: 1,
    borderColor: "#fff",
  },
  correctAnswer: {
    borderColor: "#3CADC8",
  },
  incorrectAnswer: {
    borderColor: "red",
  },
  correctAnswerText: {
    color: "#3CADC8",
  },
  incorrectAnswerText: {
    color: "red",
  },
  buttonText: {
    fontSize: 16,
    color: "#fff",
  },
});

export default AnswerSection;
