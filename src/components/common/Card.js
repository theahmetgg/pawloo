import React from 'react';
import { View, TouchableOpacity } from 'react-native';

const Card = ({
  children,
  onPress,
  style,
  elevated = true,
  padding = 'medium',
  borderColor,
  borderWidth = 0,
}) => {
  const getClassName = () => {
    let className = 'bg-white rounded-2xl overflow-hidden';

    // Padding
    if (padding === 'small') {
      className += ' p-2';
    } else if (padding === 'large') {
      className += ' p-4';
    } else if (padding === 'medium') {
      className += ' p-4';
    }
    // 'none' için padding eklenmez

    // Elevation
    if (elevated) {
      className += ' shadow-md';
    }

    return className;
  };

  const borderStyle = borderWidth > 0 ? {
    borderWidth,
    borderColor: borderColor || '#E5E7EB',
  } : {};

  if (onPress) {
    return (
      <TouchableOpacity
        onPress={onPress}
        activeOpacity={0.8}
        className={getClassName()}
        style={[borderStyle, style]}
      >
        {children}
      </TouchableOpacity>
    );
  }

  return (
    <View className={getClassName()} style={[borderStyle, style]}>
      {children}
    </View>
  );
};

export default Card;
