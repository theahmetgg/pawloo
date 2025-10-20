import React, { useState } from "react";
import { View, Text, ScrollView, TouchableOpacity, Image, Dimensions, StatusBar } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { Ionicons } from "@expo/vector-icons";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import SafeAreaContainer from "../../components/layout/SafeAreaContainer";

const { width } = Dimensions.get("window");

const HotelCareDiscoverScreen = ({ navigation }) => {
  const insets = useSafeAreaInsets();
  const [selectedType, setSelectedType] = useState("all");
  const [favorites, setFavorites] = useState([]);

  const serviceTypes = [
    { id: "all", label: "Hepsi", icon: "apps" },
    { id: "hotel", label: "Pet Otel", icon: "business" },
    { id: "caregiver", label: "Bakıcı", icon: "person" },
    { id: "daycare", label: "Kreş", icon: "sunny" },
  ];

  const services = [
    {
      id: "1",
      name: "Pati Palace Pet Hotel",
      type: "hotel",
      rating: 4.9,
      reviewCount: 127,
      distance: "2.3 km",
      location: "İstanbul, Kadıköy",
      pricePerDay: 250,
      verified: true,
      image: "https://images.unsplash.com/photo-1548199973-03cce0bbc87b?w=800",
      features: ["Kameralı", "7/24 Veteriner", "Oyun Alanı", "Klima"],
      capacity: "Kapasite: 20 hayvan",
      availability: "Müsait",
      specialOffer: false,
    },
    {
      id: "2",
      name: "Ayşe Hanım - Ev Bakıcısı",
      type: "caregiver",
      rating: 5.0,
      reviewCount: 89,
      distance: "1.5 km",
      location: "İstanbul, Beşiktaş",
      pricePerDay: 150,
      verified: true,
      image: "https://images.unsplash.com/photo-1601758228041-f3b2795255f1?w=800",
      features: ["Evinizde", "Deneyimli", "İlaç Verebilir", "Yürüyüş"],
      capacity: "Aynı anda 2 hayvan",
      availability: "Müsait",
      specialOffer: true,
    },
    {
      id: "3",
      name: "Happy Paws Gündüz Bakım",
      type: "daycare",
      rating: 4.8,
      reviewCount: 156,
      distance: "3.8 km",
      location: "İstanbul, Şişli",
      pricePerDay: 180,
      verified: true,
      image: "https://images.unsplash.com/photo-1587300003388-59208cc962cb?w=800",
      features: ["Sosyalizasyon", "Eğitim", "Servis", "Sağlık Raporu"],
      capacity: "Kapasite: 15 hayvan",
      availability: "Doldu",
      specialOffer: false,
    },
    {
      id: "4",
      name: "Luxury Pet Resort",
      type: "hotel",
      rating: 4.7,
      reviewCount: 203,
      distance: "5.2 km",
      location: "İstanbul, Sarıyer",
      pricePerDay: 400,
      verified: true,
      image: "https://images.unsplash.com/photo-1560807707-8cc77767d783?w=800",
      features: ["VIP Odalar", "Spa", "Özel Menü", "Havuz"],
      capacity: "Kapasite: 30 hayvan",
      availability: "Müsait",
      specialOffer: true,
    },
  ];

  const toggleFavorite = serviceId => {
    setFavorites(prev => (prev.includes(serviceId) ? prev.filter(id => id !== serviceId) : [...prev, serviceId]));
  };

  const renderServiceCard = service => (
    <TouchableOpacity
      key={service.id}
      className="bg-white rounded-2xl overflow-hidden shadow-md mb-4"
      activeOpacity={0.9}
      onPress={() => navigation.navigate("HotelCareDetail", { serviceId: service.id })}
    >
      {/* Image */}
      <View className="w-full h-52 relative">
        <Image source={{ uri: service.image }} className="w-full h-full" />

        {/* Special Offer Badge */}
        {service.specialOffer && (
          <View className="absolute top-3 left-3">
            <LinearGradient
              colors={["#F59E0B", "#D97706"]}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
              className="flex-row items-center px-2.5 py-1.5 rounded-xl gap-1"
            >
              <Ionicons name="star" size={12} color="#FFF" />
              <Text className="text-xs font-bold text-white">Özel İndirim</Text>
            </LinearGradient>
          </View>
        )}

        {/* Favorite Button */}
        <TouchableOpacity
          className="absolute top-3 right-3 w-9 h-9 rounded-full bg-black/30 items-center justify-center"
          onPress={() => toggleFavorite(service.id)}
        >
          <Ionicons
            name={favorites.includes(service.id) ? "heart" : "heart-outline"}
            size={22}
            color={favorites.includes(service.id) ? "#EF4444" : "#FFF"}
          />
        </TouchableOpacity>

        {/* Availability Badge */}
        <View
          className={`absolute bottom-3 right-3 flex-row items-center px-2.5 py-1.5 rounded-xl gap-1 ${
            service.availability === "Doldu" ? "bg-red-500" : "bg-green-500"
          }`}
        >
          <View className="w-1.5 h-1.5 rounded-full bg-white" />
          <Text className="text-xs font-semibold text-white">{service.availability}</Text>
        </View>
      </View>

      <View className="p-3">
        {/* Header Row */}
        <View className="mb-2">
          <View className="flex-row items-center gap-1.5">
            <Text className="text-xl font-bold text-gray-800 flex-1" numberOfLines={1}>
              {service.name}
            </Text>
            {service.verified && <Ionicons name="checkmark-circle" size={18} color="#3B82F6" />}
          </View>
        </View>

        {/* Rating & Distance */}
        <View className="flex-row items-center justify-between mb-2">
          <View className="flex-row items-center gap-1">
            <Ionicons name="star" size={16} color="#F59E0B" />
            <Text className="text-base font-semibold text-gray-800">{service.rating}</Text>
            <Text className="text-sm text-gray-500">({service.reviewCount})</Text>
          </View>
          <View className="flex-row items-center gap-1">
            <Ionicons name="location" size={14} color="#6B7280" />
            <Text className="text-sm text-gray-500">{service.distance}</Text>
          </View>
        </View>

        {/* Features */}
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          className="mb-2"
          contentContainerStyle={{ gap: 4 }}
        >
          {service.features.map((feature, index) => (
            <View key={index} className="bg-blue-50 px-2 py-1.5 rounded-lg">
              <Text className="text-xs text-blue-500 font-medium">{feature}</Text>
            </View>
          ))}
        </ScrollView>

        {/* Capacity */}
        <View className="flex-row items-center gap-1.5 mb-3">
          <Ionicons name="people-outline" size={14} color="#6B7280" />
          <Text className="text-sm text-gray-500">{service.capacity}</Text>
        </View>

        {/* Price & Book Button */}
        <View className="flex-row items-center justify-between">
          <View className="flex-row items-baseline gap-1">
            <Text className="text-2xl font-bold text-blue-500">₺{service.pricePerDay}</Text>
            <Text className="text-sm text-gray-500">/gün</Text>
          </View>
          <TouchableOpacity
            className="rounded-xl overflow-hidden"
            onPress={() => navigation.navigate("HotelCareDetail", { serviceId: service.id })}
          >
            <LinearGradient
              colors={["#3B82F6", "#2563EB"]}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
              className="flex-row items-center px-3 py-2 gap-1.5"
            >
              <Text className="text-sm font-bold text-white">Rezervasyon</Text>
              <Ionicons name="arrow-forward" size={16} color="#FFF" />
            </LinearGradient>
          </TouchableOpacity>
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaContainer edges={['top', 'right', 'left']} className="flex-1 bg-slate-50">
      <StatusBar barStyle="light-content" backgroundColor="transparent" translucent />

      {/* Header */}
      <LinearGradient
        colors={["#3B82F6", "#2563EB"]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
        className="px-4 pb-4"
      >
        <View className="flex-row justify-between items-center mb-3">
          <View className="mt-8">
            <Text className="text-3xl font-bold text-white">Hotel & Bakıcı</Text>
            <Text className="text-base text-white/90 mt-1">Güvenilir bakım hizmeti</Text>
          </View>
          <TouchableOpacity className="w-11 h-11 rounded-full bg-white/20 items-center justify-center">
            <Ionicons name="options-outline" size={24} color="#FFF" />
          </TouchableOpacity>
        </View>

        {/* Search Bar */}
        <View className="flex-row items-center bg-white rounded-xl px-3 py-2 gap-2">
          <Ionicons name="search" size={20} color="#6B7280" />
          <Text className="flex-1 text-base text-gray-500">Konum veya hizmet ara...</Text>
          <TouchableOpacity>
            <Ionicons name="mic-outline" size={20} color="#6B7280" />
          </TouchableOpacity>
        </View>
      </LinearGradient>

      {/* Service Types */}
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        className="max-h-[60px] mt-3"
        contentContainerStyle={{ paddingHorizontal: 16, paddingVertical: 8, gap: 8 }}
      >
        {serviceTypes.map(type => (
          <TouchableOpacity
            key={type.id}
            className={`flex-row items-center px-4 py-2 rounded-full mr-2 border ${
              selectedType === type.id
                ? "bg-blue-500 border-blue-500 shadow-md"
                : "bg-white border-gray-200"
            }`}
            onPress={() => setSelectedType(type.id)}
            activeOpacity={0.7}
          >
            <Ionicons
              name={type.icon}
              size={18}
              color={selectedType === type.id ? "#FFF" : "#3B82F6"}
            />
            <Text
              className={`text-sm font-semibold ml-1.5 ${
                selectedType === type.id ? "text-white" : "text-blue-500"
              }`}
            >
              {type.label}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      {/* Quick Stats */}
      <View className="flex-row bg-white mx-4 mt-4 rounded-2xl p-2 gap-1">
        <View className="flex-1 items-center py-2">
          <Ionicons name="business" size={20} color="#3B82F6" />
          <Text className="text-xl font-bold text-gray-800 mt-1">{services.length}</Text>
          <Text className="text-xs text-gray-500 mt-0.5">Hizmet</Text>
        </View>
        <View className="flex-1 items-center py-2">
          <Ionicons name="star" size={20} color="#F59E0B" />
          <Text className="text-xl font-bold text-gray-800 mt-1">4.8</Text>
          <Text className="text-xs text-gray-500 mt-0.5">Ort. Puan</Text>
        </View>
        <View className="flex-1 items-center py-2">
          <Ionicons name="checkmark-circle" size={20} color="#10B981" />
          <Text className="text-xl font-bold text-gray-800 mt-1">
            {services.filter(s => s.availability === "Müsait").length}
          </Text>
          <Text className="text-xs text-gray-500 mt-0.5">Müsait</Text>
        </View>
      </View>

      {/* Services List */}
      <ScrollView
        className="flex-1"
        contentContainerStyle={{ padding: 16, paddingBottom: 100 }}
        showsVerticalScrollIndicator={false}
      >
        {services.map(renderServiceCard)}
      </ScrollView>
    </SafeAreaContainer>
  );
};

export default HotelCareDiscoverScreen;
