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

const PetGroomingDetailScreen = ({ navigation }) => {
  const theme = useThemeColors('petGrooming');
  const insets = useSafeAreaInsets();
  const scrollY = useRef(new Animated.Value(0)).current;
  const [isFavorite, setIsFavorite] = useState(false);
  const [activeTab, setActiveTab] = useState('packages');
  const [showBookingModal, setShowBookingModal] = useState(false);
  const [selectedPackage, setSelectedPackage] = useState(null);

  const groomer = {
    name: 'Pati Güzellik Salonu',
    rating: 4.8,
    reviewCount: 156,
    distance: '1.5 km',
    location: 'İstanbul, Kadıköy',
    address: 'Caferağa Mah., Moda Cad. No: 12',
    phone: '+90 555 999 8877',
    verified: true,
    mobile: true,
    image: 'https://images.unsplash.com/photo-1548199973-03cce0bbc87b?w=800',
    packages: [
      {
        id: 1,
        name: 'Banyo Paketi',
        price: 150,
        duration: '45 dk',
        services: ['Şampuan', 'Fırçalama', 'Tırnak Kesimi'],
      },
      {
        id: 2,
        name: 'Tıraş Paketi',
        price: 200,
        duration: '60 dk',
        services: ['Banyo', 'Tıraş', 'Kulak Temizliği'],
      },
      {
        id: 3,
        name: 'Tam Bakım',
        price: 350,
        duration: '90 dk',
        services: ['Banyo', 'Tıraş', 'Tırnak', 'Kulak', 'Diş Temizliği'],
      },
    ],
    features: ['Evde Hizmet', 'Doğal Ürünler', 'Deneyimli Ekip', 'Özel Ürünler'],
    workingHours: { weekdays: '09:00 - 19:00', saturday: '09:00 - 17:00', sunday: 'Kapalı' },
    reviews: [
      {
        id: '1',
        user: 'Selin A.',
        rating: 5,
        date: '1 hafta önce',
        comment: 'Köpeğim çok memnun kaldı, harika bir hizmet!',
      },
    ],
  };

  const handleShare = () => {};
  const handleFavorite = () => setIsFavorite(!isFavorite);

  const tabs = [
    { id: 'packages', label: 'Paketler', icon: 'pricetag' },
    { id: 'reviews', label: 'Yorumlar', icon: 'star' },
  ];

  const renderPackagesTab = () => (
    <View>
      <DetailSection title="Hizmet Paketleri" icon="pricetag-outline" iconColor={theme.accent} cardBg={theme.card} textColor={theme.text}>
        <View className="gap-3">
          {groomer.packages.map((p) => (
            <TouchableOpacity
              key={p.id}
              style={{
                backgroundColor: selectedPackage?.id === p.id ? theme.accentLight : theme.bg,
                borderWidth: 2,
                borderColor: selectedPackage?.id === p.id ? theme.accent : theme.border,
                borderRadius: 16,
                padding: 16,
              }}
              onPress={() => setSelectedPackage(p)}
              accessibilityLabel={`${p.name} paketi`}
              accessibilityRole="button"
            >
              <View className="flex-row justify-between items-start mb-3">
                <View className="flex-1">
                  <Text style={{ color: theme.text, fontSize: 17, fontWeight: '700', marginBottom: 4 }}>{p.name}</Text>
                  <Text style={{ color: theme.textSecondary, fontSize: 13 }}>{p.duration}</Text>
                </View>
                <Text style={{ color: theme.accent, fontSize: 24, fontWeight: '700' }}>₺{p.price}</Text>
              </View>
              <View className="gap-2">
                {p.services.map((s, i) => (
                  <View key={i} className="flex-row items-center gap-2">
                    <Ionicons name="checkmark-circle" size={16} color={theme.accent} />
                    <Text style={{ color: theme.text, fontSize: 14, fontWeight: '500' }}>{s}</Text>
                  </View>
                ))}
              </View>
            </TouchableOpacity>
          ))}
        </View>
      </DetailSection>

      <DetailSection title="Özellikler" icon="star-outline" iconColor={theme.accent} cardBg={theme.card} textColor={theme.text}>
        <View className="flex-row flex-wrap gap-2">
          {groomer.features.map((f, i) => (
            <View key={i} style={{ backgroundColor: theme.accentLight }} className="px-4 py-2 rounded-full">
              <Text style={{ color: theme.accent, fontSize: 13, fontWeight: '700' }}>{f}</Text>
            </View>
          ))}
        </View>
      </DetailSection>

      <DetailSection title="Çalışma Saatleri" icon="time-outline" iconColor={theme.accent} cardBg={theme.card} textColor={theme.text}>
        <View className="gap-3">
          {[
            { label: 'Hafta İçi', value: groomer.workingHours.weekdays },
            { label: 'Cumartesi', value: groomer.workingHours.saturday },
            { label: 'Pazar', value: groomer.workingHours.sunday },
          ].map((item, i) => (
            <View key={i} style={{ backgroundColor: theme.bg }} className="flex-row justify-between items-center p-3 rounded-xl">
              <Text style={{ color: theme.textSecondary, fontSize: 15 }}>{item.label}</Text>
              <Text style={{ color: theme.text, fontSize: 15, fontWeight: '700' }}>{item.value}</Text>
            </View>
          ))}
        </View>
      </DetailSection>
    </View>
  );

  const renderReviewsTab = () => (
    <View>
      <DetailSection title={`Değerlendirmeler (${groomer.reviewCount})`} icon="star-outline" iconColor={theme.accent} cardBg={theme.card} textColor={theme.text}>
        <View style={{ backgroundColor: theme.accentLight }} className="p-4 rounded-xl mb-4 items-center">
          <Text style={{ color: theme.accent, fontSize: 48, fontWeight: '700', marginBottom: 4 }}>{groomer.rating}</Text>
          <View className="flex-row gap-1 mb-2">
            {[1, 2, 3, 4, 5].map((star) => (
              <Ionicons key={star} name="star" size={16} color="#F59E0B" />
            ))}
          </View>
          <Text style={{ color: theme.textSecondary, fontSize: 13 }}>{groomer.reviewCount} değerlendirme</Text>
        </View>

        <View className="gap-3">
          {groomer.reviews.map((r) => (
            <View key={r.id} style={{ backgroundColor: theme.bg }} className="p-4 rounded-xl">
              <View className="flex-row items-center mb-3">
                <View style={{ backgroundColor: theme.accentLight }} className="w-11 h-11 rounded-full items-center justify-center mr-3">
                  <Ionicons name="person" size={24} color={theme.accent} />
                </View>
                <View className="flex-1">
                  <Text style={{ color: theme.text, fontSize: 15, fontWeight: '700', marginBottom: 4 }}>{r.user}</Text>
                  <View className="flex-row items-center gap-2">
                    <View className="flex-row gap-0.5">
                      {[...Array(r.rating)].map((_, i) => (
                        <Ionicons key={i} name="star" size={12} color="#F59E0B" />
                      ))}
                    </View>
                    <Text style={{ color: theme.textSecondary, fontSize: 12 }}>{r.date}</Text>
                  </View>
                </View>
              </View>
              <Text style={{ color: theme.textSecondary, fontSize: 14, lineHeight: 20 }}>{r.comment}</Text>
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
          { icon: isFavorite ? 'heart' : 'heart-outline', onPress: handleFavorite, accessibilityLabel: 'Favorilere ekle' },
        ]}
        bgColor={theme.overlay}
        iconColor={theme.text}
        title={groomer.name}
      />

      <Animated.ScrollView
        showsVerticalScrollIndicator={false}
        onScroll={Animated.event([{ nativeEvent: { contentOffset: { y: scrollY } } }], { useNativeDriver: false })}
        scrollEventThrottle={16}
        contentContainerStyle={{ paddingBottom: 100 }}
      >
        <View style={{ height: HERO_HEIGHT }}>
          <Image source={{ uri: groomer.image }} style={{ width, height: HERO_HEIGHT, resizeMode: 'cover' }} />
          <LinearGradient colors={['transparent', theme.bg]} style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: 100 }} />
        </View>

        <View style={{ paddingTop: 8 }}>
          <View className="px-4 mb-4">
            <View className="flex-row items-center gap-2 mb-2">
              <Text style={{ color: theme.text, fontSize: 32, fontWeight: '700' }} accessibilityRole="header">
                {groomer.name}
              </Text>
              {groomer.verified && <Ionicons name="checkmark-circle" size={26} color={theme.accent} />}
            </View>

            <View className="flex-row gap-4 flex-wrap mb-4">
              <View className="flex-row items-center gap-2">
                <Ionicons name="star" size={18} color="#F59E0B" />
                <Text style={{ color: theme.textSecondary, fontSize: 14, fontWeight: '500' }}>
                  {groomer.rating} ({groomer.reviewCount})
                </Text>
              </View>
              <View className="flex-row items-center gap-2">
                <Ionicons name="location-outline" size={18} color={theme.accent} />
                <Text style={{ color: theme.textSecondary, fontSize: 14, fontWeight: '500' }}>{groomer.distance}</Text>
              </View>
              {groomer.mobile && (
                <View className="flex-row items-center gap-2">
                  <Ionicons name="home" size={18} color="#10B981" />
                  <Text style={{ color: '#10B981', fontSize: 14, fontWeight: '500' }}>Evde Hizmet</Text>
                </View>
              )}
            </View>

            <View style={{ backgroundColor: theme.card }} className="p-4 rounded-2xl">
              <Text style={{ color: theme.textSecondary, fontSize: 14, marginBottom: 4 }}>{groomer.address}</Text>
              <Text style={{ color: theme.text, fontSize: 16, fontWeight: '600' }}>{groomer.phone}</Text>
            </View>
          </View>

          <View style={{ backgroundColor: theme.card, borderBottomWidth: 1, borderBottomColor: theme.border }}>
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
                    <Ionicons name={tab.icon} size={20} color={activeTab === tab.id ? theme.accent : theme.textSecondary} />
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
            {activeTab === 'packages' && renderPackagesTab()}
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
        <View className="flex-row items-center gap-3">
          <View className="flex-row items-baseline gap-1">
            <Text style={{ color: theme.accent, fontSize: 24, fontWeight: '700' }}>₺{groomer.packages[0].price}</Text>
            <Text style={{ color: theme.textSecondary, fontSize: 12 }}>'den başlayan</Text>
          </View>
          <LinearGradient colors={[theme.accent, theme.accent + 'DD']} style={{ flex: 1, height: 56, borderRadius: 28 }} start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }}>
            <TouchableOpacity
              style={{ flex: 1 }}
              className="flex-row items-center justify-center gap-2"
              onPress={() => setShowBookingModal(true)}
              accessibilityLabel="Randevu al"
              accessibilityRole="button"
            >
              <Ionicons name="calendar" size={20} color="#FFF" />
              <Text style={{ color: '#FFF', fontSize: 16, fontWeight: '700' }}>Randevu Al</Text>
            </TouchableOpacity>
          </LinearGradient>
        </View>
      </View>

      <Modal visible={showBookingModal} animationType="slide" transparent onRequestClose={() => setShowBookingModal(false)}>
        <View style={{ flex: 1, backgroundColor: 'rgba(0,0,0,0.7)', justifyContent: 'flex-end' }}>
          <View style={{ backgroundColor: theme.card, borderTopLeftRadius: 24, borderTopRightRadius: 24, maxHeight: '70%' }}>
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
              <Text style={{ color: theme.text, fontSize: 20, fontWeight: '700' }}>Randevu Al</Text>
              <TouchableOpacity onPress={() => setShowBookingModal(false)}>
                <Ionicons name="close" size={28} color={theme.text} />
              </TouchableOpacity>
            </View>
            <ScrollView style={{ padding: 16 }} showsVerticalScrollIndicator={false}>
              <Text style={{ color: theme.text, fontSize: 16, fontWeight: '600', marginBottom: 12 }}>Paket Seç</Text>
              <View className="gap-2 mb-6">
                {groomer.packages.map((p) => (
                  <TouchableOpacity
                    key={p.id}
                    style={{
                      backgroundColor: selectedPackage?.id === p.id ? theme.accentLight : theme.bg,
                      borderWidth: 2,
                      borderColor: selectedPackage?.id === p.id ? theme.accent : theme.border,
                      borderRadius: 12,
                      padding: 16,
                    }}
                    className="flex-row justify-between items-center"
                    onPress={() => setSelectedPackage(p)}
                  >
                    <View className="flex-1">
                      <Text style={{ color: theme.text, fontSize: 15, fontWeight: '700' }}>{p.name}</Text>
                      <Text style={{ color: theme.textSecondary, fontSize: 13, marginTop: 2 }}>{p.duration}</Text>
                    </View>
                    <Text style={{ color: theme.accent, fontSize: 18, fontWeight: '700' }}>₺{p.price}</Text>
                  </TouchableOpacity>
                ))}
              </View>
              <LinearGradient colors={[theme.accent, theme.accent + 'DD']} style={{ borderRadius: 12, marginBottom: 24 }}>
                <TouchableOpacity
                  style={{ paddingVertical: 16, alignItems: 'center' }}
                  onPress={() => setShowBookingModal(false)}
                  disabled={!selectedPackage}
                >
                  <Text style={{ color: '#FFF', fontSize: 16, fontWeight: '700' }}>Randevuyu Onayla</Text>
                </TouchableOpacity>
              </LinearGradient>
            </ScrollView>
          </View>
        </View>
      </Modal>
    </SafeAreaContainer>
  );
};

export default PetGroomingDetailScreen;
