import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Icon from "react-native-vector-icons/Ionicons";
import Home from "../screens/Home";
import Scoreboard from "../screens/Scoreboard";
import Profile from "../screens/Profile";

const Tab = createBottomTabNavigator();

function MainTabs() {
  return (
    <Tab.Navigator
      initialRouteName="Ana Sayfa"
      screenOptions={{
        tabBarActiveTintColor: "#2f95dc",
        tabBarInactiveTintColor: "#8e8e93",
        tabBarStyle: {
          backgroundColor: "#f8f8f8",
          borderTopWidth: 0,
          elevation: 5,
          height: 60,
          paddingBottom: 5,
        },
        tabBarLabelStyle: {
          fontSize: 13,
          fontWeight: "600",
        },
      }}
    >
      <Tab.Screen
        name="Ana Sayfa"
        component={Home}
        options={{
          headerShown: false,
          tabBarIcon: ({ color, size, focused }) => (
            <Icon
              name={focused ? "home" : "home-outline"}
              color={color}
              size={focused ? size + 2 : size}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Skor Tablosu"
        component={Scoreboard}
        options={{
          headerShown: false,
          tabBarIcon: ({ color, size, focused }) => (
            <Icon
              name={focused ? "trophy" : "trophy-outline"}
              color={color}
              size={focused ? size + 2 : size}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Profil"
        component={Profile}
        options={{
          headerShown: false,
          tabBarIcon: ({ color, size, focused }) => (
            <Icon
              name={focused ? "person" : "person-outline"}
              color={color}
              size={focused ? size + 2 : size}
            />
          ),
        }}
      />
    </Tab.Navigator>
  );
}

export default MainTabs;
