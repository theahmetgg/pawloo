import React, { useMemo, useRef, useEffect, useState, useCallback } from "react";
import { useFocusEffect } from "@react-navigation/native";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Pressable,
  Animated,
  Dimensions,
  StatusBar,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import SafeAreaContainer from "../components/shared/SafeAreaContainer";
import useThemeColors from "../hooks/useThemeColors";

const { width } = Dimensions.get("window");

const HomeScreen = ({ navigation }) => {
  const theme = useThemeColors();

  // ---- VERİ (tek yerde) ----
  const MODULES = useMemo(
    () => [
      {
        id: "playmate",
        title: "Oyun Arkadaşı",
        desc: "Yakınında aktif ilanlar",
        icon: "paw",
        iconOutline: "paw-outline",
        color: "#9333EA",
        colorLight: "#F3E8FF",
        route: "PlayMate",
        badge: "124",
        group: "topluluk",
      },
      {
        id: "breeding",
        title: "Çiftleştirme",
        desc: "Uygun eş adayları",
        icon: "heart",
        iconOutline: "heart-outline",
        color: "#DB2777",
        colorLight: "#FCE7F3",
        route: "Breeding",
        badge: "48",
        group: "topluluk",
      },
      {
        id: "adoption",
        title: "Sahiplen",
        desc: "Yeni bir yuva ver",
        icon: "home",
        iconOutline: "home-outline",
        color: "#0891B2",
        colorLight: "#CFFAFE",
        route: "Adoption",
        badge: "76",
        group: "topluluk",
      },
      {
        id: "hotel",
        title: "Otel & Bakım",
        desc: "Güvenli konaklama",
        icon: "bed",
        iconOutline: "bed-outline",
        color: "#06B6D4",
        colorLight: "#CFFAFE",
        route: "HotelCare",
        badge: "4.7★",
        group: "hizmet",
      },
      {
        id: "vet",
        title: "Veteriner",
        desc: "Sağlık & Acil",
        icon: "medical",
        iconOutline: "medical-outline",
        color: "#2563EB",
        colorLight: "#DBEAFE",
        route: "Veterinary",
        badge: "4.9★",
        group: "hizmet",
      },
      {
        id: "groom",
        title: "Kuaför",
        desc: "Bakım & Temizlik",
        icon: "cut",
        iconOutline: "cut-outline",
        color: "#8B5CF6",
        colorLight: "#EDE9FE",
        route: "PetGrooming",
        badge: "4.5★",
        group: "hizmet",
      },
    ],
    []
  );

  // --- İstatistik state ---
  const [stats, setStats] = useState({ total: 0, today: 0, nearbyKm: 5 });
  const [loadingStats, setLoadingStats] = useState(false);

  // --- Örnek: API'den çek (varsa) ya da MODULES'den türet ---
  const fetchStats = useCallback(async () => {
    setLoadingStats(true);
    try {
      const totalFromModules = MODULES.reduce((sum, m) => {
        const n = Number((m.badge || "").toString().replace(/[^\d]/g, ""));
        return sum + (isNaN(n) ? 0 : n);
      }, 0);
      const todayFromApiOrZero = 12;
      setStats({ total: totalFromModules, today: todayFromApiOrZero, nearbyKm: 5 });
    } catch (e) {
      const totalFallback = MODULES.reduce(
        (s, m) => s + (Number((m.badge || "").toString().replace(/[^\d]/g, "")) || 0),
        0
      );
      setStats({ total: totalFallback, today: 0, nearbyKm: 5 });
    } finally {
      setLoadingStats(false);
    }
  }, [MODULES]);

  useEffect(() => {
    fetchStats();
  }, [fetchStats]);

  useFocusEffect(
    useCallback(() => {
      fetchStats();
    }, [fetchStats])
  );

  // ---- El sallama animasyonu ----
  const wave = useRef(new Animated.Value(0)).current;
  useEffect(() => {
    const loop = Animated.loop(
      Animated.sequence([
        Animated.timing(wave, { toValue: 1, duration: 320, useNativeDriver: true }),
        Animated.timing(wave, { toValue: -1, duration: 320, useNativeDriver: true }),
        Animated.timing(wave, { toValue: 0, duration: 280, useNativeDriver: true }),
        Animated.delay(1200),
      ])
    );
    loop.start();
    return () => loop.stop();
  }, [wave]);
  const rotate = wave.interpolate({ inputRange: [-1, 1], outputRange: ["-14deg", "14deg"] });

  // ---- Kategori filtresi ----
  const [activeCat, setActiveCat] = useState("tümü");
  const filteredModules = useMemo(
    () => (activeCat === "tümü" ? MODULES : MODULES.filter(m => m.group === activeCat)),
    [activeCat, MODULES]
  );

  // ---- Premium Kart ----
  const ModuleCard = ({ item, onPress }) => {
    const scale = useRef(new Animated.Value(1)).current;
    const handleIn = () => Animated.spring(scale, { toValue: 0.96, friction: 6, useNativeDriver: true }).start();
    const handleOut = () => Animated.spring(scale, { toValue: 1, friction: 6, useNativeDriver: true }).start();

    return (
      <Animated.View style={{ transform: [{ scale }], width: (width - 48) / 2, marginBottom: 16 }}>
        <Pressable onPress={onPress} onPressIn={handleIn} onPressOut={handleOut}>
          <View
            style={{
              backgroundColor: "#FFFFFF",
              borderRadius: 20,
              padding: 16,
              minHeight: 180,
              shadowColor: "#000",
              shadowOffset: { width: 0, height: 2 },
              shadowOpacity: 0.08,
              shadowRadius: 12,
              elevation: 3,
            }}
          >
            {/* Icon Container */}
            <View
              style={{
                width: 56,
                height: 56,
                borderRadius: 16,
                backgroundColor: item.colorLight,
                alignItems: "center",
                justifyContent: "center",
                marginBottom: 12,
              }}
            >
              <Ionicons name={item.icon} size={28} color={item.color} />
            </View>

            {/* Badge */}
            {!!item.badge && (
              <View
                style={{
                  position: "absolute",
                  top: 16,
                  right: 16,
                  backgroundColor: item.colorLight,
                  paddingHorizontal: 8,
                  paddingVertical: 4,
                  borderRadius: 12,
                }}
              >
                <Text style={{ fontSize: 11, fontWeight: "700", color: item.color }}>
                  {item.badge}
                </Text>
              </View>
            )}

            {/* Title */}
            <Text
              style={{
                fontSize: 17,
                fontWeight: "700",
                color: "#0F172A",
                marginBottom: 4,
              }}
              numberOfLines={1}
            >
              {item.title}
            </Text>

            {/* Description */}
            <Text
              style={{
                fontSize: 13,
                color: "#64748B",
                lineHeight: 18,
              }}
              numberOfLines={2}
            >
              {item.desc}
            </Text>

            {/* Arrow Icon */}
            <View
              style={{
                position: "absolute",
                bottom: 16,
                right: 16,
                width: 32,
                height: 32,
                borderRadius: 16,
                backgroundColor: item.colorLight,
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Ionicons name="arrow-forward" size={16} color={item.color} />
            </View>
          </View>
        </Pressable>
      </Animated.View>
    );
  };

  // ---- Quick Action Card ----
  const QuickActionCard = ({ icon, label, color, onPress }) => (
    <TouchableOpacity
      onPress={onPress}
      style={{
        width: (width - 64) / 4,
        alignItems: "center",
      }}
      activeOpacity={0.7}
    >
      <View
        style={{
          width: 56,
          height: 56,
          borderRadius: 16,
          backgroundColor: color + "15",
          alignItems: "center",
          justifyContent: "center",
          marginBottom: 8,
        }}
      >
        <Ionicons name={icon} size={24} color={color} />
      </View>
      <Text
        style={{
          fontSize: 12,
          fontWeight: "600",
          color: "#475569",
          textAlign: "center",
        }}
        numberOfLines={2}
      >
        {label}
      </Text>
    </TouchableOpacity>
  );

  return (
    <SafeAreaContainer bgColor="#F9FAFB" edges={["top"]}>
      <StatusBar barStyle="dark-content" backgroundColor="transparent" translucent />

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 100 }}
      >
        {/* HERO SECTION */}
        <View style={{ paddingHorizontal: 20, paddingTop: 16, paddingBottom: 24 }}>
          {/* Header */}
          <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between", marginBottom: 24 }}>
            <View style={{ flex: 1, marginRight: 12 }}>
              <View style={{ flexDirection: "row", alignItems: "center", marginBottom: 4 }}>
                <Text style={{ fontSize: 16, color: "#64748B" }}>Hoş geldin</Text>
                <Animated.Text style={{ transform: [{ rotate }], fontSize: 18, marginLeft: 6 }}>
                  👋
                </Animated.Text>
              </View>
              <Text
                style={{ fontSize: 28, fontWeight: "700", color: "#0F172A" }}
                numberOfLines={1}
              >
                Ahmet
              </Text>
            </View>

            {/* Location & Profile */}
            <View style={{ flexDirection: "row", alignItems: "center", gap: 8 }}>
              <TouchableOpacity
                onPress={() => navigation.navigate("LocationPicker")}
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  backgroundColor: "#06B6D4",
                  paddingHorizontal: 12,
                  paddingVertical: 8,
                  borderRadius: 12,
                }}
                activeOpacity={0.8}
              >
                <Ionicons name="location" size={16} color="#FFF" />
                <Text
                  style={{ fontSize: 13, color: "#FFF", fontWeight: "600", marginLeft: 4 }}
                  numberOfLines={1}
                >
                  İstanbul
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                onPress={() => navigation.navigate("Profile")}
                style={{
                  width: 40,
                  height: 40,
                  borderRadius: 12,
                  backgroundColor: "#FFFFFF",
                  alignItems: "center",
                  justifyContent: "center",
                  shadowColor: "#000",
                  shadowOffset: { width: 0, height: 2 },
                  shadowOpacity: 0.08,
                  shadowRadius: 8,
                  elevation: 2,
                }}
                activeOpacity={0.8}
              >
                <Ionicons name="person" size={20} color="#64748B" />
              </TouchableOpacity>
            </View>
          </View>

          {/* Search Bar */}
          <TouchableOpacity
            onPress={() => navigation.navigate("Search")}
            activeOpacity={0.9}
            style={{
              flexDirection: "row",
              alignItems: "center",
              backgroundColor: "#FFFFFF",
              borderRadius: 16,
              paddingHorizontal: 16,
              paddingVertical: 14,
              shadowColor: "#000",
              shadowOffset: { width: 0, height: 2 },
              shadowOpacity: 0.08,
              shadowRadius: 12,
              elevation: 2,
            }}
          >
            <Ionicons name="search-outline" size={20} color="#06B6D4" />
            <Text style={{ fontSize: 15, color: "#94A3B8", marginLeft: 12 }}>
              Can dostuna ne arıyorsun?
            </Text>
          </TouchableOpacity>

          {/* Stats Cards */}
          <View style={{ flexDirection: "row", marginTop: 20, gap: 12 }}>
            {[
              {
                id: "s1",
                label: "Toplam İlan",
                value: loadingStats ? "..." : String(stats.total),
                icon: "grid-outline",
                color: "#06B6D4",
              },
              {
                id: "s2",
                label: "Bugün Yeni",
                value: loadingStats ? "..." : String(stats.today),
                icon: "flash-outline",
                color: "#F59E0B",
              },
              {
                id: "s3",
                label: "Yakınında",
                value: loadingStats ? "..." : `${stats.nearbyKm} km`,
                icon: "navigate-outline",
                color: "#10B981",
              },
            ].map(s => (
              <View key={s.id} style={{ flex: 1 }}>
                <View
                  style={{
                    backgroundColor: "#FFFFFF",
                    borderRadius: 16,
                    padding: 12,
                    shadowColor: "#000",
                    shadowOffset: { width: 0, height: 1 },
                    shadowOpacity: 0.06,
                    shadowRadius: 8,
                    elevation: 1,
                  }}
                >
                  <View
                    style={{
                      width: 32,
                      height: 32,
                      borderRadius: 10,
                      backgroundColor: s.color + "15",
                      alignItems: "center",
                      justifyContent: "center",
                      marginBottom: 8,
                    }}
                  >
                    <Ionicons name={s.icon} size={16} color={s.color} />
                  </View>
                  <Text style={{ fontSize: 20, fontWeight: "700", color: "#0F172A", marginBottom: 2 }}>
                    {s.value}
                  </Text>
                  <Text style={{ fontSize: 11, color: "#64748B" }} numberOfLines={1}>
                    {s.label}
                  </Text>
                </View>
              </View>
            ))}
          </View>
        </View>

        {/* Quick Actions */}
        <View style={{ paddingHorizontal: 20, marginBottom: 24 }}>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
              marginBottom: 16,
            }}
          >
            <Text style={{ fontSize: 20, fontWeight: "700", color: "#0F172A" }}>
              Hızlı Erişim
            </Text>
          </View>

          <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
            <QuickActionCard
              icon="heart-outline"
              label="Favoriler"
              color="#DB2777"
              onPress={() => navigation.navigate("Favorites")}
            />
            <QuickActionCard
              icon="chatbubbles-outline"
              label="Mesajlar"
              color="#06B6D4"
              onPress={() => navigation.navigate("Messages")}
            />
            <QuickActionCard
              icon="calendar-outline"
              label="Randevular"
              color="#8B5CF6"
              onPress={() => navigation.navigate("Appointments")}
            />
            <QuickActionCard
              icon="notifications-outline"
              label="Bildirimler"
              color="#F59E0B"
              onPress={() => navigation.navigate("Notifications")}
            />
          </View>
        </View>

        {/* Category Tabs */}
        <View style={{ paddingHorizontal: 20, marginBottom: 16 }}>
          <Text style={{ fontSize: 20, fontWeight: "700", color: "#0F172A", marginBottom: 16 }}>
            Kategoriler
          </Text>

          <View
            style={{
              flexDirection: "row",
              backgroundColor: "#FFFFFF",
              borderRadius: 12,
              padding: 4,
              shadowColor: "#000",
              shadowOffset: { width: 0, height: 1 },
              shadowOpacity: 0.06,
              shadowRadius: 8,
              elevation: 1,
            }}
          >
            {[
              { id: "tümü", label: "Tümü" },
              { id: "topluluk", label: "Topluluk" },
              { id: "hizmet", label: "Hizmetler" },
            ].map(cat => {
              const active = activeCat === cat.id;
              return (
                <Pressable
                  key={cat.id}
                  onPress={() => setActiveCat(cat.id)}
                  style={{ flex: 1 }}
                >
                  <View
                    style={{
                      paddingVertical: 10,
                      paddingHorizontal: 16,
                      borderRadius: 8,
                      backgroundColor: active ? "#06B6D4" : "transparent",
                      alignItems: "center",
                    }}
                  >
                    <Text
                      style={{
                        fontSize: 14,
                        fontWeight: "600",
                        color: active ? "#FFFFFF" : "#64748B",
                      }}
                    >
                      {cat.label}
                    </Text>
                  </View>
                </Pressable>
              );
            })}
          </View>
        </View>

        {/* Modules Grid */}
        <View style={{ paddingHorizontal: 20 }}>
          <View
            style={{
              flexDirection: "row",
              flexWrap: "wrap",
              justifyContent: "space-between",
            }}
          >
            {filteredModules.map(item => (
              <ModuleCard
                key={item.id}
                item={item}
                onPress={() => navigation.navigate(item.route)}
              />
            ))}
          </View>
        </View>
      </ScrollView>

      {/* FAB Button */}
      <View style={{ position: "absolute", right: 20, bottom: 90 }}>
        <TouchableOpacity
          onPress={() => navigation.navigate("CreateListing")}
          activeOpacity={0.9}
        >
          <LinearGradient
            colors={["#06B6D4", "#0891B2"]}
            style={{
              width: 56,
              height: 56,
              borderRadius: 28,
              alignItems: "center",
              justifyContent: "center",
              shadowColor: "#06B6D4",
              shadowOffset: { width: 0, height: 4 },
              shadowOpacity: 0.4,
              shadowRadius: 12,
              elevation: 8,
            }}
          >
            <Ionicons name="add" size={28} color="#FFF" />
          </LinearGradient>
        </TouchableOpacity>
      </View>
    </SafeAreaContainer>
  );
};

export default HomeScreen;
