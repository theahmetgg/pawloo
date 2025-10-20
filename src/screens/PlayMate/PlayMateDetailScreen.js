import React, { useState, useRef } from "react";
import {
  View,
  Text,
  ScrollView,
  Image,
  TouchableOpacity,
  Dimensions,
  StatusBar,
  NativeSyntheticEvent,
  NativeScrollEvent,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Button, StatusBadge } from "../../components/common";
import SafeAreaContainer from "../../components/layout/SafeAreaContainer";

const { width } = Dimensions.get("window");
const HERO_HEIGHT = Math.round(width * 0.65); // İstersen: Math.round(width * 0.9)

const PlayMateDetailScreen = ({ route, navigation }) => {
  const { pet } = route.params;
  const insets = useSafeAreaInsets();
  const [isFavorite, setIsFavorite] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);
  const galleryRef = useRef(null);

  // Mock ek veriler
  const petDetails = {
    ...pet,
    personality: ["Arkadaş canlısı", "Enerjik", "Oyuncu", "Sosyal"],
    favoriteActivities: ["Parkta koşma", "Top oynama", "Yüzme", "Saklambaç"],
    playTimes: ["Sabah 8:00-10:00", "Akşam 18:00-20:00"],
    gallery: [
      pet.image,
      "https://images.unsplash.com/photo-1601758228041-f3b2795255f1?w=400",
      "https://images.unsplash.com/photo-1587300003388-59208cc962cb?w=400",
    ],
  };

  const onGalleryScroll = (e /** @type {NativeSyntheticEvent<NativeScrollEvent>} */) => {
    const x = e.nativeEvent.contentOffset.x;
    const idx = Math.round(x / width);
    if (idx !== activeIndex) setActiveIndex(idx);
  };

  return (
    <SafeAreaContainer edges={['top', 'right', 'left']} className='flex-1 bg-gray-50'>
      {/* ÜST KISIM: Immersive hero ve butonlar */}
      <StatusBar translucent backgroundColor='transparent' barStyle='light-content' />
      <View className='relative' style={{ height: HERO_HEIGHT }}>
        {/* Galeri */}
        <ScrollView
          ref={galleryRef}
          horizontal
          pagingEnabled
          showsHorizontalScrollIndicator={false}
          onScroll={onGalleryScroll}
          scrollEventThrottle={16}
        >
          {petDetails.gallery.map((uri, i) => (
            <View key={i} style={{ width, height: HERO_HEIGHT }}>
              <Image source={{ uri }} className='w-full h-full' style={{ resizeMode: "cover" }} />
            </View>
          ))}
        </ScrollView>

        {/* Üstte kontrast için gradient (ikonlar net görünsün) */}
        <LinearGradient
          colors={["rgba(0,0,0,0.55)", "rgba(0,0,0,0.0)"]}
          start={{ x: 0, y: 0 }}
          end={{ x: 0, y: 1 }}
          className='absolute left-0 right-0'
          style={{ top: 0, height: insets.top + 56 }}
        />

        {/* Altta bilgiler için gradient */}
        <LinearGradient
          colors={["rgba(0,0,0,0.0)", "rgba(0,0,0,0.55)"]}
          start={{ x: 0, y: 0 }}
          end={{ x: 0, y: 1 }}
          className='absolute left-0 right-0 bottom-0 h-32'
        />

        {/* Geri butonu */}
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          className='absolute left-4 w-11 h-11 rounded-full items-center justify-center'
          style={{
            top: insets.top + 20,
            backgroundColor: "rgba(255,255,255,0.9)",
          }}
        >
          <Ionicons name='arrow-back' size={24} color='#1F2937' />
        </TouchableOpacity>

        {/* Favori butonu */}
        <TouchableOpacity
          onPress={() => setIsFavorite(!isFavorite)}
          className='absolute right-4 w-11 h-11 rounded-full items-center justify-center'
          style={{
            top: insets.top + 20,
            backgroundColor: "rgba(255,255,255,0.9)",
          }}
        >
          <Ionicons
            name={isFavorite ? "heart" : "heart-outline"}
            size={26}
            color={isFavorite ? "#EC4899" : "#1F2937"}
          />
        </TouchableOpacity>

        {/* Görsel sayacı */}
        <View
          className='absolute right-4 px-3 py-1.5 rounded-full'
          style={{ bottom: 12, backgroundColor: "rgba(0,0,0,0.55)" }}
        >
          <Text className='text-white text-xs font-semibold'>
            {activeIndex + 1} / {petDetails.gallery.length}
          </Text>
        </View>
      </View>

      {/* İçerik */}
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 100 }}>
        <View className='p-4'>
          {/* Başlık bloğu */}
          <View className='mb-6'>
            <View className='flex-row justify-between items-start mb-4'>
              <View>
                <Text className='text-3xl font-bold text-gray-900'>{petDetails.name}</Text>
                <Text className='text-lg text-gray-500 mt-1'>{petDetails.breed}</Text>
              </View>
              <StatusBadge status={petDetails.status} />
            </View>

            <View className='flex-row gap-4'>
              <View className='flex-row items-center gap-2'>
                <Ionicons name='calendar-outline' size={20} color='#D97706' />
                <Text className='text-base text-gray-500 font-medium'>{petDetails.age} yaşında</Text>
              </View>
              <View className='flex-row items-center gap-2'>
                <Ionicons name='location-outline' size={20} color='#D97706' />
                <Text className='text-base text-gray-500 font-medium'>{petDetails.distance} uzakta</Text>
              </View>
            </View>
          </View>

          {/* Owner Info */}
          <View className='mb-6'>
            <Text className='text-xl font-bold text-gray-900 mb-4'>Sahibi</Text>
            <View className='flex-row items-center p-4 bg-white rounded-2xl shadow-sm'>
              <View className='w-14 h-14 rounded-full bg-amber-50 items-center justify-center mr-4'>
                <Ionicons name='person' size={24} color='#D97706' />
              </View>
              <View className='flex-1'>
                <View className='flex-row items-center gap-1 mb-1'>
                  <Text className='text-lg font-semibold text-gray-900'>{petDetails.owner}</Text>
                  {petDetails.ownerVerified && <Ionicons name='checkmark-circle' size={18} color='#D97706' />}
                </View>
                <Text className='text-sm text-gray-500'>Pet Sahibi</Text>
              </View>
              <TouchableOpacity className='w-11 h-11 rounded-full bg-amber-50 items-center justify-center'>
                <Ionicons name='chatbubble-outline' size={20} color='#D97706' />
              </TouchableOpacity>
            </View>
          </View>

          {/* Personality */}
          <View className='mb-6'>
            <Text className='text-xl font-bold text-gray-900 mb-4'>Karakter Özellikleri</Text>
            <View className='flex-row flex-wrap gap-2'>
              {petDetails.personality.map((trait, index) => (
                <View key={index} className='flex-row items-center px-4 py-2 bg-white rounded-full gap-1 shadow-sm'>
                  <Ionicons name='star' size={14} color='#EC4899' />
                  <Text className='text-sm font-medium text-gray-900'>{trait}</Text>
                </View>
              ))}
            </View>
          </View>

          {/* Favorite Activities */}
          <View className='mb-6'>
            <Text className='text-xl font-bold text-gray-900 mb-4'>Favori Aktiviteler</Text>
            <View className='gap-2'>
              {petDetails.favoriteActivities.map((activity, index) => (
                <View key={index} className='flex-row items-center p-4 bg-white rounded-xl gap-4 shadow-sm'>
                  <View className='w-9 h-9 rounded-full bg-amber-50 items-center justify-center'>
                    <Ionicons name='game-controller' size={18} color='#D97706' />
                  </View>
                  <Text className='text-base font-medium text-gray-900'>{activity}</Text>
                </View>
              ))}
            </View>
          </View>

          {/* Play Times */}
          <View className='mb-6'>
            <Text className='text-xl font-bold text-gray-900 mb-4'>Oyun Saatleri</Text>
            <View className='gap-2'>
              {petDetails.playTimes.map((time, index) => (
                <View key={index} className='flex-row items-center p-4 bg-white rounded-xl gap-4 shadow-sm'>
                  <Ionicons name='time-outline' size={18} color='#D97706' />
                  <Text className='text-base font-medium text-gray-900'>{time}</Text>
                </View>
              ))}
            </View>
          </View>
        </View>
      </ScrollView>

      {/* Bottom Action Buttons */}
      <View
        className='px-4 pt-4 bg-white border-t border-gray-200 shadow-lg'
        style={{ paddingBottom: insets.bottom + 16 }}
      >
        <View className='flex-row gap-4'>
          {/* Mesaj Gönder */}
          <TouchableOpacity className='flex-1 flex-row items-center justify-center py-3 rounded-xl border-2 border-amber-600 gap-2'>
            <Ionicons name='chatbubble-outline' size={20} color='#D97706' />
            <Text className='text-base font-semibold text-amber-600'>Mesaj Gönder</Text>
          </TouchableOpacity>

          {/* Oyun Talebi Gönder */}
          <TouchableOpacity className='flex-1 rounded-xl '>
            <LinearGradient
              colors={["#D97706", "#B45309"]}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
              className='flex-1 flex-row items-center justify-center py-3 rounded-xl border-2 border-amber-600 gap-2'
            >
              <Ionicons name='game-controller' size={20} color='#FFF' />
              <Text className='text-base font-semibold text-white'>Oyun Talebi Gönder</Text>
            </LinearGradient>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaContainer>
  );
};

export default PlayMateDetailScreen;
