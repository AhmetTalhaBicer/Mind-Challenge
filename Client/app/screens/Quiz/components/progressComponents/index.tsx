import React from "react";
import { View, StyleSheet, Animated, Text } from "react-native";
import ProgressCircle from "react-native-progress/Circle";

interface CustomProgressBarProps {
  progress: Animated.Value;
  width: number;
  height: number;
  color: string;
  currentQuestionIndex: number;
  totalQuestions: number;
}

export const CustomProgressBar: React.FC<CustomProgressBarProps> = ({
  progress,
  width,
  height,
  color,
  currentQuestionIndex,
  totalQuestions,
}) => {
  const progressWidth = progress.interpolate({
    inputRange: [0, 1.4],
    outputRange: [0, width],
    extrapolate: "clamp",
  });

  return (
    <View style={[styles.container, { width, height }]}>
      <View style={styles.outerBox}>
        <View style={styles.progressBox}>
          <Animated.View
            style={[
              styles.progressBar,
              { width: progressWidth, backgroundColor: color },
            ]}
          />
        </View>
        <Text style={styles.progressText}>
          {currentQuestionIndex + 1}/{totalQuestions}
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
    marginBottom: 36,
  },
  outerBox: {
    flexDirection: "row",
    alignItems: "center",
    padding: 12,
    backgroundColor: "#1C1C1C",
    borderRadius: 36,
    borderColor: "gray",
    borderWidth: 0.3,
  },
  progressBox: {
    flex: 1,
    height: 12,
    borderRadius: 12,
    backgroundColor: "#FFFFFF",
    overflow: "hidden",
    marginHorizontal: 6,
  },
  progressBar: {
    height: "100%",
    backgroundColor: "#FFA342",
  },
  progressText: {
    fontSize: 14,
    color: "#3CADC8",
    marginLeft: 10,
  },
});

interface CustomProgressCircleProps {
  progressValue: number;
  textColor: string;
  style?: object;
}

export const CustomProgressCircle: React.FC<CustomProgressCircleProps> = ({
  progressValue,
  textColor,
  style,
}) => {
  return (
    <ProgressCircle
      progress={progressValue}
      size={60}
      color="#3CADC8"
      unfilledColor="#3CADC8"
      showsText={true}
      formatText={(progress: number) => `${Math.round(progress * 30)}`}
      textStyle={{ color: textColor }}
      style={style}
    />
  );
};
