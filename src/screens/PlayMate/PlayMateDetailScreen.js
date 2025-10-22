import React, { useState, useRef } from "react";
import { View, Text, ScrollView, Image, TouchableOpacity, Dimensions, StatusBar, Animated, Modal, TextInput } from "react-native";
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

  // Modal state'leri
  const [showPlayRequestModal, setShowPlayRequestModal] = useState(false);
  const [showMessageModal, setShowMessageModal] = useState(false);

  // Oyun talebi state'leri
  const [playDate, setPlayDate] = useState(null);
  const [playTime, setPlayTime] = useState('');
  const [activityType, setActivityType] = useState('Parkta koşma');
  const [playLocation, setPlayLocation] = useState('');
  const [playNotes, setPlayNotes] = useState('');

  // Mesaj state'leri
  const [messageSubject, setMessageSubject] = useState('');
  const [messageContent, setMessageContent] = useState('');

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

  // Oyun talebi fonksiyonları
  const formatDate = (date) => {
    if (!date) return 'Tarih seçin';
    return date.toLocaleDateString('tr-TR', { day: 'numeric', month: 'long', year: 'numeric' });
  };

  const setTodayAsPlayDate = () => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    setPlayDate(today);
  };

  const handleSendPlayRequest = () => {
    if (!playDate || !playTime || !playLocation) {
      alert('Lütfen tüm zorunlu alanları doldurun');
      return;
    }
    alert('Oyun talebi başarıyla gönderildi!');
    setShowPlayRequestModal(false);
    // State'leri temizle
    setPlayDate(null);
    setPlayTime('');
    setPlayLocation('');
    setPlayNotes('');
  };

  // Mesaj fonksiyonları
  const handleSendMessage = () => {
    if (!messageSubject || !messageContent) {
      alert('Lütfen tüm alanları doldurun');
      return;
    }
    alert('Mesaj başarıyla gönderildi!');
    setShowMessageModal(false);
    // State'leri temizle
    setMessageSubject('');
    setMessageContent('');
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
        contentContainerStyle={{ paddingBottom: 20 }}
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
                onPress={() => setShowMessageModal(true)}
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
            onPress={() => setShowMessageModal(true)}
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
              onPress={() => setShowPlayRequestModal(true)}
            >
              <Ionicons name='game-controller' size={20} color='#FFF' />
              <Text style={{ color: "#FFF", fontSize: 15, fontWeight: "700" }}>Oyun Talebi</Text>
            </TouchableOpacity>
          </LinearGradient>
        </View>
      </View>

      {/* Oyun Talebi Modal */}
      <Modal
        visible={showPlayRequestModal}
        animationType="slide"
        transparent
        onRequestClose={() => setShowPlayRequestModal(false)}
      >
        <View style={{ flex: 1, backgroundColor: 'rgba(0,0,0,0.7)', justifyContent: 'flex-end' }}>
          <View
            style={{
              backgroundColor: theme.card,
              borderTopLeftRadius: 24,
              borderTopRightRadius: 24,
              maxHeight: '90%',
            }}
          >
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
                padding: 16,
                borderBottomWidth: 1,
                borderBottomColor: theme.border,
              }}
            >
              <Text style={{ color: theme.text, fontSize: 20, fontWeight: '700' }}>
                Oyun Talebi Gönder
              </Text>
              <TouchableOpacity onPress={() => setShowPlayRequestModal(false)}>
                <Ionicons name="close" size={28} color={theme.text} />
              </TouchableOpacity>
            </View>

            <ScrollView style={{ maxHeight: 500 }}>
              <View style={{ padding: 16 }}>
                {/* Tarih ve Saat Seçimi */}
                <View style={{ marginBottom: 20 }}>
                  <Text style={{ color: theme.text, fontSize: 16, fontWeight: '600', marginBottom: 12 }}>
                    Ne Zaman?
                  </Text>

                  <View style={{ marginBottom: 12 }}>
                    <Text
                      style={{
                        color: theme.textSecondary,
                        fontSize: 13,
                        marginBottom: 8,
                        fontWeight: '500',
                      }}
                    >
                      Tarih *
                    </Text>
                    <TouchableOpacity
                      onPress={setTodayAsPlayDate}
                      style={{
                        backgroundColor: theme.bg,
                        padding: 14,
                        borderRadius: 12,
                        borderWidth: 1,
                        borderColor: playDate ? theme.accent : theme.border,
                      }}
                    >
                      <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8 }}>
                        <Ionicons
                          name="calendar-outline"
                          size={18}
                          color={playDate ? theme.accent : theme.textSecondary}
                        />
                        <Text
                          style={{
                            color: playDate ? theme.text : theme.textSecondary,
                            fontSize: 14,
                            flex: 1,
                          }}
                        >
                          {formatDate(playDate)}
                        </Text>
                      </View>
                    </TouchableOpacity>
                  </View>

                  <View>
                    <Text
                      style={{
                        color: theme.textSecondary,
                        fontSize: 13,
                        marginBottom: 8,
                        fontWeight: '500',
                      }}
                    >
                      Saat *
                    </Text>
                    <TextInput
                      value={playTime}
                      onChangeText={setPlayTime}
                      placeholder="Örn: 14:00"
                      placeholderTextColor={theme.textSecondary}
                      style={{
                        backgroundColor: theme.bg,
                        padding: 14,
                        borderRadius: 12,
                        fontSize: 15,
                        color: theme.text,
                        borderWidth: 1,
                        borderColor: playTime ? theme.accent : theme.border,
                      }}
                    />
                  </View>
                </View>

                {/* Aktivite Türü */}
                <View style={{ marginBottom: 20 }}>
                  <Text style={{ color: theme.text, fontSize: 16, fontWeight: '600', marginBottom: 12 }}>
                    Aktivite
                  </Text>
                  <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 8 }}>
                    {petDetails.favoriteActivities.map((activity) => (
                      <TouchableOpacity
                        key={activity}
                        onPress={() => setActivityType(activity)}
                        style={{
                          backgroundColor: activityType === activity ? theme.accentLight : theme.bg,
                          paddingHorizontal: 16,
                          paddingVertical: 10,
                          borderRadius: 20,
                          borderWidth: 1,
                          borderColor: activityType === activity ? theme.accent : theme.border,
                        }}
                      >
                        <Text
                          style={{
                            color: activityType === activity ? theme.accent : theme.text,
                            fontSize: 14,
                            fontWeight: '600',
                          }}
                        >
                          {activity}
                        </Text>
                      </TouchableOpacity>
                    ))}
                  </View>
                </View>

                {/* Konum */}
                <View style={{ marginBottom: 20 }}>
                  <Text style={{ color: theme.text, fontSize: 16, fontWeight: '600', marginBottom: 8 }}>
                    Konum *
                  </Text>
                  <Text
                    style={{ color: theme.textSecondary, fontSize: 13, marginBottom: 8, lineHeight: 18 }}
                  >
                    Buluşma yerini belirtin
                  </Text>
                  <TextInput
                    value={playLocation}
                    onChangeText={setPlayLocation}
                    placeholder="Örn: Maçka Parkı"
                    placeholderTextColor={theme.textSecondary}
                    style={{
                      backgroundColor: theme.bg,
                      padding: 14,
                      borderRadius: 12,
                      fontSize: 15,
                      color: theme.text,
                      borderWidth: 1,
                      borderColor: playLocation ? theme.accent : theme.border,
                    }}
                  />
                </View>

                {/* Özel Notlar */}
                <View style={{ marginBottom: 20 }}>
                  <Text style={{ color: theme.text, fontSize: 16, fontWeight: '600', marginBottom: 8 }}>
                    Özel Notlar (Opsiyonel)
                  </Text>
                  <TextInput
                    value={playNotes}
                    onChangeText={setPlayNotes}
                    placeholder="Eklemek istediğiniz bir not var mı?"
                    placeholderTextColor={theme.textSecondary}
                    multiline
                    numberOfLines={4}
                    style={{
                      backgroundColor: theme.bg,
                      padding: 14,
                      borderRadius: 12,
                      fontSize: 15,
                      color: theme.text,
                      borderWidth: 1,
                      borderColor: theme.border,
                      minHeight: 100,
                      textAlignVertical: 'top',
                    }}
                  />
                </View>
              </View>
            </ScrollView>

            {/* Gönder Butonu */}
            <View style={{ padding: 16, paddingBottom: insets.bottom + 16 }}>
              <LinearGradient
                colors={[theme.accent, theme.accent + 'DD']}
                style={{ borderRadius: 12 }}
              >
                <TouchableOpacity
                  style={{ paddingVertical: 16, alignItems: 'center' }}
                  onPress={handleSendPlayRequest}
                  disabled={!playDate || !playTime || !playLocation}
                >
                  <Text style={{ color: '#FFF', fontSize: 16, fontWeight: '700' }}>
                    Talebi Gönder
                  </Text>
                </TouchableOpacity>
              </LinearGradient>
              {(!playDate || !playTime || !playLocation) && (
                <Text
                  style={{
                    color: theme.textSecondary,
                    fontSize: 13,
                    textAlign: 'center',
                    marginTop: 12,
                  }}
                >
                  * Lütfen zorunlu alanları doldurun
                </Text>
              )}
            </View>
          </View>
        </View>
      </Modal>

      {/* Mesaj Gönder Modal */}
      <Modal
        visible={showMessageModal}
        animationType="slide"
        transparent
        onRequestClose={() => setShowMessageModal(false)}
      >
        <View style={{ flex: 1, backgroundColor: 'rgba(0,0,0,0.7)', justifyContent: 'flex-end' }}>
          <View
            style={{
              backgroundColor: theme.card,
              borderTopLeftRadius: 24,
              borderTopRightRadius: 24,
              maxHeight: '80%',
            }}
          >
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
                padding: 16,
                borderBottomWidth: 1,
                borderBottomColor: theme.border,
              }}
            >
              <Text style={{ color: theme.text, fontSize: 20, fontWeight: '700' }}>
                Mesaj Gönder
              </Text>
              <TouchableOpacity onPress={() => setShowMessageModal(false)}>
                <Ionicons name="close" size={28} color={theme.text} />
              </TouchableOpacity>
            </View>

            <ScrollView style={{ maxHeight: 400 }}>
              <View style={{ padding: 16 }}>
                {/* Alıcı Bilgisi */}
                <View
                  style={{
                    backgroundColor: theme.accentLight,
                    padding: 12,
                    borderRadius: 12,
                    marginBottom: 20,
                    flexDirection: 'row',
                    alignItems: 'center',
                    gap: 12,
                  }}
                >
                  <View
                    style={{ backgroundColor: theme.card }}
                    className='w-12 h-12 rounded-full items-center justify-center'
                  >
                    <Ionicons name='person' size={24} color={theme.accent} />
                  </View>
                  <View className='flex-1'>
                    <Text style={{ color: theme.text, fontSize: 15, fontWeight: '600', marginBottom: 2 }}>
                      Alıcı: {petDetails.owner}
                    </Text>
                    <Text style={{ color: theme.textSecondary, fontSize: 13 }}>
                      {petDetails.name}'in sahibi
                    </Text>
                  </View>
                </View>

                {/* Mesaj Konusu */}
                <View style={{ marginBottom: 20 }}>
                  <Text
                    style={{
                      color: theme.textSecondary,
                      fontSize: 13,
                      marginBottom: 8,
                      fontWeight: '500',
                    }}
                  >
                    Konu *
                  </Text>
                  <TextInput
                    value={messageSubject}
                    onChangeText={setMessageSubject}
                    placeholder="Mesajın konusu"
                    placeholderTextColor={theme.textSecondary}
                    style={{
                      backgroundColor: theme.bg,
                      padding: 14,
                      borderRadius: 12,
                      fontSize: 15,
                      color: theme.text,
                      borderWidth: 1,
                      borderColor: messageSubject ? theme.accent : theme.border,
                    }}
                  />
                </View>

                {/* Mesaj İçeriği */}
                <View style={{ marginBottom: 20 }}>
                  <Text
                    style={{
                      color: theme.textSecondary,
                      fontSize: 13,
                      marginBottom: 8,
                      fontWeight: '500',
                    }}
                  >
                    Mesajınız *
                  </Text>
                  <TextInput
                    value={messageContent}
                    onChangeText={setMessageContent}
                    placeholder="Mesajınızı buraya yazın..."
                    placeholderTextColor={theme.textSecondary}
                    multiline
                    numberOfLines={6}
                    style={{
                      backgroundColor: theme.bg,
                      padding: 14,
                      borderRadius: 12,
                      fontSize: 15,
                      color: theme.text,
                      borderWidth: 1,
                      borderColor: messageContent ? theme.accent : theme.border,
                      minHeight: 150,
                      textAlignVertical: 'top',
                    }}
                  />
                </View>

                {/* Hızlı Mesaj Şablonları */}
                <View>
                  <Text style={{ color: theme.text, fontSize: 14, fontWeight: '600', marginBottom: 10 }}>
                    Hızlı Mesajlar
                  </Text>
                  <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 8 }}>
                    {[
                      'Merhaba! 👋',
                      'Oyun arkadaşı arıyorum',
                      'Parkta buluşalım mı?',
                    ].map((template) => (
                      <TouchableOpacity
                        key={template}
                        onPress={() => setMessageContent(messageContent + (messageContent ? ' ' : '') + template)}
                        style={{
                          backgroundColor: theme.bg,
                          paddingHorizontal: 12,
                          paddingVertical: 8,
                          borderRadius: 16,
                          borderWidth: 1,
                          borderColor: theme.border,
                        }}
                      >
                        <Text style={{ color: theme.text, fontSize: 13 }}>
                          {template}
                        </Text>
                      </TouchableOpacity>
                    ))}
                  </View>
                </View>
              </View>
            </ScrollView>

            {/* Gönder Butonu */}
            <View style={{ padding: 16, paddingBottom: insets.bottom + 16 }}>
              <LinearGradient
                colors={[theme.accent, theme.accent + 'DD']}
                style={{ borderRadius: 12 }}
              >
                <TouchableOpacity
                  style={{ paddingVertical: 16, alignItems: 'center', flexDirection: 'row', justifyContent: 'center', gap: 8 }}
                  onPress={handleSendMessage}
                  disabled={!messageSubject || !messageContent}
                >
                  <Ionicons name="send" size={18} color="#FFF" />
                  <Text style={{ color: '#FFF', fontSize: 16, fontWeight: '700' }}>
                    Mesajı Gönder
                  </Text>
                </TouchableOpacity>
              </LinearGradient>
              {(!messageSubject || !messageContent) && (
                <Text
                  style={{
                    color: theme.textSecondary,
                    fontSize: 13,
                    textAlign: 'center',
                    marginTop: 12,
                  }}
                >
                  * Lütfen tüm alanları doldurun
                </Text>
              )}
            </View>
          </View>
        </View>
      </Modal>
    </SafeAreaContainer>
  );
};

export default PlayMateDetailScreen;
