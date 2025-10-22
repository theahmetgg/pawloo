import React from "react";
import { View, Text, StatusBar, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import SafeAreaContainer from "../../components/shared/SafeAreaContainer";
import CreateListingForm from "../../components/forms/CreateListingForm";

const CreateVeterinaryScreen = ({ navigation }) => {
  const insets = useSafeAreaInsets();

  const customFields = [
    { key: "clinicName", label: "Klinik Adı", placeholder: "Örn: VetCare Kliniği", required: true },
    { key: "doctorName", label: "Veteriner Adı", placeholder: "Dr. Adı Soyadı", required: true },
    { key: "services", label: "Hizmetler", placeholder: "Muayene, aşı, ameliyat...", required: true },
    { key: "emergencyService", label: "Acil Servis", placeholder: "7/24 Var / Yok", required: true },
    { key: "appointmentRequired", label: "Randevu Sistemi", placeholder: "Randevu gerekli mi?", required: false },
    { key: "priceRange", label: "Fiyat Aralığı (TL)", placeholder: "Örn: 200-500", required: false },
    { key: "workingHours", label: "Çalışma Saatleri", placeholder: "08:00 - 20:00", required: true },
  ];

  return (
    <SafeAreaContainer bgColor="#F9FAFB" edges={["top"]}>
      <StatusBar barStyle="light-content" backgroundColor="transparent" translucent />

      {/* Header */}
      <LinearGradient
        colors={["#2563EB", "#1D4ED8"]}
        style={{
          paddingTop: insets.top + 16,
          paddingBottom: 20,
          paddingHorizontal: 20,
        }}
      >
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
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
          >
            <Ionicons name="arrow-back" size={24} color="#FFF" />
          </TouchableOpacity>

          <View style={{ flex: 1, alignItems: "center" }}>
            <Text style={{ fontSize: 18, fontWeight: "700", color: "#FFF" }}>
              Veteriner İlanı
            </Text>
          </View>

          <View style={{ width: 40 }} />
        </View>
      </LinearGradient>

      {/* Form */}
      <CreateListingForm
        categoryName="Veteriner"
        categoryColor="#2563EB"
        categoryGradient={["#2563EB", "#1D4ED8"]}
        categoryIcon="medical"
        navigation={navigation}
        customFields={customFields}
      />
    </SafeAreaContainer>
  );
};

export default CreateVeterinaryScreen;
