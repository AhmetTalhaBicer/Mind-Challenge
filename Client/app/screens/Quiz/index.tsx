import React, { useState, useEffect, useRef } from "react";
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Animated,
  Easing,
} from "react-native";
import { RouteProp, useRoute, useNavigation } from "@react-navigation/native";
import { Text } from "react-native-paper";
import Loading from "@/app/components/Loading";
import { QuestionDTO } from "@/app/services/api/questions/types";
import { fetchQuestions } from "./components/questions";
import {
  CustomProgressBar,
  CustomProgressCircle,
} from "./components/progressComponents";
import AnswerSection from "./components/answerSection";
import { useAuth } from "@/app/context/AuthContext";
import { createUserStatistics } from "@/app/services/api/user-statistics/endpoints";
import { createUserStatisticsDTO } from "@/app/services/api/user-statistics/types";

type QuizScreenRouteProp = RouteProp<{ Quiz: { categoryId: number } }, "Quiz">;
type FetchQuestionsResponse = {
  data: {
    results: QuestionDTO[];
  };
};

const QuizScreen = () => {
  const route = useRoute<QuizScreenRouteProp>();
  const navigation = useNavigation();
  const { user } = useAuth();
  const { categoryId } = route.params;
  const [questions, setQuestions] = useState<QuestionDTO[]>([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [isQuizFinished, setIsQuizFinished] = useState(false);
  const [shuffledAnswers, setShuffledAnswers] = useState<string[]>([]);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [isAnswerSelected, setIsAnswerSelected] = useState(false);
  const [isCorrectAnswer, setIsCorrectAnswer] = useState<boolean | null>(null);
  const progress = useRef(new Animated.Value(0)).current;
  const [progressValue, setProgressValue] = useState(0);
  const timer = useRef<NodeJS.Timeout | null>(null);
  const [timerValue, setTimerValue] = useState(30);

  useEffect(() => {
    const loadQuestions = async () => {
      const timeoutPromise = new Promise((_, reject) =>
        setTimeout(() => reject(new Error("Request timed out")), 5000)
      );

      try {
        const response = (await Promise.race([
          fetchQuestions(categoryId.toString()),
          timeoutPromise,
        ])) as FetchQuestionsResponse;
        setQuestions(response.data.results);
      } catch (error) {
        console.error("Error loading questions:", error);
        retryLoadQuestions();
      }
    };

    const retryLoadQuestions = () => {
      setTimeout(() => {
        loadQuestions();
      }, 5000);
    };

    loadQuestions();
  }, [categoryId]);

  useEffect(() => {
    if (questions.length > 0) {
      const currentQuestion = questions[currentQuestionIndex];
      const answers = [
        ...currentQuestion.incorrect_answers,
        currentQuestion.correct_answer,
      ];
      setShuffledAnswers(shuffleArray(answers));

      const progressValue = (currentQuestionIndex + 1) / questions.length;
      Animated.timing(progress, {
        toValue: progressValue,
        duration: 500,
        easing: Easing.inOut(Easing.ease),
        useNativeDriver: false,
      }).start();

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

  const shuffleArray = (array: string[]) =>
    array.sort(() => Math.random() - 0.5);

  const handleAnswer = (answer: string) => {
    setSelectedAnswer(answer);
    setIsAnswerSelected(true);
    const isCorrect = answer === questions[currentQuestionIndex].correct_answer;
    setIsCorrectAnswer(isCorrect);
    if (isCorrect) setScore(score + 1);
    clearTimer();
  };

  const handleNextQuestion = async () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      setIsQuizFinished(true);
      clearTimer();
      await saveScore();
    }
    setSelectedAnswer(null);
    setIsAnswerSelected(false);
    setIsCorrectAnswer(null);
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

  const saveScore = async () => {
    if (user) {
      const userStatistics: createUserStatisticsDTO = {
        userId: user.userId,
        username: user.username,
        categoryId: categoryId,
        categoryPoints: score,
        totalPoints: score,
      };
      console.log("user:", user);
      try {
        await createUserStatistics(userStatistics);
        console.log("User statistics recorded successfully.");
      } catch (error) {
        console.error("Error creating user statistics:", error);
      }
    } else {
      console.error("User not logged in.");
    }
  };

  if (isQuizFinished) {
    return (
      <View style={styles.container}>
        <View style={styles.finishedCard}>
          <Text style={styles.finishedText}>Quiz Finished!</Text>
          <Text style={styles.scoreText}>Current Score: {score}</Text>
          <TouchableOpacity
            style={styles.restartButton}
            onPress={() => {
              navigation.navigate("Home Screen" as never);
            }}
          >
            <Text style={styles.restartButtonText}>Go to Categories</Text>
          </TouchableOpacity>
        </View>
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
        height={12}
        color="#FFA342"
        currentQuestionIndex={currentQuestionIndex}
        totalQuestions={questions.length}
      />
      <View style={styles.questionCard}>
        <CustomProgressCircle
          progressValue={timerValue / 30}
          textColor="#fff"
          style={styles.progressCircle}
        />
        <Text style={styles.questionText}>{currentQuestion.question}</Text>
      </View>
      <AnswerSection
        answers={shuffledAnswers}
        selectedAnswer={selectedAnswer}
        isAnswerSelected={isAnswerSelected}
        handleAnswer={handleAnswer}
        correctAnswer={currentQuestion.correct_answer}
      />
      {isAnswerSelected && (
        <TouchableOpacity
          style={[styles.nextButton, { width: "100%" }]}
          onPress={handleNextQuestion}
        >
          <Text style={styles.nextButtonText}>Next</Text>
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
    marginTop: 54,
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
  finishedCard: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    borderRadius: 12,
    backgroundColor: "#323232",
  },
  finishedText: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#fff",
    marginBottom: 16,
  },
  scoreText: {
    fontSize: 20,
    color: "#fff",
    marginBottom: 24,
  },
  restartButton: {
    backgroundColor: "#3EB8D4",
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 8,
    alignItems: "center",
  },
  restartButtonText: {
    color: "#fff",
    fontSize: 16,
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
  questionText: {
    fontSize: 18,
    marginBottom: 16,
    color: "#fff",
    textAlign: "left",
    letterSpacing: 1.5,
  },
});

export default QuizScreen;
