import React, { useState } from "react";
import { View, Text, ScrollView, Image, TouchableOpacity, StatusBar, Dimensions } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { SearchBar } from "../../components/common";
import SafeAreaContainer from "../../components/layout/SafeAreaContainer";

const { width } = Dimensions.get("window");

// Mock data
const mockBreedingPets = [
  {
    id: 1,
    name: "Luna",
    breed: "Golden Retriever",
    type: "Köpek",
    gender: "Dişi",
    age: 3,
    city: "İstanbul",
    image: "https://images.unsplash.com/photo-1633722715463-d30f4f325e24?w=400",
    pedigree: true,
    vaccinated: true,
    healthCheck: true,
    owner: "Ayşe Yılmaz",
    ownerVerified: true,
    availability: "Müsait",
  },
  {
    id: 2,
    name: "Max",
    breed: "British Shorthair",
    type: "Kedi",
    gender: "Erkek",
    age: 2,
    city: "Ankara",
    image: "https://images.unsplash.com/photo-1574158622682-e40e69881006?w=400",
    pedigree: true,
    vaccinated: true,
    healthCheck: true,
    owner: "Mehmet Demir",
    ownerVerified: true,
    availability: "Müsait",
  },
  {
    id: 3,
    name: "Bella",
    breed: "German Shepherd",
    type: "Köpek",
    gender: "Dişi",
    age: 4,
    city: "İzmir",
    image: "https://images.unsplash.com/photo-1568572933382-74d440642117?w=400",
    pedigree: true,
    vaccinated: true,
    healthCheck: true,
    owner: "Zeynep Kaya",
    ownerVerified: false,
    availability: "Rezerve",
  },
  {
    id: 4,
    name: "Rocky",
    breed: "Persian Cat",
    type: "Kedi",
    gender: "Erkek",
    age: 3,
    city: "Bursa",
    image: "https://images.unsplash.com/photo-1596854407944-bf87f6fdd49e?w=400",
    pedigree: true,
    vaccinated: true,
    healthCheck: true,
    owner: "Ali Şahin",
    ownerVerified: true,
    availability: "Müsait",
  },
];

const BreedingDiscoverScreen = ({ navigation }) => {
  const insets = useSafeAreaInsets();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedFilter, setSelectedFilter] = useState("all");

  const filterOptions = [
    { id: "all", label: "Tümü", icon: "apps" },
    { id: "dog", label: "Köpek", icon: "paw" },
    { id: "cat", label: "Kedi", icon: "heart" },
    { id: "available", label: "Müsait", icon: "checkmark-circle" },
  ];

  const renderPetCard = pet => (
    <TouchableOpacity
      key={pet.id}
      activeOpacity={0.9}
      onPress={() => navigation.navigate("BreedingDetail", { pet })}
      className='bg-white rounded-2xl mb-4 overflow-hidden shadow-md'
    >
      <View className='flex-row'>
        {/* Pet Image */}
        <View className='w-[120px] h-[160px] relative'>
          <Image source={{ uri: pet.image }} className='w-full h-full' resizeMode='cover' />

          {/* Availability Badge */}
          <View
            className={`absolute top-2 left-2 px-2 py-1 rounded-lg ${
              pet.availability === "Rezerve" ? "bg-gray-400" : "bg-green-500"
            }`}
          >
            <Text className='text-white text-xs font-bold'>{pet.availability}</Text>
          </View>

          {/* Gender Icon */}
          <View className='absolute bottom-2 left-2 w-7 h-7 rounded-full bg-black/50 items-center justify-center'>
            <Ionicons name={pet.gender === "Erkek" ? "male" : "female"} size={16} color='white' />
          </View>
        </View>

        {/* Pet Info */}
        <View className='flex-1 p-3'>
          <View className='flex-row justify-between items-start mb-1'>
            <View className='flex-row items-center gap-1 flex-1'>
              <Text className='text-xl font-bold text-gray-800'>{pet.name}</Text>
              {pet.ownerVerified && <Ionicons name='checkmark-circle' size={18} color='#FFFFFF' />}
            </View>
            <View className='bg-amber-100 px-2 py-1 rounded-lg'>
              <Text className='text-amber-800 text-xs font-semibold'>{pet.age} yaş</Text>
            </View>
          </View>

          <Text className='text-sm text-gray-500 mb-2'>{pet.breed}</Text>

          {/* Certifications */}
          <View className='flex-row flex-wrap gap-1 mb-3'>
            {pet.pedigree && (
              <View className='flex-row items-center bg-amber-50 px-2 py-1 rounded-lg gap-1'>
                <Ionicons name='ribbon' size={14} color='#D97706' />
                <Text className='text-xs text-gray-600 font-medium'>Soy Ağacı</Text>
              </View>
            )}
            {pet.vaccinated && (
              <View className='flex-row items-center bg-green-50 px-2 py-1 rounded-lg gap-1'>
                <Ionicons name='shield-checkmark' size={14} color='#10B981' />
                <Text className='text-xs text-gray-600 font-medium'>Aşılı</Text>
              </View>
            )}
            {pet.healthCheck && (
              <View className='flex-row items-center bg-pink-50 px-2 py-1 rounded-lg gap-1'>
                <Ionicons name='heart' size={14} color='#EC4899' />
                <Text className='text-xs text-gray-600 font-medium'>Sağlık</Text>
              </View>
            )}
          </View>

          {/* Footer */}
          <View className='flex-row justify-between items-center'>
            <View className='flex-row items-center gap-1'>
              <Ionicons name='location-outline' size={16} color='#6B7280' />
              <Text className='text-sm text-gray-500 font-medium'>{pet.city}</Text>
            </View>

            <TouchableOpacity className='rounded-xl overflow-hidden'>
              <LinearGradient
                colors={["#F59E0B", "#D97706"]}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
                className='flex-row items-center px-3 py-2 gap-1'
              >
                <Text className='text-white text-sm font-semibold'>İletişim</Text>
                <Ionicons name='arrow-forward' size={16} color='white' />
              </LinearGradient>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaContainer edges={['top', 'right', 'left']} className='flex-1 bg-[#FEF3E2]'>
      <StatusBar barStyle='dark-content' backgroundColor='transparent' translucent />

      {/* Header */}
      <View className='flex-row justify-between items-center px-4 pb-4'>
        <View className='mt-8'>
          <Text className='text-sm text-gray-600 font-medium'>Güvenilir Eşleştirme</Text>
          <Text className='text-3xl font-bold text-gray-800 mt-1'>Çiftleştirme</Text>
        </View>
        <View className='w-14 h-14 rounded-full overflow-hidden shadow-md'>
          <LinearGradient colors={["#F59E0B", "#D97706"]} className='flex-1 items-center justify-center'>
            <Ionicons name='ribbon' size={28} color='white' />
          </LinearGradient>
        </View>
      </View>

      {/* Statistics Banner */}
      <View className='mx-4 mb-4'>
        <LinearGradient
          colors={["#FFFFFF", "#0D9488"]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
          className='rounded-2xl p-4'
        >
          <View className='flex-row justify-around'>
            <View className='items-center'>
              <Text className='text-white text-2xl font-bold'>{mockBreedingPets.length}</Text>
              <Text className='text-white/80 text-xs mt-1'>Aktif İlan</Text>
            </View>
            <View className='w-px bg-white/30' />
            <View className='items-center'>
              <Text className='text-white text-2xl font-bold'>
                {mockBreedingPets.filter(p => p.availability === "Müsait").length}
              </Text>
              <Text className='text-white/80 text-xs mt-1'>Müsait</Text>
            </View>
            <View className='w-px bg-white/30' />
            <View className='items-center'>
              <Text className='text-white text-2xl font-bold'>
                {mockBreedingPets.filter(p => p.ownerVerified).length}
              </Text>
              <Text className='text-white/80 text-xs mt-1'>Onaylı</Text>
            </View>
          </View>
        </LinearGradient>
      </View>

      {/* Search Bar */}
      <View className='px-4 mb-3'>
        <SearchBar
          value={searchQuery}
          onChangeText={setSearchQuery}
          placeholder='Cins veya şehir ara...'
          onFilterPress={() => console.log("Filter pressed")}
        />
      </View>

      {/* Filter Chips */}
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        className='mb-6 py-2'
        contentContainerStyle={{ paddingHorizontal: 16, gap: 8 }}
      >
        {filterOptions.map(filter => {
          const active = selectedFilter === filter.id;
          return (
            <TouchableOpacity
              key={filter.id}
              onPress={() => setSelectedFilter(filter.id)}
              activeOpacity={0.7}
              className={`flex-row items-center justify-center min-h-[36px] px-4 py-2.5 rounded-full mr-2 border-2 ${
                active ? "bg-amber-500 border-amber-500 shadow-md" : "bg-white border-amber-500 shadow-sm"
              }`}
            >
              <Ionicons name={filter.icon} size={18} color={active ? "white" : "#D97706"} style={{ marginRight: 8 }} />
              <Text className={`text-sm font-semibold ${active ? "text-white" : "text-amber-800"}`}>
                {filter.label}
              </Text>
            </TouchableOpacity>
          );
        })}
      </ScrollView>

      {/* Info Banner */}
      <View className='flex-row items-center bg-white mx-4 mb-4 px-4 py-3 rounded-2xl gap-2 border-l-4 border-teal-500 shadow-sm'>
        <Ionicons name='information-circle' size={20} color='#FFFFFF' />
        <Text className='flex-1 text-sm text-gray-800 font-medium'>
          Tüm hayvanlar veteriner kontrolünden geçmiştir
        </Text>
      </View>

      {/* Pet Cards */}
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingHorizontal: 16, paddingBottom: 100 }}
      >
        {mockBreedingPets.map(pet => renderPetCard(pet))}
      </ScrollView>
    </SafeAreaContainer>
  );
};

export default BreedingDiscoverScreen;
