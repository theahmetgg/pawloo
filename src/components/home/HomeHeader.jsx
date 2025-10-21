import React, { useEffect, useRef } from "react";
import { View, Text, TouchableOpacity, Image, Animated } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";

export default function HomeHeader({
  username = "Misafir",
  locationText = "İstanbul, 5 km",
  onSearchPress,
  onLocationPress,
  onAvatarPress,
  subtitle = "Hoş geldin",
  placeholder,
  avatarUri,
}) {
  // 👋 El sallama animasyonu
  const waveAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const loop = Animated.loop(
      Animated.sequence([
        Animated.timing(waveAnim, { toValue: 1, duration: 350, useNativeDriver: true }),
        Animated.timing(waveAnim, { toValue: -1, duration: 350, useNativeDriver: true }),
        Animated.timing(waveAnim, { toValue: 0, duration: 300, useNativeDriver: true }),
        Animated.delay(1300),
      ])
    );
    loop.start();
    return () => loop.stop();
  }, []);

  const rotate = waveAnim.interpolate({
    inputRange: [-1, 1],
    outputRange: ["-15deg", "15deg"],
  });

  return (
    <LinearGradient
      colors={["#F0FDFA", "#FFFFFF"]}
      start={{ x: 0, y: 0 }}
      end={{ x: 0, y: 1 }}
      className='px-5 pt-12 pb-6 rounded-b-3xl shadow-sm'
    >
      {/* Üst satır: selamlama + konum + avatar */}
      <View className='flex-row items-center justify-between mb-6'>
        <View className='flex-1 mr-3'>
          <View className='flex-row items-center gap-1'>
            <Text className='text-gray-500 text-md'>{subtitle}</Text>
            <Animated.Text
              style={{
                transform: [{ rotate }],
                fontSize: 18,
                marginLeft: 4,
              }}
            >
              👋
            </Animated.Text>
          </View>
          <Text className='text-xl font-bold text-gray-900' numberOfLines={1}>
            {username}
          </Text>
        </View>

        <TouchableOpacity
          onPress={onLocationPress}
          className='flex-row items-center bg-[#14B8A6] rounded-full px-3 py-2 shadow-sm mr-2'
          activeOpacity={0.8}
        >
          <Ionicons name='location' size={16} color='#FFF' />
          <Text className='text-sm text-white font-semibold ml-1' numberOfLines={1}>
            {locationText}
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={onAvatarPress}
          className='w-10 h-10 rounded-full overflow-hidden bg-gray-200'
          activeOpacity={0.8}
        >
          {avatarUri ? (
            <Image source={{ uri: avatarUri }} className='w-full h-full' />
          ) : (
            <View className='w-full h-full items-center justify-center'>
              <Ionicons name='person' size={18} color='#64748B' />
            </View>
          )}
        </TouchableOpacity>
      </View>

      {/* Arama kutusu */}
      <TouchableOpacity
        onPress={onSearchPress}
        activeOpacity={0.9}
        className='flex-row items-center bg-white rounded-full px-4 py-3 shadow-sm border border-gray-100'
      >
        <Ionicons name='search-outline' size={20} color='#14B8A6' />
        <Text className='text-base text-gray-400 ml-2'>{placeholder}</Text>
      </TouchableOpacity>
    </LinearGradient>
  );
}
