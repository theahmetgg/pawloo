import React, { useEffect } from 'react';
import { View, TouchableOpacity, Dimensions, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
  interpolate,
} from 'react-native-reanimated';
import Svg, { Path } from 'react-native-svg';

const { width: SCREEN_WIDTH } = Dimensions.get('window');

// Tab configuration
const TABS = [
  {
    key: 'Home',
    label: 'Keşfet',
    icon: 'search-outline',
    activeIcon: 'search',
    color: '#14B8A6',
  },
  {
    key: 'PlayMate',
    label: 'Arkadaşlar',
    icon: 'people-outline',
    activeIcon: 'people',
    color: '#60A5FA',
  },
  {
    key: 'Breeding',
    label: 'Çiftleştirme',
    icon: 'heart-outline',
    activeIcon: 'heart',
    color: '#EC4899',
  },
  {
    key: 'Adoption',
    label: 'Sahiplen',
    icon: 'home-outline',
    activeIcon: 'home',
    color: '#A855F7',
  },
  {
    key: 'HotelCare',
    label: 'Otel',
    icon: 'bed-outline',
    activeIcon: 'bed',
    color: '#F97316',
  },
  {
    key: 'Veterinary',
    label: 'Veteriner',
    icon: 'medkit-outline',
    activeIcon: 'medical',
    color: '#EF4444',
  },
  {
    key: 'PetGrooming',
    label: 'Kuaför',
    icon: 'cut-outline',
    activeIcon: 'cut',
    color: '#10B981',
  },
];

const TAB_BAR_HEIGHT = 60;
const ICON_SIZE = 24;
const WAVE_HEIGHT = 20;

// Wave background component
const WaveBackground = ({ activeIndex, tabWidth }) => {
  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {
          translateX: withSpring(activeIndex.value * tabWidth, {
            damping: 20,
            stiffness: 90,
          }),
        },
      ],
    };
  });

  // Wave path with smooth curves
  const wavePath = `
    M 0,${WAVE_HEIGHT}
    Q ${tabWidth * 0.25},0 ${tabWidth * 0.5},0
    Q ${tabWidth * 0.75},0 ${tabWidth},${WAVE_HEIGHT}
    L ${tabWidth},${TAB_BAR_HEIGHT + 20}
    L 0,${TAB_BAR_HEIGHT + 20}
    Z
  `;

  return (
    <Animated.View
      style={[
        styles.waveContainer,
        { width: tabWidth, height: TAB_BAR_HEIGHT + 20 },
        animatedStyle,
      ]}
    >
      <Svg width={tabWidth} height={TAB_BAR_HEIGHT + 20}>
        <Path d={wavePath} fill="#FFFFFF" />
      </Svg>
    </Animated.View>
  );
};

// Individual tab button
const TabButton = ({ tab, index, activeIndex, onPress, tabWidth, isFocused }) => {
  const animatedIconStyle = useAnimatedStyle(() => {
    const isActive = activeIndex.value === index ? 1 : 0;

    return {
      transform: [
        {
          translateY: withSpring(isActive * -8, {
            damping: 15,
            stiffness: 150,
          }),
        },
        {
          scale: withSpring(0.9 + isActive * 0.2, {
            damping: 15,
            stiffness: 150,
          }),
        },
      ],
    };
  });

  const iconName = isFocused ? tab.activeIcon : tab.icon;
  const iconColor = isFocused ? tab.color : '#94A3B8';

  return (
    <TouchableOpacity
      activeOpacity={0.7}
      onPress={onPress}
      style={[styles.tabButton, { width: tabWidth }]}
    >
      <Animated.View style={animatedIconStyle}>
        <Ionicons name={iconName} size={ICON_SIZE} color={iconColor} />
      </Animated.View>
    </TouchableOpacity>
  );
};

// Main component
export default function AnimatedFooterTabBar({ state, descriptors, navigation }) {
  const insets = useSafeAreaInsets();
  const activeIndex = useSharedValue(state.index);

  const tabWidth = SCREEN_WIDTH / TABS.length;

  useEffect(() => {
    activeIndex.value = state.index;
  }, [state.index]);

  return (
    <View
      style={[
        styles.container,
        {
          height: TAB_BAR_HEIGHT + insets.bottom,
          paddingBottom: insets.bottom,
        },
      ]}
    >
      {/* Wave background */}
      <WaveBackground activeIndex={activeIndex} tabWidth={tabWidth} />

      {/* Tab buttons */}
      {state.routes.map((route, index) => {
        const tab = TABS[index];
        const { options } = descriptors[route.key];
        const isFocused = state.index === index;

        const onPress = () => {
          const event = navigation.emit({
            type: 'tabPress',
            target: route.key,
            canPreventDefault: true,
          });

          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name);
          }
        };

        return (
          <TabButton
            key={route.key}
            tab={tab}
            index={index}
            activeIndex={activeIndex}
            onPress={onPress}
            tabWidth={tabWidth}
            isFocused={isFocused}
          />
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    backgroundColor: '#0D0F24',
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 8,
  },
  waveContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
  },
  tabButton: {
    height: TAB_BAR_HEIGHT,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
