import React, { useEffect } from "react";
import { NavigationContainer } from "@react-navigation/native";
import * as SplashScreen from "expo-splash-screen";
import { useFonts } from "expo-font";
import { AuthProvider } from "./context/AuthContext";
import { QueryClient, QueryClientProvider } from "react-query";
import Toast from "react-native-toast-message";
import Routes from "./routes/base";
import { PaperProvider } from "react-native-paper";

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
        <PaperProvider>
          <NavigationContainer independent={true}>
            <Routes />
          </NavigationContainer>
          <Toast />
        </PaperProvider>
      </AuthProvider>
    </QueryClientProvider>
  );
}
