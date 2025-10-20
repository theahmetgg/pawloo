import React from "react";
import { View, TouchableOpacity, Text, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const AnimatedFooterTabBar = ({ state, descriptors, navigation }) => {
  const insets = useSafeAreaInsets();

  const getIconName = (routeName, focused) => {
    const iconMap = {
      Home: focused ? "home" : "home-outline",
      PlayMate: focused ? "paw" : "paw-outline",
      Breeding: focused ? "heart" : "heart-outline",
      Adoption: focused ? "gift" : "gift-outline",
      HotelCare: focused ? "bed" : "bed-outline",
      Veterinary: focused ? "medical" : "medical-outline",
      PetGrooming: focused ? "cut" : "cut-outline",
    };
    return iconMap[routeName] || "ellipse";
  };

  const getLabel = (routeName) => {
    const labelMap = {
      Home: "Ana Sayfa",
      PlayMate: "Oyun Arkadaşı",
      Breeding: "Çiftleştirme",
      Adoption: "Sahiplendirme",
      HotelCare: "Otel & Bakım",
      Veterinary: "Veteriner",
      PetGrooming: "Pet Kuaför",
    };
    return labelMap[routeName] || routeName;
  };

  return (
    <View
      style={[
        styles.container,
        {
          paddingBottom: insets.bottom || 8,
        },
      ]}
    >
      {state.routes.map((route, index) => {
        const { options } = descriptors[route.key];
        const isFocused = state.index === index;

        const onPress = () => {
          const event = navigation.emit({
            type: "tabPress",
            target: route.key,
            canPreventDefault: true,
          });

          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name);
          }
        };

        const onLongPress = () => {
          navigation.emit({
            type: "tabLongPress",
            target: route.key,
          });
        };

        return (
          <TouchableOpacity
            key={route.key}
            accessibilityRole="button"
            accessibilityState={isFocused ? { selected: true } : {}}
            accessibilityLabel={options.tabBarAccessibilityLabel}
            testID={options.tabBarTestID}
            onPress={onPress}
            onLongPress={onLongPress}
            style={styles.tabButton}
            activeOpacity={0.7}
          >
            <View style={[styles.tabContent, isFocused && styles.tabContentFocused]}>
              <Ionicons
                name={getIconName(route.name, isFocused)}
                size={24}
                color={isFocused ? "#14B8A6" : "#6B7280"}
              />
              {isFocused && (
                <Text style={styles.label} numberOfLines={1}>
                  {getLabel(route.name)}
                </Text>
              )}
            </View>
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    backgroundColor: "#FFFFFF",
    borderTopWidth: 1,
    borderTopColor: "#E5E7EB",
    paddingTop: 8,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: -2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 5,
  },
  tabButton: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 8,
  },
  tabContent: {
    alignItems: "center",
    justifyContent: "center",
    transform: [{ scale: 1 }],
  },
  tabContentFocused: {
    transform: [{ scale: 1.05 }],
  },
  label: {
    fontSize: 10,
    color: "#14B8A6",
    marginTop: 4,
    fontWeight: "500",
  },
});

export default AnimatedFooterTabBar;
