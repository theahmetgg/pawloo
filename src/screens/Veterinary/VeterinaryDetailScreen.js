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

const VeterinaryDetailScreen = ({ navigation }) => {
  const theme = useThemeColors('veterinary');
  const insets = useSafeAreaInsets();
  const scrollY = useRef(new Animated.Value(0)).current;
  const [isFavorite, setIsFavorite] = useState(false);
  const [activeTab, setActiveTab] = useState('about');
  const [showAppointmentModal, setShowAppointmentModal] = useState(false);
  const [selectedTime, setSelectedTime] = useState(null);

  const vet = {
    name: 'Dr. Ayşe Yılmaz',
    title: 'Veteriner Hekim',
    rating: 4.9,
    reviewCount: 234,
    experience: '15 yıl',
    clinic: 'Pati Veteriner Kliniği',
    address: 'Caferağa Mah., Kadıköy',
    phone: '+90 555 123 4567',
    price: 300,
    verified: true,
    image: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=800',
    specialty: ['Genel Muayene', 'Cerrahi', 'Diş Sağlığı', 'Aşılama'],
    languages: ['Türkçe', 'İngilizce'],
    education: ['İstanbul Üniversitesi Veteriner Fakültesi', 'Cerrahi Uzmanlık - Ankara Üniversitesi'],
    services: ['Genel Muayene', 'Aşılama', 'Cerrahi Operasyonlar', 'Diş Temizliği', 'Ultrason', 'Röntgen'],
    workingHours: { weekdays: '09:00 - 18:00', saturday: '09:00 - 14:00', sunday: 'Kapalı' },
    availableSlots: ['09:00', '09:30', '10:00', '11:00', '14:00', '14:30', '15:00', '16:00'],
    reviews: [
      {
        id: '1',
        user: 'Mehmet K.',
        rating: 5,
        date: '1 hafta önce',
        comment: 'Kedime çok iyi baktı, çok teşekkürler!',
      },
    ],
  };

  const handleShare = () => {};
  const handleFavorite = () => setIsFavorite(!isFavorite);

  const tabs = [
    { id: 'about', label: 'Hakkında', icon: 'information-circle' },
    { id: 'services', label: 'Hizmetler', icon: 'medical' },
    { id: 'reviews', label: 'Yorumlar', icon: 'star' },
  ];

  const renderAboutTab = () => (
    <View>
      <DetailSection title="Uzmanlık Alanları" icon="school-outline" iconColor={theme.accent} cardBg={theme.card} textColor={theme.text}>
        <View className="flex-row flex-wrap gap-3">
          {vet.specialty.map((s, i) => (
            <View key={i} style={{ backgroundColor: theme.bg, minWidth: '47%' }} className="flex-1 p-3 rounded-xl flex-row items-center gap-2">
              <View style={{ backgroundColor: theme.accentLight }} className="w-10 h-10 rounded-full items-center justify-center">
                <Ionicons name="medical" size={20} color={theme.accent} />
              </View>
              <Text style={{ color: theme.text, fontSize: 14, fontWeight: '600' }} className="flex-1">{s}</Text>
            </View>
          ))}
        </View>
      </DetailSection>

      <DetailSection title="Eğitim" icon="school-outline" iconColor={theme.accent} cardBg={theme.card} textColor={theme.text}>
        <View className="gap-3">
          {vet.education.map((edu, i) => (
            <View key={i} style={{ backgroundColor: theme.bg }} className="flex-row items-center p-3 rounded-xl gap-3">
              <View style={{ backgroundColor: theme.accentLight }} className="w-9 h-9 rounded-full items-center justify-center">
                <Ionicons name="checkmark" size={18} color={theme.accent} />
              </View>
              <Text style={{ color: theme.text, fontSize: 15, fontWeight: '500' }} className="flex-1">{edu}</Text>
            </View>
          ))}
        </View>
      </DetailSection>

      <DetailSection title="Çalışma Saatleri" icon="time-outline" iconColor={theme.accent} cardBg={theme.card} textColor={theme.text}>
        <View className="gap-3">
          {[
            { label: 'Hafta İçi', value: vet.workingHours.weekdays },
            { label: 'Cumartesi', value: vet.workingHours.saturday },
            { label: 'Pazar', value: vet.workingHours.sunday },
          ].map((item, i) => (
            <View key={i} style={{ backgroundColor: theme.bg }} className="flex-row justify-between items-center p-3 rounded-xl">
              <Text style={{ color: theme.textSecondary, fontSize: 15 }}>{item.label}</Text>
              <Text style={{ color: theme.text, fontSize: 15, fontWeight: '700' }}>{item.value}</Text>
            </View>
          ))}
        </View>
      </DetailSection>

      <DetailSection title="İletişim" icon="call-outline" iconColor={theme.accent} cardBg={theme.card} textColor={theme.text}>
        <View className="gap-3">
          <View style={{ backgroundColor: theme.bg }} className="flex-row items-center p-3 rounded-xl gap-3">
            <Ionicons name="location" size={20} color={theme.accent} />
            <Text style={{ color: theme.text, fontSize: 15, fontWeight: '500' }} className="flex-1">{vet.address}</Text>
          </View>
          <View style={{ backgroundColor: theme.bg }} className="flex-row items-center p-3 rounded-xl gap-3">
            <Ionicons name="call" size={20} color={theme.accent} />
            <Text style={{ color: theme.text, fontSize: 15, fontWeight: '500' }} className="flex-1">{vet.phone}</Text>
          </View>
        </View>
      </DetailSection>
    </View>
  );

  const renderServicesTab = () => (
    <View>
      <DetailSection title="Sunulan Hizmetler" icon="medkit-outline" iconColor={theme.accent} cardBg={theme.card} textColor={theme.text}>
        <View className="gap-3">
          {vet.services.map((service, i) => (
            <View key={i} style={{ backgroundColor: theme.bg }} className="flex-row items-center p-3 rounded-xl gap-3">
              <View style={{ backgroundColor: theme.accentLight }} className="w-9 h-9 rounded-full items-center justify-center">
                <Ionicons name="checkmark-circle" size={20} color={theme.accent} />
              </View>
              <Text style={{ color: theme.text, fontSize: 15, fontWeight: '500' }} className="flex-1">{service}</Text>
            </View>
          ))}
        </View>
      </DetailSection>

      <DetailSection title="Ücretlendirme" icon="cash-outline" iconColor={theme.accent} cardBg={theme.card} textColor={theme.text}>
        <View style={{ backgroundColor: theme.accentLight }} className="p-4 rounded-xl flex-row items-center justify-between">
          <View className="flex-1">
            <Text style={{ color: theme.text, fontSize: 15, marginBottom: 4 }}>Muayene Ücreti</Text>
            <Text style={{ color: theme.textSecondary, fontSize: 13 }}>Başlangıç fiyatı</Text>
          </View>
          <Text style={{ color: theme.accent, fontSize: 28, fontWeight: '700' }}>₺{vet.price}</Text>
        </View>
      </DetailSection>
    </View>
  );

  const renderReviewsTab = () => (
    <View>
      <DetailSection title={`Değerlendirmeler (${vet.reviewCount})`} icon="star-outline" iconColor={theme.accent} cardBg={theme.card} textColor={theme.text}>
        <View style={{ backgroundColor: theme.accentLight }} className="p-4 rounded-xl mb-4 items-center">
          <Text style={{ color: theme.accent, fontSize: 48, fontWeight: '700', marginBottom: 4 }}>{vet.rating}</Text>
          <View className="flex-row gap-1 mb-2">
            {[1, 2, 3, 4, 5].map((star) => (
              <Ionicons key={star} name="star" size={16} color="#F59E0B" />
            ))}
          </View>
          <Text style={{ color: theme.textSecondary, fontSize: 13 }}>{vet.reviewCount} değerlendirme</Text>
        </View>

        <View className="gap-3">
          {vet.reviews.map((review) => (
            <View key={review.id} style={{ backgroundColor: theme.bg }} className="p-4 rounded-xl">
              <View className="flex-row items-center mb-3">
                <View style={{ backgroundColor: theme.accentLight }} className="w-11 h-11 rounded-full items-center justify-center mr-3">
                  <Ionicons name="person" size={24} color={theme.accent} />
                </View>
                <View className="flex-1">
                  <Text style={{ color: theme.text, fontSize: 15, fontWeight: '700', marginBottom: 4 }}>{review.user}</Text>
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
              <Text style={{ color: theme.textSecondary, fontSize: 14, lineHeight: 20 }}>{review.comment}</Text>
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
        title={vet.name}
      />

      <Animated.ScrollView
        showsVerticalScrollIndicator={false}
        onScroll={Animated.event([{ nativeEvent: { contentOffset: { y: scrollY } } }], { useNativeDriver: false })}
        scrollEventThrottle={16}
        contentContainerStyle={{ paddingBottom: 100 }}
      >
        <View style={{ height: HERO_HEIGHT }}>
          <Image source={{ uri: vet.image }} style={{ width, height: HERO_HEIGHT, resizeMode: 'cover' }} />
          <LinearGradient colors={['transparent', theme.bg]} style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: 100 }} />
        </View>

        <View style={{ paddingTop: 8 }}>
          <View className="px-4 mb-4">
            <View className="flex-row items-center gap-2 mb-2">
              <Text style={{ color: theme.text, fontSize: 32, fontWeight: '700' }} accessibilityRole="header">{vet.name}</Text>
              {vet.verified && <Ionicons name="checkmark-circle" size={26} color={theme.accent} />}
            </View>
            <Text style={{ color: theme.textSecondary, fontSize: 18, marginBottom: 12 }}>{vet.title}</Text>

            <View className="flex-row gap-4 flex-wrap mb-4">
              <View className="flex-row items-center gap-2">
                <Ionicons name="star" size={18} color="#F59E0B" />
                <Text style={{ color: theme.textSecondary, fontSize: 14, fontWeight: '500' }}>{vet.rating} ({vet.reviewCount} yorum)</Text>
              </View>
              <View className="flex-row items-center gap-2">
                <Ionicons name="briefcase-outline" size={18} color={theme.accent} />
                <Text style={{ color: theme.textSecondary, fontSize: 14, fontWeight: '500' }}>{vet.experience} deneyim</Text>
              </View>
            </View>

            <View style={{ backgroundColor: theme.card }} className="p-4 rounded-2xl">
              <Text style={{ color: theme.textSecondary, fontSize: 14, marginBottom: 4 }}>{vet.clinic}</Text>
              <Text style={{ color: theme.text, fontSize: 16, fontWeight: '600' }}>{vet.address}</Text>
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
                    <Text style={{ color: activeTab === tab.id ? theme.accent : theme.textSecondary, fontSize: 15, fontWeight: activeTab === tab.id ? '700' : '500' }}>
                      {tab.label}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
            </ScrollView>
          </View>

          <View style={{ paddingTop: 16 }}>
            {activeTab === 'about' && renderAboutTab()}
            {activeTab === 'services' && renderServicesTab()}
            {activeTab === 'reviews' && renderReviewsTab()}
          </View>
        </View>
      </Animated.ScrollView>

      <View style={{ backgroundColor: theme.card, borderTopWidth: 1, borderTopColor: theme.border, paddingTop: 14, paddingBottom: insets.bottom + 14, paddingHorizontal: 16 }}>
        <LinearGradient colors={[theme.accent, theme.accent + 'DD']} style={{ height: 56, borderRadius: 28 }} start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }}>
          <TouchableOpacity style={{ flex: 1 }} className="flex-row items-center justify-center gap-2" onPress={() => setShowAppointmentModal(true)} accessibilityLabel="Randevu al" accessibilityRole="button">
            <Ionicons name="calendar" size={20} color="#FFF" />
            <Text style={{ color: '#FFF', fontSize: 16, fontWeight: '700' }}>Randevu Al</Text>
          </TouchableOpacity>
        </LinearGradient>
      </View>

      <Modal visible={showAppointmentModal} animationType="slide" transparent onRequestClose={() => setShowAppointmentModal(false)}>
        <View style={{ flex: 1, backgroundColor: 'rgba(0,0,0,0.7)', justifyContent: 'flex-end' }}>
          <View style={{ backgroundColor: theme.card, borderTopLeftRadius: 24, borderTopRightRadius: 24, maxHeight: '80%' }}>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', padding: 16, borderBottomWidth: 1, borderBottomColor: theme.border }}>
              <Text style={{ color: theme.text, fontSize: 20, fontWeight: '700' }}>Randevu Al</Text>
              <TouchableOpacity onPress={() => setShowAppointmentModal(false)}>
                <Ionicons name="close" size={28} color={theme.text} />
              </TouchableOpacity>
            </View>
            <ScrollView style={{ padding: 16 }}>
              <Text style={{ color: theme.text, fontSize: 16, fontWeight: '600', marginBottom: 12 }}>Müsait Saatler</Text>
              <View className="flex-row flex-wrap gap-2 mb-6">
                {vet.availableSlots.map((slot) => (
                  <TouchableOpacity
                    key={slot}
                    style={{
                      backgroundColor: selectedTime === slot ? theme.accent : theme.bg,
                      borderWidth: 2,
                      borderColor: selectedTime === slot ? theme.accent : theme.border,
                      paddingHorizontal: 20,
                      paddingVertical: 12,
                      borderRadius: 12,
                    }}
                    onPress={() => setSelectedTime(slot)}
                  >
                    <Text style={{ color: selectedTime === slot ? '#FFF' : theme.text, fontSize: 15, fontWeight: '600' }}>{slot}</Text>
                  </TouchableOpacity>
                ))}
              </View>
              <LinearGradient colors={[theme.accent, theme.accent + 'DD']} style={{ borderRadius: 12, marginBottom: 24 }}>
                <TouchableOpacity style={{ paddingVertical: 16, alignItems: 'center' }} onPress={() => setShowAppointmentModal(false)} disabled={!selectedTime}>
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

export default VeterinaryDetailScreen;
