import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Icon from "react-native-vector-icons/Ionicons";
import Home from "../screens/Home";
import Profile from "../screens/Profile";
import LeaderboardScreen from "../screens/Leaderboard";

const Tab = createBottomTabNavigator();

function MainTabs() {
  return (
    <Tab.Navigator
      initialRouteName="Home Screen"
      screenOptions={{
        tabBarActiveTintColor: "#3CADC8",
        tabBarInactiveTintColor: "#B0B0B0",
        tabBarStyle: {
          backgroundColor: "#1C1C1C",
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
        name="Home Screen"
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
        name="Leaderboard Screen"
        component={LeaderboardScreen}
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
        name="Profile"
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
