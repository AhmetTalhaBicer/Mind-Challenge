import React, { useState, useEffect } from "react";
import {
  Text,
  StyleSheet,
  ViewStyle,
  Animated,
  TouchableOpacity,
} from "react-native";
import COLORS from "../constants/color";

interface ButtonProps {
  title: string;
  onPress: () => void;
  color?: string;
  filled?: boolean;
  style?: ViewStyle;
}

const HomeButton: React.FC<ButtonProps> = (props) => {
  const filledBgColor = props.color || COLORS.primary;
  const outlinedColor = COLORS.white;
  const bgColor = props.filled ? filledBgColor : outlinedColor;
  const textColor = props.filled ? COLORS.white : filledBgColor;

  // Initialize animated value
  const scaleValue = useState(new Animated.Value(1))[0];

  // Animation function
  const animatePress = () => {
    Animated.sequence([
      Animated.timing(scaleValue, {
        toValue: 0.95,
        duration: 100,
        useNativeDriver: true,
      }),
      Animated.timing(scaleValue, {
        toValue: 1,
        duration: 100,
        useNativeDriver: true,
      }),
    ]).start(() => {
      props.onPress(); // Call the original onPress function after animation
    });
  };

  useEffect(() => {
    // Cleanup animation on unmount
    return () => {
      scaleValue.setValue(1);
    };
  }, []);

  // Create an animatable component
  const AnimatedTouchableOpacity =
    Animated.createAnimatedComponent(TouchableOpacity);

  return (
    <AnimatedTouchableOpacity
      style={[
        styles.button,
        {
          backgroundColor: bgColor,
          shadowColor: "#000",
          shadowOffset: { width: 0, height: 2 },
          shadowOpacity: 0.25,
          shadowRadius: 3.84,
          elevation: 5,
          transform: [{ scale: scaleValue }], // Apply animated scale
        },
        props.style,
      ]}
      onPress={animatePress} // Use animatePress function on press
      activeOpacity={0.7}
    >
      <Text style={[styles.text, { color: textColor }]}>{props.title}</Text>
    </AnimatedTouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    paddingBottom: 14,
    paddingTop: 14,
    paddingHorizontal: 20,
    borderWidth: 2,
    borderColor: COLORS.primary,
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
  },
  text: {
    fontSize: 20,
    fontWeight: "bold",
  },
});

export default HomeButton;
