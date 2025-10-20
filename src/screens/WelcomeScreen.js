// src/screens/WelcomeScreen.js
import React, { useState, useRef, useEffect } from "react";
import { View, Text, Dimensions, TouchableOpacity, ScrollView, Platform, Animated } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { Ionicons } from "@expo/vector-icons";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import SafeLayout from "../components/layout/SafeLayout";

const { width } = Dimensions.get("window");

const WelcomeScreen = ({ navigation }) => {
  const [currentPage, setCurrentPage] = useState(0);
  const scrollViewRef = useRef(null);
  const insets = useSafeAreaInsets();
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(50)).current;

  const onboardingData = [
    {
      id: 1,
      title: "Patili Dostlarınızı\nBağlayın",
      description: "Çevrenizdeki evcil hayvan sahipleriyle tanışın ve dostluklar kurun",
      gradient: ["#667eea", "#764ba2"],
      illustration: "🐾",
      features: ["Yakınınızdaki kullanıcılar", "Güvenli mesajlaşma", "Topluluk etkinlikleri"],
    },
    {
      id: 2,
      title: "Sağlıklı Eşleştirme\nİçin",
      description: "Profesyonel rehberlik ile güvenilir çiftleştirme hizmetleri",
      gradient: ["#DA4453", "#89216B"],
      illustration: "💝",
      features: ["Sağlık takibi", "Uzman danışmanlık", "Güvenli ortam"],
    },
    {
      id: 3,
      title: "Yeni Dostlar\nEdinin",
      description: "Yuva arayan sevimli dostları keşfedin ve sahiplenin",
      gradient: ["#ad5389", "#3c1053"],
      illustration: "🏡",
      features: ["Onaylı sahiplendirme", "Ücretsiz ilan", "Takip sistemi"],
    },
    {
      id: 4,
      title: "Premium Bakım\nHizmeti",
      description: "5 yıldızlı pet otelleri ve profesyonel bakım hizmetleri",
      gradient: ["#30cfd0", "#330867"],
      illustration: "⭐",
      features: ["7/24 bakım", "Kamera izleme", "Özel menü"],
    },
    {
      id: 5,
      title: "Veteriner\nRandevusu",
      description: "Uzman veteriner hekimlere anında randevu alın",
      gradient: ["#8E2DE2", "#4A00E0"],
      illustration: "🩺",
      features: ["Online konsültasyon", "Acil durumlar", "Aşı takibi"],
    },
    {
      id: 6,
      title: "Hadi\nBaşlayalım!",
      description: "Evcil hayvan bakımında yeni bir deneyime hazır mısınız?",
      gradient: ["#7303c0", "#ec38bc","#03001e"],
      illustration: "🚀",
      features: ["Ücretsiz üyelik", "Anlık bildirimler", "7/24 destek"],
    },
  ];

  useEffect(() => {
    // sayfa değişince basit giriş animasyonu
    fadeAnim.setValue(0);
    slideAnim.setValue(50);
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 600,
        useNativeDriver: true,
      }),
      Animated.spring(slideAnim, {
        toValue: 0,
        tension: 50,
        friction: 7,
        useNativeDriver: true,
      }),
    ]).start();
  }, [currentPage]);

  const handleScroll = event => {
    const scrollPosition = event.nativeEvent.contentOffset.x;
    const page = Math.round(scrollPosition / width);
    if (page !== currentPage) setCurrentPage(page);
  };

  const goToNextPage = () => {
    if (currentPage < onboardingData.length - 1) {
      const nextPage = currentPage + 1;
      scrollViewRef.current?.scrollTo({ x: nextPage * width, animated: true });
    } else {
      navigation.replace("Login");
    }
  };

  const skipOnboarding = () => {
    navigation.replace("Login");
  };

  const currentGradient = onboardingData[currentPage].gradient;
  const headerBgColor = currentGradient[0]; // üst bant rengi (SafeLayout bunu uygular)

  return (
    <SafeLayout backgroundColor={headerBgColor} footer={null}>
      <LinearGradient
        colors={currentGradient}
        className='flex-1 w-full h-full'
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
      >
        {/* Header + Skip */}
        <View className='px-6 flex-row justify-between items-center pt-4'>
          <View className='bg-white/20 px-4 py-2 rounded-full'>
            <Text className='text-white text-sm font-semibold'>
              {currentPage + 1} / {onboardingData.length}
            </Text>
          </View>
          {currentPage < onboardingData.length - 1 && (
            <TouchableOpacity onPress={skipOnboarding} className='bg-white/20 px-5 py-2.5 rounded-full'>
              <Text className='text-white text-sm font-bold'>Atla</Text>
            </TouchableOpacity>
          )}
        </View>

        {/* Pages */}
        <ScrollView
          ref={scrollViewRef}
          horizontal
          pagingEnabled
          showsHorizontalScrollIndicator={false}
          onScroll={handleScroll}
          scrollEventThrottle={16}
        >
          {onboardingData.map((item, index) => (
            <View key={item.id} className='px-8 pt-10 pb-5' style={{ width }}>
              {/* Illustration */}
              <Animated.View
                className='items-center mb-10'
                style={{
                  opacity: currentPage === index ? fadeAnim : 0.3,
                  transform: [{ translateY: currentPage === index ? slideAnim : 50 }],
                }}
              >
                <View className='w-[180px] h-[180px] rounded-full bg-white/25 justify-center items-center mb-5'>
                  <Text style={{ fontSize: 100 }}>{item.illustration}</Text>
                </View>
                <View className='bg-white/30 w-15 h-15 rounded-full justify-center items-center'></View>
              </Animated.View>

              {/* Content */}
              <Animated.View
                style={{
                  opacity: currentPage === index ? fadeAnim : 0.3,
                  transform: [{ translateY: currentPage === index ? slideAnim : 50 }],
                }}
              >
                <Text className='text-4xl font-extrabold text-white text-center mb-4 leading-[44px]'>
                  {item.title}
                </Text>
                <Text className='text-[17px] text-white/90 text-center leading-[26px] mb-8'>{item.description}</Text>

                <View className='gap-2'>
                  {item.features.map((feature, idx) => (
                    <View key={idx} className='flex-row items-center bg-white/15 px-4 py-2 rounded-xl'>
                      <View className='w-2 h-2 rounded-sm bg-white mr-3' />
                      <Text className='text-white text-[15px] font-semibold'>{feature}</Text>
                    </View>
                  ))}
                </View>
              </Animated.View>
            </View>
          ))}
        </ScrollView>

        {/* Bottom */}
        <View className='px-8' style={{ paddingBottom: Math.max(insets.bottom + 16, 40) }}>
          {/* Dots */}
          <View className='flex-row justify-center items-center mb-6 gap-2'>
            {onboardingData.map((_, index) => (
              <View
                key={index}
                className='h-2 rounded'
                style={{
                  width: currentPage === index ? 32 : 8,
                  backgroundColor: currentPage === index ? "white" : "rgba(255,255,255,0.4)",
                }}
              />
            ))}
          </View>

          {/* CTA */}
          <TouchableOpacity
            onPress={goToNextPage}
            className='bg-white rounded-2xl py-[18px] flex-row items-center justify-center shadow-lg'
            style={{
              shadowColor: "#000",
              shadowOffset: { width: 0, height: 4 },
              shadowOpacity: 0.3,
              shadowRadius: 8,
              elevation: 8,
            }}
            activeOpacity={0.8}
          >
            <Text className='text-lg font-bold mr-2' style={{ color: currentGradient[1] }}>
              {currentPage === onboardingData.length - 1 ? "Başlayalım" : "Devam Et"}
            </Text>
            <Ionicons
              name={currentPage === onboardingData.length - 1 ? "checkmark-circle" : "arrow-forward"}
              size={24}
              color={currentGradient[1]}
            />
          </TouchableOpacity>
        </View>
      </LinearGradient>
    </SafeLayout>
  );
};

export default WelcomeScreen;
