import React, { useState } from "react";
import {
  View,
  Text,
  ScrollView,
  Image,
  TouchableOpacity,
  Dimensions,
  Pressable,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { LinearGradient } from "expo-linear-gradient";

const { width } = Dimensions.get("window");

// Mock data
const mockPlayMates = [
  {
    id: 1,
    name: "Max",
    type: "Köpek",
    breed: "Golden Retriever",
    age: 3,
    city: "İstanbul",
    distance: "0.5 km",
    status: "Müsait",
    image: "https://images.unsplash.com/photo-1633722715463-d30f4f325e24?w=400",
    owner: "Ahmet Yılmaz",
    ownerVerified: true,
    energyLevel: "Yüksek",
    friendly: true,
    vaccinated: true,
  },
  {
    id: 2,
    name: "Luna",
    type: "Kedi",
    breed: "Scottish Fold",
    age: 2,
    city: "Ankara",
    distance: "1.2 km",
    status: "Müsait",
    image: "https://images.unsplash.com/photo-1574158622682-e40e69881006?w=400",
    owner: "Zeynep Demir",
    ownerVerified: true,
    energyLevel: "Orta",
    friendly: true,
    vaccinated: true,
  },
  {
    id: 3,
    name: "Rocky",
    type: "Köpek",
    breed: "German Shepherd",
    age: 4,
    city: "İzmir",
    distance: "2.1 km",
    status: "Meşgul",
    image: "https://images.unsplash.com/photo-1568572933382-74d440642117?w=400",
    owner: "Mehmet Kaya",
    ownerVerified: false,
    energyLevel: "Çok Yüksek",
    friendly: true,
    vaccinated: true,
  },
  {
    id: 4,
    name: "Bella",
    type: "Kedi",
    breed: "British Shorthair",
    age: 1,
    city: "Bursa",
    distance: "3.5 km",
    status: "Müsait",
    image: "https://images.unsplash.com/photo-1596854407944-bf87f6fdd49e?w=400",
    owner: "Ayşe Şahin",
    ownerVerified: true,
    energyLevel: "Düşük",
    friendly: true,
    vaccinated: true,
  },
];

const PlayMateDiscoverScreen = ({ navigation }) => {
  const insets = useSafeAreaInsets();
  const [selectedFilter, setSelectedFilter] = useState("all");

  const filterOptions = [
    { id: "all", label: "Tümü", icon: "apps" },
    { id: "dog", label: "Köpek", icon: "paw" },
    { id: "cat", label: "Kedi", icon: "heart" },
    { id: "available", label: "Müsait", icon: "checkmark-circle" },
  ];

  const cardWidth = (width - 48) / 2;

  const renderPetCard = (pet) => (
    <TouchableOpacity
      key={pet.id}
      activeOpacity={0.9}
      onPress={() => navigation.navigate("PlayMateDetail", { pet })}
      className="bg-white rounded-2xl mb-4 shadow-md overflow-hidden"
      style={{ width: cardWidth }}
    >
      {/* Pet Image */}
      <View className="relative" style={{ height: cardWidth * 1.2 }}>
        <Image source={{ uri: pet.image }} className="w-full h-full" />

        {/* Gradient Overlay */}
        <LinearGradient
          colors={["transparent", "rgba(0,0,0,0.7)"]}
          className="absolute bottom-0 left-0 right-0 h-2/5"
        />

        {/* Status Badge */}
        <View
          className={`absolute top-2 right-2 px-2 py-1 rounded-lg ${
            pet.status === "Meşgul" ? "bg-gray-400" : "bg-green-500"
          }`}
        >
          <Text className="text-white text-[10px] font-bold">{pet.status}</Text>
        </View>

        {/* Distance Badge */}
        <View className="absolute bottom-2 right-2 px-2 py-1 rounded-full bg-black/50 flex-row items-center gap-1">
          <Ionicons name="navigate" size={12} color="#FFF" />
          <Text className="text-white text-[10px] font-bold">{pet.distance}</Text>
        </View>
      </View>

      {/* Card Content */}
      <View className="p-3">
        {/* Pet Name & Verified */}
        <View className="flex-row items-center mb-1 gap-1">
          <Text className="text-base font-bold text-gray-800 flex-1" numberOfLines={1}>
            {pet.name}
          </Text>
          {pet.ownerVerified && (
            <Ionicons name="checkmark-circle" size={16} color="#14B8A6" />
          )}
        </View>

        {/* Breed */}
        <Text className="text-xs text-gray-500 mb-2" numberOfLines={1}>
          {pet.breed}
        </Text>

        {/* Info Row */}
        <View className="flex-row items-center mb-2 gap-2">
          <View className="bg-teal-100 px-2 py-1 rounded-md">
            <Text className="text-[10px] font-semibold text-teal-700">{pet.age} yaş</Text>
          </View>
          <View className="flex-1 flex-row items-center gap-1">
            <Ionicons name="location" size={12} color="#6B7280" />
            <Text className="text-[11px] text-gray-500 flex-1" numberOfLines={1}>
              {pet.city}
            </Text>
          </View>
        </View>

        {/* Badges */}
        <View className="flex-row gap-1">
          {pet.friendly && (
            <View className="w-5 h-5 rounded-full bg-teal-100 items-center justify-center">
              <Ionicons name="happy" size={10} color="#14B8A6" />
            </View>
          )}
          {pet.vaccinated && (
            <View className="w-5 h-5 rounded-full bg-green-100 items-center justify-center">
              <Ionicons name="shield-checkmark" size={10} color="#10B981" />
            </View>
          )}
          {pet.energyLevel && (
            <View className="w-5 h-5 rounded-full bg-amber-100 items-center justify-center">
              <Ionicons name="flash" size={10} color="#F59E0B" />
            </View>
          )}
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <View className="flex-1 bg-white/5" style={{ paddingTop: insets.top, paddingBottom: insets.bottom }}>
      {/* Header */}
      <View className="flex-row items-center px-5 pt-12 pb-4 gap-3">
        <TouchableOpacity
          className="w-10 h-10 rounded-xl bg-gray-100 items-center justify-center"
          onPress={() => navigation.goBack()}
        >
          <Ionicons name="arrow-back" size={24} color="#111827" />
        </TouchableOpacity>

        <View className="flex-1">
          <Text className="text-xs text-gray-500 font-medium">Yakınındaki Dostlar</Text>
          <Text className="text-2xl font-bold text-gray-800 mt-0.5">Oyun Arkadaşı</Text>
        </View>

        <View className="w-12 h-12 rounded-full overflow-hidden shadow-lg">
          <LinearGradient colors={["#14B8A6", "#0D9488"]} className="flex-1 items-center justify-center">
            <Ionicons name="paw" size={24} color="#FFF" />
          </LinearGradient>
        </View>
      </View>

      {/* Stats Banner */}
      <View className="mx-5 mb-5 rounded-2xl overflow-hidden shadow-md">
        <LinearGradient colors={["#14B8A6", "#0D9488"]} start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }} className="p-5">
          <View className="flex-row justify-around">
            <View className="items-center">
              <Text className="text-white text-3xl font-bold">{mockPlayMates.length}</Text>
              <Text className="text-white/90 text-xs mt-1">Aktif Üye</Text>
            </View>
            <View className="w-px bg-white/30" />
            <View className="items-center">
              <Text className="text-white text-3xl font-bold">
                {mockPlayMates.filter((p) => p.status === "Müsait").length}
              </Text>
              <Text className="text-white/90 text-xs mt-1">Müsait</Text>
            </View>
            <View className="w-px bg-white/30" />
            <View className="items-center">
              <Text className="text-white text-3xl font-bold">
                {mockPlayMates.filter((p) => p.ownerVerified).length}
              </Text>
              <Text className="text-white/90 text-xs mt-1">Onaylı</Text>
            </View>
          </View>
        </LinearGradient>
      </View>

      {/* Search Bar */}
      <View className="flex-row px-5 mb-4 gap-3">
        <View className="flex-1 flex-row items-center bg-gray-50 rounded-xl px-4 py-3.5 gap-3">
          <Ionicons name="search" size={20} color="#9CA3AF" />
          <Text className="text-sm text-gray-400">Cins veya mesafe ara...</Text>
        </View>
        <TouchableOpacity className="w-12 h-12 rounded-xl bg-teal-500 items-center justify-center shadow-md">
          <Ionicons name="options" size={20} color="#FFF" />
        </TouchableOpacity>
      </View>

      {/* Filter Chips */}
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        className="mb-4 py-4"
        style={{ height: 64 }}
        contentContainerStyle={{
          paddingHorizontal: 16,
          columnGap: 10,
          alignItems: "center",
          paddingBottom: 2,
        }}
      >
        {filterOptions.map((filter) => {
          const active = selectedFilter === filter.id;
          return (
            <Pressable
              key={filter.id}
              onPress={() => setSelectedFilter(filter.id)}
              android_ripple={{
                color: active ? "rgba(255,255,255,0.15)" : "rgba(20,184,166,0.10)",
                borderless: false,
              }}
              className={[
                "flex-row items-center rounded-full px-4",
                "min-h-[36px] mr-1.5 border",
                active ? "bg-teal-500 border-teal-500" : "bg-teal-50 border-teal-200",
              ].join(" ")}
              style={({ pressed }) => [
                { opacity: pressed ? 0.9 : 1 },
                active && {
                  shadowColor: "#14B8A6",
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
                color={active ? "#FFFFFF" : "#0F766E"}
                style={{ marginRight: 6 }}
              />
              <Text
                className={["text-[13px] font-semibold", active ? "text-white" : "text-teal-700"].join(" ")}
                numberOfLines={1}
              >
                {filter.label}
              </Text>
            </Pressable>
          );
        })}
      </ScrollView>

      {/* Info Banner */}
      <View className="flex-row items-center bg-teal-50 mx-5 mb-5 p-3 rounded-xl gap-2 border-l-4 border-teal-500">
        <Ionicons name="information-circle" size={20} color="#14B8A6" />
        <Text className="flex-1 text-xs text-teal-900 font-medium">
          Tüm evcil hayvanlar aşılı ve sosyalleşme eğitimi almıştır
        </Text>
      </View>

      {/* Pet Cards Grid */}
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingHorizontal: 20, paddingBottom: 120 + insets.bottom }}
      >
        <View className="flex-row flex-wrap justify-between">{mockPlayMates.map((pet) => renderPetCard(pet))}</View>
      </ScrollView>
    </View>
  );
};

export default PlayMateDiscoverScreen;
