import React, { useState, useRef } from "react";
import { View, Text, ScrollView, Image, TouchableOpacity, Dimensions, StatusBar, Animated } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import SafeAreaContainer from "../../components/shared/SafeAreaContainer";
import HeaderOverlay from "../../components/shared/HeaderOverlay";
import DetailSection from "../../components/shared/DetailSection";
import useThemeColors from "../../hooks/useThemeColors";

const { width } = Dimensions.get("window");
const HERO_HEIGHT = Math.min(420, Math.round(width * 0.9));

const BreedingDetailScreen = ({ route, navigation }) => {
  const { pet } = route.params;
  const theme = useThemeColors("breeding");
  const insets = useSafeAreaInsets();
  const scrollY = useRef(new Animated.Value(0)).current;
  const [isFavorite, setIsFavorite] = useState(false);
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [activeTab, setActiveTab] = useState("info");

  // Mock data
  const petDetails = {
    ...pet,
    description:
      "Sağlıklı, aktif ve sosyal bir karaktere sahip. Genetik testleri tamamlanmış, sağlık sertifikaları mevcut. Dost canlısı karakteri ile ailelere çok uygun.",
    pedigreeDetails: {
      father: "Champion Max",
      mother: "Princess Luna",
      generation: "3. Nesil",
    },
    vaccinations: [
      { name: "Karma Aşı", date: "15.01.2024", nextDate: "15.01.2025" },
      { name: "Kuduz", date: "20.01.2024", nextDate: "20.01.2025" },
      { name: "Leptospira", date: "25.01.2024", nextDate: "25.01.2025" },
    ],
    healthReports: [
      { type: "Genel Sağlık Kontrolü", date: "01.02.2024", result: "Sağlıklı" },
      { type: "Genetik Tarama", date: "15.02.2024", result: "Temiz" },
      { type: "Kalp Kontrolü", date: "20.02.2024", result: "Normal" },
    ],
    breedingHistory: [
      { year: "2023", litters: 1, puppies: 6, success: "100%" },
      { year: "2022", litters: 1, puppies: 5, success: "100%" },
    ],
    gallery: [
      pet.image,
      "https://images.unsplash.com/photo-1601758228041-f3b2795255f1?w=400",
      "https://images.unsplash.com/photo-1587300003388-59208cc962cb?w=400",
      "https://images.unsplash.com/photo-1592194996308-f265ec2b0d3a?w=400",
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
    { id: "info", label: "Bilgiler", icon: "information-circle" },
    { id: "pedigree", label: "Soy Ağacı", icon: "ribbon" },
    { id: "health", label: "Sağlık", icon: "heart" },
  ];

  const renderInfoTab = () => (
    <View>
      {/* Description */}
      <DetailSection
        title='Hakkında'
        icon='document-text-outline'
        iconColor={theme.accent}
        cardBg={theme.card}
        textColor={theme.text}
      >
        <Text style={{ color: theme.textSecondary, fontSize: 15, lineHeight: 22 }}>{petDetails.description}</Text>
      </DetailSection>

      {/* Basic Info Grid */}
      <DetailSection
        title='Temel Bilgiler'
        icon='grid-outline'
        iconColor={theme.accent}
        cardBg={theme.card}
        textColor={theme.text}
      >
        <View className='flex-row flex-wrap gap-3'>
          {[
            { icon: "paw", label: "Cins", value: petDetails.breed },
            { icon: "calendar", label: "Yaş", value: `${petDetails.age} Yaş` },
            { icon: petDetails.gender === "Erkek" ? "male" : "female", label: "Cinsiyet", value: petDetails.gender },
            { icon: "location", label: "Konum", value: petDetails.city },
          ].map((item, index) => (
            <View
              key={index}
              style={{ backgroundColor: theme.bg, minWidth: "45%" }}
              className='flex-1 p-4 rounded-xl items-center'
            >
              <View
                style={{ backgroundColor: theme.accentLight }}
                className='w-12 h-12 rounded-full items-center justify-center mb-2'
              >
                <Ionicons name={item.icon} size={24} color={theme.accent} />
              </View>
              <Text style={{ color: theme.textSecondary, fontSize: 12, marginBottom: 4 }}>{item.label}</Text>
              <Text style={{ color: theme.text, fontSize: 15, fontWeight: "600" }}>{item.value}</Text>
            </View>
          ))}
        </View>
      </DetailSection>

      {/* Owner Info */}
      <DetailSection
        title='Sahip Bilgisi'
        icon='person-outline'
        iconColor={theme.accent}
        cardBg={theme.card}
        textColor={theme.text}
      >
        <View className='flex-row items-center'>
          <View
            style={{ backgroundColor: theme.accentLight }}
            className='w-16 h-16 rounded-full items-center justify-center mr-4'
          >
            <Ionicons name='person' size={32} color={theme.accent} />
          </View>
          <View className='flex-1'>
            <View className='flex-row items-center gap-2 mb-1'>
              <Text style={{ color: theme.text, fontSize: 17, fontWeight: "700" }}>{petDetails.owner}</Text>
              {petDetails.ownerVerified && <Ionicons name='checkmark-circle' size={18} color={theme.accent} />}
            </View>
            <Text style={{ color: theme.textSecondary, fontSize: 13, marginBottom: 8 }}>Sertifikalı Yetiştirici</Text>
            <View className='flex-row gap-3'>
              <View className='flex-row items-center gap-1'>
                <Ionicons name='star' size={14} color={theme.accent} />
                <Text style={{ color: theme.textSecondary, fontSize: 12, fontWeight: "600" }}>4.9</Text>
              </View>
              <View className='flex-row items-center gap-1'>
                <Ionicons name='ribbon' size={14} color={theme.accent} />
                <Text style={{ color: theme.textSecondary, fontSize: 12, fontWeight: "600" }}>12 Yıl</Text>
              </View>
            </View>
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
    </View>
  );

  const renderPedigreeTab = () => (
    <View>
      {/* Pedigree Info */}
      <DetailSection
        title='Soy Ağacı Bilgileri'
        icon='ribbon-outline'
        iconColor={theme.accent}
        cardBg={theme.card}
        textColor={theme.text}
      >
        <View style={{ backgroundColor: theme.accentLight }} className='p-4 rounded-xl mb-4'>
          <View
            className='flex-row items-center gap-2 mb-4 pb-3'
            style={{ borderBottomWidth: 1, borderBottomColor: theme.accent + "40" }}
          >
            <View
              style={{ backgroundColor: theme.accent }}
              className='w-10 h-10 rounded-full items-center justify-center'
            >
              <Ionicons name='ribbon' size={24} color='#FFF' />
            </View>
            <Text style={{ color: theme.accent, fontSize: 17, fontWeight: "700" }}>Pedigree Sertifikalı</Text>
          </View>
          <View className='gap-3'>
            {[
              { label: "Baba:", value: petDetails.pedigreeDetails.father },
              { label: "Anne:", value: petDetails.pedigreeDetails.mother },
              { label: "Nesil:", value: petDetails.pedigreeDetails.generation },
            ].map((item, index) => (
              <View key={index} className='flex-row justify-between items-center'>
                <Text style={{ color: theme.textSecondary, fontSize: 15 }}>{item.label}</Text>
                <Text style={{ color: theme.text, fontSize: 15, fontWeight: "700" }}>{item.value}</Text>
              </View>
            ))}
          </View>
        </View>
      </DetailSection>

      {/* Breeding History */}
      {petDetails.breedingHistory && petDetails.breedingHistory.length > 0 && (
        <DetailSection
          title='Çiftleştirme Geçmişi'
          icon='calendar-outline'
          iconColor={theme.accent}
          cardBg={theme.card}
          textColor={theme.text}
        >
          <View className='gap-3'>
            {petDetails.breedingHistory.map((record, index) => (
              <View key={index} style={{ backgroundColor: theme.bg }} className='p-4 rounded-xl'>
                <View className='flex-row items-center justify-between mb-3'>
                  <View className='flex-row items-center gap-2'>
                    <View
                      style={{ backgroundColor: theme.accentLight }}
                      className='w-9 h-9 rounded-full items-center justify-center'
                    >
                      <Ionicons name='calendar' size={18} color={theme.accent} />
                    </View>
                    <Text style={{ color: theme.text, fontSize: 17, fontWeight: "700" }}>{record.year}</Text>
                  </View>
                  <View style={{ backgroundColor: "#10B98150" }} className='px-3 py-1 rounded-full'>
                    <Text style={{ color: "#10B981", fontSize: 13, fontWeight: "700" }}>{record.success}</Text>
                  </View>
                </View>
                <View className='flex-row gap-4'>
                  <View className='flex-1'>
                    <Text style={{ color: theme.textSecondary, fontSize: 12, marginBottom: 4 }}>Doğum Sayısı</Text>
                    <Text style={{ color: theme.text, fontSize: 15, fontWeight: "600" }}>{record.litters}</Text>
                  </View>
                  <View className='flex-1'>
                    <Text style={{ color: theme.textSecondary, fontSize: 12, marginBottom: 4 }}>Toplam Yavru</Text>
                    <Text style={{ color: theme.text, fontSize: 15, fontWeight: "600" }}>{record.puppies}</Text>
                  </View>
                </View>
              </View>
            ))}
          </View>
        </DetailSection>
      )}

      {/* Documents */}
      <DetailSection
        title='Belgeler'
        icon='document-outline'
        iconColor={theme.accent}
        cardBg={theme.card}
        textColor={theme.text}
      >
        <View className='gap-3'>
          {[
            { icon: "document-text", color: theme.accent, title: "Pedigree Belgesi", size: "2.4 MB" },
            { icon: "shield-checkmark", color: "#10B981", title: "Sağlık Sertifikası", size: "1.8 MB" },
          ].map((doc, index) => (
            <TouchableOpacity
              key={index}
              style={{ backgroundColor: theme.bg }}
              className='flex-row items-center p-3 rounded-xl'
              accessibilityLabel={`${doc.title} indir`}
              accessibilityRole='button'
            >
              <View
                style={{ backgroundColor: doc.color + "20" }}
                className='w-11 h-11 rounded-full items-center justify-center mr-3'
              >
                <Ionicons name={doc.icon} size={22} color={doc.color} />
              </View>
              <View className='flex-1'>
                <Text style={{ color: theme.text, fontSize: 15, fontWeight: "600", marginBottom: 2 }}>
                  {doc.title}
                </Text>
                <Text style={{ color: theme.textSecondary, fontSize: 12 }}>PDF • {doc.size}</Text>
              </View>
              <Ionicons name='download-outline' size={22} color={theme.accent} />
            </TouchableOpacity>
          ))}
        </View>
      </DetailSection>
    </View>
  );

  const renderHealthTab = () => (
    <View>
      {/* Vaccinations */}
      <DetailSection
        title='Aşı Bilgileri'
        icon='shield-checkmark-outline'
        iconColor={theme.accent}
        cardBg={theme.card}
        textColor={theme.text}
      >
        <View className='gap-3'>
          {petDetails.vaccinations.map((vaccine, index) => (
            <View key={index} style={{ backgroundColor: theme.bg }} className='flex-row items-center p-3 rounded-xl'>
              <View
                style={{ backgroundColor: "#10B98120" }}
                className='w-11 h-11 rounded-full items-center justify-center mr-3'
              >
                <Ionicons name='shield-checkmark' size={22} color='#10B981' />
              </View>
              <View className='flex-1'>
                <Text style={{ color: theme.text, fontSize: 15, fontWeight: "600", marginBottom: 3 }}>
                  {vaccine.name}
                </Text>
                <Text style={{ color: theme.textSecondary, fontSize: 12, marginBottom: 1 }}>Son: {vaccine.date}</Text>
                <Text style={{ color: theme.textSecondary, fontSize: 11 }}>Sonraki: {vaccine.nextDate}</Text>
              </View>
              <Ionicons name='checkmark-circle' size={26} color='#10B981' />
            </View>
          ))}
        </View>
      </DetailSection>

      {/* Health Reports */}
      <DetailSection
        title='Sağlık Raporları'
        icon='document-text-outline'
        iconColor={theme.accent}
        cardBg={theme.card}
        textColor={theme.text}
      >
        <View className='gap-3'>
          {petDetails.healthReports.map((report, index) => (
            <View key={index} style={{ backgroundColor: theme.bg }} className='flex-row items-center p-3 rounded-xl'>
              <View
                style={{ backgroundColor: "#3B82F620" }}
                className='w-11 h-11 rounded-full items-center justify-center mr-3'
              >
                <Ionicons name='document-text' size={22} color='#3B82F6' />
              </View>
              <View className='flex-1'>
                <Text style={{ color: theme.text, fontSize: 15, fontWeight: "600", marginBottom: 3 }}>
                  {report.type}
                </Text>
                <Text style={{ color: theme.textSecondary, fontSize: 12, marginBottom: 6 }}>{report.date}</Text>
                <View style={{ backgroundColor: "#10B98120" }} className='px-2 py-1 rounded-md self-start'>
                  <Text style={{ color: "#10B981", fontSize: 11, fontWeight: "700" }}>{report.result}</Text>
                </View>
              </View>
              <TouchableOpacity accessibilityLabel='Raporu indir' accessibilityRole='button'>
                <Ionicons name='download-outline' size={22} color={theme.accent} />
              </TouchableOpacity>
            </View>
          ))}
        </View>
      </DetailSection>

      {/* Health Summary */}
      <DetailSection
        title='Sağlık Özeti'
        icon='heart-outline'
        iconColor={theme.accent}
        cardBg={theme.card}
        textColor={theme.text}
      >
        <View style={{ backgroundColor: "#10B98120" }} className='p-4 rounded-xl'>
          <View className='flex-row items-center gap-3 mb-4'>
            <View
              style={{ backgroundColor: "#10B981" }}
              className='w-14 h-14 rounded-full items-center justify-center'
            >
              <Ionicons name='heart' size={28} color='#FFF' />
            </View>
            <View className='flex-1'>
              <Text style={{ color: "#10B981", fontSize: 17, fontWeight: "700", marginBottom: 2 }}>
                Mükemmel Sağlık
              </Text>
              <Text style={{ color: "#059669", fontSize: 13 }}>Tüm testler başarılı</Text>
            </View>
          </View>
          <View className='flex-row gap-2'>
            {[
              { label: "Aşı Durumu", value: "100%" },
              { label: "Sağlık Skoru", value: "A+" },
              { label: "Son Kontrol", value: "1 Ay" },
            ].map((item, index) => (
              <View key={index} style={{ backgroundColor: "rgba(255,255,255,0.5)" }} className='flex-1 p-3 rounded-xl'>
                <Text style={{ color: "#059669", fontSize: 11, marginBottom: 4 }}>{item.label}</Text>
                <Text style={{ color: "#10B981", fontSize: 14, fontWeight: "700" }}>{item.value}</Text>
              </View>
            ))}
          </View>
        </View>
      </DetailSection>
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
        title={petDetails.name}
      />

      <Animated.ScrollView
        showsVerticalScrollIndicator={false}
        onScroll={Animated.event([{ nativeEvent: { contentOffset: { y: scrollY } } }], { useNativeDriver: false })}
        scrollEventThrottle={16}
        contentContainerStyle={{ paddingBottom: 100 }}
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
            {petDetails.gallery.map((uri, i) => (
              <View key={i} style={{ width, height: HERO_HEIGHT }}>
                <Image
                  source={{ uri }}
                  style={{ width, height: HERO_HEIGHT, resizeMode: "cover" }}
                  accessibilityLabel={`${petDetails.name} fotoğrafı ${i + 1}`}
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

          {/* Image counter & availability badge */}
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
              {activeImageIndex + 1} / {petDetails.gallery.length}
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
                  {petDetails.name}
                </Text>
                <Text style={{ color: theme.textSecondary, fontSize: 18 }}>{petDetails.breed}</Text>
              </View>
              <LinearGradient
                colors={[theme.accent, theme.accent + "DD"]}
                className='w-14 h-14 rounded-full items-center justify-center'
              >
                <Ionicons name={petDetails.gender === "Erkek" ? "male" : "female"} size={28} color='#FFF' />
              </LinearGradient>
            </View>

            {/* Certification Banner */}
            <View
              style={{ backgroundColor: theme.card }}
              className='flex-row items-center justify-around py-4 rounded-2xl'
            >
              {[
                { icon: "ribbon", label: "Pedigree" },
                { icon: "shield-checkmark", label: "Aşılı" },
                { icon: "heart", label: "Sağlıklı" },
              ].map((item, index, arr) => (
                <React.Fragment key={index}>
                  <View className='flex-row items-center gap-2'>
                    <Ionicons name={item.icon} size={20} color={theme.accent} />
                    <Text style={{ color: theme.text, fontSize: 13, fontWeight: "600" }}>{item.label}</Text>
                  </View>
                  {index < arr.length - 1 && <View style={{ width: 1, height: 24, backgroundColor: theme.border }} />}
                </React.Fragment>
              ))}
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
            {activeTab === "info" && renderInfoTab()}
            {activeTab === "pedigree" && renderPedigreeTab()}
            {activeTab === "health" && renderHealthTab()}
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
        <View className='flex-row items-center gap-3'>
          <TouchableOpacity
            style={{
              width: 56,
              height: 56,
              borderWidth: 2,
              borderColor: theme.accent + "40",
              backgroundColor: theme.bg,
            }}
            className='rounded-full items-center justify-center'
            accessibilityLabel='Paylaş'
            accessibilityRole='button'
          >
            <Ionicons name='share-social-outline' size={24} color={theme.accent} />
          </TouchableOpacity>

          <LinearGradient
            colors={[theme.accent, theme.accent + "DD"]}
            style={{ flex: 1, height: 56, borderRadius: 28 }}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
          >
            <TouchableOpacity
              style={{ flex: 1 }}
              className='flex-row items-center justify-center gap-2'
              accessibilityLabel='İletişime geç'
              accessibilityRole='button'
            >
              <Ionicons name='chatbubble' size={20} color='#FFF' />
              <Text style={{ color: "#FFF", fontSize: 16, fontWeight: "700" }}>İletişime Geç</Text>
            </TouchableOpacity>
          </LinearGradient>

          <TouchableOpacity
            style={{
              width: 56,
              height: 56,
              borderWidth: 2,
              borderColor: theme.accent + "40",
              backgroundColor: theme.bg,
            }}
            className='rounded-full items-center justify-center'
            onPress={handleFavorite}
            accessibilityLabel='Favorilere ekle'
            accessibilityRole='button'
          >
            <Ionicons name={isFavorite ? "heart" : "heart-outline"} size={24} color={theme.accent} />
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaContainer>
  );
};

export default BreedingDetailScreen;
