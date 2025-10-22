import React, { useState } from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StatusBar,
  Switch,
  Alert,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import SafeAreaContainer from "../components/shared/SafeAreaContainer";

const ProfileScreen = ({ navigation }) => {
  const insets = useSafeAreaInsets();
  const [notifications, setNotifications] = useState(true);
  const [darkMode, setDarkMode] = useState(false);
  const [locationSharing, setLocationSharing] = useState(true);

  // Mock user data
  const user = {
    name: "Ahmet Yılmaz",
    email: "ahmet@example.com",
    phone: "+90 555 123 4567",
    memberSince: "Ocak 2024",
    verified: true,
  };

  const stats = [
    { id: "1", label: "İlanlarım", value: "5", icon: "grid-outline", color: "#06B6D4" },
    { id: "2", label: "Favoriler", value: "12", icon: "heart-outline", color: "#DB2777" },
    { id: "3", label: "Mesajlar", value: "8", icon: "chatbubble-outline", color: "#8B5CF6" },
  ];

  const menuSections = [
    {
      title: "Hesap",
      items: [
        {
          icon: "person-outline",
          label: "Profil Bilgilerim",
          route: "EditProfile",
          color: "#06B6D4",
        },
        {
          icon: "paw-outline",
          label: "Evcil Hayvanlarım",
          route: "MyPets",
          color: "#9333EA",
        },
        {
          icon: "document-text-outline",
          label: "İlanlarım",
          route: "MyListings",
          color: "#0891B2",
        },
        {
          icon: "bookmark-outline",
          label: "Kayıtlılar",
          route: "SavedItems",
          color: "#F59E0B",
        },
      ],
    },
    {
      title: "Aktivite",
      items: [
        {
          icon: "time-outline",
          label: "Geçmiş",
          route: "History",
          color: "#64748B",
        },
        {
          icon: "calendar-outline",
          label: "Randevularım",
          route: "Appointments",
          color: "#8B5CF6",
        },
        {
          icon: "heart-circle-outline",
          label: "Favorilerim",
          route: "Favorites",
          color: "#DB2777",
        },
      ],
    },
    {
      title: "Ayarlar",
      items: [
        {
          icon: "notifications-outline",
          label: "Bildirimler",
          toggle: true,
          value: notifications,
          onToggle: setNotifications,
          color: "#F59E0B",
        },
        {
          icon: "location-outline",
          label: "Konum Paylaşımı",
          toggle: true,
          value: locationSharing,
          onToggle: setLocationSharing,
          color: "#10B981",
        },
        {
          icon: "shield-checkmark-outline",
          label: "Gizlilik",
          route: "Privacy",
          color: "#2563EB",
        },
        {
          icon: "language-outline",
          label: "Dil Ayarları",
          route: "Language",
          color: "#8B5CF6",
        },
      ],
    },
  ];

  const handleLogout = () => {
    Alert.alert(
      "Çıkış Yap",
      "Hesabınızdan çıkış yapmak istediğinize emin misiniz?",
      [
        { text: "İptal", style: "cancel" },
        {
          text: "Çıkış Yap",
          style: "destructive",
          onPress: () => {
            // Logout logic here
            Alert.alert("Başarılı", "Çıkış yapıldı");
          },
        },
      ]
    );
  };

  const MenuItem = ({ item }) => {
    if (item.toggle) {
      return (
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
            backgroundColor: "#FFFFFF",
            padding: 16,
            borderRadius: 16,
            marginBottom: 12,
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
                backgroundColor: item.color + "15",
                alignItems: "center",
                justifyContent: "center",
                marginRight: 12,
              }}
            >
              <Ionicons name={item.icon} size={20} color={item.color} />
            </View>
            <Text style={{ fontSize: 15, fontWeight: "600", color: "#0F172A", flex: 1 }}>
              {item.label}
            </Text>
          </View>
          <Switch
            value={item.value}
            onValueChange={item.onToggle}
            trackColor={{ false: "#E2E8F0", true: item.color + "40" }}
            thumbColor={item.value ? item.color : "#F1F5F9"}
            ios_backgroundColor="#E2E8F0"
          />
        </View>
      );
    }

    return (
      <TouchableOpacity
        onPress={() => item.route && navigation.navigate(item.route)}
        activeOpacity={0.7}
        style={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
          backgroundColor: "#FFFFFF",
          padding: 16,
          borderRadius: 16,
          marginBottom: 12,
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
              backgroundColor: item.color + "15",
              alignItems: "center",
              justifyContent: "center",
              marginRight: 12,
            }}
          >
            <Ionicons name={item.icon} size={20} color={item.color} />
          </View>
          <Text style={{ fontSize: 15, fontWeight: "600", color: "#0F172A", flex: 1 }}>
            {item.label}
          </Text>
        </View>
        <Ionicons name="chevron-forward" size={20} color="#94A3B8" />
      </TouchableOpacity>
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
              <Ionicons name="arrow-back" size={24} color="#FFF" />
            </TouchableOpacity>

            <Text style={{ fontSize: 18, fontWeight: "700", color: "#FFF" }}>
              Profilim
            </Text>

            <TouchableOpacity
              onPress={() => navigation.navigate("Settings")}
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
              <Ionicons name="settings-outline" size={24} color="#FFF" />
            </TouchableOpacity>
          </View>

          {/* Profile Info */}
          <View style={{ alignItems: "center" }}>
            {/* Avatar */}
            <View
              style={{
                width: 100,
                height: 100,
                borderRadius: 50,
                backgroundColor: "#FFFFFF",
                alignItems: "center",
                justifyContent: "center",
                marginBottom: 16,
                shadowColor: "#000",
                shadowOffset: { width: 0, height: 4 },
                shadowOpacity: 0.2,
                shadowRadius: 12,
                elevation: 8,
              }}
            >
              <Ionicons name="person" size={50} color="#06B6D4" />
              {user.verified && (
                <View
                  style={{
                    position: "absolute",
                    bottom: 0,
                    right: 0,
                    width: 32,
                    height: 32,
                    borderRadius: 16,
                    backgroundColor: "#10B981",
                    alignItems: "center",
                    justifyContent: "center",
                    borderWidth: 3,
                    borderColor: "#06B6D4",
                  }}
                >
                  <Ionicons name="checkmark" size={18} color="#FFF" />
                </View>
              )}
            </View>

            {/* Name & Email */}
            <Text
              style={{
                fontSize: 24,
                fontWeight: "700",
                color: "#FFF",
                marginBottom: 4,
              }}
            >
              {user.name}
            </Text>
            <Text style={{ fontSize: 14, color: "rgba(255, 255, 255, 0.8)", marginBottom: 2 }}>
              {user.email}
            </Text>
            <Text style={{ fontSize: 13, color: "rgba(255, 255, 255, 0.7)" }}>
              Üye: {user.memberSince}
            </Text>

            {/* Edit Profile Button */}
            <TouchableOpacity
              onPress={() => navigation.navigate("EditProfile")}
              style={{
                flexDirection: "row",
                alignItems: "center",
                backgroundColor: "rgba(255, 255, 255, 0.2)",
                paddingHorizontal: 20,
                paddingVertical: 10,
                borderRadius: 12,
                marginTop: 16,
              }}
              activeOpacity={0.8}
            >
              <Ionicons name="create-outline" size={18} color="#FFF" />
              <Text
                style={{
                  fontSize: 14,
                  fontWeight: "600",
                  color: "#FFF",
                  marginLeft: 8,
                }}
              >
                Profili Düzenle
              </Text>
            </TouchableOpacity>
          </View>
        </LinearGradient>

        {/* Stats Cards */}
        <View style={{ paddingHorizontal: 20, marginTop: -20, marginBottom: 24 }}>
          <View
            style={{
              flexDirection: "row",
              backgroundColor: "#FFFFFF",
              borderRadius: 20,
              padding: 20,
              shadowColor: "#000",
              shadowOffset: { width: 0, height: 4 },
              shadowOpacity: 0.1,
              shadowRadius: 12,
              elevation: 4,
            }}
          >
            {stats.map((stat, index) => (
              <React.Fragment key={stat.id}>
                <View style={{ flex: 1, alignItems: "center" }}>
                  <View
                    style={{
                      width: 48,
                      height: 48,
                      borderRadius: 14,
                      backgroundColor: stat.color + "15",
                      alignItems: "center",
                      justifyContent: "center",
                      marginBottom: 8,
                    }}
                  >
                    <Ionicons name={stat.icon} size={24} color={stat.color} />
                  </View>
                  <Text
                    style={{
                      fontSize: 24,
                      fontWeight: "700",
                      color: "#0F172A",
                      marginBottom: 2,
                    }}
                  >
                    {stat.value}
                  </Text>
                  <Text
                    style={{
                      fontSize: 12,
                      color: "#64748B",
                      textAlign: "center",
                    }}
                  >
                    {stat.label}
                  </Text>
                </View>
                {index < stats.length - 1 && (
                  <View
                    style={{
                      width: 1,
                      backgroundColor: "#E2E8F0",
                      marginHorizontal: 12,
                    }}
                  />
                )}
              </React.Fragment>
            ))}
          </View>
        </View>

        {/* Menu Sections */}
        <View style={{ paddingHorizontal: 20 }}>
          {menuSections.map((section, sectionIndex) => (
            <View key={sectionIndex} style={{ marginBottom: 24 }}>
              <Text
                style={{
                  fontSize: 18,
                  fontWeight: "700",
                  color: "#0F172A",
                  marginBottom: 12,
                }}
              >
                {section.title}
              </Text>
              {section.items.map((item, itemIndex) => (
                <MenuItem key={itemIndex} item={item} />
              ))}
            </View>
          ))}

          {/* Help & Support */}
          <View style={{ marginBottom: 24 }}>
            <Text
              style={{
                fontSize: 18,
                fontWeight: "700",
                color: "#0F172A",
                marginBottom: 12,
              }}
            >
              Destek
            </Text>
            <MenuItem
              item={{
                icon: "help-circle-outline",
                label: "Yardım Merkezi",
                route: "Help",
                color: "#06B6D4",
              }}
            />
            <MenuItem
              item={{
                icon: "chatbubbles-outline",
                label: "Bizimle İletişime Geç",
                route: "Contact",
                color: "#8B5CF6",
              }}
            />
            <MenuItem
              item={{
                icon: "document-text-outline",
                label: "Kullanım Koşulları",
                route: "Terms",
                color: "#64748B",
              }}
            />
          </View>

          {/* Logout Button */}
          <TouchableOpacity
            onPress={handleLogout}
            activeOpacity={0.7}
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "center",
              backgroundColor: "#FEE2E2",
              padding: 16,
              borderRadius: 16,
              marginBottom: 24,
            }}
          >
            <Ionicons name="log-out-outline" size={20} color="#DC2626" />
            <Text
              style={{
                fontSize: 15,
                fontWeight: "700",
                color: "#DC2626",
                marginLeft: 8,
              }}
            >
              Çıkış Yap
            </Text>
          </TouchableOpacity>

          {/* App Version */}
          <Text
            style={{
              fontSize: 12,
              color: "#94A3B8",
              textAlign: "center",
              marginBottom: 8,
            }}
          >
            AnimalApp v1.0.0
          </Text>
        </View>
      </ScrollView>
    </SafeAreaContainer>
  );
};

export default ProfileScreen;
