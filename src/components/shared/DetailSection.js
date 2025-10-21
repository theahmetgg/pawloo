import React from 'react';
import { View, Text } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

/**
 * DetailSection Component
 * Reusable section wrapper with consistent styling
 *
 * @param {string} title - Section title
 * @param {string} icon - Ionicons icon name
 * @param {string} iconColor - Icon color
 * @param {string} cardBg - Card background color
 * @param {string} textColor - Text color
 * @param {ReactNode} children - Section content
 * @param {string} className - Additional Tailwind classes
 */
const DetailSection = ({
  title,
  icon,
  iconColor = '#EC4899',
  cardBg = '#F9FAFB',
  textColor = '#1F2937',
  children,
  className = '',
}) => {
  return (
    <View className={`mb-4 ${className}`}>
      {title && (
        <View className="flex-row items-center gap-2 mb-3 px-4">
          {icon && <Ionicons name={icon} size={20} color={iconColor} />}
          <Text
            style={{ color: textColor }}
            className="text-base font-bold"
            accessibilityRole="header"
          >
            {title}
          </Text>
        </View>
      )}
      <View
        style={{ backgroundColor: cardBg }}
        className="mx-4 rounded-2xl p-4"
      >
        {children}
      </View>
    </View>
  );
};

export default DetailSection;
