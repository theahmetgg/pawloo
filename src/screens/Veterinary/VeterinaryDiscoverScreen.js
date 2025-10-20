import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Image,
  Dimensions,
} from 'react-native';
import SafeAreaContainer from '../../components/layout/SafeAreaContainer';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';

const { width } = Dimensions.get('window');

const VeterinaryDiscoverScreen = ({ navigation }) => {
  const [selectedSpecialty, setSelectedSpecialty] = useState('all');
  const [favorites, setFavorites] = useState([]);

  const specialties = [
    { id: 'all', label: 'Hepsi', icon: 'apps' },
    { id: 'general', label: 'Genel', icon: 'medical' },
    { id: 'surgery', label: 'Cerrahi', icon: 'cut' },
    { id: 'dental', label: 'Diş', icon: 'fitness' },
    { id: 'emergency', label: 'Acil', icon: 'alert-circle' },
  ];

  const veterinarians = [
    {
      id: '1',
      name: 'Dr. Ayşe Yılmaz',
      title: 'Veteriner Hekim',
      specialty: ['Genel Muayene', 'Cerrahi', 'Diş Sağlığı'],
      rating: 4.9,
      reviewCount: 234,
      experience: '15 yıl',
      distance: '1.2 km',
      clinic: 'Pati Veteriner Kliniği',
      address: 'İstanbul, Kadıköy',
      image: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=800',
      available: true,
      nextAvailable: '14:00',
      price: 300,
      verified: true,
      languages: ['Türkçe', 'İngilizce'],
    },
    {
      id: '2',
      name: 'Dr. Mehmet Demir',
      title: 'Veteriner Cerrahi Uzmanı',
      specialty: ['Ortopedi', 'Yumuşak Doku Cerrahisi', 'Acil Cerrahi'],
      rating: 5.0,
      reviewCount: 189,
      experience: '20 yıl',
      distance: '2.8 km',
      clinic: 'VetPlus Hayvan Hastanesi',
      address: 'İstanbul, Beşiktaş',
      image: 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=800',
      available: false,
      nextAvailable: 'Yarın 09:00',
      price: 500,
      verified: true,
      languages: ['Türkçe'],
    },
    {
      id: '3',
      name: 'Dr. Zeynep Kaya',
      title: 'Veteriner İç Hastalıklar Uzmanı',
      specialty: ['İç Hastalıklar', 'Kardiyoloji', 'Nefroloji'],
      rating: 4.8,
      reviewCount: 156,
      experience: '12 yıl',
      distance: '3.5 km',
      clinic: 'Pet Care Veteriner',
      address: 'İstanbul, Şişli',
      image: 'https://images.unsplash.com/photo-1594824476967-48c8b964273f?w=800',
      available: true,
      nextAvailable: '16:30',
      price: 350,
      verified: true,
      languages: ['Türkçe', 'İngilizce', 'Almanca'],
    },
  ];

  const toggleFavorite = (vetId) => {
    setFavorites(prev =>
      prev.includes(vetId)
        ? prev.filter(id => id !== vetId)
        : [...prev, vetId]
    );
  };

  const renderVetCard = (vet) => (
    <TouchableOpacity
      key={vet.id}
      className="bg-white rounded-2xl overflow-hidden shadow-md"
      activeOpacity={0.9}
      onPress={() => navigation.navigate('VeterinaryDetail', { vetId: vet.id })}
    >
      <View className="relative">
        <Image source={{ uri: vet.image }} className="w-full h-[140px]" />

        {/* Verified Badge */}
        {vet.verified && (
          <View className="absolute top-3 left-3 w-8 h-8 rounded-full bg-white items-center justify-center">
            <Ionicons name="checkmark-circle" size={20} color="#10B981" />
          </View>
        )}

        {/* Favorite Button */}
        <TouchableOpacity
          className="absolute top-3 right-3 w-8 h-8 rounded-full bg-white items-center justify-center"
          onPress={() => toggleFavorite(vet.id)}
        >
          <Ionicons
            name={favorites.includes(vet.id) ? 'heart' : 'heart-outline'}
            size={20}
            color={favorites.includes(vet.id) ? '#EF4444' : '#6B7280'}
          />
        </TouchableOpacity>
      </View>

      <View className="p-4">
        {/* Name & Title */}
        <Text className="text-xl font-bold text-gray-900 mb-1">{vet.name}</Text>
        <Text className="text-sm text-green-500 font-semibold mb-2">{vet.title}</Text>

        {/* Rating & Experience */}
        <View className="flex-row gap-4 mb-2">
          <View className="flex-row items-center gap-1">
            <Ionicons name="star" size={14} color="#F59E0B" />
            <Text className="text-sm font-semibold text-gray-900">{vet.rating}</Text>
            <Text className="text-xs text-gray-500">({vet.reviewCount})</Text>
          </View>
          <View className="flex-row items-center gap-1">
            <Ionicons name="briefcase-outline" size={14} color="#10B981" />
            <Text className="text-sm text-gray-500">{vet.experience}</Text>
          </View>
        </View>

        {/* Specialties */}
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          className="mb-2"
          contentContainerStyle={{ gap: 4 }}
        >
          {vet.specialty.map((spec, index) => (
            <View key={index} className="bg-green-50 px-2 py-1.5 rounded-lg">
              <Text className="text-xs text-green-500 font-medium">{spec}</Text>
            </View>
          ))}
        </ScrollView>

        {/* Clinic Info */}
        <View className="flex-row items-center gap-1.5 mb-1">
          <Ionicons name="business-outline" size={14} color="#6B7280" />
          <Text className="text-sm text-gray-900 font-medium">{vet.clinic}</Text>
        </View>

        <View className="flex-row items-center gap-1.5 mb-4">
          <Ionicons name="location-outline" size={14} color="#6B7280" />
          <Text className="text-xs text-gray-500">{vet.address} • {vet.distance}</Text>
        </View>

        {/* Availability & Price */}
        <View className="flex-row items-center justify-between mb-2">
          <View className="flex-row items-center gap-1.5">
            <View className={`w-2 h-2 rounded-full ${vet.available ? 'bg-green-500' : 'bg-red-500'}`} />
            <Text className="text-sm text-gray-900">
              {vet.available ? `Bugün ${vet.nextAvailable}` : vet.nextAvailable}
            </Text>
          </View>
          <View className="bg-green-50 px-2 py-1.5 rounded-lg">
            <Text className="text-base font-bold text-green-500">₺{vet.price}</Text>
          </View>
        </View>

        {/* Book Button */}
        <LinearGradient
          colors={['#10B981', '#059669']}
          className="rounded-[10px] overflow-hidden"
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
        >
          <TouchableOpacity
            className="flex-row items-center justify-center py-2 gap-1.5"
            onPress={() => navigation.navigate('VeterinaryDetail', { vetId: vet.id })}
          >
            <Ionicons name="calendar-outline" size={18} color="#FFF" />
            <Text className="text-sm font-bold text-white">Randevu Al</Text>
          </TouchableOpacity>
        </LinearGradient>
      </View>
    </TouchableOpacity>
  );

  // Header Component
  const renderHeader = () => (
    <LinearGradient
      colors={['#10B981', '#059669']}
      className="px-4 pb-4"
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 0 }}
    >
      <View className="flex-row justify-between items-center mb-4">
        <View>
          <Text className="text-3xl font-bold text-white">Veteriner Hekim</Text>
          <Text className="text-base text-white opacity-90 mt-1">Uzman sağlık desteği</Text>
        </View>
        <TouchableOpacity className="w-11 h-11 rounded-full bg-red-500 items-center justify-center">
          <Ionicons name="call" size={24} color="#FFF" />
        </TouchableOpacity>
      </View>

      {/* Search Bar */}
      <View className="flex-row items-center bg-white rounded-xl px-4 py-2 gap-2">
        <Ionicons name="search" size={20} color="#6B7280" />
        <Text className="flex-1 text-base text-gray-500">Veteriner veya klinik ara...</Text>
        <TouchableOpacity>
          <Ionicons name="options-outline" size={20} color="#6B7280" />
        </TouchableOpacity>
      </View>
    </LinearGradient>
  );

  return (
    <SafeAreaContainer edges={['top', 'right', 'left']} className='flex-1 bg-green-50'>
      {renderHeader()}

      {/* Specialties Filter */}
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        className="max-h-[60px] mt-4"
        contentContainerStyle={{ paddingHorizontal: 16, paddingVertical: 8, gap: 8 }}
      >
        {specialties.map((specialty) => (
          <TouchableOpacity
            key={specialty.id}
            className={`flex-row items-center px-4 py-2 rounded-full mr-2 border ${
              selectedSpecialty === specialty.id
                ? 'bg-green-500 border-green-500 shadow-md'
                : 'bg-white border-gray-200'
            }`}
            onPress={() => setSelectedSpecialty(specialty.id)}
            activeOpacity={0.7}
          >
            <Ionicons
              name={specialty.icon}
              size={18}
              color={selectedSpecialty === specialty.id ? '#FFF' : '#10B981'}
            />
            <Text
              className={`text-[13px] font-semibold ml-1.5 ${
                selectedSpecialty === specialty.id ? 'text-white' : 'text-green-500'
              }`}
            >
              {specialty.label}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      {/* Quick Stats */}
      <View className="flex-row bg-white mx-4 mt-4 rounded-2xl p-2 gap-1">
        <View className="flex-1 items-center py-2">
          <Ionicons name="people" size={20} color="#10B981" />
          <Text className="text-xl font-bold text-gray-900 mt-1">{veterinarians.length}</Text>
          <Text className="text-xs text-gray-500 mt-0.5">Hekim</Text>
        </View>
        <View className="flex-1 items-center py-2">
          <Ionicons name="star" size={20} color="#F59E0B" />
          <Text className="text-xl font-bold text-gray-900 mt-1">4.9</Text>
          <Text className="text-xs text-gray-500 mt-0.5">Ort. Puan</Text>
        </View>
        <View className="flex-1 items-center py-2">
          <Ionicons name="time" size={20} color="#3B82F6" />
          <Text className="text-xl font-bold text-gray-900 mt-1">
            {veterinarians.filter(v => v.available).length}
          </Text>
          <Text className="text-xs text-gray-500 mt-0.5">Bugün Müsait</Text>
        </View>
      </View>

      {/* Veterinarians List */}
      <ScrollView
        className="flex-1"
        contentContainerStyle={{ padding: 16, gap: 16, paddingBottom: 100 }}
        showsVerticalScrollIndicator={false}
      >
        {veterinarians.map(renderVetCard)}
      </ScrollView>
    </SafeAreaContainer>
  );
};

export default VeterinaryDiscoverScreen;
