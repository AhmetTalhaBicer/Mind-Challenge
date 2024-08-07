import React, { useState, useEffect, useRef } from "react";
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Animated,
  Easing,
} from "react-native";
import { RouteProp, useRoute } from "@react-navigation/native";
import { Text, IconButton } from "react-native-paper";
import Loading from "@/app/components/Loading";
import { QuestionDTO } from "@/app/services/api/questions/types";
import { fetchQuestions } from "./components/questions";
import {
  CustomProgressBar,
  CustomProgressCircle,
} from "./components/progressComponents";

type QuizScreenRouteProp = RouteProp<{ Quiz: { category: string } }, "Quiz">;

const QuizScreen = () => {
  const route = useRoute<QuizScreenRouteProp>();
  const { category } = route.params;
  const [questions, setQuestions] = useState<QuestionDTO[]>([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [isQuizFinished, setIsQuizFinished] = useState(false);
  const [shuffledAnswers, setShuffledAnswers] = useState<string[]>([]);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [isAnswerSelected, setIsAnswerSelected] = useState(false);
  const progress = useRef(new Animated.Value(0)).current;
  const [progressValue, setProgressValue] = useState(0);
  const timer = useRef<NodeJS.Timeout | null>(null);
  const [timerValue, setTimerValue] = useState(30);

  useEffect(() => {
    const loadQuestions = async () => {
      const response = await fetchQuestions(category);
      setQuestions(response.data.results);
    };

    loadQuestions();
  }, [category]);

  useEffect(() => {
    if (questions.length > 0) {
      const currentQuestion = questions[currentQuestionIndex];
      const answers = [
        ...currentQuestion.incorrect_answers,
        currentQuestion.correct_answer,
      ];
      setShuffledAnswers(shuffleArray(answers));

      // Calculate the progress value based on the total number of questions
      const progressValue = (currentQuestionIndex + 1) / questions.length;

      // Animate progress bar for quiz progress
      Animated.timing(progress, {
        toValue: progressValue,
        duration: 500,
        easing: Easing.inOut(Easing.ease),
        useNativeDriver: false,
      }).start();

      // Reset timer for each question
      resetTimer();
    }
  }, [questions, currentQuestionIndex, progress]);

  useEffect(() => {
    const listenerId = progress.addListener(({ value }) => {
      setProgressValue(value);
    });

    return () => {
      progress.removeListener(listenerId);
    };
  }, [progress]);

  const shuffleArray = (array: string[]) => {
    return array.sort(() => Math.random() - 0.5);
  };

  const handleAnswer = (answer: string) => {
    setSelectedAnswer(answer);
    setIsAnswerSelected(true);
    const isCorrect = answer === questions[currentQuestionIndex].correct_answer;
    if (isCorrect) {
      setScore(score + 1);
    }
    clearTimer();
  };

  const handleNextQuestion = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      setIsQuizFinished(true);
    }
    setSelectedAnswer(null);
    setIsAnswerSelected(false);
  };

  const resetTimer = () => {
    if (timer.current) clearInterval(timer.current);
    setTimerValue(30);
    timer.current = setInterval(() => {
      setTimerValue((prev) => {
        if (prev <= 1) {
          clearInterval(timer.current!);
          handleNextQuestion();
          return 30;
        }
        return prev - 1;
      });
    }, 1000);
  };

  const clearTimer = () => {
    if (timer.current) clearInterval(timer.current);
  };

  if (isQuizFinished) {
    return (
      <View style={styles.container}>
        <Text style={styles.text}>Quiz Finished!</Text>
        <Text style={styles.text}>Your Score: {score}</Text>
      </View>
    );
  }

  if (questions.length === 0) {
    return <Loading message="Loading questions..." />;
  }

  const currentQuestion = questions[currentQuestionIndex];

  return (
    <View style={styles.container}>
      <CustomProgressBar
        progress={progress}
        width={380}
        height={45}
        color="#FF9F41"
        currentQuestionIndex={currentQuestionIndex}
        totalQuestions={questions.length}
      />
      <View style={styles.questionCard}>
        <CustomProgressCircle
          progressValue={timerValue / 30}
          textColor="white"
          style={styles.progressCircle}
        />
        <Text style={styles.questionText}>{currentQuestion.question}</Text>
      </View>
      <View style={styles.answerContainer}>
        {shuffledAnswers.map((answer, index) => {
          const isSelected = selectedAnswer === answer;
          const isCorrect = answer === currentQuestion.correct_answer;
          return (
            <TouchableOpacity
              key={index}
              style={[
                styles.answerButton,
                isSelected &&
                  (isCorrect ? styles.correctAnswer : styles.incorrectAnswer),
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
            </TouchableOpacity>
          );
        })}
      </View>
      {isAnswerSelected && (
        <TouchableOpacity
          style={[styles.nextButton, { width: "100%" }]}
          onPress={handleNextQuestion}
        >
          <Text style={styles.nextButtonText}>Sonraki</Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-start",
    alignItems: "center",
    padding: 24,
    backgroundColor: "#1C1C1C",
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
  progressCircle: {
    position: "absolute",
    top: -38,
    zIndex: 1,
  },
  answerContainer: {
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
  text: {
    fontSize: 18,
    marginBottom: 16,
    color: "#fff",
  },
  questionText: {
    fontSize: 18,
    marginBottom: 16,
    color: "#fff",
    textAlign: "left",
    letterSpacing: 1.5,
  },
  buttonText: {
    fontSize: 16,
    color: "#fff",
  },
  nextButton: {
    marginTop: 24,
    backgroundColor: "#3EB8D4",
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 8,
    alignItems: "center",
  },
  nextButtonText: {
    color: "#fff",
    fontSize: 16,
  },
});

export default QuizScreen;
