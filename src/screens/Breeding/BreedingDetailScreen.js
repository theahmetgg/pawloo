import React, { useState } from "react";
import { View, Text, ScrollView, Image, TouchableOpacity, Dimensions, StatusBar } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import SafeAreaContainer from "../../components/layout/SafeAreaContainer";

const { width } = Dimensions.get("window");

const BreedingDetailScreen = ({ route, navigation }) => {
  const { pet } = route.params;
  const [activeTab, setActiveTab] = useState("info");
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const insets = useSafeAreaInsets();

  // Mock additional data
  const petDetails = {
    ...pet,
    description:
      "Sağlıklı, aktif ve sosyal bir karaktere sahip. Genetik testleri tamamlanmış, sağlık sertifikaları mevcut. Dost canlısı karakteri ile ailelere çok uygun.",
    pedigreeDetails: {
      father: "Champion Max",
      mother: "Princess Luna",
      generation: "3. Nesil",
    },
    vaccinations: [
      { name: "Karma Aşı", date: "15.01.2024", nextDate: "15.01.2025" },
      { name: "Kuduz", date: "20.01.2024", nextDate: "20.01.2025" },
      { name: "Leptospira", date: "25.01.2024", nextDate: "25.01.2025" },
    ],
    healthReports: [
      { type: "Genel Sağlık Kontrolü", date: "01.02.2024", result: "Sağlıklı" },
      { type: "Genetik Tarama", date: "15.02.2024", result: "Temiz" },
      { type: "Kalp Kontrolü", date: "20.02.2024", result: "Normal" },
    ],
    breedingHistory: [
      { year: "2023", litters: 1, puppies: 6, success: "100%" },
      { year: "2022", litters: 1, puppies: 5, success: "100%" },
    ],
    gallery: [
      pet.image,
      "https://images.unsplash.com/photo-1601758228041-f3b2795255f1?w=400",
      "https://images.unsplash.com/photo-1587300003388-59208cc962cb?w=400",
      "https://images.unsplash.com/photo-1592194996308-f265ec2b0d3a?w=400",
    ],
  };

  const handleScroll = event => {
    const scrollPosition = event.nativeEvent.contentOffset.x;
    const index = Math.round(scrollPosition / width);
    setCurrentImageIndex(index);
  };

  const renderInfoTab = () => (
    <View className='p-4'>
      {/* Description */}
      <View className='mb-6'>
        <Text className='text-xl font-bold text-gray-900 mb-3'>Hakkında</Text>
        <Text className='text-base text-gray-600 leading-6'>{petDetails.description}</Text>
      </View>

      {/* Basic Info Grid */}
      <View className='mb-6'>
        <Text className='text-xl font-bold text-gray-900 mb-3'>Temel Bilgiler</Text>
        <View className='flex-row flex-wrap gap-3'>
          <View className='flex-1 min-w-[45%] bg-white p-4 rounded-2xl items-center shadow-sm'>
            <View className='w-12 h-12 bg-amber-100 rounded-full items-center justify-center mb-2'>
              <Ionicons name='paw' size={24} color='#F59E0B' />
            </View>
            <Text className='text-sm text-gray-500 mb-1'>Cins</Text>
            <Text className='text-base font-semibold text-gray-900'>{petDetails.breed}</Text>
          </View>

          <View className='flex-1 min-w-[45%] bg-white p-4 rounded-2xl items-center shadow-sm'>
            <View className='w-12 h-12 bg-amber-100 rounded-full items-center justify-center mb-2'>
              <Ionicons name='calendar' size={24} color='#F59E0B' />
            </View>
            <Text className='text-sm text-gray-500 mb-1'>Yaş</Text>
            <Text className='text-base font-semibold text-gray-900'>{petDetails.age} Yaş</Text>
          </View>

          <View className='flex-1 min-w-[45%] bg-white p-4 rounded-2xl items-center shadow-sm'>
            <View className='w-12 h-12 bg-amber-100 rounded-full items-center justify-center mb-2'>
              <Ionicons name={petDetails.gender === "Erkek" ? "male" : "female"} size={24} color='#F59E0B' />
            </View>
            <Text className='text-sm text-gray-500 mb-1'>Cinsiyet</Text>
            <Text className='text-base font-semibold text-gray-900'>{petDetails.gender}</Text>
          </View>

          <View className='flex-1 min-w-[45%] bg-white p-4 rounded-2xl items-center shadow-sm'>
            <View className='w-12 h-12 bg-amber-100 rounded-full items-center justify-center mb-2'>
              <Ionicons name='location' size={24} color='#F59E0B' />
            </View>
            <Text className='text-sm text-gray-500 mb-1'>Konum</Text>
            <Text className='text-base font-semibold text-gray-900'>{petDetails.city}</Text>
          </View>
        </View>
      </View>

      {/* Owner Info */}
      <View className='mb-6'>
        <Text className='text-xl font-bold text-gray-900 mb-3'>Sahip Bilgisi</Text>
        <View className='flex-row items-center bg-white p-4 rounded-2xl shadow-sm'>
          <View className='w-16 h-16 bg-amber-100 rounded-full items-center justify-center mr-4'>
            <Ionicons name='person' size={32} color='#F59E0B' />
          </View>
          <View className='flex-1'>
            <View className='flex-row items-center gap-2 mb-1'>
              <Text className='text-lg font-bold text-gray-900'>{petDetails.owner}</Text>
              {petDetails.ownerVerified && (
                <View className='flex-row items-center bg-teal-50 px-2 py-1 rounded-full gap-1'>
                  <Ionicons name='checkmark-circle' size={14} color='#FFFFFF' />
                  <Text className='text-xs font-semibold text-teal-600'>Doğrulanmış</Text>
                </View>
              )}
            </View>
            <Text className='text-sm text-gray-500'>Sertifikalı Yetiştirici</Text>
            <View className='flex-row items-center mt-2 gap-3'>
              <View className='flex-row items-center gap-1'>
                <Ionicons name='star' size={14} color='#F59E0B' />
                <Text className='text-xs font-semibold text-gray-700'>4.9</Text>
              </View>
              <View className='flex-row items-center gap-1'>
                <Ionicons name='ribbon' size={14} color='#F59E0B' />
                <Text className='text-xs font-semibold text-gray-700'>12 Yıl</Text>
              </View>
            </View>
          </View>
          <TouchableOpacity className='w-10 h-10 bg-amber-100 rounded-full items-center justify-center'>
            <Ionicons name='call' size={20} color='#F59E0B' />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );

  const renderPedigreeTab = () => (
    <View className='p-4'>
      {/* Pedigree Info */}
      <View className='mb-6'>
        <Text className='text-xl font-bold text-gray-900 mb-3'>Soy Ağacı Bilgileri</Text>
        <View className='bg-gradient-to-br from-amber-50 to-orange-50 p-5 rounded-2xl border-2 border-amber-200'>
          <View className='flex-row items-center gap-2 mb-4 pb-4 border-b border-amber-200'>
            <View className='w-10 h-10 bg-amber-500 rounded-full items-center justify-center'>
              <Ionicons name='ribbon' size={24} color='white' />
            </View>
            <Text className='text-lg font-bold text-amber-900'>Pedigree Sertifikalı</Text>
          </View>

          <View className='gap-3'>
            <View className='flex-row justify-between items-center'>
              <Text className='text-base text-amber-800'>Baba:</Text>
              <Text className='text-base font-bold text-amber-900'>{petDetails.pedigreeDetails.father}</Text>
            </View>
            <View className='flex-row justify-between items-center'>
              <Text className='text-base text-amber-800'>Anne:</Text>
              <Text className='text-base font-bold text-amber-900'>{petDetails.pedigreeDetails.mother}</Text>
            </View>
            <View className='flex-row justify-between items-center'>
              <Text className='text-base text-amber-800'>Nesil:</Text>
              <Text className='text-base font-bold text-amber-900'>{petDetails.pedigreeDetails.generation}</Text>
            </View>
          </View>
        </View>
      </View>

      {/* Breeding History */}
      {petDetails.breedingHistory && petDetails.breedingHistory.length > 0 && (
        <View className='mb-6'>
          <Text className='text-xl font-bold text-gray-900 mb-3'>Çiftleştirme Geçmişi</Text>
          {petDetails.breedingHistory.map((record, index) => (
            <View key={index} className='bg-white p-4 rounded-2xl shadow-sm mb-3'>
              <View className='flex-row items-center justify-between mb-3'>
                <View className='flex-row items-center gap-2'>
                  <View className='w-10 h-10 bg-teal-100 rounded-full items-center justify-center'>
                    <Ionicons name='calendar' size={20} color='#FFFFFF' />
                  </View>
                  <Text className='text-lg font-bold text-gray-900'>{record.year}</Text>
                </View>
                <View className='bg-green-100 px-3 py-1 rounded-full'>
                  <Text className='text-sm font-bold text-green-700'>{record.success}</Text>
                </View>
              </View>
              <View className='flex-row gap-4'>
                <View className='flex-1'>
                  <Text className='text-xs text-gray-500 mb-1'>Doğum Sayısı</Text>
                  <Text className='text-base font-semibold text-gray-900'>{record.litters}</Text>
                </View>
                <View className='flex-1'>
                  <Text className='text-xs text-gray-500 mb-1'>Toplam Yavru</Text>
                  <Text className='text-base font-semibold text-gray-900'>{record.puppies}</Text>
                </View>
              </View>
            </View>
          ))}
        </View>
      )}

      {/* Documents */}
      <View className='mb-6'>
        <Text className='text-xl font-bold text-gray-900 mb-3'>Belgeler</Text>
        <View className='gap-3'>
          <TouchableOpacity className='flex-row items-center bg-white p-4 rounded-2xl shadow-sm'>
            <View className='w-12 h-12 bg-amber-100 rounded-full items-center justify-center mr-3'>
              <Ionicons name='document-text' size={24} color='#F59E0B' />
            </View>
            <View className='flex-1'>
              <Text className='text-base font-semibold text-gray-900'>Pedigree Belgesi</Text>
              <Text className='text-sm text-gray-500'>PDF • 2.4 MB</Text>
            </View>
            <Ionicons name='download-outline' size={24} color='#F59E0B' />
          </TouchableOpacity>

          <TouchableOpacity className='flex-row items-center bg-white p-4 rounded-2xl shadow-sm'>
            <View className='w-12 h-12 bg-teal-100 rounded-full items-center justify-center mr-3'>
              <Ionicons name='shield-checkmark' size={24} color='#FFFFFF' />
            </View>
            <View className='flex-1'>
              <Text className='text-base font-semibold text-gray-900'>Sağlık Sertifikası</Text>
              <Text className='text-sm text-gray-500'>PDF • 1.8 MB</Text>
            </View>
            <Ionicons name='download-outline' size={24} color='#FFFFFF' />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );

  const renderHealthTab = () => (
    <View className='p-4'>
      {/* Vaccinations */}
      <View className='mb-6'>
        <Text className='text-xl font-bold text-gray-900 mb-3'>Aşı Bilgileri</Text>
        {petDetails.vaccinations.map((vaccine, index) => (
          <View key={index} className='flex-row items-center bg-white p-4 rounded-2xl shadow-sm mb-3'>
            <View className='w-12 h-12 bg-green-100 rounded-full items-center justify-center mr-3'>
              <Ionicons name='shield-checkmark' size={24} color='#10B981' />
            </View>
            <View className='flex-1'>
              <Text className='text-base font-semibold text-gray-900 mb-1'>{vaccine.name}</Text>
              <Text className='text-sm text-gray-500'>Son: {vaccine.date}</Text>
              <Text className='text-xs text-gray-400 mt-0.5'>Sonraki: {vaccine.nextDate}</Text>
            </View>
            <Ionicons name='checkmark-circle' size={28} color='#10B981' />
          </View>
        ))}
      </View>

      {/* Health Reports */}
      <View className='mb-6'>
        <Text className='text-xl font-bold text-gray-900 mb-3'>Sağlık Raporları</Text>
        {petDetails.healthReports.map((report, index) => (
          <View key={index} className='flex-row items-center bg-white p-4 rounded-2xl shadow-sm mb-3'>
            <View className='w-12 h-12 bg-blue-100 rounded-full items-center justify-center mr-3'>
              <Ionicons name='document-text' size={24} color='#3B82F6' />
            </View>
            <View className='flex-1'>
              <Text className='text-base font-semibold text-gray-900 mb-1'>{report.type}</Text>
              <Text className='text-sm text-gray-500 mb-2'>{report.date}</Text>
              <View className='bg-green-100 px-2 py-1 rounded-md self-start'>
                <Text className='text-xs font-semibold text-green-700'>{report.result}</Text>
              </View>
            </View>
            <TouchableOpacity>
              <Ionicons name='download-outline' size={24} color='#3B82F6' />
            </TouchableOpacity>
          </View>
        ))}
      </View>

      {/* Health Summary */}
      <View className='mb-6'>
        <Text className='text-xl font-bold text-gray-900 mb-3'>Sağlık Özeti</Text>
        <View className='bg-gradient-to-br from-green-50 to-teal-50 p-5 rounded-2xl border-2 border-green-200'>
          <View className='flex-row items-center gap-3 mb-4'>
            <View className='w-14 h-14 bg-green-500 rounded-full items-center justify-center'>
              <Ionicons name='heart' size={28} color='white' />
            </View>
            <View className='flex-1'>
              <Text className='text-lg font-bold text-green-900'>Mükemmel Sağlık</Text>
              <Text className='text-sm text-green-700'>Tüm testler başarılı</Text>
            </View>
          </View>
          <View className='flex-row gap-2'>
            <View className='flex-1 bg-white/50 p-3 rounded-xl'>
              <Text className='text-xs text-green-700 mb-1'>Aşı Durumu</Text>
              <Text className='text-sm font-bold text-green-900'>100%</Text>
            </View>
            <View className='flex-1 bg-white/50 p-3 rounded-xl'>
              <Text className='text-xs text-green-700 mb-1'>Sağlık Skoru</Text>
              <Text className='text-sm font-bold text-green-900'>A+</Text>
            </View>
            <View className='flex-1 bg-white/50 p-3 rounded-xl'>
              <Text className='text-xs text-green-700 mb-1'>Son Kontrol</Text>
              <Text className='text-sm font-bold text-green-900'>1 Ay</Text>
            </View>
          </View>
        </View>
      </View>
    </View>
  );

  const tabs = [
    { id: "info", label: "Bilgiler", icon: "information-circle" },
    { id: "pedigree", label: "Soy Ağacı", icon: "ribbon" },
    { id: "health", label: "Sağlık", icon: "heart" },
  ];

  return (
    <SafeAreaContainer>
      <StatusBar barStyle='light-content' backgroundColor='transparent' translucent />

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 100 }}>
        {/* Image Gallery Header */}
        <View className='relative'>
          <ScrollView
            horizontal
            pagingEnabled
            showsHorizontalScrollIndicator={false}
            onScroll={handleScroll}
            scrollEventThrottle={16}
            className='h-96'
          >
            {petDetails.gallery.map((image, index) => (
              <View key={index} style={{ width }} className='relative'>
                <Image source={{ uri: image }} className='w-full h-96' resizeMode='cover' />
                <LinearGradient
                  colors={["transparent", "rgba(0,0,0,0.6)"]}
                  className='absolute bottom-0 left-0 right-0 h-32'
                />
              </View>
            ))}
          </ScrollView>

          {/* Back Button */}
          <TouchableOpacity
            className='absolute top-4 left-4 w-11 h-11 bg-white rounded-full items-center justify-center shadow-lg'
            onPress={() => navigation.goBack()}
          >
            <Ionicons name='arrow-back' size={24} color='#111827' />
          </TouchableOpacity>

          {/* Availability Badge */}
          <View
            className={`absolute top-4 right-4 px-4 py-2 rounded-full shadow-lg ${
              petDetails.availability === "Müsait" ? "bg-green-500" : "bg-gray-400"
            }`}
          >
            <Text className='text-sm font-bold text-white'>{petDetails.availability}</Text>
          </View>

          {/* Image Counter */}
          <View className='absolute bottom-4 right-4 flex-row items-center bg-black/60 px-3 py-1.5 rounded-full gap-1.5'>
            <Ionicons name='images' size={16} color='white' />
            <Text className='text-sm font-semibold text-white'>
              {currentImageIndex + 1}/{petDetails.gallery.length}
            </Text>
          </View>
        </View>

        {/* Pet Info Header */}
        <View className='bg-white px-4 py-5'>
          <View className='flex-row justify-between items-start mb-4'>
            <View className='flex-1'>
              <Text className='text-3xl font-bold text-gray-900 mb-1'>{petDetails.name}</Text>
              <Text className='text-lg text-gray-600'>{petDetails.breed}</Text>
            </View>
            <LinearGradient
              colors={["#FBB03B", "#F59E0B"]}
              className='w-14 h-14 rounded-full items-center justify-center shadow-md'
            >
              <Ionicons name={petDetails.gender === "Erkek" ? "male" : "female"} size={28} color='white' />
            </LinearGradient>
          </View>

          {/* Certification Banner */}
          <View className='flex-row items-center justify-around bg-amber-50 py-4 rounded-2xl'>
            <View className='flex-row items-center gap-2'>
              <Ionicons name='ribbon' size={20} color='#F59E0B' />
              <Text className='text-sm font-semibold text-gray-800'>Pedigree</Text>
            </View>
            <View className='w-0.5 h-6 bg-amber-200' />
            <View className='flex-row items-center gap-2'>
              <Ionicons name='shield-checkmark' size={20} color='#10B981' />
              <Text className='text-sm font-semibold text-gray-800'>Aşılı</Text>
            </View>
            <View className='w-0.5 h-6 bg-amber-200' />
            <View className='flex-row items-center gap-2'>
              <Ionicons name='heart' size={20} color='#FB923C' />
              <Text className='text-sm font-semibold text-gray-800'>Sağlıklı</Text>
            </View>
          </View>
        </View>

        {/* Tabs */}
        <View className='bg-white border-b border-gray-200'>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} className='px-4'>
            <View className='flex-row gap-2 py-2'>
              {tabs.map(tab => (
                <TouchableOpacity
                  key={tab.id}
                  className={`flex-row items-center px-4 py-2.5 rounded-xl gap-2 ${
                    activeTab === tab.id ? "bg-amber-100" : "bg-transparent"
                  }`}
                  onPress={() => setActiveTab(tab.id)}
                >
                  <Ionicons name={tab.icon} size={20} color={activeTab === tab.id ? "#F59E0B" : "#6B7280"} />
                  <Text
                    className={`text-base font-semibold ${activeTab === tab.id ? "text-amber-600" : "text-gray-600"}`}
                  >
                    {tab.label}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </ScrollView>
        </View>

        {/* Tab Content */}
        {activeTab === "info" && renderInfoTab()}
        {activeTab === "pedigree" && renderPedigreeTab()}
        {activeTab === "health" && renderHealthTab()}

        <View className='h-24' />
      </ScrollView>

      {/* Bottom Action Bar */}
      <View
        className='bg-white border-t border-gray-200 px-4 shadow-2xl'
        style={{ paddingBottom: Math.max(insets.bottom, 16), paddingTop: 12 }}
      >
        <View className='flex-row items-center gap-3'>
          <TouchableOpacity className='w-14 h-14 border-2 border-amber-200 rounded-full items-center justify-center bg-white'>
            <Ionicons name='share-social-outline' size={24} color='#F59E0B' />
          </TouchableOpacity>

          <TouchableOpacity className='flex-1 h-14 rounded-2xl overflow-hidden shadow-md' activeOpacity={0.8}>
            <LinearGradient
              colors={["#FBB03B", "#F59E0B"]}
              className='flex-1 flex-row items-center justify-center gap-2'
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
            >
              <Ionicons name='chatbubble' size={20} color='white' />
              <Text className='text-lg font-bold text-white'>İletişime Geç</Text>
            </LinearGradient>
          </TouchableOpacity>

          <TouchableOpacity className='w-14 h-14 border-2 border-amber-200 rounded-full items-center justify-center bg-white'>
            <Ionicons name='heart-outline' size={24} color='#F59E0B' />
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaContainer>
  );
};

export default BreedingDetailScreen;
