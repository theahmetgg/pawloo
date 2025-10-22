import React, { useState, useRef } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Image,
  Dimensions,
  Modal,
  StatusBar,
  Animated,
  TextInput,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import SafeAreaContainer from '../../components/shared/SafeAreaContainer';
import HeaderOverlay from '../../components/shared/HeaderOverlay';
import DetailSection from '../../components/shared/DetailSection';
import useThemeColors from '../../hooks/useThemeColors';

const { width } = Dimensions.get('window');
const HERO_HEIGHT = Math.min(420, Math.round(width * 0.9));

const HotelCareDetailScreen = ({ navigation, route }) => {
  const theme = useThemeColors('hotelCare');
  const insets = useSafeAreaInsets();
  const scrollY = useRef(new Animated.Value(0)).current;
  const [isFavorite, setIsFavorite] = useState(false);
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [activeTab, setActiveTab] = useState('about');
  const [showBookingModal, setShowBookingModal] = useState(false);

  // Rezervasyon state'leri
  const [checkInDate, setCheckInDate] = useState(null);
  const [checkOutDate, setCheckOutDate] = useState(null);
  const [petName, setPetName] = useState('');
  const [petType, setPetType] = useState('Köpek');
  const [specialRequests, setSpecialRequests] = useState('');

  // Mock data
  const service = {
    id: '1',
    name: 'Pati Palace Pet Hotel',
    rating: 4.9,
    reviewCount: 127,
    distance: '2.3 km',
    location: 'İstanbul, Kadıköy',
    address: 'Caferağa Mahallesi, Moda Caddesi No: 45',
    pricePerDay: 250,
    verified: true,
    images: [
      'https://images.unsplash.com/photo-1548199973-03cce0bbc87b?w=800',
      'https://images.unsplash.com/photo-1544568104-5b7eb8189dd4?w=800',
      'https://images.unsplash.com/photo-1514373941175-0a141072bbc8?w=800',
    ],
    host: {
      name: 'Mehmet Yılmaz',
      since: '2020',
      responseRate: 95,
      responseTime: '1 saat içinde',
    },
    description:
      'Pati Palace, modern tesisleri ve deneyimli personeliyle evcil dostlarınıza 5 yıldızlı hizmet sunuyor. 7/24 veteriner gözetimi, kameralı odalar ve geniş oyun alanlarımızla sevimli dostlarınız güvende.',
    features: [
      { icon: 'videocam', label: 'Kameralı Odalar', color: '#3B82F6' },
      { icon: 'medical', label: '7/24 Veteriner', color: '#10B981' },
      { icon: 'basketball', label: 'Oyun Alanı', color: '#F59E0B' },
      { icon: 'snow', label: 'Klima', color: '#06B6D4' },
    ],
    amenities: [
      'Günde 3 öğün yemek',
      'Premium mama seçenekleri',
      'Günlük fotoğraf/video paylaşımı',
      'Grooming hizmeti (ekstra ücret)',
      'Veteriner acil müdahale',
      'Havuzlu bahçe',
    ],
    rules: [
      'Tüm aşılar güncel olmalı',
      'Sağlık raporu gerekli',
      'İç-dış parazit tedavisi yapılmalı',
      'İptal için 24 saat önceden bildirim',
    ],
    reviews: [
      {
        id: '1',
        user: 'Ayşe K.',
        rating: 5,
        date: '2 hafta önce',
        comment:
          'Harika bir deneyimdi! Köpeğim çok mutluydu, günlük gönderilen fotoğraflar harikaydı. Kesinlikle tekrar geleceğiz.',
      },
    ],
  };

  const onGalleryScroll = (e) => {
    const x = e.nativeEvent.contentOffset.x;
    const idx = Math.round(x / width);
    if (idx !== activeImageIndex) setActiveImageIndex(idx);
  };

  const handleShare = () => {};
  const handleFavorite = () => setIsFavorite(!isFavorite);

  // Rezervasyon fonksiyonları
  const formatDate = (date) => {
    if (!date) return 'Tarih seçin';
    return date.toLocaleDateString('tr-TR', { day: 'numeric', month: 'long', year: 'numeric' });
  };

  const calculateDays = () => {
    if (!checkInDate || !checkOutDate) return 0;
    const diff = Math.ceil((checkOutDate - checkInDate) / (1000 * 60 * 60 * 24));
    return diff > 0 ? diff : 0;
  };

  const calculateTotalPrice = () => {
    const days = calculateDays();
    return days * service.pricePerDay;
  };

  const handleConfirmBooking = () => {
    if (!checkInDate || !checkOutDate || !petName) {
      alert('Lütfen tüm zorunlu alanları doldurun');
      return;
    }
    // Rezervasyon işlemi burada yapılacak
    alert('Rezervasyon başarıyla oluşturuldu!');
    setShowBookingModal(false);
    // State'leri temizle
    setCheckInDate(null);
    setCheckOutDate(null);
    setPetName('');
    setSpecialRequests('');
  };

  const setTodayAsCheckIn = () => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    setCheckInDate(today);
  };

  const setTomorrowAsCheckOut = () => {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    tomorrow.setHours(0, 0, 0, 0);
    setCheckOutDate(tomorrow);
  };

  const tabs = [
    { id: 'about', label: 'Hakkında', icon: 'information-circle' },
    { id: 'amenities', label: 'Olanaklar', icon: 'list' },
    { id: 'reviews', label: 'Yorumlar', icon: 'star' },
  ];

  const renderAboutTab = () => (
    <View>
      <DetailSection
        title="Açıklama"
        icon="document-text-outline"
        iconColor={theme.accent}
        cardBg={theme.card}
        textColor={theme.text}
      >
        <Text style={{ color: theme.textSecondary, fontSize: 15, lineHeight: 24 }}>
          {service.description}
        </Text>
      </DetailSection>

      <DetailSection
        title="Özellikler"
        icon="star-outline"
        iconColor={theme.accent}
        cardBg={theme.card}
        textColor={theme.text}
      >
        <View className="flex-row flex-wrap gap-3">
          {service.features.map((feature, index) => (
            <View
              key={index}
              style={{ backgroundColor: theme.bg, minWidth: '47%' }}
              className="flex-1 p-3 rounded-xl flex-row items-center gap-2"
            >
              <View
                className="w-10 h-10 rounded-full items-center justify-center"
                style={{ backgroundColor: feature.color + '30' }}
              >
                <Ionicons name={feature.icon} size={20} color={feature.color} />
              </View>
              <Text style={{ color: theme.text, fontSize: 14, fontWeight: '600' }} className="flex-1">
                {feature.label}
              </Text>
            </View>
          ))}
        </View>
      </DetailSection>

      <DetailSection
        title="İletişim"
        icon="person-outline"
        iconColor={theme.accent}
        cardBg={theme.card}
        textColor={theme.text}
      >
        <View className="flex-row items-center">
          <View
            style={{ backgroundColor: theme.accentLight }}
            className="w-16 h-16 rounded-full items-center justify-center mr-4"
          >
            <Ionicons name="person" size={32} color={theme.accent} />
          </View>
          <View className="flex-1">
            <View className="flex-row items-center gap-2 mb-1">
              <Text style={{ color: theme.text, fontSize: 17, fontWeight: '700' }}>
                {service.host.name}
              </Text>
              {service.verified && <Ionicons name="checkmark-circle" size={18} color={theme.accent} />}
            </View>
            <Text style={{ color: theme.textSecondary, fontSize: 13, marginBottom: 6 }}>
              Üye: {service.host.since}
            </Text>
            <Text style={{ color: theme.textSecondary, fontSize: 12 }}>
              Yanıt süresi: {service.host.responseTime}
            </Text>
          </View>
          <TouchableOpacity
            style={{ backgroundColor: theme.accentLight }}
            className="w-11 h-11 rounded-full items-center justify-center"
            accessibilityLabel="Mesaj gönder"
            accessibilityRole="button"
          >
            <Ionicons name="chatbubble-outline" size={20} color={theme.accent} />
          </TouchableOpacity>
        </View>
      </DetailSection>
    </View>
  );

  const renderAmenitiesTab = () => (
    <View>
      <DetailSection
        title="Sunulan Hizmetler"
        icon="checkmark-circle-outline"
        iconColor={theme.accent}
        cardBg={theme.card}
        textColor={theme.text}
      >
        <View className="gap-3">
          {service.amenities.map((amenity, index) => (
            <View
              key={index}
              style={{ backgroundColor: theme.bg }}
              className="flex-row items-center p-3 rounded-xl gap-3"
            >
              <View
                style={{ backgroundColor: theme.accentLight }}
                className="w-9 h-9 rounded-full items-center justify-center"
              >
                <Ionicons name="checkmark" size={18} color={theme.accent} />
              </View>
              <Text style={{ color: theme.text, fontSize: 15, fontWeight: '500' }} className="flex-1">
                {amenity}
              </Text>
            </View>
          ))}
        </View>
      </DetailSection>

      <DetailSection
        title="Kurallar"
        icon="alert-circle-outline"
        iconColor={theme.accent}
        cardBg={theme.card}
        textColor={theme.text}
      >
        <View className="gap-3">
          {service.rules.map((rule, index) => (
            <View
              key={index}
              style={{ backgroundColor: theme.bg }}
              className="flex-row items-center p-3 rounded-xl gap-3"
            >
              <Ionicons name="alert-circle" size={20} color={theme.accent} />
              <Text style={{ color: theme.text, fontSize: 15, fontWeight: '500' }} className="flex-1">
                {rule}
              </Text>
            </View>
          ))}
        </View>
      </DetailSection>
    </View>
  );

  const renderReviewsTab = () => (
    <View>
      <DetailSection
        title={`Değerlendirmeler (${service.reviewCount})`}
        icon="star-outline"
        iconColor={theme.accent}
        cardBg={theme.card}
        textColor={theme.text}
      >
        <View style={{ backgroundColor: theme.accentLight }} className="p-4 rounded-xl mb-4 items-center">
          <Text style={{ color: theme.accent, fontSize: 48, fontWeight: '700', marginBottom: 4 }}>
            {service.rating}
          </Text>
          <View className="flex-row gap-1 mb-2">
            {[1, 2, 3, 4, 5].map((star) => (
              <Ionicons key={star} name="star" size={16} color="#F59E0B" />
            ))}
          </View>
          <Text style={{ color: theme.textSecondary, fontSize: 13 }}>
            {service.reviewCount} değerlendirme
          </Text>
        </View>

        <View className="gap-3">
          {service.reviews.map((review) => (
            <View key={review.id} style={{ backgroundColor: theme.bg }} className="p-4 rounded-xl">
              <View className="flex-row items-center mb-3">
                <View
                  style={{ backgroundColor: theme.accentLight }}
                  className="w-11 h-11 rounded-full items-center justify-center mr-3"
                >
                  <Ionicons name="person" size={24} color={theme.accent} />
                </View>
                <View className="flex-1">
                  <Text style={{ color: theme.text, fontSize: 15, fontWeight: '700', marginBottom: 4 }}>
                    {review.user}
                  </Text>
                  <View className="flex-row items-center gap-2">
                    <View className="flex-row gap-0.5">
                      {[...Array(review.rating)].map((_, i) => (
                        <Ionicons key={i} name="star" size={12} color="#F59E0B" />
                      ))}
                    </View>
                    <Text style={{ color: theme.textSecondary, fontSize: 12 }}>{review.date}</Text>
                  </View>
                </View>
              </View>
              <Text style={{ color: theme.textSecondary, fontSize: 14, lineHeight: 20 }}>
                {review.comment}
              </Text>
            </View>
          ))}
        </View>
      </DetailSection>
    </View>
  );

  return (
    <SafeAreaContainer bgColor={theme.bg} edges={['bottom']}>
      <StatusBar barStyle="light-content" backgroundColor="transparent" translucent />

      <HeaderOverlay
        scrollY={scrollY}
        onBack={() => navigation.goBack()}
        actions={[
          { icon: 'share-outline', onPress: handleShare, accessibilityLabel: 'Paylaş' },
          {
            icon: isFavorite ? 'heart' : 'heart-outline',
            onPress: handleFavorite,
            accessibilityLabel: 'Favorilere ekle',
          },
        ]}
        bgColor={theme.overlay}
        iconColor={theme.text}
        title={service.name}
      />

      <Animated.ScrollView
        showsVerticalScrollIndicator={false}
        onScroll={Animated.event([{ nativeEvent: { contentOffset: { y: scrollY } } }], {
          useNativeDriver: false,
        })}
        scrollEventThrottle={16}
        contentContainerStyle={{ paddingBottom: 100 }}
      >
        <View style={{ height: HERO_HEIGHT }}>
          <ScrollView
            horizontal
            pagingEnabled
            showsHorizontalScrollIndicator={false}
            onScroll={onGalleryScroll}
            scrollEventThrottle={16}
          >
            {service.images.map((uri, i) => (
              <View key={i} style={{ width, height: HERO_HEIGHT }}>
                <Image
                  source={{ uri }}
                  style={{ width, height: HERO_HEIGHT, resizeMode: 'cover' }}
                  accessibilityLabel={`${service.name} fotoğrafı ${i + 1}`}
                />
              </View>
            ))}
          </ScrollView>

          <LinearGradient
            colors={['transparent', theme.bg]}
            style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: 100 }}
          />

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
            <Text style={{ color: theme.text, fontSize: 12, fontWeight: '600' }}>
              {activeImageIndex + 1} / {service.images.length}
            </Text>
          </View>
        </View>

        <View style={{ paddingTop: 8 }}>
          <View className="px-4 mb-4">
            <Text
              style={{ color: theme.text, fontSize: 32, fontWeight: '700', marginBottom: 8 }}
              accessibilityRole="header"
            >
              {service.name}
            </Text>

            <View className="flex-row gap-4 flex-wrap mb-4">
              <View className="flex-row items-center gap-2">
                <Ionicons name="star" size={18} color="#F59E0B" />
                <Text style={{ color: theme.textSecondary, fontSize: 14, fontWeight: '500' }}>
                  {service.rating} ({service.reviewCount} yorum)
                </Text>
              </View>
              <View className="flex-row items-center gap-2">
                <Ionicons name="location-outline" size={18} color={theme.accent} />
                <Text style={{ color: theme.textSecondary, fontSize: 14, fontWeight: '500' }}>
                  {service.distance} uzakta
                </Text>
              </View>
            </View>

            <View style={{ backgroundColor: theme.card }} className="p-4 rounded-2xl">
              <View className="flex-row items-baseline gap-2">
                <Text style={{ color: theme.accent, fontSize: 28, fontWeight: '700' }}>
                  ₺{service.pricePerDay}
                </Text>
                <Text style={{ color: theme.textSecondary, fontSize: 14 }}>/ gün</Text>
              </View>
            </View>
          </View>

          <View
            style={{ backgroundColor: theme.card, borderBottomWidth: 1, borderBottomColor: theme.border }}
          >
            <ScrollView horizontal showsHorizontalScrollIndicator={false} className="px-4">
              <View className="flex-row gap-2 py-3">
                {tabs.map((tab) => (
                  <TouchableOpacity
                    key={tab.id}
                    style={{
                      backgroundColor: activeTab === tab.id ? theme.accentLight : 'transparent',
                      paddingHorizontal: 16,
                      paddingVertical: 10,
                      borderRadius: 12,
                    }}
                    className="flex-row items-center gap-2"
                    onPress={() => setActiveTab(tab.id)}
                    accessibilityLabel={tab.label}
                    accessibilityRole="tab"
                    accessibilityState={{ selected: activeTab === tab.id }}
                  >
                    <Ionicons
                      name={tab.icon}
                      size={20}
                      color={activeTab === tab.id ? theme.accent : theme.textSecondary}
                    />
                    <Text
                      style={{
                        color: activeTab === tab.id ? theme.accent : theme.textSecondary,
                        fontSize: 15,
                        fontWeight: activeTab === tab.id ? '700' : '500',
                      }}
                    >
                      {tab.label}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
            </ScrollView>
          </View>

          <View style={{ paddingTop: 16 }}>
            {activeTab === 'about' && renderAboutTab()}
            {activeTab === 'amenities' && renderAmenitiesTab()}
            {activeTab === 'reviews' && renderReviewsTab()}
          </View>
        </View>
      </Animated.ScrollView>

      <View
        style={{
          backgroundColor: theme.card,
          borderTopWidth: 1,
          borderTopColor: theme.border,
          paddingTop: 14,
          paddingBottom: insets.bottom + 14,
          paddingHorizontal: 16,
        }}
      >
        <LinearGradient
          colors={[theme.accent, theme.accent + 'DD']}
          style={{ height: 56, borderRadius: 28 }}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
        >
          <TouchableOpacity
            style={{ flex: 1 }}
            className="flex-row items-center justify-center gap-2"
            onPress={() => setShowBookingModal(true)}
            accessibilityLabel="Rezervasyon yap"
            accessibilityRole="button"
          >
            <Ionicons name="calendar" size={20} color="#FFF" />
            <Text style={{ color: '#FFF', fontSize: 16, fontWeight: '700' }}>Rezervasyon Yap</Text>
          </TouchableOpacity>
        </LinearGradient>
      </View>

      <Modal
        visible={showBookingModal}
        animationType="slide"
        transparent
        onRequestClose={() => setShowBookingModal(false)}
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
                Rezervasyon Yap
              </Text>
              <TouchableOpacity onPress={() => setShowBookingModal(false)}>
                <Ionicons name="close" size={28} color={theme.text} />
              </TouchableOpacity>
            </View>

            <ScrollView style={{ maxHeight: 500 }}>
              <View style={{ padding: 16 }}>
                {/* Tarih Seçimi */}
                <View style={{ marginBottom: 20 }}>
                  <Text style={{ color: theme.text, fontSize: 16, fontWeight: '600', marginBottom: 12 }}>
                    Tarihler
                  </Text>
                  <View style={{ flexDirection: 'row', gap: 12 }}>
                    <View style={{ flex: 1 }}>
                      <Text
                        style={{
                          color: theme.textSecondary,
                          fontSize: 13,
                          marginBottom: 8,
                          fontWeight: '500',
                        }}
                      >
                        Giriş Tarihi
                      </Text>
                      <TouchableOpacity
                        onPress={setTodayAsCheckIn}
                        style={{
                          backgroundColor: theme.bg,
                          padding: 14,
                          borderRadius: 12,
                          borderWidth: 1,
                          borderColor: checkInDate ? theme.accent : theme.border,
                        }}
                      >
                        <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8 }}>
                          <Ionicons
                            name="calendar-outline"
                            size={18}
                            color={checkInDate ? theme.accent : theme.textSecondary}
                          />
                          <Text
                            style={{
                              color: checkInDate ? theme.text : theme.textSecondary,
                              fontSize: 14,
                              flex: 1,
                            }}
                          >
                            {formatDate(checkInDate)}
                          </Text>
                        </View>
                      </TouchableOpacity>
                    </View>

                    <View style={{ flex: 1 }}>
                      <Text
                        style={{
                          color: theme.textSecondary,
                          fontSize: 13,
                          marginBottom: 8,
                          fontWeight: '500',
                        }}
                      >
                        Çıkış Tarihi
                      </Text>
                      <TouchableOpacity
                        onPress={setTomorrowAsCheckOut}
                        style={{
                          backgroundColor: theme.bg,
                          padding: 14,
                          borderRadius: 12,
                          borderWidth: 1,
                          borderColor: checkOutDate ? theme.accent : theme.border,
                        }}
                      >
                        <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8 }}>
                          <Ionicons
                            name="calendar-outline"
                            size={18}
                            color={checkOutDate ? theme.accent : theme.textSecondary}
                          />
                          <Text
                            style={{
                              color: checkOutDate ? theme.text : theme.textSecondary,
                              fontSize: 14,
                              flex: 1,
                            }}
                          >
                            {formatDate(checkOutDate)}
                          </Text>
                        </View>
                      </TouchableOpacity>
                    </View>
                  </View>
                </View>

                {/* Evcil Hayvan Bilgileri */}
                <View style={{ marginBottom: 20 }}>
                  <Text style={{ color: theme.text, fontSize: 16, fontWeight: '600', marginBottom: 12 }}>
                    Evcil Hayvan Bilgileri
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
                      Hayvan Türü
                    </Text>
                    <View style={{ flexDirection: 'row', gap: 8 }}>
                      {['Köpek', 'Kedi'].map((type) => (
                        <TouchableOpacity
                          key={type}
                          onPress={() => setPetType(type)}
                          style={{
                            flex: 1,
                            backgroundColor: petType === type ? theme.accentLight : theme.bg,
                            padding: 12,
                            borderRadius: 12,
                            borderWidth: 1,
                            borderColor: petType === type ? theme.accent : theme.border,
                            alignItems: 'center',
                          }}
                        >
                          <Ionicons
                            name={type === 'Köpek' ? 'paw' : 'paw-outline'}
                            size={20}
                            color={petType === type ? theme.accent : theme.textSecondary}
                          />
                          <Text
                            style={{
                              color: petType === type ? theme.accent : theme.text,
                              fontSize: 14,
                              fontWeight: '600',
                              marginTop: 4,
                            }}
                          >
                            {type}
                          </Text>
                        </TouchableOpacity>
                      ))}
                    </View>
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
                      Evcil Hayvanınızın Adı *
                    </Text>
                    <TextInput
                      value={petName}
                      onChangeText={setPetName}
                      placeholder="Örn: Pamuk"
                      placeholderTextColor={theme.textSecondary}
                      style={{
                        backgroundColor: theme.bg,
                        padding: 14,
                        borderRadius: 12,
                        fontSize: 15,
                        color: theme.text,
                        borderWidth: 1,
                        borderColor: petName ? theme.accent : theme.border,
                      }}
                    />
                  </View>
                </View>

                {/* Özel İstekler */}
                <View style={{ marginBottom: 20 }}>
                  <Text style={{ color: theme.text, fontSize: 16, fontWeight: '600', marginBottom: 8 }}>
                    Özel İstekler (Opsiyonel)
                  </Text>
                  <Text
                    style={{ color: theme.textSecondary, fontSize: 13, marginBottom: 8, lineHeight: 18 }}
                  >
                    Evcil hayvanınızın özel ihtiyaçları veya dikkat edilmesi gereken durumlar varsa
                    belirtebilirsiniz.
                  </Text>
                  <TextInput
                    value={specialRequests}
                    onChangeText={setSpecialRequests}
                    placeholder="Özel isteklerinizi buraya yazın..."
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

                {/* Fiyat Özeti */}
                {calculateDays() > 0 && (
                  <View
                    style={{
                      backgroundColor: theme.accentLight,
                      padding: 16,
                      borderRadius: 16,
                      marginBottom: 20,
                    }}
                  >
                    <Text style={{ color: theme.text, fontSize: 16, fontWeight: '600', marginBottom: 12 }}>
                      Fiyat Özeti
                    </Text>
                    <View
                      style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 8 }}
                    >
                      <Text style={{ color: theme.textSecondary, fontSize: 14 }}>
                        ₺{service.pricePerDay} x {calculateDays()} gün
                      </Text>
                      <Text style={{ color: theme.text, fontSize: 14, fontWeight: '600' }}>
                        ₺{calculateTotalPrice()}
                      </Text>
                    </View>
                    <View
                      style={{
                        height: 1,
                        backgroundColor: theme.accent + '30',
                        marginVertical: 8,
                      }}
                    />
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                      <Text style={{ color: theme.text, fontSize: 16, fontWeight: '700' }}>
                        Toplam
                      </Text>
                      <Text style={{ color: theme.accent, fontSize: 20, fontWeight: '700' }}>
                        ₺{calculateTotalPrice()}
                      </Text>
                    </View>
                  </View>
                )}
              </View>
            </ScrollView>

            {/* Onay Butonu */}
            <View style={{ padding: 16, paddingBottom: insets.bottom + 16 }}>
              <LinearGradient
                colors={[theme.accent, theme.accent + 'DD']}
                style={{ borderRadius: 12 }}
              >
                <TouchableOpacity
                  style={{ paddingVertical: 16, alignItems: 'center' }}
                  onPress={handleConfirmBooking}
                  disabled={!checkInDate || !checkOutDate || !petName}
                >
                  <Text style={{ color: '#FFF', fontSize: 16, fontWeight: '700' }}>
                    {calculateDays() > 0
                      ? `Rezervasyonu Onayla - ₺${calculateTotalPrice()}`
                      : 'Rezervasyonu Onayla'}
                  </Text>
                </TouchableOpacity>
              </LinearGradient>
              {(!checkInDate || !checkOutDate || !petName) && (
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
    </SafeAreaContainer>
  );
};

export default HotelCareDetailScreen;
