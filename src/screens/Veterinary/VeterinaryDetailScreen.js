import React, { useState } from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Image,
  Dimensions,
  Modal,
} from "react-native";
import SafeAreaContainer from "../../components/layout/SafeAreaContainer";
import { LinearGradient } from "expo-linear-gradient";
import { Ionicons } from "@expo/vector-icons";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const { width } = Dimensions.get("window");

const VeterinaryDetailScreen = ({ navigation }) => {
  const [activeTab, setActiveTab] = useState("about");
  const [showAppointmentModal, setShowAppointmentModal] = useState(false);
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedTime, setSelectedTime] = useState(null);
  const insets = useSafeAreaInsets();

  const vet = {
    name: "Dr. Ayşe Yılmaz",
    title: "Veteriner Hekim",
    rating: 4.9,
    reviewCount: 234,
    experience: "15 yıl",
    clinic: "Pati Veteriner Kliniği",
    address: "Caferağa Mah., Kadıköy",
    phone: "+90 555 123 4567",
    price: 300,
    verified: true,
    image: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=800",
    specialty: ["Genel Muayene", "Cerrahi", "Diş Sağlığı", "Aşılama"],
    languages: ["Türkçe", "İngilizce"],
    education: ["İstanbul Üniversitesi Veteriner Fakültesi", "Cerrahi Uzmanlık - Ankara Üniversitesi"],
    services: ["Genel Muayene", "Aşılama", "Cerrahi Operasyonlar", "Diş Temizliği", "Ultrason", "Röntgen"],
    workingHours: { weekdays: "09:00 - 18:00", saturday: "09:00 - 14:00", sunday: "Kapalı" },
    availableSlots: ["09:00", "09:30", "10:00", "11:00", "14:00", "14:30", "15:00", "16:00"],
    reviews: [
      {
        id: "1",
        user: "Mehmet K.",
        avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200",
        rating: 5,
        date: "1 hafta önce",
        comment: "Kedime çok iyi baktı, çok teşekkürler!",
      },
      {
        id: "2",
        user: "Elif Y.",
        avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200",
        rating: 5,
        date: "2 hafta önce",
        comment: "Profesyonel ve ilgili, kesinlikle tavsiye ederim.",
      },
    ],
  };

  const renderAboutTab = () => (
    <View className='px-4 pb-24'>
      <View className='mt-6'>
        <Text className='text-xl font-bold text-gray-900 mb-4'>Uzmanlık Alanları</Text>
        <View className='flex-row flex-wrap gap-2'>
          {vet.specialty.map((s, i) => (
            <View
              key={i}
              className='bg-green-50 p-4 rounded-xl flex-row items-center gap-2'
              style={{ width: (width - 40) / 2 - 4 }}
            >
              <Ionicons name='medical' size={20} color='#10B981' />
              <Text className='text-sm text-gray-900 font-medium flex-1'>{s}</Text>
            </View>
          ))}
        </View>
      </View>

      <View className='mt-6'>
        <Text className='text-xl font-bold text-gray-900 mb-4'>Eğitim</Text>
        {vet.education.map((e, i) => (
          <View key={i} className='flex-row items-center gap-2 mb-2 bg-gray-50 p-2 rounded-lg'>
            <Ionicons name='school' size={18} color='#10B981' />
            <Text className='text-sm text-gray-900 flex-1'>{e}</Text>
          </View>
        ))}
      </View>

      <View className='mt-6'>
        <Text className='text-xl font-bold text-gray-900 mb-4'>Hizmetler</Text>
        {vet.services.map((s, i) => (
          <View key={i} className='flex-row items-center gap-2 mb-2'>
            <Ionicons name='checkmark-circle' size={18} color='#10B981' />
            <Text className='text-base text-gray-900'>{s}</Text>
          </View>
        ))}
      </View>

      <View className='mt-6'>
        <Text className='text-xl font-bold text-gray-900 mb-4'>Çalışma Saatleri</Text>
        <View className='bg-green-50 p-4 rounded-xl'>
          <View className='flex-row justify-between mb-2'>
            <Text className='text-base text-gray-900 font-semibold'>Hafta İçi:</Text>
            <Text className='text-base text-gray-500'>{vet.workingHours.weekdays}</Text>
          </View>
          <View className='flex-row justify-between mb-2'>
            <Text className='text-base text-gray-900 font-semibold'>Cumartesi:</Text>
            <Text className='text-base text-gray-500'>{vet.workingHours.saturday}</Text>
          </View>
          <View className='flex-row justify-between'>
            <Text className='text-base text-gray-900 font-semibold'>Pazar:</Text>
            <Text className='text-base text-gray-500'>{vet.workingHours.sunday}</Text>
          </View>
        </View>
      </View>
    </View>
  );

  const renderReviewsTab = () => (
    <View className='px-4 pb-24'>
      <View className='bg-gray-50 p-4 rounded-2xl mt-6 items-center'>
        <Text className='text-4xl font-bold text-gray-900 mb-1'>{vet.rating}</Text>
        <View className='flex-row gap-1 mb-1'>
          {[1, 2, 3, 4, 5].map(s => (
            <Ionicons key={s} name='star' size={16} color='#F59E0B' />
          ))}
        </View>
        <Text className='text-sm text-gray-500'>{vet.reviewCount} değerlendirme</Text>
      </View>

      <View className='mt-6 gap-4'>
        {vet.reviews.map(r => (
          <View key={r.id} className='bg-gray-50 p-4 rounded-xl'>
            <View className='flex-row mb-2'>
              <Image source={{ uri: r.avatar }} className='w-11 h-11 rounded-full mr-2' />
              <View className='flex-1'>
                <Text className='text-base font-semibold text-gray-900'>{r.user}</Text>
                <View className='flex-row items-center gap-2 mt-1'>
                  <View className='flex-row gap-0.5'>
                    {[...Array(r.rating)].map((_, i) => (
                      <Ionicons key={i} name='star' size={12} color='#F59E0B' />
                    ))}
                  </View>
                  <Text className='text-xs text-gray-500'>{r.date}</Text>
                </View>
              </View>
            </View>
            <Text className='text-sm text-gray-900 leading-5'>{r.comment}</Text>
          </View>
        ))}
      </View>
    </View>
  );

  const renderLocationTab = () => (
    <View className='px-4 pb-24'>
      <View className='mt-6'>
        <Text className='text-xl font-bold text-gray-900 mb-4'>Klinik Bilgileri</Text>
        <View className='rounded-xl overflow-hidden border border-gray-200'>
          <View className='h-[200px] bg-green-50 items-center justify-center'>
            <Ionicons name='map' size={48} color='#10B981' />
            <Text className='text-sm text-gray-500 mt-2'>Harita Yükleniyor...</Text>
          </View>
          <View className='p-4 bg-white'>
            <View className='flex-row gap-2 mb-2 items-center'>
              <Ionicons name='business' size={20} color='#10B981' />
              <Text className='text-base text-gray-900 flex-1'>{vet.clinic}</Text>
            </View>
            <View className='flex-row gap-2 mb-2 items-center'>
              <Ionicons name='location' size={20} color='#10B981' />
              <Text className='text-base text-gray-900 flex-1'>{vet.address}</Text>
            </View>
            <View className='flex-row gap-2 mb-2 items-center'>
              <Ionicons name='call' size={20} color='#10B981' />
              <Text className='text-base text-gray-900 flex-1'>{vet.phone}</Text>
            </View>
            <TouchableOpacity className='flex-row items-center gap-1 self-start mt-2'>
              <Ionicons name='navigate' size={20} color='#10B981' />
              <Text className='text-sm text-green-500 font-semibold'>Yol Tarifi Al</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  );

  const renderAppointmentModal = () => (
    <Modal
      visible={showAppointmentModal}
      animationType='slide'
      transparent
      onRequestClose={() => setShowAppointmentModal(false)}
    >
      <View className='flex-1 bg-black/50 justify-end'>
        <View className='bg-white rounded-t-3xl max-h-[80%]'>
          <View className='flex-row justify-between items-center p-4 border-b border-gray-200'>
            <Text className='text-xl font-bold text-gray-900'>Randevu Al</Text>
            <TouchableOpacity onPress={() => setShowAppointmentModal(false)}>
              <Ionicons name='close' size={28} color='#1F2937' />
            </TouchableOpacity>
          </View>

          <ScrollView className='p-4' showsVerticalScrollIndicator={false}>
            <Text className='text-sm font-semibold text-gray-900 mb-2'>Tarih Seç</Text>
            <TouchableOpacity className='flex-row items-center gap-2 bg-green-50 p-4 rounded-xl border border-green-500'>
              <Ionicons name='calendar-outline' size={20} color='#10B981' />
              <Text className='text-base text-gray-900'>Bugün - 15 Mayıs 2024</Text>
            </TouchableOpacity>

            <Text className='text-sm font-semibold text-gray-900 mb-2 mt-4'>Saat Seç</Text>
            <View className='flex-row flex-wrap gap-2 mb-6'>
              {vet.availableSlots.map(time => (
                <TouchableOpacity
                  key={time}
                  className={`p-2 rounded-lg items-center border ${
                    selectedTime === time ? "bg-green-500 border-green-500" : "bg-gray-50 border-gray-200"
                  }`}
                  style={{ width: (width - 40) / 4 - 6 }}
                  onPress={() => setSelectedTime(time)}
                >
                  <Text className={`text-sm font-medium ${selectedTime === time ? "text-white" : "text-gray-900"}`}>
                    {time}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>

            <View className='bg-green-50 p-4 rounded-xl mb-6'>
              <View className='flex-row justify-between'>
                <Text className='text-base text-gray-900'>Muayene Ücreti</Text>
                <Text className='text-base font-semibold text-green-500'>₺{vet.price}</Text>
              </View>
            </View>

            <LinearGradient
              colors={["#10B981", "#059669"]}
              className='rounded-xl overflow-hidden mb-6'
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
            >
              <TouchableOpacity className='py-4 items-center' onPress={() => setShowAppointmentModal(false)}>
                <Text className='text-base font-bold text-white'>Randevuyu Onayla</Text>
              </TouchableOpacity>
            </LinearGradient>
          </ScrollView>
        </View>
      </View>
    </Modal>
  );

  // Header Component
  const renderHeader = () => (
    <View className='flex-row justify-between items-center px-4 py-2 bg-white'>
      <TouchableOpacity
        className='w-10 h-10 rounded-full bg-gray-50 items-center justify-center'
        onPress={() => navigation.goBack()}
      >
        <Ionicons name='arrow-back' size={24} color='#1F2937' />
      </TouchableOpacity>
      <View className='flex-row gap-2'>
        <TouchableOpacity className='w-10 h-10 rounded-full bg-gray-50 items-center justify-center'>
          <Ionicons name='share-outline' size={24} color='#1F2937' />
        </TouchableOpacity>
        <TouchableOpacity className='w-10 h-10 rounded-full bg-gray-50 items-center justify-center'>
          <Ionicons name='heart-outline' size={24} color='#1F2937' />
        </TouchableOpacity>
      </View>
    </View>
  );

  // Footer Component
  const renderFooter = () => (
    <View className='flex-row items-center bg-white px-4 py-4 border-t border-gray-200 gap-4'>
      <View className='flex-row items-baseline'>
        <Text className='text-2xl font-bold text-green-500'>₺{vet.price}</Text>
        <Text className='text-sm text-gray-500'>/muayene</Text>
      </View>
      <LinearGradient
        colors={["#10B981", "#059669"]}
        className='flex-1 rounded-xl overflow-hidden'
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
      >
        <TouchableOpacity
          className='flex-row items-center justify-center py-4 gap-2'
          onPress={() => setShowAppointmentModal(true)}
        >
          <Ionicons name='calendar' size={20} color='#FFF' />
          <Text className='text-base font-bold text-white'>Randevu Al</Text>
        </TouchableOpacity>
      </LinearGradient>
    </View>
  );

  return (
    <SafeAreaContainer edges={['top', 'right', 'left']} className='flex-1 bg-white'>
      {renderHeader()}

      <ScrollView className='flex-1' showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 100 }}>
        <Image source={{ uri: vet.image }} style={{ width, height: 300 }} />

        <View className='p-4 border-b border-gray-200'>
          <View className='flex-row items-center gap-2 mb-1'>
            <Text className='text-3xl font-bold text-gray-900'>{vet.name}</Text>
            {vet.verified && <Ionicons name='checkmark-circle' size={22} color='#10B981' />}
          </View>
          <Text className='text-base text-green-500 font-semibold mb-2'>{vet.title}</Text>

          <View className='flex-row gap-4 mb-2'>
            <View className='flex-row items-center gap-1 bg-green-50 px-2 py-1.5 rounded-lg'>
              <Ionicons name='star' size={16} color='#F59E0B' />
              <Text className='text-sm text-gray-900'>
                {vet.rating} ({vet.reviewCount})
              </Text>
            </View>
            <View className='flex-row items-center gap-1 bg-green-50 px-2 py-1.5 rounded-lg'>
              <Ionicons name='briefcase-outline' size={16} color='#10B981' />
              <Text className='text-sm text-gray-900'>{vet.experience}</Text>
            </View>
          </View>

          <View className='flex-row gap-2'>
            {vet.languages.map((l, i) => (
              <View key={i} className='flex-row items-center gap-1 bg-green-50 px-2 py-1.5 rounded-lg'>
                <Ionicons name='language' size={14} color='#10B981' />
                <Text className='text-xs text-green-500 font-medium'>{l}</Text>
              </View>
            ))}
          </View>
        </View>

        <View className='bg-gray-50 mx-4 mt-4 rounded-xl p-1'>
          {[
            { key: "about", label: "Hakkında", icon: "information-circle" },
            { key: "reviews", label: "Yorumlar", icon: "star" },
            { key: "location", label: "Konum", icon: "location" },
          ].map(t => (
            <TouchableOpacity
              key={t.key}
              className={`flex-1 flex-row items-center justify-center gap-1.5 py-2 rounded-lg ${
                activeTab === t.key ? "bg-white" : ""
              }`}
              onPress={() => setActiveTab(t.key)}
            >
              <Ionicons name={t.icon} size={20} color={activeTab === t.key ? "#10B981" : "#6B7280"} />
              <Text
                className={`text-sm font-medium ${
                  activeTab === t.key ? "text-green-500 font-semibold" : "text-gray-500"
                }`}
              >
                {t.label}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        {activeTab === "about" && renderAboutTab()}
        {activeTab === "reviews" && renderReviewsTab()}
        {activeTab === "location" && renderLocationTab()}
      </ScrollView>

      {renderFooter()}
      {renderAppointmentModal()}
    </SafeAreaContainer>
  );
};

export default VeterinaryDetailScreen;
