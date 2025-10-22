import React, { useRef } from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StatusBar,
  Animated,
  Pressable,
  Dimensions,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import SafeAreaContainer from "../components/shared/SafeAreaContainer";

const { width } = Dimensions.get("window");

const CreateListingScreen = ({ navigation }) => {
  const insets = useSafeAreaInsets();

  const listingTypes = [
    {
      id: "playmate",
      title: "Oyun Arkadaşı",
      description: "Evcil hayvanın için oyun arkadaşı bul",
      icon: "paw",
      color: "#9333EA",
      gradient: ["#9333EA", "#7C3AED"],
      colorLight: "#F3E8FF",
      route: "CreatePlayMate",
    },
    {
      id: "breeding",
      title: "Çiftleştirme",
      description: "Uygun eş adayı ara veya ilan ver",
      icon: "heart",
      color: "#DB2777",
      gradient: ["#DB2777", "#BE185D"],
      colorLight: "#FCE7F3",
      route: "CreateBreeding",
    },
    {
      id: "adoption",
      title: "Sahiplendirme",
      description: "Evcil hayvan sahiplendir veya sahiplen",
      icon: "home",
      color: "#0891B2",
      gradient: ["#0891B2", "#0E7490"],
      colorLight: "#CFFAFE",
      route: "CreateAdoption",
    },
    {
      id: "hotel",
      title: "Otel & Bakım",
      description: "Otel veya bakım hizmeti ver",
      icon: "bed",
      color: "#06B6D4",
      gradient: ["#06B6D4", "#0891B2"],
      colorLight: "#CFFAFE",
      route: "CreateHotelCare",
    },
    {
      id: "veterinary",
      title: "Veteriner",
      description: "Veteriner hizmeti sun",
      icon: "medical",
      color: "#2563EB",
      gradient: ["#2563EB", "#1D4ED8"],
      colorLight: "#DBEAFE",
      route: "CreateVeterinary",
    },
    {
      id: "grooming",
      title: "Pet Kuaför",
      description: "Kuaför ve bakım hizmeti ver",
      icon: "cut",
      color: "#8B5CF6",
      gradient: ["#8B5CF6", "#7C3AED"],
      colorLight: "#EDE9FE",
      route: "CreateGrooming",
    },
  ];

  const ListingCard = ({ item }) => {
    const scale = useRef(new Animated.Value(1)).current;

    const handlePressIn = () => {
      Animated.spring(scale, {
        toValue: 0.96,
        friction: 6,
        useNativeDriver: true,
      }).start();
    };

    const handlePressOut = () => {
      Animated.spring(scale, {
        toValue: 1,
        friction: 6,
        useNativeDriver: true,
      }).start();
    };

    const handlePress = () => {
      // Navigate to specific create form
      navigation.navigate(item.route);
    };

    return (
      <Animated.View
        style={{
          transform: [{ scale }],
          width: (width - 48) / 2,
          marginBottom: 16,
        }}
      >
        <Pressable
          onPress={handlePress}
          onPressIn={handlePressIn}
          onPressOut={handlePressOut}
        >
          <LinearGradient
            colors={item.gradient}
            style={{
              borderRadius: 20,
              padding: 20,
              minHeight: 200,
              shadowColor: item.color,
              shadowOffset: { width: 0, height: 4 },
              shadowOpacity: 0.3,
              shadowRadius: 12,
              elevation: 6,
            }}
          >
            {/* Icon Container */}
            <View
              style={{
                width: 64,
                height: 64,
                borderRadius: 18,
                backgroundColor: "rgba(255, 255, 255, 0.25)",
                alignItems: "center",
                justifyContent: "center",
                marginBottom: 16,
              }}
            >
              <Ionicons name={item.icon} size={32} color="#FFF" />
            </View>

            {/* Content */}
            <View style={{ flex: 1 }}>
              <Text
                style={{
                  fontSize: 18,
                  fontWeight: "700",
                  color: "#FFF",
                  marginBottom: 8,
                }}
                numberOfLines={2}
              >
                {item.title}
              </Text>
              <Text
                style={{
                  fontSize: 13,
                  color: "rgba(255, 255, 255, 0.85)",
                  lineHeight: 18,
                }}
                numberOfLines={3}
              >
                {item.description}
              </Text>
            </View>

            {/* Arrow Icon */}
            <View
              style={{
                position: "absolute",
                bottom: 20,
                right: 20,
                width: 36,
                height: 36,
                borderRadius: 18,
                backgroundColor: "rgba(255, 255, 255, 0.25)",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Ionicons name="arrow-forward" size={18} color="#FFF" />
            </View>
          </LinearGradient>
        </Pressable>
      </Animated.View>
    );
  };

  return (
    <SafeAreaContainer bgColor="#F9FAFB" edges={["top"]}>
      <StatusBar barStyle="light-content" backgroundColor="transparent" translucent />

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 100 }}
      >
        {/* Header with Gradient */}
        <LinearGradient
          colors={["#06B6D4", "#0891B2"]}
          style={{
            paddingTop: insets.top + 16,
            paddingBottom: 32,
            paddingHorizontal: 20,
            borderBottomLeftRadius: 24,
            borderBottomRightRadius: 24,
          }}
        >
          {/* Top Bar */}
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
              marginBottom: 24,
            }}
          >
            <TouchableOpacity
              onPress={() => navigation.goBack()}
              style={{
                width: 40,
                height: 40,
                borderRadius: 12,
                backgroundColor: "rgba(255, 255, 255, 0.2)",
                alignItems: "center",
                justifyContent: "center",
              }}
              activeOpacity={0.8}
            >
              <Ionicons name="close" size={24} color="#FFF" />
            </TouchableOpacity>

            <Text style={{ fontSize: 18, fontWeight: "700", color: "#FFF" }}>
              Yeni İlan Oluştur
            </Text>

            <View style={{ width: 40 }} />
          </View>

          {/* Hero Content */}
          <View style={{ alignItems: "center" }}>
            <View
              style={{
                width: 80,
                height: 80,
                borderRadius: 40,
                backgroundColor: "rgba(255, 255, 255, 0.2)",
                alignItems: "center",
                justifyContent: "center",
                marginBottom: 16,
              }}
            >
              <Ionicons name="add-circle" size={50} color="#FFF" />
            </View>
            <Text
              style={{
                fontSize: 24,
                fontWeight: "700",
                color: "#FFF",
                marginBottom: 8,
              }}
            >
              Hangi kategoride ilan oluşturmak istersiniz?
            </Text>
            <Text
              style={{
                fontSize: 14,
                color: "rgba(255, 255, 255, 0.85)",
                textAlign: "center",
                lineHeight: 20,
              }}
            >
              Aşağıdaki kategorilerden birini seçerek hemen ilan oluşturmaya başlayın
            </Text>
          </View>
        </LinearGradient>

        {/* Info Banner */}
        <View style={{ paddingHorizontal: 20, marginTop: 24, marginBottom: 8 }}>
          <View
            style={{
              backgroundColor: "#DBEAFE",
              borderRadius: 16,
              padding: 16,
              flexDirection: "row",
              alignItems: "center",
            }}
          >
            <View
              style={{
                width: 40,
                height: 40,
                borderRadius: 12,
                backgroundColor: "#3B82F6",
                alignItems: "center",
                justifyContent: "center",
                marginRight: 12,
              }}
            >
              <Ionicons name="information-circle" size={24} color="#FFF" />
            </View>
            <View style={{ flex: 1 }}>
              <Text
                style={{
                  fontSize: 13,
                  color: "#1E40AF",
                  lineHeight: 18,
                  fontWeight: "500",
                }}
              >
                İlanlarınız yayınlandıktan sonra binlerce kişi tarafından görüntülenebilir
              </Text>
            </View>
          </View>
        </View>

        {/* Category Selection */}
        <View style={{ paddingHorizontal: 20, marginTop: 16 }}>
          <Text
            style={{
              fontSize: 20,
              fontWeight: "700",
              color: "#0F172A",
              marginBottom: 16,
            }}
          >
            Kategori Seç
          </Text>

          <View
            style={{
              flexDirection: "row",
              flexWrap: "wrap",
              justifyContent: "space-between",
            }}
          >
            {listingTypes.map((item) => (
              <ListingCard key={item.id} item={item} />
            ))}
          </View>
        </View>

        {/* Quick Tips */}
        <View style={{ paddingHorizontal: 20, marginTop: 8 }}>
          <Text
            style={{
              fontSize: 18,
              fontWeight: "700",
              color: "#0F172A",
              marginBottom: 12,
            }}
          >
            💡 İlan Oluştururken
          </Text>
          <View
            style={{
              backgroundColor: "#FFFFFF",
              borderRadius: 16,
              padding: 16,
              shadowColor: "#000",
              shadowOffset: { width: 0, height: 1 },
              shadowOpacity: 0.06,
              shadowRadius: 8,
              elevation: 1,
            }}
          >
            {[
              {
                icon: "camera-outline",
                text: "Net ve kaliteli fotoğraflar kullanın",
                color: "#8B5CF6",
              },
              {
                icon: "document-text-outline",
                text: "Detaylı ve açıklayıcı bilgi verin",
                color: "#06B6D4",
              },
              {
                icon: "checkmark-circle-outline",
                text: "İletişim bilgilerinizi doğru girin",
                color: "#10B981",
              },
              {
                icon: "star-outline",
                text: "Dürüst ve şeffaf olun",
                color: "#F59E0B",
              },
            ].map((tip, index) => (
              <View
                key={index}
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  marginBottom: index < 3 ? 12 : 0,
                }}
              >
                <View
                  style={{
                    width: 36,
                    height: 36,
                    borderRadius: 10,
                    backgroundColor: tip.color + "15",
                    alignItems: "center",
                    justifyContent: "center",
                    marginRight: 12,
                  }}
                >
                  <Ionicons name={tip.icon} size={18} color={tip.color} />
                </View>
                <Text
                  style={{
                    fontSize: 14,
                    color: "#475569",
                    flex: 1,
                    lineHeight: 20,
                  }}
                >
                  {tip.text}
                </Text>
              </View>
            ))}
          </View>
        </View>

        {/* Help Section */}
        <View style={{ paddingHorizontal: 20, marginTop: 24 }}>
          <TouchableOpacity
            onPress={() => navigation.navigate("Help")}
            activeOpacity={0.7}
            style={{
              backgroundColor: "#FFFFFF",
              borderRadius: 16,
              padding: 16,
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
              shadowColor: "#000",
              shadowOffset: { width: 0, height: 1 },
              shadowOpacity: 0.06,
              shadowRadius: 8,
              elevation: 1,
            }}
          >
            <View style={{ flexDirection: "row", alignItems: "center", flex: 1 }}>
              <View
                style={{
                  width: 40,
                  height: 40,
                  borderRadius: 12,
                  backgroundColor: "#DBEAFE",
                  alignItems: "center",
                  justifyContent: "center",
                  marginRight: 12,
                }}
              >
                <Ionicons name="help-circle-outline" size={24} color="#3B82F6" />
              </View>
              <View style={{ flex: 1 }}>
                <Text
                  style={{
                    fontSize: 15,
                    fontWeight: "600",
                    color: "#0F172A",
                    marginBottom: 2,
                  }}
                >
                  Yardıma mı ihtiyacınız var?
                </Text>
                <Text style={{ fontSize: 13, color: "#64748B" }}>
                  İlan oluşturma rehberine göz atın
                </Text>
              </View>
            </View>
            <Ionicons name="chevron-forward" size={20} color="#94A3B8" />
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaContainer>
  );
};

export default CreateListingScreen;
