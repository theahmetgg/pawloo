import React from "react";
import { NavigationContainer, DefaultTheme as NavTheme } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Ionicons } from "@expo/vector-icons";
import { Platform, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { colors } from "../theme";

const fontConfig = {
  regular: { fontFamily: "System", fontWeight: "400" },
  medium: { fontFamily: "System", fontWeight: "500" },
  light: { fontFamily: "System", fontWeight: "300" },
  thin: { fontFamily: "System", fontWeight: "100" },
};

// Welcome Screen
import WelcomeScreen from "../screens/WelcomeScreen";

// Auth Screens
import LoginScreen from "../screens/Auth/LoginScreen";
import RegisterScreen from "../screens/Auth/RegisterScreen";
import ForgotPasswordScreen from "../screens/Auth/ForgotPasswordScreen";

// Home Screen
import HomeScreen from "../screens/HomeScreen";

// Screens - PlayMate
import PlayMateDiscoverScreen from "../screens/PlayMate/PlayMateDiscoverScreen";
import PlayMateDetailScreen from "../screens/PlayMate/PlayMateDetailScreen";

// Screens - Breeding
import BreedingDiscoverScreen from "../screens/Breeding/BreedingDiscoverScreen";
import BreedingDetailScreen from "../screens/Breeding/BreedingDetailScreen";

// Screens - Adoption
import AdoptionDiscoverScreen from "../screens/Adoption/AdoptionDiscoverScreen";
import AdoptionDetailScreen from "../screens/Adoption/AdoptionDetailScreen";

// Screens - HotelCare
import HotelCareDiscoverScreen from "../screens/HotelCare/HotelCareDiscoverScreen";
import HotelCareDetailScreen from "../screens/HotelCare/HotelCareDetailScreen";

// Screens - Veterinary
import VeterinaryDiscoverScreen from "../screens/Veterinary/VeterinaryDiscoverScreen";
import VeterinaryDetailScreen from "../screens/Veterinary/VeterinaryDetailScreen";

// Screens - PetGrooming
import PetGroomingDiscoverScreen from "../screens/PetGrooming/PetGroomingDiscoverScreen";
import PetGroomingDetailScreen from "../screens/PetGrooming/PetGroomingDetailScreen";

// Custom Animated Tab Bar
import AnimatedFooterTabBar from "../components/navigation/AnimatedFooterTabBar";

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

const PlayMateStack = () => (
  <Stack.Navigator
    screenOptions={{
      headerShown: false,
    }}
  >
    <Stack.Screen name='PlayMateDiscover' component={PlayMateDiscoverScreen} />
    <Stack.Screen name='PlayMateDetail' component={PlayMateDetailScreen} />
  </Stack.Navigator>
);

const BreedingStack = () => (
  <Stack.Navigator
    screenOptions={{
      headerShown: false,
    }}
  >
    <Stack.Screen name='BreedingDiscover' component={BreedingDiscoverScreen} />
    <Stack.Screen name='BreedingDetail' component={BreedingDetailScreen} />
  </Stack.Navigator>
);

const AdoptionStack = () => (
  <Stack.Navigator
    screenOptions={{
      headerShown: false,
    }}
  >
    <Stack.Screen name='AdoptionDiscover' component={AdoptionDiscoverScreen} />
    <Stack.Screen name='AdoptionDetail' component={AdoptionDetailScreen} />
  </Stack.Navigator>
);

const HotelCareStack = () => (
  <Stack.Navigator
    screenOptions={{
      headerShown: false,
    }}
  >
    <Stack.Screen name='HotelCareDiscover' component={HotelCareDiscoverScreen} />
    <Stack.Screen name='HotelCareDetail' component={HotelCareDetailScreen} />
  </Stack.Navigator>
);

const VeterinaryStack = () => (
  <Stack.Navigator
    screenOptions={{
      headerShown: false,
    }}
  >
    <Stack.Screen name='VeterinaryDiscover' component={VeterinaryDiscoverScreen} />
    <Stack.Screen name='VeterinaryDetail' component={VeterinaryDetailScreen} />
  </Stack.Navigator>
);

const PetGroomingStack = () => (
  <Stack.Navigator
    screenOptions={{
      headerShown: false,
    }}
  >
    <Stack.Screen name='PetGroomingDiscover' component={PetGroomingDiscoverScreen} />
    <Stack.Screen name='PetGroomingDetail' component={PetGroomingDetailScreen} />
  </Stack.Navigator>
);

const TabNavigator = () => {
  return (
    <View style={{ flex: 1, backgroundColor: "#FFFFFF" }}>
      <Tab.Navigator
        tabBar={(props) => <AnimatedFooterTabBar {...props} />}
        screenOptions={{
          headerShown: false,
          tabBarHideOnKeyboard: true,
        }}
      >
        <Tab.Screen name='Home' component={HomeScreen} />
        <Tab.Screen name='PlayMate' component={PlayMateStack} />
        <Tab.Screen name='Breeding' component={BreedingStack} />
        <Tab.Screen name='Adoption' component={AdoptionStack} />
        <Tab.Screen name='HotelCare' component={HotelCareStack} />
        <Tab.Screen name='Veterinary' component={VeterinaryStack} />
        <Tab.Screen name='PetGrooming' component={PetGroomingStack} />
      </Tab.Navigator>
    </View>
  );
};

// Root Stack Navigator (includes Welcome + Auth + Main App)
const RootStack = createNativeStackNavigator();

const AppNavigator = () => {
  // Navigation theme
  const navigationTheme = {
    ...NavTheme,
    colors: {
      ...NavTheme.colors,
      primary: "#14B8A6",
      background: "#FFFFFF",
      card: "#FFFFFF",
      text: "#111827",
      border: "#E5E7EB",
      notification: "#14B8A6",
    },
    fonts: fontConfig,
  };

  return (
    <NavigationContainer theme={navigationTheme}>
      <RootStack.Navigator
        screenOptions={{
          headerShown: false,
          tabBarHideOnKeyboard: true,
          contentStyle: { backgroundColor: "transparent" },
        }}
      >
        <RootStack.Screen
          name='Welcome'
          component={WelcomeScreen}
          options={{
            contentStyle: { backgroundColor: "transparent" },
          }}
        />
        <RootStack.Screen name='Login' component={LoginScreen} />
        <RootStack.Screen name='Register' component={RegisterScreen} />
        <RootStack.Screen name='ForgotPassword' component={ForgotPasswordScreen} />
        <RootStack.Screen name='MainApp' component={TabNavigator} />
      </RootStack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;
