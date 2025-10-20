// src/screens/PlayMate/PlayMateDiscoverScreen.js
import React, { useState } from "react";
import { View, Text, ScrollView, Image, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { SearchBar, Card, StatusBadge } from "../../components/common";
import SafeAreaContainer from "../../components/layout/SafeAreaContainer";

// Mock data
const mockPlayMates = [
  {
    id: 1,
    name: "Max",
    type: "Köpek",
    breed: "Golden Retriever",
    age: 3,
    distance: "0.5 km",
    status: "Müsait",
    image: "https://images.unsplash.com/photo-1633722715463-d30f4f325e24?w=400",
    owner: "Ahmet Yılmaz",
    ownerVerified: true,
  },
  {
    id: 2,
    name: "Luna",
    type: "Kedi",
    breed: "Scottish Fold",
    age: 2,
    distance: "1.2 km",
    status: "Müsait",
    image: "https://images.unsplash.com/photo-1574158622682-e40e69881006?w=400",
    owner: "Zeynep Demir",
    ownerVerified: true,
  },
  {
    id: 3,
    name: "Rocky",
    type: "Köpek",
    breed: "German Shepherd",
    age: 4,
    distance: "2.1 km",
    status: "Meşgul",
    image: "https://images.unsplash.com/photo-1568572933382-74d440642117?w=400",
    owner: "Mehmet Kaya",
    ownerVerified: false,
  },
  {
    id: 4,
    name: "Bella",
    type: "Kedi",
    breed: "British Shorthair",
    age: 1,
    distance: "0.8 km",
    status: "Müsait",
    image: "https://images.unsplash.com/photo-1596854407944-bf87f6fdd49e?w=400",
    owner: "Ayşe Şahin",
    ownerVerified: true,
  },
];

const PlayMateDiscoverScreen = ({ navigation }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [favorites, setFavorites] = useState([]);

  const toggleFavorite = id => {
    setFavorites(prev => (prev.includes(id) ? prev.filter(fav => fav !== id) : [...prev, id]));
  };

  const renderPetCard = pet => (
    <TouchableOpacity key={pet.id} activeOpacity={0.9} onPress={() => navigation.navigate("PlayMateDetail", { pet })}>
      <Card style={{ overflow: "hidden" }} padding='none'>
        <View className='w-full h-80 relative'>
          <Image source={{ uri: pet.image }} className='w-full h-full' style={{ resizeMode: "cover" }} />
          <LinearGradient
            colors={["transparent", "rgba(0,0,0,0.7)"]}
            className='absolute bottom-0 left-0 right-0 h-3/5'
          />

          {/* Favorite Button */}
          <TouchableOpacity
            className='absolute top-4 right-4 w-10 h-10 rounded-full bg-black/30 items-center justify-center'
            onPress={() => toggleFavorite(pet.id)}
          >
            <Ionicons
              name={favorites.includes(pet.id) ? "heart" : "heart-outline"}
              size={24}
              color={favorites.includes(pet.id) ? "#EC4899" : "#FFF"}
            />
          </TouchableOpacity>

          {/* Status Badge */}
          <View className='absolute top-4 left-4'>
            <StatusBadge status={pet.status} size='small' />
          </View>

          {/* Pet Info Overlay */}
          <View className='absolute bottom-4 left-4 right-4'>
            <View className='flex-row items-center mb-1'>
              <Text className='text-2xl font-bold text-white mr-2'>{pet.name}</Text>
              <View className='px-2 py-1 rounded-md bg-white/20'>
                <Text className='text-xs font-semibold text-white'>{pet.age} yaş</Text>
              </View>
            </View>
            <Text className='text-base text-white mb-2 opacity-90'>{pet.breed}</Text>
            <View className='flex-row items-center justify-between'>
              <View className='flex-row items-center gap-1'>
                <Ionicons name='location' size={16} color='#FFF' />
                <Text className='text-sm text-white font-medium'>{pet.distance}</Text>
              </View>
              {pet.ownerVerified && (
                <View className='flex-row items-center px-2 py-1 rounded-full bg-white gap-1'>
                  <Ionicons name='checkmark-circle' size={16} color='#D97706' />
                  <Text className='text-xs font-semibold text-amber-600'>Doğrulanmış</Text>
                </View>
              )}
            </View>
          </View>
        </View>

        {/* Action Buttons */}
        <View className='flex-row p-4 gap-2'>
          <TouchableOpacity className='flex-1 rounded-xl overflow-hidden'>
            <LinearGradient
              colors={["#D97706", "#B45309"]}
              className='flex-row items-center justify-center py-4 gap-2'
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
            >
              <Ionicons name='game-controller' size={20} color='#FFF' />
              <Text className='text-base font-semibold text-white'>Oyun Talebi</Text>
            </LinearGradient>
          </TouchableOpacity>

          <TouchableOpacity className='w-12 h-12 rounded-xl border-2 border-amber-600 items-center justify-center bg-white'>
            <Ionicons name='chatbubble-outline' size={20} color='#D97706' />
          </TouchableOpacity>
        </View>
      </Card>
    </TouchableOpacity>
  );

  const filterChips = [
    { label: "Tümü", icon: "apps", active: true },
    { label: "Köpek", icon: "paw" },
    { label: "Kedi", icon: "heart" },
    { label: "Yakınımdaki", icon: "location" },
  ];

  return (
    <SafeAreaContainer edges={['top', 'right', 'left']} className='flex-1 bg-white'>
      {/* Header */}
      <View className='flex-row justify-between items-center px-4 pb-4 pt-12'>
        <View>
          <Text className='text-base text-gray-700'>Merhaba!</Text>
          <Text className='text-2xl font-bold text-gray-900 mt-1'>Oyun Arkadaşı Bul</Text>
        </View>
        <View className='w-12 h-12 rounded-2xl bg-white items-center justify-center shadow-sm'>
          <Ionicons name='paw' size={32} color='#D97706' />
        </View>
      </View>

      {/* Search Bar */}
      <View className='px-4 mb-2'>
        <SearchBar
          value={searchQuery}
          onChangeText={setSearchQuery}
          placeholder='İsim veya tür ara...'
          onFilterPress={() => console.log("Filter pressed")}
        />
      </View>

      {/* Filter Chips */}
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        className='mb-3 py-2'
        contentContainerClassName='px-4 gap-2 items-center'
      >
        {filterChips.map((chip, index) => (
          <TouchableOpacity
            key={index}
            activeOpacity={0.7}
            className={`flex-row items-center justify-center min-h-[36px] px-4 py-2.5 rounded-full mr-2 border-[1.5px] shadow-sm ${
              chip.active ? "bg-amber-600 border-amber-600 shadow-md" : "bg-white border-amber-600"
            }`}
          >
            <Ionicons name={chip.icon} size={18} color={chip.active ? "#FFF" : "#D97706"} style={{ marginRight: 8 }} />
            <Text
              className={`text-[14px] font-semibold leading-[18px] ${chip.active ? "text-white" : "text-amber-600"}`}
            >
              {chip.label}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      {/* Pet Cards */}
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 100 }} contentContainerClassName='px-4'>
        <View className='gap-4'>{mockPlayMates.map(renderPetCard)}</View>
      </ScrollView>
    </SafeAreaContainer>
  );
};

export default PlayMateDiscoverScreen;
