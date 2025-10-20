import React, { useState } from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Image,
  Dimensions,
  Modal,
  StatusBar,
} from "react-native";
import SafeAreaContainer from "../../components/layout/SafeAreaContainer";
import { LinearGradient } from "expo-linear-gradient";
import { Ionicons } from "@expo/vector-icons";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const { width } = Dimensions.get("window");

const PetGroomingDetailScreen = ({ navigation }) => {
  const [activeTab, setActiveTab] = useState("packages");
  const [showBookingModal, setShowBookingModal] = useState(false);
  const [selectedPackage, setSelectedPackage] = useState(null);
  const insets = useSafeAreaInsets();

  const groomer = {
    name: "Pati Güzellik Salonu",
    rating: 4.8,
    reviewCount: 156,
    distance: "1.5 km",
    location: "İstanbul, Kadıköy",
    address: "Caferağa Mah., Moda Cad. No: 12",
    phone: "+90 555 999 8877",
    verified: true,
    mobile: true,
    image: "https://images.unsplash.com/photo-1548199973-03cce0bbc87b?w=800",
    packages: [
      {
        id: 1,
        name: "Banyo Paketi",
        price: 150,
        duration: "45 dk",
        services: ["Şampuan", "Fırçalama", "Tırnak Kesimi"],
      },
      { id: 2, name: "Tıraş Paketi", price: 200, duration: "60 dk", services: ["Banyo", "Tıraş", "Kulak Temizliği"] },
      {
        id: 3,
        name: "Tam Bakım",
        price: 350,
        duration: "90 dk",
        services: ["Banyo", "Tıraş", "Tırnak", "Kulak", "Diş Temizliği"],
      },
    ],
    features: ["Evde Hizmet", "Doğal Ürünler", "Deneyimli Ekip", "Özel Ürünler"],
    workingHours: { weekdays: "09:00 - 19:00", saturday: "09:00 - 17:00", sunday: "Kapalı" },
    reviews: [
      {
        id: "1",
        user: "Selin A.",
        avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200",
        rating: 5,
        date: "1 hafta önce",
        comment: "Köpeğim çok memnun kaldı, harika bir hizmet!",
      },
    ],
  };

  const renderPackagesTab = () => (
    <View className='px-4 pt-4 pb-24'>
      {groomer.packages.map(p => (
        <TouchableOpacity
          key={p.id}
          className={`bg-gray-50 p-4 rounded-xl mb-4 border-2 ${
            selectedPackage?.id === p.id ? "border-pink-500 bg-pink-50" : "border-transparent"
          }`}
          onPress={() => setSelectedPackage(p)}
        >
          <View className='flex-row justify-between items-start mb-2'>
            <View>
              <Text className='text-lg font-bold text-gray-900'>{p.name}</Text>
              <Text className='text-sm text-gray-500 mt-0.5'>{p.duration}</Text>
            </View>
            <Text className='text-xl font-bold text-pink-500'>₺{p.price}</Text>
          </View>
          <View className='gap-1'>
            {p.services.map((s, i) => (
              <View key={i} className='flex-row items-center gap-1'>
                <Ionicons name='checkmark-circle' size={16} color='#EC4899' />
                <Text className='text-sm text-gray-900'>{s}</Text>
              </View>
            ))}
          </View>
        </TouchableOpacity>
      ))}
    </View>
  );

  const renderReviewsTab = () => (
    <View className='px-4 pt-4 pb-24'>
      <View className='bg-gray-50 p-4 rounded-2xl mb-4 items-center'>
        <Text className='text-4xl font-bold text-gray-900 mb-1'>{groomer.rating}</Text>
        <View className='flex-row gap-1 mb-1'>
          {[1, 2, 3, 4, 5].map(s => (
            <Ionicons key={s} name='star' size={16} color='#F59E0B' />
          ))}
        </View>
        <Text className='text-sm text-gray-500'>{groomer.reviewCount} değerlendirme</Text>
      </View>
      {groomer.reviews.map(r => (
        <View key={r.id} className='bg-gray-50 p-4 rounded-xl mb-4'>
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
  );

  return (
    <SafeAreaContainer edges={['top', 'right', 'left']} className='flex-1 bg-white'>
      <StatusBar barStyle='dark-content' backgroundColor='transparent' translucent />
      <View className='flex-row justify-between items-center px-4 pb-4'>
        <TouchableOpacity
          className='w-10 h-10 rounded-full bg-gray-100 items-center justify-center'
          onPress={() => navigation.goBack()}
        >
          <Ionicons name='arrow-back' size={24} color='#1F2937' />
        </TouchableOpacity>
        <View className='flex-row gap-2'>
          <TouchableOpacity className='w-10 h-10 rounded-full bg-gray-100 items-center justify-center'>
            <Ionicons name='share-outline' size={24} color='#1F2937' />
          </TouchableOpacity>
          <TouchableOpacity className='w-10 h-10 rounded-full bg-gray-100 items-center justify-center'>
            <Ionicons name='heart-outline' size={24} color='#1F2937' />
          </TouchableOpacity>
        </View>
      </View>

      <ScrollView className='flex-1' showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 100 }}>
        <Image source={{ uri: groomer.image }} style={{ width, height: 300 }} />

        <View className='p-4 border-b border-gray-200'>
          <View className='flex-row items-center gap-2 mb-2'>
            <Text className='text-3xl font-bold text-gray-900'>{groomer.name}</Text>
            {groomer.verified && <Ionicons name='checkmark-circle' size={22} color='#EC4899' />}
          </View>

          <View className='flex-row gap-2 mb-2'>
            <View className='flex-row items-center gap-1 bg-pink-50 px-2 py-1.5 rounded-lg'>
              <Ionicons name='star' size={16} color='#F59E0B' />
              <Text className='text-sm text-gray-900'>
                {groomer.rating} ({groomer.reviewCount})
              </Text>
            </View>
            <View className='flex-row items-center gap-1 bg-pink-50 px-2 py-1.5 rounded-lg'>
              <Ionicons name='location' size={16} color='#EC4899' />
              <Text className='text-sm text-gray-900'>{groomer.distance}</Text>
            </View>
            {groomer.mobile && (
              <View className='flex-row items-center gap-1 bg-pink-50 px-2 py-1.5 rounded-lg'>
                <Ionicons name='home' size={16} color='#10B981' />
                <Text className='text-sm text-gray-900'>Evde Hizmet</Text>
              </View>
            )}
          </View>

          <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerClassName='gap-2'>
            {groomer.features.map((f, i) => (
              <View key={i} className='bg-pink-50 px-2 py-1.5 rounded-lg'>
                <Text className='text-xs text-pink-500 font-medium'>{f}</Text>
              </View>
            ))}
          </ScrollView>
        </View>

        <View className='bg-gray-100 mx-4 mt-4 rounded-xl p-1'>
          {[
            { key: "packages", label: "Paketler", icon: "pricetag" },
            { key: "reviews", label: "Yorumlar", icon: "star" },
          ].map(t => (
            <TouchableOpacity
              key={t.key}
              className={`flex-1 flex-row items-center justify-center gap-1.5 py-2 rounded-lg ${
                activeTab === t.key ? "bg-white" : ""
              }`}
              onPress={() => setActiveTab(t.key)}
            >
              <Ionicons name={t.icon} size={20} color={activeTab === t.key ? "#EC4899" : "#6B7280"} />
              <Text
                className={`text-sm font-medium ${
                  activeTab === t.key ? "text-pink-500 font-semibold" : "text-gray-500"
                }`}
              >
                {t.label}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        {activeTab === "packages" && renderPackagesTab()}
        {activeTab === "reviews" && renderReviewsTab()}
      </ScrollView>

      <View
        className='absolute bottom-0 left-0 right-0 flex-row items-center bg-white px-4 pt-4 border-t border-gray-200 gap-4'
        style={{ paddingBottom: insets.bottom + 16 }}
      >
        <View className='flex-row items-baseline gap-1'>
          <Text className='text-2xl font-bold text-pink-500'>₺{groomer.packages[0].price}</Text>
          <Text className='text-xs text-gray-500'>'den başlayan</Text>
        </View>
        <LinearGradient
          colors={["#EC4899", "#DB2777"]}
          className='flex-1 rounded-xl overflow-hidden'
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
        >
          <TouchableOpacity
            className='flex-row items-center justify-center py-4 gap-2'
            onPress={() => setShowBookingModal(true)}
          >
            <Ionicons name='calendar' size={20} color='#FFF' />
            <Text className='text-base font-bold text-white'>Randevu Al</Text>
          </TouchableOpacity>
        </LinearGradient>
      </View>

      <Modal
        visible={showBookingModal}
        animationType='slide'
        transparent
        onRequestClose={() => setShowBookingModal(false)}
      >
        <View className='flex-1 bg-black/50 justify-end'>
          <View className='bg-white rounded-t-3xl max-h-[70%]'>
            <View className='flex-row justify-between items-center p-4 border-b border-gray-200'>
              <Text className='text-xl font-bold text-gray-900'>Randevu Al</Text>
              <TouchableOpacity onPress={() => setShowBookingModal(false)}>
                <Ionicons name='close' size={28} color='#1F2937' />
              </TouchableOpacity>
            </View>
            <ScrollView className='p-4' showsVerticalScrollIndicator={false}>
              <Text className='text-sm font-semibold text-gray-900 mb-2'>Paket Seç</Text>
              {groomer.packages.map(p => (
                <TouchableOpacity
                  key={p.id}
                  className={`flex-row justify-between bg-gray-50 p-4 rounded-lg mb-2 border-2 ${
                    selectedPackage?.id === p.id ? "border-pink-500 bg-pink-50" : "border-transparent"
                  }`}
                  onPress={() => setSelectedPackage(p)}
                >
                  <Text className='text-base text-gray-900'>{p.name}</Text>
                  <Text className='text-base font-bold text-pink-500'>₺{p.price}</Text>
                </TouchableOpacity>
              ))}
              <Text className='text-sm font-semibold text-gray-900 mb-2 mt-4'>Tarih Seç</Text>
              <TouchableOpacity className='flex-row items-center gap-2 bg-pink-50 p-4 rounded-xl border border-pink-500 mb-4'>
                <Ionicons name='calendar-outline' size={20} color='#EC4899' />
                <Text className='text-base text-gray-900'>Bugün - 15 Mayıs 2024</Text>
              </TouchableOpacity>
              <LinearGradient
                colors={["#EC4899", "#DB2777"]}
                className='rounded-xl overflow-hidden mb-6'
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
              >
                <TouchableOpacity className='py-4 items-center' onPress={() => setShowBookingModal(false)}>
                  <Text className='text-base font-bold text-white'>Randevuyu Onayla</Text>
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
