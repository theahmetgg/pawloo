import React, { useMemo, useRef, useEffect, useState, useCallback } from "react";
import { useFocusEffect } from "@react-navigation/native";

import { View, Text, FlatList, TouchableOpacity, Pressable, Animated } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import SafeAreaContainer from "../components/layout/SafeAreaContainer";

const HomeScreen = ({ navigation }) => {
  // ---- VERİ (tek yerde) ----
  const MODULES = useMemo(
    () => [
      {
        id: "playmate",
        title: "Oyun Arkadaşı",
        desc: "Yakınında aktif ilanlar",
        icon: "paw",
        color: "#9333EA",
        route: "PlayMate",
        badge: "124",
        group: "topluluk",
      },
      {
        id: "breeding",
        title: "Çiftleştirme",
        desc: "Uygun eş adayları",
        icon: "heart",
        color: "#DB2777",
        route: "Breeding",
        badge: "48",
        group: "topluluk",
      },
      {
        id: "adoption",
        title: "Sahiplen",
        desc: "Yeni bir yuva ver",
        icon: "home",
        color: "#0891B2",
        route: "Adoption",
        badge: "76",
        group: "topluluk",
      },
      {
        id: "hotel",
        title: "Otel",
        desc: "Güvenli konaklama",
        icon: "bed",
        color: "#D97706",
        route: "HotelCare",
        badge: "4.7★",
        group: "hizmet",
      },
      {
        id: "vet",
        title: "Veteriner",
        desc: "Sağlık & Acil",
        icon: "medical",
        color: "#2563EB",
        route: "Veterinary",
        badge: "4.9★",
        group: "hizmet",
      },
      {
        id: "groom",
        title: "Kuaför",
        desc: "Bakım & Temizlik",
        icon: "cut",
        color: "#9333EA",
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
      // 🔁 Burayı kendi endpoint'inle değiştir
      // Ör: const res = await fetch(`${API_URL}/mobile/stats?radiusKm=5`);
      // const json = await res.json();
      // setStats({ total: json.totalListings, today: json.todayListings, nearbyKm: json.nearbyRadiusKm });

      // 🔁 Şimdilik fallback: MODULES'teki sayı etiketlerinden toplamı türet
      const totalFromModules = MODULES.reduce((sum, m) => {
        const n = Number((m.badge || "").toString().replace(/[^\d]/g, ""));
        return sum + (isNaN(n) ? 0 : n);
      }, 0);

      // Bugün için placeholder (API yoksa 0 kalır)
      const todayFromApiOrZero = 0;

      setStats({ total: totalFromModules, today: todayFromApiOrZero, nearbyKm: 5 });
    } catch (e) {
      // Hata olursa en azından bir fallback göster
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

  // ---- Helpers ----
  const withAlpha = (hex, alpha = 0.14) => {
    const c = hex.replace("#", "");
    const r = parseInt(c.slice(0, 2), 16);
    const g = parseInt(c.slice(2, 4), 16);
    const b = parseInt(c.slice(4, 6), 16);
    return `rgba(${r}, ${g}, ${b}, ${alpha})`;
  };

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
  }, []);
  const rotate = wave.interpolate({ inputRange: [-1, 1], outputRange: ["-14deg", "14deg"] });

  // ---- Kategori filtresi ----
  const [activeCat, setActiveCat] = useState("tümü"); // "tümü" | "topluluk" | "hizmet"
  const filteredModules = useMemo(
    () => (activeCat === "tümü" ? MODULES : MODULES.filter(m => m.group === activeCat)),
    [activeCat, MODULES]
  );

  // ---- Grid ----
  const numColumns = 2;
  const keyExtractor = item => item.id;

  // ---- Premium Kart ----
  const Card = ({ item, onPress }) => {
    const scale = useRef(new Animated.Value(1)).current;
    const handleIn = () => Animated.spring(scale, { toValue: 0.97, friction: 6, useNativeDriver: true }).start();
    const handleOut = () => Animated.spring(scale, { toValue: 1, friction: 6, useNativeDriver: true }).start();

    return (
      <Animated.View style={{ transform: [{ scale }] }} className='mb-3'>
        <Pressable
          onPress={onPress}
          onPressIn={handleIn}
          onPressOut={handleOut}
          android_ripple={{ color: "#e5e7eb" }}
          className='rounded-3xl overflow-hidden'
        >
          {/* Parıltılı kenar için gradient çerçeve */}
          <LinearGradient
            colors={[withAlpha(item.color, 0.45), withAlpha("#0EA5E9", 0.28), "rgba(255,255,255,0.9)"]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            className='p-[1.5px] rounded-3xl'
          >
            {/* Glass içerik */}
            <View className='rounded-3xl overflow-hidden'>
              <LinearGradient
                colors={["#FFFFFF", withAlpha(item.color, 0.06)]}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
                className='p-4'
              >
                <View
                  className='bg-white/60 rounded-2xl p-4 border'
                  style={{ minHeight: 168, borderColor: withAlpha("#0F172A", 0.06) }}
                >
                  {/* Üst satır: icon halo + badge */}
                  <View className='flex-row items-center justify-between mb-3'>
                    {/* Icon halo */}
                    <LinearGradient
                      colors={[withAlpha(item.color, 0.18), "rgba(255,255,255,0.9)"]}
                      start={{ x: 0, y: 0 }}
                      end={{ x: 1, y: 1 }}
                      className='w-12 h-12 rounded-2xl items-center justify-center'
                    >
                      <View
                        className='w-10 h-10 rounded-2xl items-center justify-center'
                        style={{ backgroundColor: withAlpha(item.color, 0.16) }}
                      >
                        <Ionicons name={item.icon} size={20} color={item.color} />
                      </View>
                    </LinearGradient>

                    {!!item.badge && (
                      <View
                        className='px-2 py-1 rounded-full bg-white/85 border'
                        style={{ borderColor: withAlpha("#0F172A", 0.08) }}
                      >
                        <Text className='text-xs font-semibold text-gray-800'>{item.badge}</Text>
                      </View>
                    )}
                  </View>

                  {/* Başlık + açıklama */}
                  <Text className='text-[17px] font-extrabold text-gray-900' numberOfLines={1}>
                    {item.title}
                  </Text>
                  <Text className='text-sm text-gray-600 mt-1' numberOfLines={2}>
                    {item.desc}
                  </Text>

                  {/* CTA */}
                  <View className='mt-auto pt-3 flex-row items-center'>
                    <Text className='text-sm font-semibold' style={{ color: item.color }}>
                      İçeri gir
                    </Text>
                    <Ionicons name='chevron-forward' size={16} style={{ marginLeft: 4 }} color={item.color} />
                  </View>

                  {/* Yumuşak iç gölge simülasyonu */}
                  <View
                    pointerEvents='none'
                    className='absolute inset-0 rounded-2xl'
                    style={{ borderColor: "transparent", shadowColor: "#000", shadowOpacity: 0.06, shadowRadius: 12 }}
                  />
                </View>
              </LinearGradient>
            </View>
          </LinearGradient>
        </Pressable>
      </Animated.View>
    );
  };

  // ---- Hero / Header ----
  const ListHeader = () => (
    <>
      {/* HERO: gradient + blur blob + stat şeridi */}
      <LinearGradient
        colors={["#E6FFFB", "#FFFFFF"]}
        start={{ x: 0, y: 0 }}
        end={{ x: 0, y: 1 }}
        className='px-5 pt-12 pb-8 rounded-b-3xl'
      >
        {/* dekoratif blob'lar */}
        <View
          className='absolute -top-8 -left-10 w-48 h-48 rounded-full'
          style={{ backgroundColor: "rgba(20, 184, 166, 0.16)" }}
        />
        <View
          className='absolute -bottom-10 right-0 w-52 h-52 rounded-full'
          style={{ backgroundColor: "rgba(147, 51, 234, 0.12)" }}
        />

        <View className='flex-row items-center justify-between mb-6'>
          <View className='flex-1 mr-3'>
            <View className='flex-row items-center'>
              <Text className='text-gray-500 text-md'>Hoş geldin</Text>
              <Animated.Text style={{ transform: [{ rotate }], fontSize: 18, marginLeft: 6 }}>👋</Animated.Text>
            </View>
            <Text className='text-2xl font-extrabold text-gray-900 mt-1' numberOfLines={1}>
              Ahmet
            </Text>
            <Text className='text-sm text-gray-500 mt-1'>Keşfet, bul, randevu al ve daha fazlası</Text>
          </View>

          <TouchableOpacity
            onPress={() => navigation.navigate("LocationPicker")}
            className='flex-row items-center rounded-full px-3 py-2 shadow-sm mr-2'
            activeOpacity={0.9}
            style={{ backgroundColor: "#14B8A6" }}
          >
            <Ionicons name='location' size={16} color='#FFF' />
            <Text className='text-sm text-white font-semibold ml-1' numberOfLines={1}>
              İstanbul, 5 km
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => navigation.navigate("Profile")}
            className='w-10 h-10 rounded-full overflow-hidden bg-gray-200 items-center justify-center'
            activeOpacity={0.9}
          >
            <Ionicons name='person' size={18} color='#64748B' />
          </TouchableOpacity>
        </View>

        {/* arama kutusu */}
        <TouchableOpacity
          onPress={() => navigation.navigate("Search")}
          activeOpacity={0.95}
          className='flex-row items-center bg-white rounded-full px-4 py-3 shadow-sm border border-gray-100'
        >
          <Ionicons name='search-outline' size={20} color='#14B8A6' />
          <Text className='text-base text-gray-400 ml-2'>Can dostuna arkadaş ara, otel bul...</Text>
        </TouchableOpacity>

        {/* stat şeridi (premium pill'ler) */}
        {/* stat şeridi (dinamik) */}
        {/* istatistik kartları (daha premium) */}
        <View className='mt-4 px-1 flex-row justify-between'>
          {[
            {
              id: "s1",
              label: "Toplam İlan",
              value: loadingStats ? "…" : String(stats.total),
              icon: "layers-outline",
              tint: "#0EA5E9",
            },
            {
              id: "s2",
              label: "Bugün",
              value: loadingStats ? "…" : String(stats.today),
              icon: "flash-outline",
              tint: "#F59E0B",
            },
            {
              id: "s3",
              label: "Yakında",
              value: loadingStats ? "…" : `${stats.nearbyKm} km`,
              icon: "navigate-outline",
              tint: "#10B981",
            },
          ].map(s => (
            <View key={s.id} className='w-[32%]'>
              <View className='bg-white rounded-2xl p-3 border border-gray-100 shadow-sm'>
                <View className='flex-row items-center mb-2'>
                  <View
                    className='w-7 h-7 rounded-full items-center justify-center mr-2'
                    style={{ backgroundColor: `${s.tint}22` }}
                  >
                    <Ionicons name={s.icon} size={14} color={s.tint} />
                  </View>
                  <Text className='text-[11px] text-gray-500' numberOfLines={1}>
                    {s.label}
                  </Text>
                </View>
                <Text className='text-xl font-extrabold text-gray-900'>{s.value}</Text>
              </View>
            </View>
          ))}
        </View>

        {/* kategori pill'leri */}
        {/* kategori segmented control */}
        {/* kategori tabs (underline) */}
        <View className='mt-4 px-4'>
          <View className='flex-row items-center justify-between'>
            {[
              { id: "tümü", label: "Tümü" },
              { id: "topluluk", label: "Topluluk" },
              { id: "hizmet", label: "Hizmetler" },
            ].map(cat => {
              const active = activeCat === cat.id;
              return (
                <Pressable key={cat.id} onPress={() => setActiveCat(cat.id)} className='flex-1 mx-1'>
                  <View className='items-center'>
                    <Text className={`text-base font-semibold ${active ? "text-[#14B8A6]" : "text-gray-600"}`}>
                      {cat.label}
                    </Text>
                    <View
                      className='h-[3px] w-full rounded-full mt-2'
                      style={{ backgroundColor: active ? "#14B8A6" : "transparent" }}
                    />
                  </View>
                </Pressable>
              );
            })}
          </View>
        </View>
      </LinearGradient>

      {/* ana başlık */}
      <Text className='text-xl font-extrabold text-gray-900 px-4 pt-4 pb-3'>Modüller</Text>
    </>
  );

  return (
    <SafeAreaContainer edges={["top", "right", "left"]} className='flex-1 bg-gray-50'>
      <FlatList
        data={filteredModules}
        keyExtractor={keyExtractor}
        renderItem={({ item }) => (
          <View style={{ width: "48%" }}>
            <Card item={item} onPress={() => navigation.navigate(item.route)} />
          </View>
        )}
        numColumns={numColumns}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 120 }}
        ListHeaderComponent={ListHeader}
        columnWrapperStyle={{ justifyContent: "space-between", paddingHorizontal: 16, rowGap: 12 }}
      />

      {/* Tek FAB (glow efekti) */}
      <View className='absolute right-4 bottom-24'>
        <View
          className='absolute inset-0 rounded-full'
          style={{ shadowColor: "#14B8A6", shadowOpacity: 0.45, shadowRadius: 16 }}
        />
        <TouchableOpacity
          onPress={() => navigation.navigate("CreateListing")}
          className='w-14 h-14 rounded-full items-center justify-center'
          activeOpacity={0.9}
          style={{ backgroundColor: "#14B8A6" }}
        >
          <Ionicons name='add' size={28} color='#FFF' />
        </TouchableOpacity>
      </View>
    </SafeAreaContainer>
  );
};

export default HomeScreen;
