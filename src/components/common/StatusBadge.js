import React from 'react';
import { View, Text } from 'react-native';

const StatusBadge = ({ status, size = 'medium', style }) => {
  const getStatusConfig = () => {
    switch (status?.toLowerCase()) {
      case 'müsait':
      case 'available':
        return {
          backgroundColor: '#10B981', // green-500
          text: 'Müsait',
        };
      case 'meşgul':
      case 'busy':
        return {
          backgroundColor: '#EF4444', // red-500
          text: 'Meşgul',
        };
      case 'offline':
        return {
          backgroundColor: '#6B7280', // gray-500
          text: 'Çevrimdışı',
        };
      default:
        return {
          backgroundColor: '#9CA3AF', // gray-400
          text: status || 'Bilinmiyor',
        };
    }
  };

  const config = getStatusConfig();

  const getClassName = () => {
    let className = 'flex-row items-center self-start rounded-full py-1';

    if (size === 'small') {
      className += ' px-2';
    } else {
      className += ' px-4';
    }

    return className;
  };

  const getTextClassName = () => {
    let className = 'text-white font-semibold';

    if (size === 'small') {
      className += ' text-xs';
    } else {
      className += ' text-sm';
    }

    return className;
  };

  return (
    <View className={getClassName()} style={[{ backgroundColor: config.backgroundColor }, style]}>
      <View className="w-1.5 h-1.5 rounded-full bg-white mr-1" />
      <Text className={getTextClassName()}>{config.text}</Text>
    </View>
  );
};

export default StatusBadge;
