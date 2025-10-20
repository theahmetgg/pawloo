import React, { useState } from "react";
import { View, Text, ScrollView, TouchableOpacity, Image, Dimensions } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { Ionicons } from "@expo/vector-icons";
import SafeAreaContainer from "../../components/layout/SafeAreaContainer";

const { width } = Dimensions.get("window");

const AdoptionDiscoverScreen = ({ navigation }) => {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [favorites, setFavorites] = useState([]);

  const categories = [
    { id: "all", label: "Hepsi", icon: "apps" },
    { id: "dog", label: "Köpek", icon: "paw" },
    { id: "cat", label: "Kedi", icon: "paw" },
    { id: "bird", label: "Kuş", icon: "paw" },
    { id: "other", label: "Diğer", icon: "ellipsis-horizontal" },
  ];

  const adoptionPets = [
    {
      id: "1",
      name: "Luna",
      type: "Kedi",
      age: "6 Ay",
      gender: "Dişi",
      location: "İstanbul, Kadıköy",
      distance: "2.5 km",
      story:
        "Sokakta bulundu, çok sevecen ve oyuncu. Karnı doyduktan sonra hemen kucağa geliyor. Yeni bir yuva arıyor.",
      urgent: true,
      healthStatus: "Aşılı, Kısırlaştırılmış",
      image: "https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?w=800",
      shelter: "Patili Dostlar Derneği",
      shelterVerified: true,
    },
    {
      id: "2",
      name: "Max",
      type: "Köpek",
      age: "2 Yaş",
      gender: "Erkek",
      location: "İstanbul, Beşiktaş",
      distance: "5.1 km",
      story: "Eski sahipleri tarafından terk edildi. Çocuklarla çok iyi anlaşıyor, eğitimli ve sadık bir arkadaş.",
      urgent: false,
      healthStatus: "Aşılı, Kuduz aşısı yapıldı",
      image: "https://images.unsplash.com/photo-1587300003388-59208cc962cb?w=800",
      shelter: "İstanbul Hayvan Barınağı",
      shelterVerified: true,
    },
    {
      id: "3",
      name: "Minnos",
      type: "Kedi",
      age: "3 Ay",
      gender: "Erkek",
      location: "İstanbul, Şişli",
      distance: "7.8 km",
      story: "Anne kedi trafik kazasında kaybedildi. 3 kardeşten biri, el alışkanlığı var. Acil yuva arıyor.",
      urgent: true,
      healthStatus: "İlk aşı yapıldı",
      image: "https://images.unsplash.com/photo-1495360010541-f48722b34f7d?w=800",
      shelter: "Patili Dostlar Derneği",
      shelterVerified: true,
    },
  ];

  const toggleFavorite = petId => {
    setFavorites(prev => (prev.includes(petId) ? prev.filter(id => id !== petId) : [...prev, petId]));
  };

  const renderPetCard = pet => (
    <TouchableOpacity
      key={pet.id}
      className="bg-white rounded-3xl overflow-hidden shadow-md mb-4"
      activeOpacity={0.9}
      onPress={() => navigation.navigate("AdoptionDetail", { petId: pet.id })}
    >
      {/* Image Container */}
      <View className="w-full h-60 relative">
        <Image source={{ uri: pet.image }} className="w-full h-full" />

        {/* Urgent Badge */}
        {pet.urgent && (
          <View className="absolute top-3 left-3">
            <LinearGradient
              colors={["#EF4444", "#DC2626"]}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
              className="flex-row items-center px-2.5 py-1.5 rounded-xl gap-1"
            >
              <Ionicons name="alert-circle" size={14} color="#FFF" />
              <Text className="text-xs font-bold text-white">ACİL</Text>
            </LinearGradient>
          </View>
        )}

        {/* Favorite Button */}
        <TouchableOpacity
          className="absolute top-3 right-3 w-10 h-10 rounded-full bg-black/30 items-center justify-center"
          onPress={() => toggleFavorite(pet.id)}
        >
          <Ionicons
            name={favorites.includes(pet.id) ? "heart" : "heart-outline"}
            size={24}
            color={favorites.includes(pet.id) ? "#EF4444" : "#FFF"}
          />
        </TouchableOpacity>

        {/* Gradient Overlay */}
        <LinearGradient
          colors={["transparent", "rgba(0,0,0,0.7)"]}
          className="absolute bottom-0 left-0 right-0 h-20"
        />
      </View>

      {/* Card Content */}
      <View className="p-3">
        {/* Header */}
        <View className="flex-row justify-between items-start mb-2">
          <View className="flex-row items-center gap-2">
            <Text className="text-2xl font-bold text-gray-800">{pet.name}</Text>
            <View
              className="w-6 h-6 rounded-full items-center justify-center"
              style={{ backgroundColor: pet.gender === "Erkek" ? "#EFF6FF" : "#FCE7F3" }}
            >
              <Ionicons
                name={pet.gender === "Erkek" ? "male" : "female"}
                size={16}
                color={pet.gender === "Erkek" ? "#60A5FA" : "#EC4899"}
              />
            </View>
          </View>
        </View>

        {/* Info Row */}
        <View className="flex-row gap-3 mb-2">
          <View className="flex-row items-center gap-1">
            <Ionicons name="paw-outline" size={14} color="#FB923C" />
            <Text className="text-sm text-gray-500">{pet.type}</Text>
          </View>
          <View className="flex-row items-center gap-1">
            <Ionicons name="calendar-outline" size={14} color="#FB923C" />
            <Text className="text-sm text-gray-500">{pet.age}</Text>
          </View>
          <View className="flex-row items-center gap-1">
            <Ionicons name="location-outline" size={14} color="#FB923C" />
            <Text className="text-sm text-gray-500">{pet.distance}</Text>
          </View>
        </View>

        {/* Story */}
        <Text className="text-base text-gray-800 leading-5 mb-2" numberOfLines={3}>
          {pet.story}
        </Text>

        {/* Health Status */}
        <View className="flex-row items-center self-start bg-green-50 px-2 py-1.5 rounded-xl gap-1 mb-2">
          <Ionicons name="medical-outline" size={14} color="#4ADE80" />
          <Text className="text-xs text-green-500 font-medium">{pet.healthStatus}</Text>
        </View>

        {/* Shelter Info */}
        <View className="mb-3">
          <View className="flex-row items-center gap-1.5">
            <Ionicons name="home-outline" size={14} color="#6B7280" />
            <Text className="text-sm text-gray-500">{pet.shelter}</Text>
            {pet.shelterVerified && <Ionicons name="checkmark-circle" size={14} color="#4ADE80" />}
          </View>
        </View>

        {/* Action Button */}
        <TouchableOpacity
          className="rounded-xl overflow-hidden"
          onPress={() => navigation.navigate("AdoptionDetail", { petId: pet.id })}
        >
          <LinearGradient
            colors={["#FB923C", "#F97316"]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            className="flex-row items-center justify-center py-3 gap-2"
          >
            <Ionicons name="heart-circle" size={20} color="#FFF" />
            <Text className="text-base font-bold text-white">Sahiplen</Text>
          </LinearGradient>
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );

  const renderHeader = () => (
    <LinearGradient
      colors={["#FB923C", "#F97316"]}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 0 }}
      className="px-4 pb-4 rounded-b-3xl"
    >
      <View className="flex-row justify-between items-center">
        <View>
          <Text className="text-3xl font-bold text-white">Sahiplenme</Text>
          <Text className="text-base text-white/90 mt-1">Bir can dost arıyor</Text>
        </View>
        <TouchableOpacity className="w-11 h-11 rounded-full bg-white/20 items-center justify-center">
          <Ionicons name="options-outline" size={24} color="#FFF" />
        </TouchableOpacity>
      </View>
    </LinearGradient>
  );

  return (
    <SafeAreaContainer edges={['top', 'right', 'left']} className='flex-1 bg-orange-50'>
      {renderHeader()}

      {/* Categories */}
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        className="max-h-[60px] mt-3"
        contentContainerStyle={{ paddingHorizontal: 16, paddingVertical: 8, gap: 8 }}
      >
        {categories.map(category => (
          <TouchableOpacity
            key={category.id}
            className={`flex-row items-center px-4 py-2 rounded-full mr-2 border ${
              selectedCategory === category.id
                ? "bg-orange-500 border-orange-500 shadow-md"
                : "bg-white border-gray-200"
            }`}
            onPress={() => setSelectedCategory(category.id)}
            activeOpacity={0.7}
          >
            <Ionicons
              name={category.icon}
              size={18}
              color={selectedCategory === category.id ? "#FFF" : "#FB923C"}
            />
            <Text
              className={`text-sm font-semibold ml-1.5 ${
                selectedCategory === category.id ? "text-white" : "text-orange-500"
              }`}
            >
              {category.label}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      {/* Stats Row */}
      <View className="flex-row bg-white mx-4 mt-4 rounded-2xl p-3 items-center justify-around">
        <View className="items-center flex-1">
          <Text className="text-2xl font-bold text-orange-500">{adoptionPets.length}</Text>
          <Text className="text-xs text-gray-500 mt-1">Sahiplenme Bekliyor</Text>
        </View>
        <View className="w-px h-8 bg-gray-200" />
        <View className="items-center flex-1">
          <Text className="text-2xl font-bold text-orange-500">
            {adoptionPets.filter(p => p.urgent).length}
          </Text>
          <Text className="text-xs text-gray-500 mt-1">Acil Durum</Text>
        </View>
      </View>

      {/* Pet List */}
      <ScrollView
        className="flex-1"
        contentContainerStyle={{ padding: 16, paddingBottom: 100 }}
        showsVerticalScrollIndicator={false}
      >
        {adoptionPets.map(renderPetCard)}
      </ScrollView>
    </SafeAreaContainer>
  );
};

export default AdoptionDiscoverScreen;
