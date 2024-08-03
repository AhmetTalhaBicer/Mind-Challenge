import React, { useEffect } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Login from "./screens/Login";
import Signup from "./screens/Signup";
import * as SplashScreen from "expo-splash-screen";
import { useFonts } from "expo-font";
import User from "./screens/User";
import { AuthProvider } from "./context/AuthContext";
import { QueryClient, QueryClientProvider } from "react-query";
import Welcome from "./screens/Welcome";
import Home from "./screens/Home";
import Toast from "react-native-toast-message";

const Stack = createNativeStackNavigator();
const queryClient = new QueryClient();

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [loaded, error] = useFonts({
    Roboto: require("./assets/fonts/Roboto-Regular.ttf"),
    "Roboto-Mono": require("./assets/fonts/RobotoMono-VariableFont_wght.ttf"),
    "Roboto-Serif": require("./assets/fonts/RobotoSerif.ttf"),
  });

  useEffect(() => {
    if (loaded || error) {
      SplashScreen.hideAsync();
    }
  }, [loaded, error]);

  if (!loaded && !error) {
    return null;
  }

  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <NavigationContainer independent={true}>
          <Stack.Navigator initialRouteName="Hoş Geldin">
            <Stack.Screen
              name="Hoş Geldin"
              component={Welcome}
              options={{
                headerShown: false,
              }}
            />
            <Stack.Screen name="Giriş Ekranı" component={Login} />
            <Stack.Screen name="Kayıt Ekranı" component={Signup} />
            <Stack.Screen name="Kullanıcı Ekranı" component={User} />
            <Stack.Screen name="Ana Ekran" component={Home} />
          </Stack.Navigator>
        </NavigationContainer>
        <Toast />
      </AuthProvider>
    </QueryClientProvider>
  );
}
