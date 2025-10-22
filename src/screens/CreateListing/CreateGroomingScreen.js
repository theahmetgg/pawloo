import React from "react";
import { View, Text, StatusBar, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import SafeAreaContainer from "../../components/shared/SafeAreaContainer";
import CreateListingForm from "../../components/forms/CreateListingForm";

const CreateGroomingScreen = ({ navigation }) => {
  const insets = useSafeAreaInsets();

  const customFields = [
    { key: "salonName", label: "Salon Adı", placeholder: "Örn: Pati Güzellik Salonu", required: true },
    { key: "services", label: "Hizmetler", placeholder: "Tıraş, banyo, tırnak kesimi...", required: true },
    { key: "petTypes", label: "Hizmet Verilen Hayvanlar", placeholder: "Köpek, Kedi, vb.", required: true },
    { key: "groomerExperience", label: "Tecrübe", placeholder: "Kaç yıllık tecrübe?", required: false },
    { key: "priceList", label: "Fiyat Listesi", placeholder: "Banyo: 100TL, Tıraş: 150TL...", required: true },
    { key: "appointmentRequired", label: "Randevu Gerekli mi?", placeholder: "Evet / Hayır", required: false },
    { key: "workingHours", label: "Çalışma Saatleri", placeholder: "09:00 - 19:00", required: true },
  ];

  return (
    <SafeAreaContainer bgColor="#F9FAFB" edges={["top"]}>
      <StatusBar barStyle="light-content" backgroundColor="transparent" translucent />

      {/* Header */}
      <LinearGradient
        colors={["#8B5CF6", "#7C3AED"]}
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
              Pet Kuaför İlanı
            </Text>
          </View>

          <View style={{ width: 40 }} />
        </View>
      </LinearGradient>

      {/* Form */}
      <CreateListingForm
        categoryName="Pet Kuaför"
        categoryColor="#8B5CF6"
        categoryGradient={["#8B5CF6", "#7C3AED"]}
        categoryIcon="cut"
        navigation={navigation}
        customFields={customFields}
      />
    </SafeAreaContainer>
  );
};

export default CreateGroomingScreen;
