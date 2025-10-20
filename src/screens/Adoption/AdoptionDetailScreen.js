import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Image,
  Dimensions,
  Modal,
  TextInput,
  StatusBar
} from 'react-native';
import SafeAreaContainer from '../../components/layout/SafeAreaContainer';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const { width } = Dimensions.get('window');

const AdoptionDetailScreen = ({ navigation, route }) => {
  const [activeTab, setActiveTab] = useState('story');
  const [showApplicationModal, setShowApplicationModal] = useState(false);
  const [applicationForm, setApplicationForm] = useState({
    name: '',
    phone: '',
    address: '',
    experience: '',
    reason: '',
  });
  const insets = useSafeAreaInsets();

  // Mock data - gerçekte API'den gelecek
  const pet = {
    id: '1',
    name: 'Luna',
    type: 'Kedi',
    breed: 'Tekir',
    age: '6 Ay',
    gender: 'Dişi',
    location: 'İstanbul, Kadıköy',
    distance: '2.5 km',
    story: 'Luna, 3 aylıkken bir yağmurlu akşam sokakta bulundu. İlk günler çok çekingen ve korkaklı. Ama şimdi tamamen değişti! Artık çok sevecen, oyuncu ve insanlara güveniyor. Mama kabı dolduğunda koşarak geliyor, sonra minnet dolu gözlerle bakıyor. Geceleri yorganın içine girip mırıldayarak uyuyor. Çok özel bir kedi, hak ettiği sıcak bir yuva arıyor.',
    urgent: true,
    healthStatus: 'Aşılı, Kısırlaştırılmış',
    images: [
      'https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?w=800',
      'https://images.unsplash.com/photo-1573865526739-10c1dd7aa3b8?w=800',
      'https://images.unsplash.com/photo-1543852786-1cf6624b9987?w=800',
    ],
    shelter: 'Patili Dostlar Derneği',
    shelterVerified: true,
    shelterContact: '+90 555 123 4567',
    personality: [
      { trait: 'Sevecen', icon: 'heart', color: '#EF4444' },
      { trait: 'Oyuncu', icon: 'football', color: '#F97316' },
      { trait: 'Sakin', icon: 'leaf', color: '#4ADE80' },
      { trait: 'İnsanlara Açık', icon: 'people', color: '#60A5FA' },
    ],
    requirements: [
      'Kapalı balkon',
      'Deneyimli sahip',
      'Diğer hayvanlarla uyumlu',
      'Düzenli veteriner kontrolü',
    ],
    health: {
      vaccinations: [
        { name: 'Triple Aşı', date: '15 Mart 2024', status: 'Yapıldı' },
        { name: 'Kuduz Aşısı', date: '20 Mart 2024', status: 'Yapıldı' },
      ],
      treatments: [
        { name: 'Kısırlaştırma', date: '10 Nisan 2024', status: 'Yapıldı' },
        { name: 'İç-Dış Parazit', date: '25 Nisan 2024', status: 'Yapıldı' },
      ],
    },
    timeline: [
      { date: '15 Ocak 2024', event: 'Sokakta bulundu', icon: 'location' },
      { date: '16 Ocak 2024', event: 'Barınağa getirildi', icon: 'home' },
      { date: '20 Mart 2024', event: 'Aşıları tamamlandı', icon: 'medical' },
      { date: '10 Nisan 2024', event: 'Kısırlaştırıldı', icon: 'checkmark-circle' },
    ],
  };

  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const renderStoryTab = () => (
    <View className="pb-24">
      {/* Story Card */}
      <View className="bg-orange-50 p-4 rounded-2xl mb-4">
        <View className="flex-row items-center gap-2 mb-3">
          <Ionicons name="book" size={24} color="#FB923C" />
          <Text className="text-xl font-bold text-gray-800">Hikayesi</Text>
        </View>
        <Text className="text-base text-gray-800 leading-6">{pet.story}</Text>
      </View>

      {/* Personality */}
      <View className="mb-6">
        <Text className="text-xl font-bold text-gray-800 mb-3">Kişilik Özellikleri</Text>
        <View className="flex-row flex-wrap gap-3">
          {pet.personality.map((trait, index) => (
            <View key={index} className="w-[48%] bg-gray-100 p-3 rounded-xl flex-row items-center gap-2">
              <View
                className="w-10 h-10 rounded-full items-center justify-center"
                style={{ backgroundColor: trait.color + '20' }}
              >
                <Ionicons name={trait.icon} size={20} color={trait.color} />
              </View>
              <Text className="text-sm font-medium text-gray-800 flex-1">{trait.trait}</Text>
            </View>
          ))}
        </View>
      </View>

      {/* Timeline */}
      <View className="mb-6">
        <Text className="text-xl font-bold text-gray-800 mb-3">Zaman Çizelgesi</Text>
        <View className="mt-2">
          {pet.timeline.map((item, index) => (
            <View key={index} className="flex-row mb-3">
              <View className="items-center mr-3">
                <View className="w-8 h-8 rounded-full bg-orange-50 items-center justify-center">
                  <Ionicons name={item.icon} size={16} color="#FB923C" />
                </View>
                {index < pet.timeline.length - 1 && (
                  <View className="w-0.5 flex-1 bg-orange-200 mt-1" />
                )}
              </View>
              <View className="flex-1 pb-2">
                <Text className="text-xs text-gray-500 mb-1">{item.date}</Text>
                <Text className="text-base text-gray-800 font-medium">{item.event}</Text>
              </View>
            </View>
          ))}
        </View>
      </View>
    </View>
  );

  const renderHealthTab = () => (
    <View className="pb-24">
      {/* Vaccinations */}
      <View className="mb-6">
        <View className="flex-row items-center gap-2 mb-3">
          <Ionicons name="shield-checkmark" size={22} color="#4ADE80" />
          <Text className="text-xl font-bold text-gray-800">Aşılar</Text>
        </View>
        {pet.health.vaccinations.map((vac, index) => (
          <View key={index} className="flex-row items-center justify-between bg-gray-100 p-3 rounded-xl mb-2">
            <View className="flex-row items-center gap-2 flex-1">
              <View className="w-10 h-10 rounded-full bg-green-100 items-center justify-center">
                <Ionicons name="medical" size={18} color="#4ADE80" />
              </View>
              <View>
                <Text className="text-base font-semibold text-gray-800">{vac.name}</Text>
                <Text className="text-xs text-gray-500 mt-0.5">{vac.date}</Text>
              </View>
            </View>
            <View className="flex-row items-center bg-green-100 px-2 py-1.5 rounded-lg gap-1">
              <Ionicons name="checkmark-circle" size={16} color="#4ADE80" />
              <Text className="text-xs text-green-500 font-medium">{vac.status}</Text>
            </View>
          </View>
        ))}
      </View>

      {/* Treatments */}
      <View className="mb-6">
        <View className="flex-row items-center gap-2 mb-3">
          <Ionicons name="fitness" size={22} color="#60A5FA" />
          <Text className="text-xl font-bold text-gray-800">Tedaviler</Text>
        </View>
        {pet.health.treatments.map((treat, index) => (
          <View key={index} className="flex-row items-center justify-between bg-gray-100 p-3 rounded-xl mb-2">
            <View className="flex-row items-center gap-2 flex-1">
              <View className="w-10 h-10 rounded-full bg-blue-100 items-center justify-center">
                <Ionicons name="fitness" size={18} color="#60A5FA" />
              </View>
              <View>
                <Text className="text-base font-semibold text-gray-800">{treat.name}</Text>
                <Text className="text-xs text-gray-500 mt-0.5">{treat.date}</Text>
              </View>
            </View>
            <View className="flex-row items-center bg-blue-100 px-2 py-1.5 rounded-lg gap-1">
              <Ionicons name="checkmark-circle" size={16} color="#60A5FA" />
              <Text className="text-xs text-blue-500 font-medium">{treat.status}</Text>
            </View>
          </View>
        ))}
      </View>
    </View>
  );

  const renderRequirementsTab = () => (
    <View className="pb-24">
      <View className="mb-6">
        <View className="items-center mb-4">
          <Ionicons name="list-circle" size={28} color="#FB923C" />
          <Text className="text-2xl font-bold text-gray-800 mt-2 mb-1">Sahiplenme Koşulları</Text>
          <Text className="text-sm text-gray-500 text-center">
            {pet.name}'yı sahiplenmek için aşağıdaki koşulları sağlamanız gerekmektedir
          </Text>
        </View>
        <View className="mt-3">
          {pet.requirements.map((req, index) => (
            <View key={index} className="flex-row items-center bg-green-50 p-3 rounded-xl mb-2 gap-2">
              <View className="w-8 h-8">
                <Ionicons name="checkmark-circle" size={24} color="#4ADE80" />
              </View>
              <Text className="text-base text-gray-800 font-medium flex-1">{req}</Text>
            </View>
          ))}
        </View>

        {/* Warning Box */}
        <View className="flex-row bg-orange-50 p-3 rounded-xl gap-2 mt-4 border-l-4 border-orange-400">
          <Ionicons name="information-circle" size={24} color="#FB923C" />
          <Text className="text-sm text-gray-800 leading-5 flex-1">
            Sahiplenme başvurunuz, barınak yetkililerimiz tarafından değerlendirilecektir.
            Onay sonrası ev ziyareti yapılacaktır.
          </Text>
        </View>
      </View>
    </View>
  );

  const renderApplicationModal = () => (
    <Modal
      visible={showApplicationModal}
      animationType="slide"
      transparent={true}
      onRequestClose={() => setShowApplicationModal(false)}
    >
      <View className="flex-1 bg-black/50 justify-end">
        <View className="bg-white rounded-t-3xl max-h-[90%]">
          <View className="flex-row justify-between items-center p-4 border-b border-gray-200">
            <Text className="text-xl font-bold text-gray-800">Sahiplenme Başvurusu</Text>
            <TouchableOpacity onPress={() => setShowApplicationModal(false)}>
              <Ionicons name="close" size={28} color="#1F2937" />
            </TouchableOpacity>
          </View>

          <ScrollView className="p-4" showsVerticalScrollIndicator={false}>
            <Text className="text-base text-gray-500 mb-4">
              {pet.name} için sahiplenme başvurusu yapmak üzeresiniz
            </Text>

            <View className="mb-4">
              <Text className="text-sm font-semibold text-gray-800 mb-2">Ad Soyad *</Text>
              <TextInput
                className="bg-gray-100 rounded-xl px-3 py-3 text-base text-gray-800 border border-gray-200"
                placeholder="Adınız ve soyadınız"
                value={applicationForm.name}
                onChangeText={(text) => setApplicationForm({...applicationForm, name: text})}
              />
            </View>

            <View className="mb-4">
              <Text className="text-sm font-semibold text-gray-800 mb-2">Telefon *</Text>
              <TextInput
                className="bg-gray-100 rounded-xl px-3 py-3 text-base text-gray-800 border border-gray-200"
                placeholder="+90 555 123 4567"
                keyboardType="phone-pad"
                value={applicationForm.phone}
                onChangeText={(text) => setApplicationForm({...applicationForm, phone: text})}
              />
            </View>

            <View className="mb-4">
              <Text className="text-sm font-semibold text-gray-800 mb-2">Adres *</Text>
              <TextInput
                className="bg-gray-100 rounded-xl px-3 py-3 text-base text-gray-800 border border-gray-200 h-24"
                placeholder="Tam adresiniz"
                multiline
                numberOfLines={3}
                textAlignVertical="top"
                value={applicationForm.address}
                onChangeText={(text) => setApplicationForm({...applicationForm, address: text})}
              />
            </View>

            <View className="mb-4">
              <Text className="text-sm font-semibold text-gray-800 mb-2">Deneyiminiz</Text>
              <TextInput
                className="bg-gray-100 rounded-xl px-3 py-3 text-base text-gray-800 border border-gray-200 h-24"
                placeholder="Daha önce evcil hayvan sahibi oldunuz mu?"
                multiline
                numberOfLines={3}
                textAlignVertical="top"
                value={applicationForm.experience}
                onChangeText={(text) => setApplicationForm({...applicationForm, experience: text})}
              />
            </View>

            <View className="mb-4">
              <Text className="text-sm font-semibold text-gray-800 mb-2">Sahiplenme Nedeniniz *</Text>
              <TextInput
                className="bg-gray-100 rounded-xl px-3 py-3 text-base text-gray-800 border border-gray-200 h-28"
                placeholder="Neden sahiplenmek istiyorsunuz?"
                multiline
                numberOfLines={4}
                textAlignVertical="top"
                value={applicationForm.reason}
                onChangeText={(text) => setApplicationForm({...applicationForm, reason: text})}
              />
            </View>

            <TouchableOpacity
              className="rounded-xl overflow-hidden mb-6"
              onPress={() => {
                setShowApplicationModal(false);
                // Başvuru gönderme işlemi
              }}
            >
              <LinearGradient
                colors={['#FB923C', '#F97316']}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
                className="flex-row items-center justify-center py-3 gap-2"
              >
                <Ionicons name="send" size={20} color="#FFF" />
                <Text className="text-base font-bold text-white">Başvuruyu Gönder</Text>
              </LinearGradient>
            </TouchableOpacity>
          </ScrollView>
        </View>
      </View>
    </Modal>
  );

  return (
    <SafeAreaContainer edges={['top', 'right', 'left']} className="flex-1 bg-white">
      <StatusBar barStyle="dark-content" backgroundColor="transparent" translucent />

      {/* Header */}
      <View className="flex-row justify-between items-center px-4 pb-3">
        <TouchableOpacity
          className="w-10 h-10 rounded-full bg-gray-100 items-center justify-center"
          onPress={() => navigation.goBack()}
        >
          <Ionicons name="arrow-back" size={24} color="#1F2937" />
        </TouchableOpacity>
        <View className="flex-row gap-2">
          <TouchableOpacity className="w-10 h-10 rounded-full bg-gray-100 items-center justify-center">
            <Ionicons name="share-outline" size={24} color="#1F2937" />
          </TouchableOpacity>
          <TouchableOpacity className="w-10 h-10 rounded-full bg-gray-100 items-center justify-center">
            <Ionicons name="heart-outline" size={24} color="#1F2937" />
          </TouchableOpacity>
        </View>
      </View>

      <ScrollView className="flex-1" showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 100 }}>
        {/* Image Gallery */}
        <View className="relative" style={{ width, height: 400 }}>
          <ScrollView
            horizontal
            pagingEnabled
            showsHorizontalScrollIndicator={false}
            onScroll={(e) => {
              const index = Math.round(e.nativeEvent.contentOffset.x / width);
              setCurrentImageIndex(index);
            }}
            scrollEventThrottle={16}
          >
            {pet.images.map((image, index) => (
              <Image key={index} source={{ uri: image }} style={{ width, height: 400 }} />
            ))}
          </ScrollView>

          {/* Image Indicators */}
          <View className="absolute bottom-5 left-0 right-0 flex-row justify-center gap-2">
            {pet.images.map((_, index) => (
              <View
                key={index}
                className={`h-2 rounded ${
                  currentImageIndex === index ? 'w-6 bg-white' : 'w-2 bg-white/50'
                }`}
              />
            ))}
          </View>

          {/* Urgent Badge */}
          {pet.urgent && (
            <View className="absolute top-5 left-5">
              <LinearGradient
                colors={['#EF4444', '#DC2626']}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
                className="flex-row items-center px-3 py-2 rounded-2xl gap-1.5"
              >
                <Ionicons name="alert-circle" size={16} color="#FFF" />
                <Text className="text-sm font-bold text-white">ACİL DURUM</Text>
              </LinearGradient>
            </View>
          )}
        </View>

        {/* Pet Info Header */}
        <View className="p-4">
          <View className="flex-row items-center gap-2 mb-3">
            <Text className="text-4xl font-bold text-gray-800">{pet.name}</Text>
            <View
              className="w-8 h-8 rounded-full items-center justify-center"
              style={{ backgroundColor: pet.gender === 'Erkek' ? '#EFF6FF' : '#FCE7F3' }}
            >
              <Ionicons
                name={pet.gender === 'Erkek' ? 'male' : 'female'}
                size={22}
                color={pet.gender === 'Erkek' ? '#60A5FA' : '#EC4899'}
              />
            </View>
          </View>

          <View className="flex-row flex-wrap gap-2 mb-4">
            <View className="flex-row items-center bg-orange-50 px-3 py-2 rounded-xl gap-1.5">
              <Ionicons name="paw" size={16} color="#FB923C" />
              <Text className="text-sm text-gray-800 font-medium">{pet.type} • {pet.breed}</Text>
            </View>
            <View className="flex-row items-center bg-orange-50 px-3 py-2 rounded-xl gap-1.5">
              <Ionicons name="calendar" size={16} color="#FB923C" />
              <Text className="text-sm text-gray-800 font-medium">{pet.age}</Text>
            </View>
            <View className="flex-row items-center bg-orange-50 px-3 py-2 rounded-xl gap-1.5">
              <Ionicons name="location" size={16} color="#FB923C" />
              <Text className="text-sm text-gray-800 font-medium">{pet.distance}</Text>
            </View>
          </View>

          {/* Shelter Info */}
          <View className="flex-row items-center justify-between bg-gray-100 p-3 rounded-xl">
            <View className="flex-row items-center gap-2 flex-1">
              <Ionicons name="home" size={20} color="#FB923C" />
              <View className="flex-1">
                <Text className="text-base font-semibold text-gray-800 mb-1">{pet.shelter}</Text>
                {pet.shelterVerified && (
                  <View className="flex-row items-center gap-1">
                    <Ionicons name="checkmark-circle" size={14} color="#4ADE80" />
                    <Text className="text-xs text-green-500 font-medium">Onaylı Barınak</Text>
                  </View>
                )}
              </View>
            </View>
            <TouchableOpacity className="w-11 h-11 rounded-full bg-green-500 items-center justify-center">
              <Ionicons name="call" size={20} color="#FFF" />
            </TouchableOpacity>
          </View>
        </View>

        {/* Tabs */}
        <View className="flex-row bg-gray-100 mx-4 rounded-xl p-1 mb-4">
          {[
            { key: 'story', label: 'Hikaye', icon: 'book' },
            { key: 'health', label: 'Sağlık', icon: 'medical' },
            { key: 'requirements', label: 'Koşullar', icon: 'list' },
          ].map((tab) => (
            <TouchableOpacity
              key={tab.key}
              className={`flex-1 flex-row items-center justify-center gap-1.5 py-2 rounded-lg ${
                activeTab === tab.key ? 'bg-white' : ''
              }`}
              onPress={() => setActiveTab(tab.key)}
            >
              <Ionicons
                name={tab.icon}
                size={20}
                color={activeTab === tab.key ? '#FB923C' : '#6B7280'}
              />
              <Text
                className={`text-sm font-medium ${
                  activeTab === tab.key ? 'text-orange-500 font-semibold' : 'text-gray-500'
                }`}
              >
                {tab.label}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Tab Content */}
        <View className="px-4">
          {activeTab === 'story' && renderStoryTab()}
          {activeTab === 'health' && renderHealthTab()}
          {activeTab === 'requirements' && renderRequirementsTab()}
        </View>
      </ScrollView>

      {/* Bottom Action Bar */}
      <View
        className="flex-row bg-white px-4 pt-3 border-t border-gray-200 gap-2"
        style={{ paddingBottom: insets.bottom + 12 }}
      >
        <TouchableOpacity className="w-14 h-14 rounded-full bg-orange-50 items-center justify-center">
          <Ionicons name="chatbubble-outline" size={24} color="#FB923C" />
        </TouchableOpacity>
        <TouchableOpacity
          className="flex-1 rounded-full overflow-hidden"
          onPress={() => setShowApplicationModal(true)}
        >
          <LinearGradient
            colors={['#FB923C', '#F97316']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            className="flex-row items-center justify-center py-3 gap-2"
          >
            <Ionicons name="heart-circle" size={24} color="#FFF" />
            <Text className="text-base font-bold text-white">Sahiplenmek İstiyorum</Text>
          </LinearGradient>
        </TouchableOpacity>
      </View>

      {renderApplicationModal()}
    </SafeAreaContainer>
  );
};

export default AdoptionDetailScreen;
