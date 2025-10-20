// src/screens/HomeScreen.js
import React from "react";
import { View, Text, ScrollView, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import SafeAreaContainer from "../components/layout/SafeAreaContainer";

const HomeScreen = ({ navigation }) => {
  const quickFilters = [
    {
      id: 1,
      title: "Oyun Arkadaşı",
      description: "Patili dostun için oyun arkadaşı bul.",
      icon: "paw",
      bgColor: "bg-purple-200",
      iconColor: "#9333EA",
      route: "PlayMate",
      count: 124,
    },
    {
      id: 2,
      title: "Çiftleştirme",
      description: "Ailenizi genişletmek için eş arayın.",
      icon: "heart",
      bgColor: "bg-pink-200",
      iconColor: "#DB2777",
      route: "Breeding",
      count: 48,
    },
    {
      id: 3,
      title: "Sahiplen",
      description: "Yeni bir dost edin, hayat kurtar.",
      icon: "home",
      bgColor: "bg-cyan-200",
      iconColor: "#0891B2",
      route: "Adoption",
      count: 76,
    },
  ];

  const featuredServices = [
    {
      id: 1,
      title: "Otel",
      icon: "bed",
      bgColor: "bg-amber-100",
      iconColor: "#D97706",
      rating: 4.7,
      route: "HotelCare",
    },
    {
      id: 2,
      title: "Veteriner",
      icon: "medical",
      bgColor: "bg-blue-100",
      iconColor: "#2563EB",
      rating: 4.9,
      route: "Veterinary",
    },
    {
      id: 3,
      title: "Kuaför",
      icon: "cut",
      bgColor: "bg-purple-100",
      iconColor: "#9333EA",
      rating: 4.5,
      route: "PetGrooming",
    },
  ];

  const renderHeader = () => (
    <View className='flex-row items-center px-4 py-12 gap-2'>
      <View className='flex-1 flex-row items-center bg-gray-100 rounded-full px-4 py-3 gap-2'>
        <Ionicons name='search-outline' size={20} color='#2DD4BF' />
        <Text className='text-base text-gray-400'>Ara...</Text>
      </View>
      <TouchableOpacity className='flex-row items-center bg-primary rounded-full px-4 py-3 gap-1'>
        <Ionicons name='location' size={16} color='#FFF' />
        <Text className='text-sm text-white font-semibold'>İstanbul, 5 km</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <SafeAreaContainer edges={['top', 'right', 'left']} className='flex-1 bg-gray-50'>
      {renderHeader()}
      <ScrollView
        className='flex-1'
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 100 }}
      >
        {/* Main Title */}
        <Text className='text-xl font-bold text-gray-900 px-4 pt-4 pb-3'>Mevcut İlan Dağılımı</Text>

        {/* Stats Cards */}
        <View className='px-4 gap-3'>
          {quickFilters.map(item => (
            <TouchableOpacity
              key={item.id}
              className={`${item.bgColor} rounded-2xl p-4 shadow-md`}
              onPress={() => navigation.navigate(item.route)}
              activeOpacity={0.8}
            >
              <Text className='text-2xl font-bold text-gray-900 mb-1'>{item.title}</Text>
              <Text className='text-sm text-gray-700 mb-3'>
                Bölgende toplam ilan: <Text className='text-lg font-bold text-gray-900'>{item.count}</Text>
              </Text>

              {/* Bar Chart */}
              <View className='bg-white/50 rounded-xl p-2 gap-1'>
                <View className='flex-row items-center gap-2'>
                  <View
                    className='h-6 rounded-md'
                    style={{ width: "70%", backgroundColor: item.iconColor, opacity: 0.8 }}
                  />
                  <Text className='text-xs font-bold min-w-[35px]' style={{ color: item.iconColor }}>
                    70%
                  </Text>
                </View>
                <View className='flex-row items-center gap-2'>
                  <View
                    className='h-6 rounded-md'
                    style={{ width: "50%", backgroundColor: item.iconColor, opacity: 0.6 }}
                  />
                  <Text className='text-xs font-bold min-w-[35px]' style={{ color: item.iconColor }}>
                    50%
                  </Text>
                </View>
                <View className='flex-row items-center gap-2'>
                  <View
                    className='h-6 rounded-md'
                    style={{ width: "30%", backgroundColor: item.iconColor, opacity: 0.9 }}
                  />
                  <Text className='text-xs font-bold min-w-[35px]' style={{ color: item.iconColor }}>
                    30%
                  </Text>
                </View>
              </View>
            </TouchableOpacity>
          ))}
        </View>

        {/* Quick Filters Title */}
        <Text className='text-xl font-bold text-gray-900 px-4 pt-4 pb-3'>Hızlı Filtreler</Text>

        {/* Quick Filter Cards */}
        <View className='px-4 gap-3'>
          {quickFilters.map(item => (
            <TouchableOpacity
              key={`filter-${item.id}`}
              className={`${item.bgColor} rounded-2xl p-4 flex-row items-center justify-between shadow-md`}
              onPress={() => navigation.navigate(item.route)}
              activeOpacity={0.8}
            >
              <View className='flex-1'>
                <Text className='text-xl font-bold text-gray-900 mb-1'>{item.title}</Text>
                <Text className='text-sm text-gray-700'>{item.description}</Text>
              </View>
              <View
                className='w-14 h-14 rounded-2xl justify-center items-center ml-4'
                style={{ backgroundColor: item.iconColor }}
              >
                <Ionicons name={item.icon} size={28} color='#FFF' />
              </View>
            </TouchableOpacity>
          ))}
        </View>

        {/* Featured Services Title */}
        <Text className='text-xl font-bold text-gray-900 px-4 pt-4 pb-3'>Öne Çıkan Hizmetler</Text>

        {/* Featured Services Grid */}
        <View className='flex-row px-4 gap-3'>
          {featuredServices.map(service => (
            <TouchableOpacity
              key={service.id}
              className={`flex-1 ${service.bgColor} rounded-2xl p-4 items-center justify-center aspect-square shadow-md`}
              onPress={() => navigation.navigate(service.route)}
              activeOpacity={0.8}
            >
              <View
                className='w-16 h-16 rounded-2xl justify-center items-center mb-2'
                style={{ backgroundColor: service.iconColor }}
              >
                <Ionicons name={service.icon} size={32} color='#FFF' />
              </View>
              <Text className='text-base font-bold text-gray-900 text-center'>{service.title}</Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Service Details Title */}
        <Text className='text-xl font-bold text-gray-900 px-4 pt-4 pb-3'>Hizmet Detayları</Text>

        {/* Service Detail Cards */}
        <View className='px-4 gap-2'>
          {featuredServices.map(service => (
            <TouchableOpacity
              key={`detail-${service.id}`}
              className={`flex-row items-center ${service.bgColor} rounded-2xl p-3 gap-3 shadow-md`}
              onPress={() => navigation.navigate(service.route)}
              activeOpacity={0.8}
            >
              <View
                className='w-14 h-14 rounded-2xl justify-center items-center'
                style={{ backgroundColor: service.iconColor }}
              >
                <Ionicons name={service.icon} size={28} color='#FFF' />
              </View>
              <View className='flex-1'>
                <Text className='text-lg font-bold text-gray-900 mb-1'>{service.title}</Text>
                <View className='flex-row items-center gap-1'>
                  <Text className='text-sm text-gray-600'>Ortalama Puan:</Text>
                  <Text className='text-base font-bold text-gray-900'>{service.rating}</Text>
                  <Ionicons name='star' size={14} color='#F59E0B' />
                </View>
              </View>
              <Ionicons name='chevron-forward' size={24} color='#9CA3AF' />
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>

      {/* Floating Action Button */}
      <TouchableOpacity
        className='absolute right-4 bottom-24 w-15 h-15 rounded-full bg-primary justify-center items-center shadow-lg'
        activeOpacity={0.8}
      >
        <Ionicons name='add' size={32} color='#FFF' />
      </TouchableOpacity>
    </SafeAreaContainer>
  );
};

export default HomeScreen;
