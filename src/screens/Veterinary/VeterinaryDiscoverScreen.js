import React, { useState } from "react";
import { View, Text, ScrollView, Image, TouchableOpacity, Dimensions, Pressable } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { LinearGradient } from "expo-linear-gradient";

const { width } = Dimensions.get("window");

// Mock data
const mockClinics = [
  {
    id: 1,
    name: "Pati Veteriner Kliniği",
    address: "Merkez Mah. 123",
    city: "İstanbul",
    image: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=400",
    verified: true,
    rating: 4.9,
    emergency247: true,
    cardiology: true,
    orthopedics: true,
    surgery: true,
    status: "Açık",
  },
  {
    id: 2,
    name: "VetPlus Hastanesi",
    address: "Atatürk Cad. 456",
    city: "Ankara",
    image: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=400",
    verified: true,
    rating: 5.0,
    emergency247: true,
    cardiology: true,
    orthopedics: false,
    surgery: true,
    status: "Açık",
  },
  {
    id: 3,
    name: "Pet Care Klinik",
    address: "Cumhuriyet Sok. 789",
    city: "İzmir",
    image: "https://images.unsplash.com/photo-1594824476967-48c8b964273f?w=400",
    verified: false,
    rating: 4.7,
    emergency247: false,
    cardiology: true,
    orthopedics: true,
    surgery: false,
    status: "Kapalı",
  },
  {
    id: 4,
    name: "Animal Hospital",
    address: "Bahçe Cad. 321",
    city: "Bursa",
    image: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=400",
    verified: true,
    rating: 4.8,
    emergency247: true,
    cardiology: true,
    orthopedics: true,
    surgery: true,
    status: "Açık",
  },
];

const VeterinaryDiscoverScreen = ({ navigation }) => {
  const insets = useSafeAreaInsets();
  const [selectedFilter, setSelectedFilter] = useState("all");

  const filterOptions = [
    { id: "all", label: "Tümü", icon: "apps" },
    { id: "emergency", label: "7/24", icon: "medical" },
    { id: "cardiology", label: "Kardiyoloji", icon: "heart" },
    { id: "surgery", label: "Cerrahi", icon: "cut" },
  ];

  const cardWidth = (width - 48) / 2;

  const renderClinicCard = clinic => (
    <TouchableOpacity
      key={clinic.id}
      activeOpacity={0.9}
      onPress={() => navigation.navigate("VeterinaryDetail", { clinic })}
      className='bg-white rounded-2xl mb-4 shadow-md overflow-hidden'
      style={{ width: cardWidth }}
    >
      {/* Clinic Image */}
      <View className='relative' style={{ height: cardWidth * 1.2 }}>
        <Image source={{ uri: clinic.image }} className='w-full h-full' />

        {/* Gradient Overlay */}
        <LinearGradient
          colors={["transparent", "rgba(0,0,0,0.7)"]}
          className='absolute bottom-0 left-0 right-0 h-2/5'
        />

        {/* Status Badge */}
        <View
          className={`absolute top-2 right-2 px-2 py-1 rounded-lg ${
            clinic.status === "Kapalı" ? "bg-gray-400" : "bg-green-500"
          }`}
        >
          <Text className='text-white text-[10px] font-bold'>{clinic.status}</Text>
        </View>

        {/* Rating Badge */}
        <View className='absolute bottom-2 right-2 px-2 py-1 rounded-full bg-black/50 flex-row items-center gap-1'>
          <Ionicons name='star' size={12} color='#FFF' />
          <Text className='text-white text-[10px] font-bold'>{clinic.rating}</Text>
        </View>
      </View>

      {/* Card Content */}
      <View className='p-3'>
        {/* Clinic Name & Verified */}
        <View className='flex-row items-center mb-1 gap-1'>
          <Text className='text-base font-bold text-gray-800 flex-1' numberOfLines={1}>
            {clinic.name}
          </Text>
          {clinic.verified && <Ionicons name='checkmark-circle' size={16} color='#14B8A6' />}
        </View>

        {/* Address */}
        <Text className='text-xs text-gray-500 mb-2' numberOfLines={1}>
          {clinic.address}
        </Text>

        {/* Info Row */}
        <View className='flex-row items-center mb-2 gap-2'>
          <View className='bg-blue-100 px-2 py-1 rounded-md'>
            <Text className='text-[10px] font-semibold text-blue-700'>{clinic.emergency247 ? "7/24" : "Randevu"}</Text>
          </View>
          <View className='flex-1 flex-row items-center gap-1'>
            <Ionicons name='location' size={12} color='#6B7280' />
            <Text className='text-[11px] text-gray-500 flex-1' numberOfLines={1}>
              {clinic.city}
            </Text>
          </View>
        </View>

        {/* Badges */}
        <View className='flex-row gap-1'>
          {clinic.cardiology && (
            <View className='w-5 h-5 rounded-full bg-blue-100 items-center justify-center'>
              <Ionicons name='heart' size={10} color='#3B82F6' />
            </View>
          )}
          {clinic.orthopedics && (
            <View className='w-5 h-5 rounded-full bg-amber-100 items-center justify-center'>
              <Ionicons name='fitness' size={10} color='#F59E0B' />
            </View>
          )}
          {clinic.surgery && (
            <View className='w-5 h-5 rounded-full bg-green-100 items-center justify-center'>
              <Ionicons name='cut' size={10} color='#10B981' />
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
          <Text className='text-xs text-gray-500 font-medium'>Sağlık Hizmetleri</Text>
          <Text className='text-2xl font-bold text-gray-800 mt-0.5'>Veteriner</Text>
        </View>

        <View className='w-12 h-12 rounded-full overflow-hidden shadow-lg'>
          <LinearGradient colors={["#3B82F6", "#2563EB"]} className='flex-1 items-center justify-center'>
            <Ionicons name='medical' size={24} color='#FFF' />
          </LinearGradient>
        </View>
      </View>

      {/* Stats Banner */}
      <View className='mx-5 mb-5 rounded-2xl overflow-hidden shadow-md'>
        <LinearGradient colors={["#3B82F6", "#2563EB"]} start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }} className='p-5'>
          <View className='flex-row justify-around'>
            <View className='items-center'>
              <Text className='text-white text-3xl font-bold'>{mockClinics.length}</Text>
              <Text className='text-white/90 text-xs mt-1'>Aktif Klinik</Text>
            </View>
            <View className='w-px bg-white/30' />
            <View className='items-center'>
              <Text className='text-white text-3xl font-bold'>{mockClinics.filter(c => c.emergency247).length}</Text>
              <Text className='text-white/90 text-xs mt-1'>7/24 Açık</Text>
            </View>
            <View className='w-px bg-white/30' />
            <View className='items-center'>
              <Text className='text-white text-3xl font-bold'>{mockClinics.filter(c => c.verified).length}</Text>
              <Text className='text-white/90 text-xs mt-1'>Uzman</Text>
            </View>
          </View>
        </LinearGradient>
      </View>

      {/* Search Bar */}
      <View className='flex-row px-5 mb-4 gap-3'>
        <View className='flex-1 flex-row items-center bg-gray-50 rounded-xl px-4 py-3.5 gap-3'>
          <Ionicons name='search' size={20} color='#9CA3AF' />
          <Text className='text-sm text-gray-400'>Bölge veya hizmet ara...</Text>
        </View>
        <TouchableOpacity className='w-12 h-12 rounded-xl bg-blue-500 items-center justify-center shadow-md'>
          <Ionicons name='options' size={20} color='#FFF' />
        </TouchableOpacity>
      </View>

      {/* Filter Chips */}
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        className='mb-4 py-4'
        style={{ height: 74 }}
        contentContainerStyle={{
          paddingHorizontal: 16,
          columnGap: 10,
          alignItems: "center",
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
                color: active ? "rgba(255,255,255,0.15)" : "rgba(59,130,246,0.10)",
                borderless: false,
              }}
              className={[
                "flex-row items-center rounded-full px-4",
                "min-h-[36px] mr-1.5 border",
                active ? "bg-blue-500 border-blue-500" : "bg-blue-50 border-blue-200",
              ].join(" ")}
              style={({ pressed }) => [
                { opacity: pressed ? 0.9 : 1 },
                active && {
                  shadowColor: "#3B82F6",
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
                color={active ? "#FFFFFF" : "#2563EB"}
                style={{ marginRight: 6 }}
              />
              <Text
                className={["text-[13px] font-semibold", active ? "text-white" : "text-blue-700"].join(" ")}
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
          Tüm veterinerler lisanslı ve acil müdahale sertifikalıdır
        </Text>
      </View>

      {/* Clinic Cards Grid */}
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingHorizontal: 20, paddingBottom: 120 + insets.bottom }}
      >
        <View className='flex-row flex-wrap justify-between'>
          {mockClinics.map(clinic => renderClinicCard(clinic))}
        </View>
      </ScrollView>
    </View>
  );
};

export default VeterinaryDiscoverScreen;
