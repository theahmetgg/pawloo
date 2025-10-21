import React, { useState, useRef } from "react";
import { View, Text, ScrollView, Image, TouchableOpacity, Dimensions, StatusBar, Animated } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import SafeAreaContainer from "../../components/shared/SafeAreaContainer";
import HeaderOverlay from "../../components/shared/HeaderOverlay";
import DetailSection from "../../components/shared/DetailSection";
import useThemeColors from "../../hooks/useThemeColors";
import { StatusBadge } from "../../components/common";

const { width } = Dimensions.get("window");
const HERO_HEIGHT = Math.min(420, Math.round(width * 0.9));

const PlayMateDetailScreen = ({ route, navigation }) => {
  const { pet } = route.params;
  const theme = useThemeColors("playMate");
  const insets = useSafeAreaInsets();
  const scrollY = useRef(new Animated.Value(0)).current;
  const [isFavorite, setIsFavorite] = useState(false);
  const [activeImageIndex, setActiveImageIndex] = useState(0);

  // Mock data
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

  const onGalleryScroll = e => {
    const x = e.nativeEvent.contentOffset.x;
    const idx = Math.round(x / width);
    if (idx !== activeImageIndex) setActiveImageIndex(idx);
  };

  const handleShare = () => {
    // Share functionality
  };

  const handleFavorite = () => {
    setIsFavorite(!isFavorite);
  };

  return (
    <SafeAreaContainer bgColor={theme.bg} edges={["bottom"]}>
      <StatusBar barStyle='light-content' backgroundColor='transparent' translucent />

      {/* Animated Header */}
      <HeaderOverlay
        scrollY={scrollY}
        onBack={() => navigation.goBack()}
        actions={[
          { icon: "share-outline", onPress: handleShare, accessibilityLabel: "Paylaş" },
          {
            icon: isFavorite ? "heart" : "heart-outline",
            onPress: handleFavorite,
            accessibilityLabel: "Favorilere ekle",
          },
        ]}
        bgColor={theme.overlay}
        iconColor={theme.text}
        title={petDetails.name}
      />

      <Animated.ScrollView
        showsVerticalScrollIndicator={false}
        onScroll={Animated.event([{ nativeEvent: { contentOffset: { y: scrollY } } }], { useNativeDriver: false })}
        scrollEventThrottle={16}
        contentContainerStyle={{ paddingBottom: 100 }}
      >
        {/* Hero Gallery */}
        <View style={{ height: HERO_HEIGHT }}>
          <ScrollView
            horizontal
            pagingEnabled
            showsHorizontalScrollIndicator={false}
            onScroll={onGalleryScroll}
            scrollEventThrottle={16}
          >
            {petDetails.gallery.map((uri, i) => (
              <View key={i} style={{ width, height: HERO_HEIGHT }}>
                <Image
                  source={{ uri }}
                  style={{ width, height: HERO_HEIGHT, resizeMode: "cover" }}
                  accessibilityLabel={`${petDetails.name} fotoğrafı ${i + 1}`}
                />
              </View>
            ))}
          </ScrollView>

          {/* Bottom gradient */}
          <LinearGradient
            colors={["transparent", theme.bg]}
            style={{
              position: "absolute",
              bottom: 0,
              left: 0,
              right: 0,
              height: 100,
            }}
          />

          {/* Image counter */}
          <View
            style={{
              position: "absolute",
              right: 16,
              bottom: 16,
              backgroundColor: "rgba(255,255,255,0.6)",
              paddingHorizontal: 12,
              height: 24,
              justifyContent: "center",
              borderRadius: 12,
            }}
          >
            <Text style={{ color: theme.text, fontSize: 12, fontWeight: "600" }}>
              {activeImageIndex + 1} / {petDetails.gallery.length}
            </Text>
          </View>
        </View>

        {/* Content */}
        <View style={{ paddingTop: 8 }}>
          {/* Title Section */}
          <View className='px-4 mb-6'>
            <View className='flex-row justify-between items-start mb-4'>
              <View className='flex-1'>
                <Text style={{ color: theme.text, fontSize: 32, fontWeight: "700" }} accessibilityRole='header'>
                  {petDetails.name}
                </Text>
                <Text style={{ color: theme.textSecondary, fontSize: 18, marginTop: 4 }}>{petDetails.breed}</Text>
              </View>
              <StatusBadge status={petDetails.status} />
            </View>

            {/* Quick Info */}
            <View className='flex-row gap-4 flex-wrap'>
              <View className='flex-row items-center gap-2'>
                <Ionicons name='calendar-outline' size={18} color={theme.accent} />
                <Text style={{ color: theme.textSecondary, fontSize: 14, fontWeight: "500" }}>
                  {petDetails.age} yaşında
                </Text>
              </View>
              <View className='flex-row items-center gap-2'>
                <Ionicons name='location-outline' size={18} color={theme.accent} />
                <Text style={{ color: theme.textSecondary, fontSize: 14, fontWeight: "500" }}>
                  {petDetails.distance} uzakta
                </Text>
              </View>
            </View>
          </View>

          {/* Owner Section */}
          <DetailSection
            title='Sahibi'
            icon='person-outline'
            iconColor={theme.accent}
            cardBg={theme.card}
            textColor={theme.text}
          >
            <View className='flex-row items-center'>
              <View
                style={{ backgroundColor: theme.accentLight }}
                className='w-14 h-14 rounded-full items-center justify-center mr-4'
              >
                <Ionicons name='person' size={28} color={theme.accent} />
              </View>
              <View className='flex-1'>
                <View className='flex-row items-center gap-2 mb-1'>
                  <Text style={{ color: theme.text, fontSize: 17, fontWeight: "600" }}>{petDetails.owner}</Text>
                  {petDetails.ownerVerified && <Ionicons name='checkmark-circle' size={18} color={theme.accent} />}
                </View>
                <Text style={{ color: theme.textSecondary, fontSize: 13 }}>Pet Sahibi</Text>
              </View>
              <TouchableOpacity
                style={{ backgroundColor: theme.accentLight }}
                className='w-11 h-11 rounded-full items-center justify-center'
                accessibilityLabel='Mesaj gönder'
                accessibilityRole='button'
              >
                <Ionicons name='chatbubble-outline' size={20} color={theme.accent} />
              </TouchableOpacity>
            </View>
          </DetailSection>

          {/* Personality */}
          <DetailSection
            title='Karakter Özellikleri'
            icon='star-outline'
            iconColor={theme.accent}
            cardBg={theme.card}
            textColor={theme.text}
          >
            <View className='flex-row flex-wrap gap-2'>
              {petDetails.personality.map((trait, index) => (
                <View key={index} style={{ backgroundColor: theme.accentLight }} className='px-4 py-2 rounded-full'>
                  <Text style={{ color: theme.accent, fontSize: 14, fontWeight: "600" }}>{trait}</Text>
                </View>
              ))}
            </View>
          </DetailSection>

          {/* Favorite Activities */}
          <DetailSection
            title='Favori Aktiviteler'
            icon='game-controller-outline'
            iconColor={theme.accent}
            cardBg={theme.card}
            textColor={theme.text}
          >
            <View className='gap-3'>
              {petDetails.favoriteActivities.map((activity, index) => (
                <View key={index} className='flex-row items-center gap-3'>
                  <View
                    style={{ backgroundColor: theme.accentLight }}
                    className='w-9 h-9 rounded-full items-center justify-center'
                  >
                    <Ionicons name='checkmark' size={18} color={theme.accent} />
                  </View>
                  <Text style={{ color: theme.text, fontSize: 15, fontWeight: "500" }}>{activity}</Text>
                </View>
              ))}
            </View>
          </DetailSection>

          {/* Play Times */}
          <DetailSection
            title='Oyun Saatleri'
            icon='time-outline'
            iconColor={theme.accent}
            cardBg={theme.card}
            textColor={theme.text}
          >
            <View className='gap-3'>
              {petDetails.playTimes.map((time, index) => (
                <View key={index} className='flex-row items-center gap-3'>
                  <Ionicons name='time' size={20} color={theme.accent} />
                  <Text style={{ color: theme.text, fontSize: 15, fontWeight: "500" }}>{time}</Text>
                </View>
              ))}
            </View>
          </DetailSection>
        </View>
      </Animated.ScrollView>

      {/* Sticky CTA Bar */}
      <View
        style={{
          backgroundColor: theme.card,
          borderTopWidth: 1,
          borderTopColor: theme.border,
          paddingTop: 16,
          paddingBottom: insets.bottom + 16,
          paddingHorizontal: 16,
        }}
      >
        <View className='flex-row gap-3'>
          <TouchableOpacity
            style={{
              flex: 1,
              borderWidth: 2,
              borderColor: theme.accent,
              borderRadius: 12,
              paddingVertical: 14,
            }}
            className='flex-row items-center justify-center gap-2'
            accessibilityLabel='Mesaj gönder'
            accessibilityRole='button'
          >
            <Ionicons name='chatbubble-outline' size={20} color={theme.accent} />
            <Text style={{ color: theme.accent, fontSize: 15, fontWeight: "700" }}>Mesaj Gönder</Text>
          </TouchableOpacity>

          <LinearGradient
            colors={[theme.accent, theme.accent + "DD"]}
            style={{ flex: 1, borderRadius: 12 }}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
          >
            <TouchableOpacity
              style={{ paddingVertical: 14 }}
              className='flex-row items-center justify-center gap-2'
              accessibilityLabel='Oyun talebi gönder'
              accessibilityRole='button'
            >
              <Ionicons name='game-controller' size={20} color='#FFF' />
              <Text style={{ color: "#FFF", fontSize: 15, fontWeight: "700" }}>Oyun Talebi</Text>
            </TouchableOpacity>
          </LinearGradient>
        </View>
      </View>
    </SafeAreaContainer>
  );
};

export default PlayMateDetailScreen;
