import React from 'react';
import { View, TouchableOpacity, Animated, Platform, StatusBar } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

/**
 * HeaderOverlay Component
 * Floating header with scroll-to-solid transition
 *
 * @param {Animated.Value} scrollY - Animated scroll position
 * @param {function} onBack - Back button handler
 * @param {array} actions - Array of action buttons [{icon, onPress, accessibilityLabel}]
 * @param {string} bgColor - Background color when solid (default: white)
 * @param {string} iconColor - Icon color (default: dark)
 * @param {string} title - Optional title (shown when scrolled)
 */
const HeaderOverlay = ({
  scrollY,
  onBack,
  actions = [],
  bgColor = '#FFFFFF',
  iconColor = '#1F2937',
  title = '',
}) => {
  const insets = useSafeAreaInsets();

  // Calculate header background opacity based on scroll
  // 0-80px: transparent, >80px: solid
  const headerOpacity = scrollY
    ? scrollY.interpolate({
        inputRange: [0, 80],
        outputRange: [0, 1],
        extrapolate: 'clamp',
      })
    : 0;

  // Calculate title opacity (appears after 60px scroll)
  const titleOpacity = scrollY
    ? scrollY.interpolate({
        inputRange: [60, 100],
        outputRange: [0, 1],
        extrapolate: 'clamp',
      })
    : 0;

  const headerHeight = Platform.OS === 'android'
    ? (StatusBar.currentHeight || 0) + 56
    : insets.top + 56;

  return (
    <Animated.View
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        height: headerHeight,
        backgroundColor: bgColor,
        opacity: headerOpacity,
        zIndex: 100,
        paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight || 0 : insets.top,
      }}
    >
      <View className="flex-1 flex-row justify-between items-center px-4">
        <TouchableOpacity
          className="w-10 h-10 rounded-full items-center justify-center"
          style={{ backgroundColor: 'rgba(0,0,0,0.1)' }}
          onPress={onBack}
          accessibilityLabel="Geri"
          accessibilityRole="button"
        >
          <Ionicons name="arrow-back" size={24} color={iconColor} />
        </TouchableOpacity>

        {title ? (
          <Animated.Text
            style={{
              fontSize: 18,
              fontWeight: '700',
              color: iconColor,
              opacity: titleOpacity,
            }}
            numberOfLines={1}
          >
            {title}
          </Animated.Text>
        ) : (
          <View />
        )}

        <View className="flex-row gap-2">
          {actions.map((action, index) => (
            <TouchableOpacity
              key={index}
              className="w-10 h-10 rounded-full items-center justify-center"
              style={{ backgroundColor: 'rgba(0,0,0,0.1)' }}
              onPress={action.onPress}
              accessibilityLabel={action.accessibilityLabel}
              accessibilityRole="button"
            >
              <Ionicons name={action.icon} size={24} color={iconColor} />
            </TouchableOpacity>
          ))}
        </View>
      </View>
    </Animated.View>
  );
};

export default HeaderOverlay;
