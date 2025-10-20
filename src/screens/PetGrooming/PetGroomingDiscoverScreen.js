import React, { useState } from "react";
import { View, Text, ScrollView, TouchableOpacity, Image, StatusBar } from "react-native";
import SafeAreaContainer from "../../components/layout/SafeAreaContainer";
import { LinearGradient } from "expo-linear-gradient";
import { Ionicons } from "@expo/vector-icons";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const PetGroomingDiscoverScreen = ({ navigation }) => {
  const insets = useSafeAreaInsets();
  const [selectedService, setSelectedService] = useState("all");
  const [favorites, setFavorites] = useState([]);

  const serviceTypes = [
    { id: "all", label: "Hepsi", icon: "apps" },
    { id: "bath", label: "Banyo", icon: "water" },
    { id: "haircut", label: "Tıraş", icon: "cut" },
    { id: "full", label: "Tam Bakım", icon: "star" },
  ];

  const groomers = [
    {
      id: "1",
      name: "Pati Güzellik Salonu",
      rating: 4.8,
      reviewCount: 156,
      distance: "1.5 km",
      location: "İstanbul, Kadıköy",
      image: "https://images.unsplash.com/photo-1548199973-03cce0bbc87b?w=800",
      packages: [
        { name: "Banyo", price: 150 },
        { name: "Tıraş", price: 200 },
        { name: "Tam Bakım", price: 350 },
      ],
      features: ["Evde Hizmet", "Doğal Ürünler", "Deneyimli Ekip"],
      mobile: true,
      verified: true,
    },
    {
      id: "2",
      name: "Pet Spa & Grooming",
      rating: 4.9,
      reviewCount: 203,
      distance: "2.8 km",
      location: "İstanbul, Beşiktaş",
      image: "https://images.unsplash.com/photo-1560807707-8cc77767d783?w=800",
      packages: [
        { name: "Lüks Banyo", price: 250 },
        { name: "Stil Tıraş", price: 300 },
        { name: "VIP Bakım", price: 500 },
      ],
      features: ["Spa", "Masaj", "Özel Şampuan"],
      mobile: false,
      verified: true,
    },
  ];

  const toggleFavorite = id => setFavorites(p => (p.includes(id) ? p.filter(x => x !== id) : [...p, id]));

  return (
    <SafeAreaContainer edges={['top', 'right', 'left']} className="flex-1 bg-pink-50">
      <StatusBar barStyle='dark-content' backgroundColor='transparent' translucent />
      <LinearGradient
        colors={["#EC4899", "#DB2777"]}
        className="px-4 pb-4"
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
      >
        <View className="flex-row justify-between items-center mb-4">
          <View>
            <Text className="text-3xl font-bold text-white mt-6">Pet Kuaför</Text>
            <Text className="text-base text-white opacity-90 mt-1">Tüy bakımı ve güzellik</Text>
          </View>
          <TouchableOpacity className="w-11 h-11 rounded-full bg-white/20 items-center justify-center">
            <Ionicons name='options-outline' size={24} color='#FFF' />
          </TouchableOpacity>
        </View>
        <View className="flex-row items-center bg-white rounded-xl px-4 py-2 gap-2">
          <Ionicons name='search' size={20} color='#6B7280' />
          <Text className="flex-1 text-base text-gray-500">Kuaför ara...</Text>
        </View>
      </LinearGradient>

      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        className="max-h-[60px] mt-4"
        contentContainerClassName="px-4 py-2 gap-2"
      >
        {serviceTypes.map(t => (
          <TouchableOpacity
            key={t.id}
            className={`flex-row items-center px-4 py-2 rounded-full mr-2 border ${
              selectedService === t.id
                ? 'bg-pink-500 border-pink-500 shadow-md'
                : 'bg-white border-gray-200'
            }`}
            onPress={() => setSelectedService(t.id)}
            activeOpacity={0.7}
          >
            <Ionicons name={t.icon} size={18} color={selectedService === t.id ? "#FFF" : "#EC4899"} />
            <Text className={`ml-1.5 text-[13px] font-semibold ${
              selectedService === t.id ? 'text-white' : 'text-pink-500'
            }`}>{t.label}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      <View className="flex-row bg-white mx-4 mt-4 rounded-2xl p-2 gap-1">
        <View className="flex-1 items-center py-2">
          <Ionicons name='cut' size={20} color='#EC4899' />
          <Text className="text-xl font-bold text-gray-900 mt-1">{groomers.length}</Text>
          <Text className="text-xs text-gray-500 mt-0.5">Kuaför</Text>
        </View>
        <View className="flex-1 items-center py-2">
          <Ionicons name='star' size={20} color='#F59E0B' />
          <Text className="text-xl font-bold text-gray-900 mt-1">4.9</Text>
          <Text className="text-xs text-gray-500 mt-0.5">Ort. Puan</Text>
        </View>
        <View className="flex-1 items-center py-2">
          <Ionicons name='home' size={20} color='#10B981' />
          <Text className="text-xl font-bold text-gray-900 mt-1">{groomers.filter(g => g.mobile).length}</Text>
          <Text className="text-xs text-gray-500 mt-0.5">Evde Hizmet</Text>
        </View>
      </View>

      <ScrollView
        className="flex-1"
        contentContainerStyle={{ paddingBottom: 100 }}
        contentContainerClassName="p-4 gap-4"
        showsVerticalScrollIndicator={false}
      >
        {groomers.map(g => (
          <TouchableOpacity
            key={g.id}
            className="bg-white rounded-2xl overflow-hidden shadow-lg"
            style={{
              shadowColor: "#000",
              shadowOffset: { width: 0, height: 2 },
              shadowOpacity: 0.1,
              shadowRadius: 8,
              elevation: 3,
            }}
            activeOpacity={0.9}
            onPress={() => navigation.navigate("PetGroomingDetail", { groomerId: g.id })}
          >
            <View className="w-full h-[180px] relative">
              <Image source={{ uri: g.image }} className="w-full h-full" />
              {g.mobile && (
                <View className="absolute top-3 left-3 flex-row items-center px-2.5 py-1.5 rounded-xl bg-green-500 gap-1">
                  <Ionicons name='home' size={14} color='#FFF' />
                  <Text className="text-xs font-bold text-white">Evde Hizmet</Text>
                </View>
              )}
              <TouchableOpacity
                className="absolute top-3 right-3 w-9 h-9 rounded-full bg-black/30 items-center justify-center"
                onPress={() => toggleFavorite(g.id)}
              >
                <Ionicons
                  name={favorites.includes(g.id) ? "heart" : "heart-outline"}
                  size={22}
                  color={favorites.includes(g.id) ? "#EF4444" : "#FFF"}
                />
              </TouchableOpacity>
            </View>

            <View className="p-4">
              <View className="flex-row items-center gap-1.5 mb-2">
                <Text className="flex-1 text-xl font-bold text-gray-900">{g.name}</Text>
                {g.verified && <Ionicons name='checkmark-circle' size={18} color='#EC4899' />}
              </View>

              <View className="flex-row justify-between mb-2">
                <View className="flex-row items-center gap-1">
                  <Ionicons name='star' size={14} color='#F59E0B' />
                  <Text className="text-sm font-semibold text-gray-900">{g.rating}</Text>
                  <Text className="text-xs text-gray-500">({g.reviewCount})</Text>
                </View>
                <View className="flex-row items-center gap-1">
                  <Ionicons name='location' size={14} color='#6B7280' />
                  <Text className="text-sm text-gray-500">{g.distance}</Text>
                </View>
              </View>

              <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                className="mb-4"
                contentContainerClassName="gap-1"
              >
                {g.features.map((f, i) => (
                  <View key={i} className="bg-pink-50 px-2 py-1.5 rounded-lg">
                    <Text className="text-xs text-pink-500 font-medium">{f}</Text>
                  </View>
                ))}
              </ScrollView>

              <Text className="text-base font-bold text-gray-900 mb-2">Hizmet Paketleri</Text>
              {g.packages.map((p, i) => (
                <View key={i} className="flex-row justify-between bg-gray-50 p-2 rounded-lg mb-1.5">
                  <Text className="text-sm text-gray-900">{p.name}</Text>
                  <Text className="text-sm font-bold text-pink-500">₺{p.price}</Text>
                </View>
              ))}

              <LinearGradient
                colors={["#EC4899", "#DB2777"]}
                className="rounded-xl overflow-hidden mt-2"
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
              >
                <TouchableOpacity
                  className="flex-row items-center justify-center py-2 gap-1.5"
                  onPress={() => navigation.navigate("PetGroomingDetail", { groomerId: g.id })}
                >
                  <Ionicons name='calendar-outline' size={18} color='#FFF' />
                  <Text className="text-sm font-bold text-white">Randevu Al</Text>
                </TouchableOpacity>
              </LinearGradient>
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </SafeAreaContainer>
  );
};

export default PetGroomingDiscoverScreen;
