import React, { useState, useRef } from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Image,
  Dimensions,
  Modal,
  TextInput,
  StatusBar,
  Animated,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { Ionicons } from "@expo/vector-icons";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import SafeAreaContainer from "../../components/shared/SafeAreaContainer";
import HeaderOverlay from "../../components/shared/HeaderOverlay";
import DetailSection from "../../components/shared/DetailSection";
import useThemeColors from "../../hooks/useThemeColors";

const { width } = Dimensions.get("window");
const HERO_HEIGHT = Math.min(420, Math.round(width * 0.9));

const AdoptionDetailScreen = ({ navigation, route }) => {
  const theme = useThemeColors("adoption");
  const insets = useSafeAreaInsets();
  const scrollY = useRef(new Animated.Value(0)).current;
  const [isFavorite, setIsFavorite] = useState(false);
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [activeTab, setActiveTab] = useState("story");
  const [showApplicationModal, setShowApplicationModal] = useState(false);
  const [applicationForm, setApplicationForm] = useState({
    name: "",
    phone: "",
    address: "",
    experience: "",
    reason: "",
  });

  // Mock data
  const pet = {
    id: "1",
    name: "Luna",
    type: "Kedi",
    breed: "Tekir",
    age: "6 Ay",
    gender: "Dişi",
    location: "İstanbul, Kadıköy",
    distance: "2.5 km",
    story:
      "Luna, 3 aylıkken bir yağmurlu akşam sokakta bulundu. İlk günler çok çekingen ve korkaktı. Ama şimdi tamamen değişti! Artık çok sevecen, oyuncu ve insanlara güveniyor. Mama kabı dolduğunda koşarak geliyor, sonra minnet dolu gözlerle bakıyor. Geceleri yorganın içine girip mırıldayarak uyuyor. Çok özel bir kedi, hak ettiği sıcak bir yuva arıyor.",
    urgent: true,
    healthStatus: "Aşılı, Kısırlaştırılmış",
    images: [
      "https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?w=800",
      "https://images.unsplash.com/photo-1573865526739-10c1dd7aa3b8?w=800",
      "https://images.unsplash.com/photo-1543852786-1cf6624b9987?w=800",
    ],
    shelter: "Patili Dostlar Derneği",
    shelterVerified: true,
    shelterContact: "+90 555 123 4567",
    personality: [
      { trait: "Sevecen", icon: "heart", color: "#EF4444" },
      { trait: "Oyuncu", icon: "football", color: "#F97316" },
      { trait: "Sakin", icon: "leaf", color: "#4ADE80" },
      { trait: "İnsanlara Açık", icon: "people", color: "#60A5FA" },
    ],
    requirements: ["Kapalı balkon", "Deneyimli sahip", "Diğer hayvanlarla uyumlu", "Düzenli veteriner kontrolü"],
    health: {
      vaccinations: [
        { name: "Triple Aşı", date: "15 Mart 2024", status: "Yapıldı" },
        { name: "Kuduz Aşısı", date: "20 Mart 2024", status: "Yapıldı" },
      ],
      treatments: [
        { name: "Kısırlaştırma", date: "10 Nisan 2024", status: "Yapıldı" },
        { name: "İç-Dış Parazit", date: "25 Nisan 2024", status: "Yapıldı" },
      ],
    },
    timeline: [
      { date: "15 Ocak 2024", event: "Sokakta bulundu", icon: "location" },
      { date: "16 Ocak 2024", event: "Barınağa getirildi", icon: "home" },
      { date: "20 Mart 2024", event: "Aşıları tamamlandı", icon: "medical" },
      { date: "10 Nisan 2024", event: "Kısırlaştırıldı", icon: "checkmark-circle" },
    ],
  };

  const onGalleryScroll = e => {
    const x = e.nativeEvent.contentOffset.x;
    const idx = Math.round(x / width);
    if (idx !== activeImageIndex) setActiveImageIndex(idx);
  };

  const handleShare = () => {
    // Share functionality
  };

  const handleFavorite = () => {
    setIsFavorite(!isFavorite);
  };

  const tabs = [
    { id: "story", label: "Hikaye", icon: "book" },
    { id: "health", label: "Sağlık", icon: "heart" },
    { id: "requirements", label: "Şartlar", icon: "list" },
  ];

  const renderStoryTab = () => (
    <View>
      {/* Story Card */}
      <DetailSection
        title='Hikayesi'
        icon='book-outline'
        iconColor={theme.accent}
        cardBg={theme.card}
        textColor={theme.text}
      >
        <View style={{ backgroundColor: theme.accentLight }} className='p-4 rounded-xl'>
          <Text style={{ color: theme.text, fontSize: 15, lineHeight: 24 }}>{pet.story}</Text>
        </View>
      </DetailSection>

      {/* Personality */}
      <DetailSection
        title='Kişilik Özellikleri'
        icon='star-outline'
        iconColor={theme.accent}
        cardBg={theme.card}
        textColor={theme.text}
      >
        <View className='flex-row flex-wrap gap-3'>
          {pet.personality.map((trait, index) => (
            <View
              key={index}
              style={{ backgroundColor: theme.bg, minWidth: "47%" }}
              className='flex-1 p-3 rounded-xl flex-row items-center gap-2'
            >
              <View
                className='w-10 h-10 rounded-full items-center justify-center'
                style={{ backgroundColor: trait.color + "30" }}
              >
                <Ionicons name={trait.icon} size={20} color={trait.color} />
              </View>
              <Text style={{ color: theme.text, fontSize: 14, fontWeight: "600" }} className='flex-1'>
                {trait.trait}
              </Text>
            </View>
          ))}
        </View>
      </DetailSection>

      {/* Timeline */}
      <DetailSection
        title='Zaman Çizelgesi'
        icon='time-outline'
        iconColor={theme.accent}
        cardBg={theme.card}
        textColor={theme.text}
      >
        <View className='gap-3'>
          {pet.timeline.map((item, index) => (
            <View key={index} className='flex-row'>
              <View className='items-center mr-3'>
                <View
                  style={{ backgroundColor: theme.accentLight }}
                  className='w-9 h-9 rounded-full items-center justify-center'
                >
                  <Ionicons name={item.icon} size={18} color={theme.accent} />
                </View>
                {index < pet.timeline.length - 1 && (
                  <View style={{ width: 2, flex: 1, backgroundColor: theme.border, marginTop: 4 }} />
                )}
              </View>
              <View className='flex-1 pb-2'>
                <Text style={{ color: theme.textSecondary, fontSize: 12, marginBottom: 4 }}>{item.date}</Text>
                <Text style={{ color: theme.text, fontSize: 15, fontWeight: "600" }}>{item.event}</Text>
              </View>
            </View>
          ))}
        </View>
      </DetailSection>
    </View>
  );

  const renderHealthTab = () => (
    <View>
      {/* Vaccinations */}
      <DetailSection
        title='Aşılar'
        icon='shield-checkmark-outline'
        iconColor={theme.accent}
        cardBg={theme.card}
        textColor={theme.text}
      >
        <View className='gap-3'>
          {pet.health.vaccinations.map((vac, index) => (
            <View key={index} style={{ backgroundColor: theme.bg }} className='flex-row items-center p-3 rounded-xl'>
              <View
                style={{ backgroundColor: "#4ADE8030" }}
                className='w-11 h-11 rounded-full items-center justify-center mr-3'
              >
                <Ionicons name='medical' size={20} color='#4ADE80' />
              </View>
              <View className='flex-1'>
                <Text style={{ color: theme.text, fontSize: 15, fontWeight: "600", marginBottom: 2 }}>{vac.name}</Text>
                <Text style={{ color: theme.textSecondary, fontSize: 12 }}>{vac.date}</Text>
              </View>
              <View style={{ backgroundColor: "#4ADE8020" }} className='px-3 py-1 rounded-full'>
                <Text style={{ color: "#4ADE80", fontSize: 12, fontWeight: "700" }}>{vac.status}</Text>
              </View>
            </View>
          ))}
        </View>
      </DetailSection>

      {/* Treatments */}
      <DetailSection
        title='Tedaviler'
        icon='medkit-outline'
        iconColor={theme.accent}
        cardBg={theme.card}
        textColor={theme.text}
      >
        <View className='gap-3'>
          {pet.health.treatments.map((treatment, index) => (
            <View key={index} style={{ backgroundColor: theme.bg }} className='flex-row items-center p-3 rounded-xl'>
              <View
                style={{ backgroundColor: theme.accentLight }}
                className='w-11 h-11 rounded-full items-center justify-center mr-3'
              >
                <Ionicons name='medkit' size={20} color={theme.accent} />
              </View>
              <View className='flex-1'>
                <Text style={{ color: theme.text, fontSize: 15, fontWeight: "600", marginBottom: 2 }}>
                  {treatment.name}
                </Text>
                <Text style={{ color: theme.textSecondary, fontSize: 12 }}>{treatment.date}</Text>
              </View>
              <View style={{ backgroundColor: "#4ADE8020" }} className='px-3 py-1 rounded-full'>
                <Text style={{ color: "#4ADE80", fontSize: 12, fontWeight: "700" }}>{treatment.status}</Text>
              </View>
            </View>
          ))}
        </View>
      </DetailSection>

      {/* Health Summary */}
      <DetailSection
        title='Sağlık Durumu'
        icon='heart-outline'
        iconColor={theme.accent}
        cardBg={theme.card}
        textColor={theme.text}
      >
        <View style={{ backgroundColor: theme.accentLight }} className='p-4 rounded-xl flex-row items-center gap-3'>
          <View
            style={{ backgroundColor: theme.accent }}
            className='w-14 h-14 rounded-full items-center justify-center'
          >
            <Ionicons name='checkmark-circle' size={28} color='#FFF' />
          </View>
          <View className='flex-1'>
            <Text style={{ color: theme.accent, fontSize: 17, fontWeight: "700", marginBottom: 2 }}>Sağlıklı</Text>
            <Text style={{ color: theme.text, fontSize: 13 }}>{pet.healthStatus}</Text>
          </View>
        </View>
      </DetailSection>
    </View>
  );

  const renderRequirementsTab = () => (
    <View>
      {/* Shelter Info */}
      <DetailSection
        title='Sahiplendiren Kuruluş'
        icon='home-outline'
        iconColor={theme.accent}
        cardBg={theme.card}
        textColor={theme.text}
      >
        <View className='flex-row items-center'>
          <View
            style={{ backgroundColor: theme.accentLight }}
            className='w-16 h-16 rounded-full items-center justify-center mr-4'
          >
            <Ionicons name='home' size={32} color={theme.accent} />
          </View>
          <View className='flex-1'>
            <View className='flex-row items-center gap-2 mb-1'>
              <Text style={{ color: theme.text, fontSize: 17, fontWeight: "700" }}>{pet.shelter}</Text>
              {pet.shelterVerified && <Ionicons name='checkmark-circle' size={18} color={theme.accent} />}
            </View>
            <Text style={{ color: theme.textSecondary, fontSize: 13, marginBottom: 6 }}>Hayvan Koruma Derneği</Text>
            <Text style={{ color: theme.textSecondary, fontSize: 12 }}>{pet.shelterContact}</Text>
          </View>
          <TouchableOpacity
            style={{ backgroundColor: theme.accentLight }}
            className='w-11 h-11 rounded-full items-center justify-center'
            accessibilityLabel='Ara'
            accessibilityRole='button'
          >
            <Ionicons name='call' size={20} color={theme.accent} />
          </TouchableOpacity>
        </View>
      </DetailSection>

      {/* Requirements */}
      <DetailSection
        title='Sahiplenme Şartları'
        icon='list-outline'
        iconColor={theme.accent}
        cardBg={theme.card}
        textColor={theme.text}
      >
        <View className='gap-3'>
          {pet.requirements.map((req, index) => (
            <View
              key={index}
              style={{ backgroundColor: theme.bg }}
              className='flex-row items-center p-3 rounded-xl gap-3'
            >
              <View
                style={{ backgroundColor: theme.accentLight }}
                className='w-9 h-9 rounded-full items-center justify-center'
              >
                <Ionicons name='checkmark' size={18} color={theme.accent} />
              </View>
              <Text style={{ color: theme.text, fontSize: 15, fontWeight: "500" }} className='flex-1'>
                {req}
              </Text>
            </View>
          ))}
        </View>
      </DetailSection>

      {/* Urgent Badge */}
      {pet.urgent && (
        <DetailSection
          title='Önemli Uyarı'
          icon='alert-circle-outline'
          iconColor='#EF4444'
          cardBg={theme.card}
          textColor={theme.text}
        >
          <View style={{ backgroundColor: "#EF444420" }} className='p-4 rounded-xl flex-row items-center gap-3'>
            <View
              style={{ backgroundColor: "#EF4444" }}
              className='w-12 h-12 rounded-full items-center justify-center'
            >
              <Ionicons name='alert' size={24} color='#FFF' />
            </View>
            <View className='flex-1'>
              <Text style={{ color: "#EF4444", fontSize: 16, fontWeight: "700", marginBottom: 2 }}>
                Acil Sahiplenme
              </Text>
              <Text style={{ color: theme.text, fontSize: 13 }}>Bu dostumuzun acilen yuva bulması gerekiyor</Text>
            </View>
          </View>
        </DetailSection>
      )}
    </View>
  );

  return (
    <SafeAreaContainer bgColor={theme.bg} edges={["bottom"]}>
      <StatusBar barStyle='light-content' backgroundColor='transparent' translucent />

      {/* Animated Header */}
      <HeaderOverlay
        scrollY={scrollY}
        onBack={() => navigation.goBack()}
        actions={[
          { icon: "share-outline", onPress: handleShare, accessibilityLabel: "Paylaş" },
          {
            icon: isFavorite ? "heart" : "heart-outline",
            onPress: handleFavorite,
            accessibilityLabel: "Favorilere ekle",
          },
        ]}
        bgColor={theme.overlay}
        iconColor={theme.text}
        title={pet.name}
      />

      <Animated.ScrollView
        showsVerticalScrollIndicator={false}
        onScroll={Animated.event([{ nativeEvent: { contentOffset: { y: scrollY } } }], { useNativeDriver: false })}
        scrollEventThrottle={16}
        contentContainerStyle={{ paddingBottom: 20 }}
      >
        {/* Hero Gallery */}
        <View style={{ height: HERO_HEIGHT }}>
          <ScrollView
            horizontal
            pagingEnabled
            showsHorizontalScrollIndicator={false}
            onScroll={onGalleryScroll}
            scrollEventThrottle={16}
          >
            {pet.images.map((uri, i) => (
              <View key={i} style={{ width, height: HERO_HEIGHT }}>
                <Image
                  source={{ uri }}
                  style={{ width, height: HERO_HEIGHT, resizeMode: "cover" }}
                  accessibilityLabel={`${pet.name} fotoğrafı ${i + 1}`}
                />
              </View>
            ))}
          </ScrollView>

          {/* Bottom gradient */}
          <LinearGradient
            colors={["transparent", theme.bg]}
            style={{
              position: "absolute",
              bottom: 0,
              left: 0,
              right: 0,
              height: 100,
            }}
          />

          {/* Urgent badge & Image counter */}
          {pet.urgent && (
            <View
              style={{
                position: "absolute",
                left: 16,
                top: 36,
                backgroundColor: "#EF4444",
                paddingHorizontal: 12,
                paddingVertical: 6,
                borderRadius: 20,
              }}
            >
              <Text style={{ color: "#FFF", fontSize: 12, fontWeight: "700" }}>ACİL</Text>
            </View>
          )}

          <View
            style={{
              position: "absolute",
              right: 16,
              bottom: 16,
              backgroundColor: "rgba(255,255,255,0.6)",
              paddingHorizontal: 12,
              height: 24,
              justifyContent: "center",
              borderRadius: 12,
            }}
          >
            <Text style={{ color: theme.text, fontSize: 12, fontWeight: "600" }}>
              {activeImageIndex + 1} / {pet.images.length}
            </Text>
          </View>
        </View>

        {/* Content */}
        <View style={{ paddingTop: 8 }}>
          {/* Title Section */}
          <View className='px-4 mb-4'>
            <View className='flex-row justify-between items-start mb-4'>
              <View className='flex-1'>
                <Text
                  style={{ color: theme.text, fontSize: 32, fontWeight: "700", marginBottom: 4 }}
                  accessibilityRole='header'
                >
                  {pet.name}
                </Text>
                <Text style={{ color: theme.textSecondary, fontSize: 18 }}>
                  {pet.breed} • {pet.type}
                </Text>
              </View>
              <LinearGradient colors={[theme.accent, theme.accent + "DD"]} className='px-4 py-2 rounded-full'>
                <Text style={{ color: "#FFF", fontSize: 14, fontWeight: "700" }}>{pet.age}</Text>
              </LinearGradient>
            </View>

            {/* Quick Info */}
            <View className='flex-row gap-4 flex-wrap'>
              <View className='flex-row items-center gap-2'>
                <Ionicons name='location-outline' size={18} color={theme.accent} />
                <Text style={{ color: theme.textSecondary, fontSize: 14, fontWeight: "500" }}>{pet.location}</Text>
              </View>
              <View className='flex-row items-center gap-2'>
                <Ionicons name='navigate-outline' size={18} color={theme.accent} />
                <Text style={{ color: theme.textSecondary, fontSize: 14, fontWeight: "500" }}>
                  {pet.distance} uzakta
                </Text>
              </View>
            </View>
          </View>

          {/* Tabs */}
          <View style={{ backgroundColor: theme.card, borderBottomWidth: 1, borderBottomColor: theme.border }}>
            <ScrollView horizontal showsHorizontalScrollIndicator={false} className='px-4'>
              <View className='flex-row gap-2 py-3'>
                {tabs.map(tab => (
                  <TouchableOpacity
                    key={tab.id}
                    style={{
                      backgroundColor: activeTab === tab.id ? theme.accentLight : "transparent",
                      paddingHorizontal: 16,
                      paddingVertical: 10,
                      borderRadius: 12,
                    }}
                    className='flex-row items-center gap-2'
                    onPress={() => setActiveTab(tab.id)}
                    accessibilityLabel={tab.label}
                    accessibilityRole='tab'
                    accessibilityState={{ selected: activeTab === tab.id }}
                  >
                    <Ionicons
                      name={tab.icon}
                      size={20}
                      color={activeTab === tab.id ? theme.accent : theme.textSecondary}
                    />
                    <Text
                      style={{
                        color: activeTab === tab.id ? theme.accent : theme.textSecondary,
                        fontSize: 15,
                        fontWeight: activeTab === tab.id ? "700" : "500",
                      }}
                    >
                      {tab.label}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
            </ScrollView>
          </View>

          {/* Tab Content */}
          <View style={{ paddingTop: 16 }}>
            {activeTab === "story" && renderStoryTab()}
            {activeTab === "health" && renderHealthTab()}
            {activeTab === "requirements" && renderRequirementsTab()}
          </View>
        </View>
      </Animated.ScrollView>

      {/* Sticky CTA Bar */}
      <View
        style={{
          backgroundColor: theme.card,
          borderTopWidth: 1,
          borderTopColor: theme.border,
          paddingTop: 14,
          paddingBottom: insets.bottom + 14,
          paddingHorizontal: 16,
        }}
      >
        <LinearGradient
          colors={[theme.accent, theme.accent + "DD"]}
          style={{ height: 56, borderRadius: 28 }}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
        >
          <TouchableOpacity
            style={{ flex: 1 }}
            className='flex-row items-center justify-center gap-2'
            onPress={() => setShowApplicationModal(true)}
            accessibilityLabel='Sahiplenme başvurusu yap'
            accessibilityRole='button'
          >
            <Ionicons name='heart' size={20} color='#FFF' />
            <Text style={{ color: "#FFF", fontSize: 16, fontWeight: "700" }}>Sahiplenme Başvurusu Yap</Text>
          </TouchableOpacity>
        </LinearGradient>
      </View>

      {/* Application Modal */}
      <Modal
        visible={showApplicationModal}
        animationType='slide'
        transparent
        onRequestClose={() => setShowApplicationModal(false)}
      >
        <View style={{ flex: 1, backgroundColor: "rgba(0,0,0,0.7)", justifyContent: "flex-end" }}>
          <View
            style={{
              backgroundColor: theme.card,
              borderTopLeftRadius: 24,
              borderTopRightRadius: 24,
              maxHeight: "90%",
            }}
          >
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
                padding: 16,
                borderBottomWidth: 1,
                borderBottomColor: theme.border,
              }}
            >
              <Text style={{ color: theme.text, fontSize: 20, fontWeight: "700" }}>Sahiplenme Başvurusu</Text>
              <TouchableOpacity onPress={() => setShowApplicationModal(false)}>
                <Ionicons name='close' size={28} color={theme.text} />
              </TouchableOpacity>
            </View>
            <ScrollView style={{ padding: 16 }} showsVerticalScrollIndicator={false}>
              <Text style={{ color: theme.textSecondary, fontSize: 14, marginBottom: 16 }}>
                Lütfen aşağıdaki formu doldurun. En kısa sürede size dönüş yapılacaktır.
              </Text>
              {["name", "phone", "address", "experience", "reason"].map(field => (
                <View key={field} style={{ marginBottom: 16 }}>
                  <Text style={{ color: theme.text, fontSize: 14, fontWeight: "600", marginBottom: 8 }}>
                    {field === "name"
                      ? "Ad Soyad"
                      : field === "phone"
                      ? "Telefon"
                      : field === "address"
                      ? "Adres"
                      : field === "experience"
                      ? "Deneyim"
                      : "Sahiplenme Nedeni"}
                  </Text>
                  <TextInput
                    style={{
                      backgroundColor: theme.bg,
                      color: theme.text,
                      padding: 12,
                      borderRadius: 12,
                      borderWidth: 1,
                      borderColor: theme.border,
                      fontSize: 15,
                      minHeight: field === "reason" || field === "experience" ? 100 : 48,
                    }}
                    multiline={field === "reason" || field === "experience"}
                    placeholder={`${
                      field === "name"
                        ? "Ad Soyad"
                        : field === "phone"
                        ? "Telefon numaranız"
                        : field === "address"
                        ? "Adresiniz"
                        : field === "experience"
                        ? "Hayvan bakım deneyiminiz"
                        : "Neden sahiplenmek istiyorsunuz?"
                    }`}
                    placeholderTextColor={theme.textSecondary + "80"}
                    value={applicationForm[field]}
                    onChangeText={text => setApplicationForm({ ...applicationForm, [field]: text })}
                  />
                </View>
              ))}
              <LinearGradient
                colors={[theme.accent, theme.accent + "DD"]}
                style={{ borderRadius: 12, marginBottom: 24 }}
              >
                <TouchableOpacity
                  style={{ paddingVertical: 16, alignItems: "center" }}
                  onPress={() => setShowApplicationModal(false)}
                >
                  <Text style={{ color: "#FFF", fontSize: 16, fontWeight: "700" }}>Başvuruyu Gönder</Text>
                </TouchableOpacity>
              </LinearGradient>
            </ScrollView>
          </View>
        </View>
      </Modal>
    </SafeAreaContainer>
  );
};

export default AdoptionDetailScreen;
