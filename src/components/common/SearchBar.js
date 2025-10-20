import React from 'react';
import {
  View,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const SearchBar = ({
  value,
  onChangeText,
  placeholder = 'Ara...',
  onFilterPress,
  showFilter = true,
  style,
}) => {
  return (
    <View className="flex-row items-center gap-4" style={style}>
      <View className="flex-1 flex-row items-center bg-white rounded-2xl px-4 shadow-sm">
        <Ionicons
          name="search"
          size={20}
          color="#9CA3AF"
          className="mr-2"
        />
        <TextInput
          className="flex-1 py-4 text-base text-gray-900"
          value={value}
          onChangeText={onChangeText}
          placeholder={placeholder}
          placeholderTextColor="#9CA3AF"
        />
      </View>

      {showFilter && (
        <TouchableOpacity
          className="w-12 h-12 bg-white rounded-2xl items-center justify-center shadow-sm"
          onPress={onFilterPress}
          activeOpacity={0.8}
        >
          <Ionicons name="options-outline" size={24} color="#D97706" />
        </TouchableOpacity>
      )}
    </View>
  );
};

export default SearchBar;
