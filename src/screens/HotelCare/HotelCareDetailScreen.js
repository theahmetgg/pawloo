import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Image,
  Dimensions,
  Modal,
  StatusBar
} from 'react-native';
import SafeAreaContainer from '../../components/layout/SafeAreaContainer';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const { width } = Dimensions.get('window');

const HotelCareDetailScreen = ({ navigation, route }) => {
  const [activeTab, setActiveTab] = useState('about');
  const [showBookingModal, setShowBookingModal] = useState(false);
  const [selectedDates, setSelectedDates] = useState({ checkIn: null, checkOut: null });
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const insets = useSafeAreaInsets();

  // Mock data
  const service = {
    id: '1',
    name: 'Pati Palace Pet Hotel',
    type: 'hotel',
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
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200',
      since: '2020',
      responseRate: 95,
      responseTime: '1 saat içinde',
    },
    description: 'Pati Palace, modern tesisleri ve deneyimli personeliyle evcil dostlarınıza 5 yıldızlı hizmet sunuyor. 7/24 veteriner gözetimi, kameralı odalar ve geniş oyun alanlarımızla sevimli dostlarınız güvende.',
    features: [
      { icon: 'videocam', label: 'Kameralı Odalar', color: '#3B82F6' },
      { icon: 'medical', label: '7/24 Veteriner', color: '#10B981' },
      { icon: 'basketball', label: 'Oyun Alanı', color: '#F59E0B' },
      { icon: 'snow', label: 'Klima', color: '#06B6D4' },
      { icon: 'wifi', label: 'WiFi', color: '#8B5CF6' },
      { icon: 'car', label: 'Otopark', color: '#6366F1' },
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
        avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200',
        rating: 5,
        date: '2 hafta önce',
        comment: 'Harika bir deneyimdi! Köpeğim çok mutluydu, günlük gönderilen fotoğraflar harikaydı. Kesinlikle tekrar geleceğiz.',
      },
      {
        id: '2',
        user: 'Can M.',
        avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200',
        rating: 5,
        date: '1 ay önce',
        comment: 'Çok profesyonel bir ekip. Kedim için özel diyet hazırladılar, ilgi ve alaka mükemmeldi.',
      },
    ],
    availability: {
      available: true,
      nextAvailable: '15 Mayıs 2024',
    },
  };

  const renderAboutTab = () => (
    <View className="pb-24">
      {/* Description */}
      <View className="mt-6">
        <Text className="text-xl font-bold text-gray-800 mb-3">Hakkında</Text>
        <Text className="text-base text-gray-800 leading-6">{service.description}</Text>
      </View>

      {/* Features Grid */}
      <View className="mt-6">
        <Text className="text-xl font-bold text-gray-800 mb-3">Özellikler</Text>
        <View className="flex-row flex-wrap gap-3">
          {service.features.map((feature, index) => (
            <View key={index} className="w-[30%] items-center bg-gray-100 p-3 rounded-xl">
              <View
                className="w-12 h-12 rounded-full items-center justify-center mb-1"
                style={{ backgroundColor: feature.color + '20' }}
              >
                <Ionicons name={feature.icon} size={24} color={feature.color} />
              </View>
              <Text className="text-xs text-gray-800 text-center font-medium">{feature.label}</Text>
            </View>
          ))}
        </View>
      </View>

      {/* Amenities */}
      <View className="mt-6">
        <Text className="text-xl font-bold text-gray-800 mb-3">Sunulan Hizmetler</Text>
        <View className="gap-2">
          {service.amenities.map((amenity, index) => (
            <View key={index} className="flex-row items-center gap-2">
              <Ionicons name="checkmark-circle" size={20} color="#10B981" />
              <Text className="text-base text-gray-800">{amenity}</Text>
            </View>
          ))}
        </View>
      </View>

      {/* Rules */}
      <View className="mt-6">
        <Text className="text-xl font-bold text-gray-800 mb-3">Kabul Kuralları</Text>
        <View className="gap-2">
          {service.rules.map((rule, index) => (
            <View key={index} className="flex-row items-center gap-2 bg-blue-50 p-2 rounded-lg">
              <Ionicons name="alert-circle-outline" size={20} color="#3B82F6" />
              <Text className="text-sm text-gray-800 flex-1">{rule}</Text>
            </View>
          ))}
        </View>
      </View>
    </View>
  );

  const renderReviewsTab = () => (
    <View className="pb-24">
      {/* Rating Summary */}
      <View className="bg-gray-100 p-4 rounded-2xl mt-4">
        <View className="items-center">
          <Text className="text-5xl font-bold text-gray-800 mb-1">{service.rating}</Text>
          <View className="flex-row gap-1 mb-1">
            {[1, 2, 3, 4, 5].map((star) => (
              <Ionicons key={star} name="star" size={16} color="#F59E0B" />
            ))}
          </View>
          <Text className="text-sm text-gray-500">{service.reviewCount} değerlendirme</Text>
        </View>
      </View>

      {/* Reviews List */}
      <View className="mt-4 gap-3">
        {service.reviews.map((review) => (
          <View key={review.id} className="bg-gray-100 p-3 rounded-xl">
            <View className="flex-row mb-2">
              <Image source={{ uri: review.avatar }} className="w-11 h-11 rounded-full mr-2" />
              <View className="flex-1">
                <Text className="text-base font-semibold text-gray-800">{review.user}</Text>
                <View className="flex-row items-center gap-2 mt-1">
                  <View className="flex-row gap-0.5">
                    {[...Array(review.rating)].map((_, i) => (
                      <Ionicons key={i} name="star" size={12} color="#F59E0B" />
                    ))}
                  </View>
                  <Text className="text-xs text-gray-500">{review.date}</Text>
                </View>
              </View>
            </View>
            <Text className="text-sm text-gray-800 leading-5">{review.comment}</Text>
          </View>
        ))}
      </View>
    </View>
  );

  const renderLocationTab = () => (
    <View className="pb-24">
      <View className="mt-6">
        <Text className="text-xl font-bold text-gray-800 mb-3">Konum</Text>
        <View className="rounded-xl overflow-hidden border border-gray-200">
          <View className="h-52 bg-gray-100 items-center justify-center">
            <Ionicons name="map" size={48} color="#3B82F6" />
            <Text className="text-sm text-gray-500 mt-2">Harita Yükleniyor...</Text>
          </View>
          <View className="p-3 bg-white">
            <View className="flex-row gap-2 mb-2">
              <Ionicons name="location" size={20} color="#3B82F6" />
              <Text className="text-base text-gray-800 flex-1">{service.address}</Text>
            </View>
            <TouchableOpacity className="flex-row items-center gap-1 self-start">
              <Ionicons name="navigate" size={20} color="#3B82F6" />
              <Text className="text-sm text-blue-500 font-semibold">Yol Tarifi Al</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>

      {/* Host Info */}
      <View className="mt-6">
        <Text className="text-xl font-bold text-gray-800 mb-3">Hizmet Sağlayıcı</Text>
        <View className="flex-row bg-gray-100 p-3 rounded-xl mb-3">
          <Image source={{ uri: service.host.avatar }} className="w-16 h-16 rounded-full mr-3" />
          <View className="flex-1">
            <View className="flex-row items-center gap-1.5 mb-1">
              <Text className="text-lg font-bold text-gray-800">{service.host.name}</Text>
              {service.verified && (
                <Ionicons name="checkmark-circle" size={18} color="#3B82F6" />
              )}
            </View>
            <Text className="text-sm text-gray-500 mb-2">{service.host.since} yılından beri</Text>
            <View className="flex-row gap-4">
              <View>
                <Text className="text-sm font-semibold text-gray-800">{service.host.responseRate}%</Text>
                <Text className="text-xs text-gray-500">Yanıt oranı</Text>
              </View>
              <View>
                <Text className="text-sm font-semibold text-gray-800">{service.host.responseTime}</Text>
                <Text className="text-xs text-gray-500">Yanıt süresi</Text>
              </View>
            </View>
          </View>
        </View>
        <TouchableOpacity className="flex-row items-center justify-center gap-2 border-2 border-blue-500 rounded-xl py-3">
          <Ionicons name="chatbubble-outline" size={20} color="#3B82F6" />
          <Text className="text-base font-bold text-blue-500">İletişime Geç</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  const renderBookingModal = () => (
    <Modal
      visible={showBookingModal}
      animationType="slide"
      transparent={true}
      onRequestClose={() => setShowBookingModal(false)}
    >
      <View className="flex-1 bg-black/50 justify-end">
        <View className="bg-white rounded-t-3xl max-h-[80%]">
          <View className="flex-row justify-between items-center p-4 border-b border-gray-200">
            <Text className="text-xl font-bold text-gray-800">Rezervasyon Yap</Text>
            <TouchableOpacity onPress={() => setShowBookingModal(false)}>
              <Ionicons name="close" size={28} color="#1F2937" />
            </TouchableOpacity>
          </View>

          <ScrollView className="p-4" showsVerticalScrollIndicator={false}>
            {/* Date Selection */}
            <View className="mb-4">
              <Text className="text-sm font-semibold text-gray-800 mb-2">Giriş Tarihi</Text>
              <TouchableOpacity className="flex-row items-center gap-2 bg-gray-100 p-3 rounded-xl border border-gray-200">
                <Ionicons name="calendar-outline" size={20} color="#3B82F6" />
                <Text className="text-base text-gray-500">Tarih Seç</Text>
              </TouchableOpacity>

              <Text className="text-sm font-semibold text-gray-800 mb-2 mt-3">Çıkış Tarihi</Text>
              <TouchableOpacity className="flex-row items-center gap-2 bg-gray-100 p-3 rounded-xl border border-gray-200">
                <Ionicons name="calendar-outline" size={20} color="#3B82F6" />
                <Text className="text-base text-gray-500">Tarih Seç</Text>
              </TouchableOpacity>
            </View>

            {/* Pet Count */}
            <View className="mb-4">
              <Text className="text-sm font-semibold text-gray-800 mb-2">Hayvan Sayısı</Text>
              <View className="flex-row items-center justify-center gap-4">
                <TouchableOpacity className="w-11 h-11 rounded-full bg-blue-50 items-center justify-center">
                  <Ionicons name="remove" size={20} color="#3B82F6" />
                </TouchableOpacity>
                <Text className="text-2xl font-bold text-gray-800 min-w-[40px] text-center">1</Text>
                <TouchableOpacity className="w-11 h-11 rounded-full bg-blue-50 items-center justify-center">
                  <Ionicons name="add" size={20} color="#3B82F6" />
                </TouchableOpacity>
              </View>
            </View>

            {/* Price Summary */}
            <View className="bg-gray-100 p-3 rounded-xl mb-4">
              <View className="flex-row justify-between mb-2">
                <Text className="text-base text-gray-800">₺{service.pricePerDay} x 3 gün</Text>
                <Text className="text-base font-semibold text-gray-800">₺750</Text>
              </View>
              <View className="flex-row justify-between mb-2">
                <Text className="text-base text-gray-800">Hizmet ücreti</Text>
                <Text className="text-base font-semibold text-gray-800">₺50</Text>
              </View>
              <View className="h-px bg-gray-200 my-2" />
              <View className="flex-row justify-between">
                <Text className="text-lg font-bold text-gray-800">Toplam</Text>
                <Text className="text-lg font-bold text-blue-500">₺800</Text>
              </View>
            </View>

            {/* Confirm Button */}
            <TouchableOpacity
              className="rounded-xl overflow-hidden mb-6"
              onPress={() => {
                setShowBookingModal(false);
                // Rezervasyon işlemi
              }}
            >
              <LinearGradient
                colors={['#3B82F6', '#2563EB']}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
                className="py-3 items-center"
              >
                <Text className="text-base font-bold text-white">Rezervasyonu Onayla</Text>
              </LinearGradient>
            </TouchableOpacity>
          </ScrollView>
        </View>
      </View>
    </Modal>
  );

  return (
    <SafeAreaContainer edges={['top', 'right', 'left']} className="flex-1 bg-white">
      <StatusBar barStyle="dark-content" backgroundColor="transparent" translucent />

      {/* Header */}
      <View className="flex-row justify-between items-center px-4 pb-3">
        <TouchableOpacity
          className="w-10 h-10 rounded-full bg-gray-100 items-center justify-center"
          onPress={() => navigation.goBack()}
        >
          <Ionicons name="arrow-back" size={24} color="#1F2937" />
        </TouchableOpacity>
        <View className="flex-row gap-2">
          <TouchableOpacity className="w-10 h-10 rounded-full bg-gray-100 items-center justify-center">
            <Ionicons name="share-outline" size={24} color="#1F2937" />
          </TouchableOpacity>
          <TouchableOpacity className="w-10 h-10 rounded-full bg-gray-100 items-center justify-center">
            <Ionicons name="heart-outline" size={24} color="#1F2937" />
          </TouchableOpacity>
        </View>
      </View>

      <ScrollView className="flex-1" showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 100 }}>
        {/* Image Gallery */}
        <View className="relative" style={{ width, height: 300 }}>
          <ScrollView
            horizontal
            pagingEnabled
            showsHorizontalScrollIndicator={false}
            onScroll={(e) => {
              const index = Math.round(e.nativeEvent.contentOffset.x / width);
              setCurrentImageIndex(index);
            }}
            scrollEventThrottle={16}
          >
            {service.images.map((image, index) => (
              <Image key={index} source={{ uri: image }} style={{ width, height: 300 }} />
            ))}
          </ScrollView>

          {/* Image Indicators */}
          <View className="absolute bottom-5 left-0 right-0 flex-row justify-center gap-2">
            {service.images.map((_, index) => (
              <View
                key={index}
                className={`h-2 rounded ${
                  currentImageIndex === index ? 'w-6 bg-white' : 'w-2 bg-white/50'
                }`}
              />
            ))}
          </View>
        </View>

        {/* Service Info Header */}
        <View className="p-4 border-b border-gray-200">
          <View className="flex-row items-center gap-2 mb-2">
            <Text className="text-3xl font-bold text-gray-800 flex-1">{service.name}</Text>
            {service.verified && (
              <Ionicons name="checkmark-circle" size={22} color="#3B82F6" />
            )}
          </View>

          <View className="flex-row gap-3 mb-3">
            <View className="flex-row items-center gap-1">
              <Ionicons name="star" size={16} color="#F59E0B" />
              <Text className="text-base font-semibold text-gray-800">{service.rating}</Text>
              <Text className="text-sm text-gray-500">({service.reviewCount} değerlendirme)</Text>
            </View>
            <View className="flex-row items-center gap-1">
              <Ionicons name="location" size={16} color="#6B7280" />
              <Text className="text-sm text-gray-500">{service.distance}</Text>
            </View>
          </View>

          {/* Availability */}
          <View
            className={`flex-row items-center p-2 rounded-lg gap-1 ${
              service.availability.available ? 'bg-green-50' : 'bg-red-50'
            }`}
          >
            <Ionicons
              name={service.availability.available ? 'checkmark-circle' : 'close-circle'}
              size={20}
              color={service.availability.available ? '#10B981' : '#EF4444'}
            />
            <Text className="text-sm text-gray-800 font-medium">
              {service.availability.available
                ? 'Müsait'
                : `Sonraki müsait tarih: ${service.availability.nextAvailable}`}
            </Text>
          </View>
        </View>

        {/* Tabs */}
        <View className="flex-row bg-gray-100 mx-4 mt-4 rounded-xl p-1">
          {[
            { key: 'about', label: 'Hakkında', icon: 'information-circle' },
            { key: 'reviews', label: 'Yorumlar', icon: 'star' },
            { key: 'location', label: 'Konum', icon: 'location' },
          ].map((tab) => (
            <TouchableOpacity
              key={tab.key}
              className={`flex-1 flex-row items-center justify-center gap-1.5 py-2 rounded-lg ${
                activeTab === tab.key ? 'bg-white' : ''
              }`}
              onPress={() => setActiveTab(tab.key)}
            >
              <Ionicons
                name={tab.icon}
                size={20}
                color={activeTab === tab.key ? '#3B82F6' : '#6B7280'}
              />
              <Text
                className={`text-sm font-medium ${
                  activeTab === tab.key ? 'text-blue-500 font-semibold' : 'text-gray-500'
                }`}
              >
                {tab.label}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Tab Content */}
        <View className="px-4">
          {activeTab === 'about' && renderAboutTab()}
          {activeTab === 'reviews' && renderReviewsTab()}
          {activeTab === 'location' && renderLocationTab()}
        </View>
      </ScrollView>

      {/* Bottom Booking Bar */}
      <View
        className="flex-row items-center bg-white px-4 pt-3 border-t border-gray-200 gap-3"
        style={{ paddingBottom: insets.bottom + 12 }}
      >
        <View className="flex-row items-baseline">
          <Text className="text-2xl font-bold text-blue-500">₺{service.pricePerDay}</Text>
          <Text className="text-sm text-gray-500">/gün</Text>
        </View>
        <TouchableOpacity
          className="flex-1 rounded-xl overflow-hidden"
          onPress={() => setShowBookingModal(true)}
        >
          <LinearGradient
            colors={['#3B82F6', '#2563EB']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            className="flex-row items-center justify-center py-3 gap-2"
          >
            <Ionicons name="calendar" size={20} color="#FFF" />
            <Text className="text-base font-bold text-white">Rezervasyon Yap</Text>
          </LinearGradient>
        </TouchableOpacity>
      </View>

      {renderBookingModal()}
    </SafeAreaContainer>
  );
};

export default HotelCareDetailScreen;
