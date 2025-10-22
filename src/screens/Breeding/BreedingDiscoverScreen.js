import React, { useState } from "react";
import { View, Text, ScrollView, Image, TouchableOpacity, Dimensions, Pressable } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { LinearGradient } from "expo-linear-gradient";

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
  const [selectedFilter, setSelectedFilter] = useState("all");

  const filterOptions = [
    { id: "all", label: "Tümü", icon: "apps" },
    { id: "dog", label: "Köpek", icon: "paw" },
    { id: "cat", label: "Kedi", icon: "heart" },
    { id: "available", label: "Müsait", icon: "checkmark-circle" },
  ];

  const cardWidth = (width - 48) / 2;

  const renderPetCard = pet => (
    <TouchableOpacity
      key={pet.id}
      activeOpacity={0.9}
      onPress={() => navigation.navigate("BreedingDetail", { pet })}
      className='bg-white rounded-2xl mb-4 shadow-md overflow-hidden'
      style={{ width: cardWidth }}
    >
      {/* Pet Image */}
      <View className='relative' style={{ height: cardWidth * 1.2 }}>
        <Image source={{ uri: pet.image }} className='w-full h-full' />

        {/* Gradient Overlay */}
        <LinearGradient
          colors={["transparent", "rgba(0,0,0,0.7)"]}
          className='absolute bottom-0 left-0 right-0 h-2/5'
        />

        {/* Availability Badge */}
        <View
          className={`absolute top-2 right-2 px-2 py-1 rounded-lg ${
            pet.availability === "Rezerve" ? "bg-gray-400" : "bg-green-500"
          }`}
        >
          <Text className='text-white text-[10px] font-bold'>{pet.availability}</Text>
        </View>

        {/* Gender Badge */}
        <View className='absolute bottom-2 right-2 w-7 h-7 rounded-full bg-black/50 items-center justify-center'>
          <Ionicons name={pet.gender === "Erkek" ? "male" : "female"} size={16} color='#FFF' />
        </View>
      </View>

      {/* Card Content */}
      <View className='p-3'>
        {/* Pet Name & Verified */}
        <View className='flex-row items-center mb-1 gap-1'>
          <Text className='text-base font-bold text-gray-800 flex-1' numberOfLines={1}>
            {pet.name}
          </Text>
          {pet.ownerVerified && <Ionicons name='checkmark-circle' size={16} color='#14B8A6' />}
        </View>

        {/* Breed */}
        <Text className='text-xs text-gray-500 mb-2' numberOfLines={1}>
          {pet.breed}
        </Text>

        {/* Info Row */}
        <View className='flex-row items-center mb-2 gap-2'>
          <View className='bg-amber-100 px-2 py-1 rounded-md'>
            <Text className='text-[10px] font-semibold text-amber-700'>{pet.age} yaş</Text>
          </View>
          <View className='flex-1 flex-row items-center gap-1'>
            <Ionicons name='location' size={12} color='#6B7280' />
            <Text className='text-[11px] text-gray-500 flex-1' numberOfLines={1}>
              {pet.city}
            </Text>
          </View>
        </View>

        {/* Badges */}
        <View className='flex-row gap-1'>
          {pet.pedigree && (
            <View className='w-5 h-5 rounded-full bg-amber-100 items-center justify-center'>
              <Ionicons name='ribbon' size={10} color='#D97706' />
            </View>
          )}
          {pet.vaccinated && (
            <View className='w-5 h-5 rounded-full bg-green-100 items-center justify-center'>
              <Ionicons name='shield-checkmark' size={10} color='#10B981' />
            </View>
          )}
          {pet.healthCheck && (
            <View className='w-5 h-5 rounded-full bg-pink-100 items-center justify-center'>
              <Ionicons name='heart' size={10} color='#EC4899' />
            </View>
          )}
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <View className='flex-1 bg-white/5' style={{ paddingTop: insets.top, paddingBottom: insets.bottom }}>
      {/* Header */}
      <View className='flex-row items-center px-5 pt-12 pb-4 gap-3'>
        <TouchableOpacity
          className='w-10 h-10 rounded-xl bg-gray-100 items-center justify-center'
          onPress={() => navigation.goBack()}
        >
          <Ionicons name='arrow-back' size={24} color='#111827' />
        </TouchableOpacity>

        <View className='flex-1'>
          <Text className='text-xs text-gray-500 font-medium'>Güvenilir Eşleştirme</Text>
          <Text className='text-2xl font-bold text-gray-800 mt-0.5'>Çiftleştirme</Text>
        </View>

        <View className='w-12 h-12 rounded-full overflow-hidden shadow-lg'>
          <LinearGradient colors={["#F43F5E", "#DB2777"]} className='flex-1 items-center justify-center'>
            <Ionicons name='heart' size={24} color='#FFF' />
          </LinearGradient>
        </View>
      </View>

      {/* Stats Banner */}
      <View className='mx-5 mb-5 rounded-2xl overflow-hidden shadow-md'>
        <LinearGradient colors={["#F43F5E", "#DB2777"]} start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }} className='p-5'>
          <View className='flex-row justify-around'>
            <View className='items-center'>
              <Text className='text-white text-3xl font-bold'>{mockBreedingPets.length}</Text>
              <Text className='text-white/90 text-xs mt-1'>Aktif İlan</Text>
            </View>
            <View className='w-px bg-white/30' />
            <View className='items-center'>
              <Text className='text-white text-3xl font-bold'>
                {mockBreedingPets.filter(p => p.availability === "Müsait").length}
              </Text>
              <Text className='text-white/90 text-xs mt-1'>Müsait</Text>
            </View>
            <View className='w-px bg-white/30' />
            <View className='items-center'>
              <Text className='text-white text-3xl font-bold'>
                {mockBreedingPets.filter(p => p.ownerVerified).length}
              </Text>
              <Text className='text-white/90 text-xs mt-1'>Onaylı</Text>
            </View>
          </View>
        </LinearGradient>
      </View>

      {/* Search Bar */}
      <View className='flex-row px-5 mb-4 gap-3'>
        <View className='flex-1 flex-row items-center bg-gray-50 rounded-xl px-4 py-3.5 gap-3'>
          <Ionicons name='search' size={20} color='#9CA3AF' />
          <Text className='text-sm text-gray-400'>Cins veya şehir ara...</Text>
        </View>
        <TouchableOpacity className='w-12 h-12 rounded-xl bg-rose-500 items-center justify-center shadow-md'>
          <Ionicons name='options' size={20} color='#FFF' />
        </TouchableOpacity>
      </View>

      {/* Filter Chips */}
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        className='mb-4 py-4'
        style={{ height: 94 }} // chip’lerin altı görünür olsun
        contentContainerStyle={{
          paddingHorizontal: 16,
          columnGap: 10,
          alignItems: "center", // dikey hizala (clip’i önler)
          paddingBottom: 2,
        }}
      >
        {filterOptions.map(filter => {
          const active = selectedFilter === filter.id;
          return (
            <Pressable
              key={filter.id}
              onPress={() => setSelectedFilter(filter.id)}
              android_ripple={{
                color: active ? "rgba(255,255,255,0.15)" : "rgba(244,63,94,0.10)",
                borderless: false,
              }}
              className={[
                "flex-row items-center rounded-full px-4",
                "min-h-[36px] mr-1.5 border",
                active ? "bg-rose-500 border-rose-500" : "bg-rose-50 border-rose-200",
              ].join(" ")}
              style={({ pressed }) => [
                { opacity: pressed ? 0.9 : 1 },
                active && {
                  // soft glow (iOS) + elevation (Android)
                  shadowColor: "#f43f5e",
                  shadowOpacity: 0.25,
                  shadowRadius: 12,
                  shadowOffset: { width: 0, height: 6 },
                  elevation: 3,
                },
              ]}
              hitSlop={6}
            >
              <Ionicons
                name={filter.icon}
                size={16}
                color={active ? "#FFFFFF" : "#BE185D"}
                style={{ marginRight: 6 }}
              />
              <Text
                className={["text-[13px] font-semibold", active ? "text-white" : "text-rose-700"].join(" ")}
                numberOfLines={1}
              >
                {filter.label}
              </Text>
            </Pressable>
          );
        })}
      </ScrollView>

      {/* Info Banner */}
      <View className='flex-row items-center bg-teal-50 mx-5 mb-5 p-3 rounded-xl gap-2 border-l-4 border-teal-500'>
        <Ionicons name='information-circle' size={20} color='#14B8A6' />
        <Text className='flex-1 text-xs text-teal-900 font-medium'>
          Tüm hayvanlar veteriner kontrolünden geçmiştir
        </Text>
      </View>

      {/* Pet Cards Grid */}
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingHorizontal: 20, paddingBottom: 120 + insets.bottom }}
      >
        <View className='flex-row flex-wrap justify-between'>{mockBreedingPets.map(pet => renderPetCard(pet))}</View>
      </ScrollView>
    </View>
  );
};

export default BreedingDiscoverScreen;
