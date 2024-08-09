// Routes.tsx
import React, { useEffect } from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Welcome from "../screens/Welcome";
import Login from "../screens/Login";
import Signup from "../screens/Signup";
import MainTabs from "./mainTabs";
import QuizScreen from "../screens/Quiz";
import { useAuth } from "../context/AuthContext";
import { useNavigation } from "@react-navigation/native";

const Stack = createNativeStackNavigator();

const Routes = () => {
  const { isAuthenticated, loading } = useAuth();
  const navigation = useNavigation();

  useEffect(() => {
    if (!loading) {
      if (isAuthenticated) {
        navigation.reset({
          index: 0,
          routes: [{ name: "MainTabs" as never }],
        });
      }
    }
  }, [isAuthenticated, loading, navigation]);

  if (loading) {
    return null;
  }

  return (
    <Stack.Navigator
      initialRouteName={isAuthenticated ? "MainTabs" : "Welcome Screen"}
    >
      <Stack.Screen
        name="Welcome Screen"
        component={Welcome}
        options={{ headerShown: false }}
      />
      <Stack.Screen name="Login Screen" component={Login} />
      <Stack.Screen name="Signup Screen" component={Signup} />
      <Stack.Screen
        name="MainTabs"
        component={MainTabs}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Quiz"
        component={QuizScreen}
        options={{ headerShown: true }}
      />
    </Stack.Navigator>
  );
};

export default Routes;
