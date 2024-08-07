declare module "react-native-progress/Circle" {
  import { FC } from "react";
  import { ViewStyle, TextStyle, ColorValue } from "react-native";

  interface CircleProps {
    progress: number;
    size?: number;
    color?: ColorValue;
    unfilledColor?: ColorValue;
    showsText?: boolean;
    formatText?: (text: number) => string;
    thickness?: number;
    strokeCap?: "butt" | "round" | "square";
    style?: ViewStyle;
    textStyle?: TextStyle;
  }

  const Circle: FC<CircleProps>;
  export default Circle;
}
