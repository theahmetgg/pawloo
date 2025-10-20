import React from 'react';
import {
  TouchableOpacity,
  Text,
  ActivityIndicator,
  View,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

const Button = ({
  title,
  onPress,
  variant = 'primary', // primary, secondary, outline, ghost
  size = 'medium', // small, medium, large
  icon,
  iconPosition = 'left',
  loading = false,
  disabled = false,
  gradient = false,
  gradientColors,
  fullWidth = false,
  style,
  textStyle,
}) => {
  const getButtonClassName = () => {
    let className = 'rounded-xl overflow-hidden';

    // Size
    if (size === 'small') {
      className += ' px-4 py-2';
    } else if (size === 'large') {
      className += ' px-6 py-4';
    } else {
      className += ' px-5 py-4';
    }

    // Variant (if not gradient)
    if (!gradient) {
      if (disabled) {
        className += ' bg-gray-300 shadow-sm';
      } else if (variant === 'primary') {
        className += ' bg-amber-600 shadow-md';
      } else if (variant === 'secondary') {
        className += ' bg-pink-500 shadow-md';
      } else if (variant === 'outline') {
        className += ' bg-transparent border-2 border-amber-600';
      } else if (variant === 'ghost') {
        className += ' bg-transparent';
      }
    }

    // Full width
    if (fullWidth) {
      className += ' w-full';
    }

    return className;
  };

  const getTextClassName = () => {
    let className = 'font-semibold text-center';

    // Size
    if (size === 'small') {
      className += ' text-sm';
    } else if (size === 'large') {
      className += ' text-lg';
    } else {
      className += ' text-base';
    }

    // Color
    if (disabled) {
      className += ' text-gray-500';
    } else if (variant === 'primary' || variant === 'secondary') {
      className += ' text-white';
    } else if (variant === 'outline' || variant === 'ghost') {
      className += ' text-amber-600';
    }

    return className;
  };

  const renderContent = () => (
    <View className="flex-row items-center justify-center">
      {loading ? (
        <ActivityIndicator
          color={
            variant === 'outline' || variant === 'ghost'
              ? '#D97706'
              : '#FFFFFF'
          }
        />
      ) : (
        <>
          {icon && iconPosition === 'left' && (
            <View className="mr-2">{icon}</View>
          )}
          <Text className={getTextClassName()} style={textStyle}>{title}</Text>
          {icon && iconPosition === 'right' && (
            <View className="ml-2">{icon}</View>
          )}
        </>
      )}
    </View>
  );

  if (gradient && !disabled) {
    return (
      <TouchableOpacity
        onPress={onPress}
        disabled={disabled || loading}
        activeOpacity={0.8}
        className={getButtonClassName()}
        style={style}
      >
        <LinearGradient
          colors={gradientColors || ['#D97706', '#B45309']}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
          className="rounded-xl"
        >
          {renderContent()}
        </LinearGradient>
      </TouchableOpacity>
    );
  }

  return (
    <TouchableOpacity
      onPress={onPress}
      disabled={disabled || loading}
      activeOpacity={0.8}
      className={getButtonClassName()}
      style={style}
    >
      {renderContent()}
    </TouchableOpacity>
  );
};

export default Button;
