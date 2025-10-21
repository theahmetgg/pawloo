import React from 'react';
import { View, Platform, StatusBar } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

/**
 * SafeAreaContainer Component
 * Handles safe area insets for iOS and Android with proper padding
 *
 * @param {string} bgColor - Background color for the container
 * @param {boolean} withPadding - Whether to apply horizontal padding (default: false)
 * @param {array} edges - Which edges to apply safe area to (default: ['top', 'bottom'])
 * @param {ReactNode} children - Child components
 * @param {string} className - Additional Tailwind classes
 */
const SafeAreaContainer = ({
  bgColor = '#FFFFFF',
  withPadding = false,
  edges = ['top', 'bottom'],
  children,
  className = '',
  style,
  ...props
}) => {
  const insets = useSafeAreaInsets();

  const paddingTop = edges.includes('top')
    ? Platform.OS === 'android'
      ? (StatusBar.currentHeight || 0) + 8
      : insets.top
    : 0;

  const paddingBottom = edges.includes('bottom') ? insets.bottom : 0;
  const paddingLeft = edges.includes('left') ? insets.left : 0;
  const paddingRight = edges.includes('right') ? insets.right : 0;

  return (
    <View
      style={[
        {
          flex: 1,
          backgroundColor: bgColor,
          paddingTop,
          paddingBottom,
          paddingLeft,
          paddingRight,
        },
        style,
      ]}
      className={`${withPadding ? 'px-4' : ''} ${className}`}
      {...props}
    >
      {children}
    </View>
  );
};

export default SafeAreaContainer;
