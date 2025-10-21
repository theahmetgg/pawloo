import React, { useState } from "react";
import { View, Text, ScrollView, Image, TouchableOpacity, Dimensions, Pressable } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { LinearGradient } from "expo-linear-gradient";

const { width } = Dimensions.get("window");

// Mock data
const mockSalons = [
  {
    id: 1,
    name: "Pati Güzellik Salonu",
    address: "Merkez Mah. 123",
    city: "İstanbul",
    image: "https://images.unsplash.com/photo-1548199973-03cce0bbc87b?w=400",
    verified: true,
    rating: 4.9,
    haircut: true,
    spa: true,
    bath: true,
    status: "Müsait",
  },
  {
    id: 2,
    name: "Pet Spa & Grooming",
    address: "Atatürk Cad. 456",
    city: "Ankara",
    image: "https://images.unsplash.com/photo-1560807707-8cc77767d783?w=400",
    verified: true,
    rating: 5.0,
    haircut: true,
    spa: true,
    bath: true,
    status: "Müsait",
  },
  {
    id: 3,
    name: "Happy Paws Kuaför",
    address: "Cumhuriyet Sok. 789",
    city: "İzmir",
    image: "https://images.unsplash.com/photo-1587300003388-59208cc962cb?w=400",
    verified: false,
    rating: 4.7,
    haircut: true,
    spa: false,
    bath: true,
    status: "Dolu",
  },
  {
    id: 4,
    name: "Luxury Pet Care",
    address: "Bahçe Cad. 321",
    city: "Bursa",
    image: "https://images.unsplash.com/photo-1601758228041-f3b2795255f1?w=400",
    verified: true,
    rating: 4.8,
    haircut: true,
    spa: true,
    bath: true,
    status: "Müsait",
  },
];

const PetGroomingDiscoverScreen = ({ navigation }) => {
  const insets = useSafeAreaInsets();
  const [selectedFilter, setSelectedFilter] = useState("all");

  const filterOptions = [
    { id: "all", label: "Tümü", icon: "apps" },
    { id: "haircut", label: "Tıraş", icon: "cut" },
    { id: "spa", label: "Spa", icon: "sparkles" },
    { id: "bath", label: "Banyo", icon: "water" },
  ];

  const cardWidth = (width - 48) / 2;

  const renderSalonCard = salon => (
    <TouchableOpacity
      key={salon.id}
      activeOpacity={0.9}
      onPress={() => navigation.navigate("PetGroomingDetail", { salon })}
      className='bg-white rounded-2xl mb-4 shadow-md overflow-hidden'
      style={{ width: cardWidth }}
    >
      {/* Salon Image */}
      <View className='relative' style={{ height: cardWidth * 1.2 }}>
        <Image source={{ uri: salon.image }} className='w-full h-full' />

        {/* Gradient Overlay */}
        <LinearGradient
          colors={["transparent", "rgba(0,0,0,0.7)"]}
          className='absolute bottom-0 left-0 right-0 h-2/5'
        />

        {/* Status Badge */}
        <View
          className={`absolute top-2 right-2 px-2 py-1 rounded-lg ${
            salon.status === "Dolu" ? "bg-gray-400" : "bg-green-500"
          }`}
        >
          <Text className='text-white text-[10px] font-bold'>{salon.status}</Text>
        </View>

        {/* Rating Badge */}
        <View className='absolute bottom-2 right-2 px-2 py-1 rounded-full bg-black/50 flex-row items-center gap-1'>
          <Ionicons name='star' size={12} color='#FFF' />
          <Text className='text-white text-[10px] font-bold'>{salon.rating}</Text>
        </View>
      </View>

      {/* Card Content */}
      <View className='p-3'>
        {/* Salon Name & Verified */}
        <View className='flex-row items-center mb-1 gap-1'>
          <Text className='text-base font-bold text-gray-800 flex-1' numberOfLines={1}>
            {salon.name}
          </Text>
          {salon.verified && <Ionicons name='checkmark-circle' size={16} color='#14B8A6' />}
        </View>

        {/* Address */}
        <Text className='text-xs text-gray-500 mb-2' numberOfLines={1}>
          {salon.address}
        </Text>

        {/* Info Row */}
        <View className='flex-row items-center mb-2 gap-2'>
          <View className='bg-cyan-100 px-2 py-1 rounded-md'>
            <Text className='text-[10px] font-semibold text-cyan-700'>{salon.rating} ★</Text>
          </View>
          <View className='flex-1 flex-row items-center gap-1'>
            <Ionicons name='location' size={12} color='#6B7280' />
            <Text className='text-[11px] text-gray-500 flex-1' numberOfLines={1}>
              {salon.city}
            </Text>
          </View>
        </View>

        {/* Badges */}
        <View className='flex-row gap-1'>
          {salon.haircut && (
            <View className='w-5 h-5 rounded-full bg-cyan-100 items-center justify-center'>
              <Ionicons name='cut' size={10} color='#06B6D4' />
            </View>
          )}
          {salon.spa && (
            <View className='w-5 h-5 rounded-full bg-purple-100 items-center justify-center'>
              <Ionicons name='sparkles' size={10} color='#8B5CF6' />
            </View>
          )}
          {salon.bath && (
            <View className='w-5 h-5 rounded-full bg-blue-100 items-center justify-center'>
              <Ionicons name='water' size={10} color='#3B82F6' />
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
          <Text className='text-xs text-gray-500 font-medium'>Profesyonel Bakım</Text>
          <Text className='text-2xl font-bold text-gray-800 mt-0.5'>Pet Kuaför</Text>
        </View>

        <View className='w-12 h-12 rounded-full overflow-hidden shadow-lg'>
          <LinearGradient colors={["#06B6D4", "#0891B2"]} className='flex-1 items-center justify-center'>
            <Ionicons name='cut' size={24} color='#FFF' />
          </LinearGradient>
        </View>
      </View>

      {/* Stats Banner */}
      <View className='mx-5 mb-5 rounded-2xl overflow-hidden shadow-md'>
        <LinearGradient colors={["#06B6D4", "#0891B2"]} start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }} className='p-5'>
          <View className='flex-row justify-around'>
            <View className='items-center'>
              <Text className='text-white text-3xl font-bold'>{mockSalons.length}</Text>
              <Text className='text-white/90 text-xs mt-1'>Aktif Salon</Text>
            </View>
            <View className='w-px bg-white/30' />
            <View className='items-center'>
              <Text className='text-white text-3xl font-bold'>
                {mockSalons.filter(s => s.status === "Müsait").length}
              </Text>
              <Text className='text-white/90 text-xs mt-1'>Müsait</Text>
            </View>
            <View className='w-px bg-white/30' />
            <View className='items-center'>
              <Text className='text-white text-3xl font-bold'>{mockSalons.filter(s => s.verified).length}</Text>
              <Text className='text-white/90 text-xs mt-1'>Uzman</Text>
            </View>
          </View>
        </LinearGradient>
      </View>

      {/* Search Bar */}
      <View className='flex-row px-5 mb-4 gap-3'>
        <View className='flex-1 flex-row items-center bg-gray-50 rounded-xl px-4 py-3.5 gap-3'>
          <Ionicons name='search' size={20} color='#9CA3AF' />
          <Text className='text-sm text-gray-400'>Hizmet veya bölge ara...</Text>
        </View>
        <TouchableOpacity className='w-12 h-12 rounded-xl bg-cyan-500 items-center justify-center shadow-md'>
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
                color: active ? "rgba(255,255,255,0.15)" : "rgba(6,182,212,0.10)",
                borderless: false,
              }}
              className={[
                "flex-row items-center rounded-full px-4",
                "min-h-[36px] mr-1.5 border",
                active ? "bg-cyan-500 border-cyan-500" : "bg-cyan-50 border-cyan-200",
              ].join(" ")}
              style={({ pressed }) => [
                { opacity: pressed ? 0.9 : 1 },
                active && {
                  shadowColor: "#06B6D4",
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
                color={active ? "#FFFFFF" : "#0891B2"}
                style={{ marginRight: 6 }}
              />
              <Text
                className={["text-[13px] font-semibold", active ? "text-white" : "text-cyan-700"].join(" ")}
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
          Tüm kuaförler sertifikalı ve hijyenik ekipman kullanır
        </Text>
      </View>

      {/* Salon Cards Grid */}
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingHorizontal: 20, paddingBottom: 120 + insets.bottom }}
      >
        <View className='flex-row flex-wrap justify-between'>{mockSalons.map(salon => renderSalonCard(salon))}</View>
      </ScrollView>
    </View>
  );
};

export default PetGroomingDiscoverScreen;
