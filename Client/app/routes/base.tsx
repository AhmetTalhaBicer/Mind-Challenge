import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Welcome from "../screens/Welcome";
import Login from "../screens/Login";
import Signup from "../screens/Signup";
import User from "../screens/User";
import MainTabs from "./mainTabs";

const Stack = createNativeStackNavigator();

const Routes = () => {
  return (
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
      <Stack.Screen
        name="MainTabs"
        component={MainTabs}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
};

export default Routes;
