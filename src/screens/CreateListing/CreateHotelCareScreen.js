import React from "react";
import { View, Text, StatusBar, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import SafeAreaContainer from "../../components/shared/SafeAreaContainer";
import CreateListingForm from "../../components/forms/CreateListingForm";

const CreateHotelCareScreen = ({ navigation }) => {
  const insets = useSafeAreaInsets();

  const customFields = [
    { key: "serviceName", label: "Tesis Adı", placeholder: "Örn: Pati Palace", required: true },
    { key: "serviceType", label: "Hizmet Türü", placeholder: "Otel, Kreş, Bakım", required: true },
    { key: "capacity", label: "Kapasite", placeholder: "Kaç hayvan kabul edilir?", required: true },
    { key: "petTypes", label: "Kabul Edilen Hayvanlar", placeholder: "Köpek, Kedi, vb.", required: true },
    { key: "facilities", label: "Olanaklar", placeholder: "Kameralı odalar, oyun alanı...", required: false },
    { key: "pricePerDay", label: "Günlük Fiyat (TL)", placeholder: "Konaklama ücreti", required: true, keyboardType: "numeric" },
    { key: "workingHours", label: "Çalışma Saatleri", placeholder: "09:00 - 18:00", required: false },
  ];

  return (
    <SafeAreaContainer bgColor="#F9FAFB" edges={["top"]}>
      <StatusBar barStyle="light-content" backgroundColor="transparent" translucent />

      {/* Header */}
      <LinearGradient
        colors={["#06B6D4", "#0891B2"]}
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
              Otel & Bakım İlanı
            </Text>
          </View>

          <View style={{ width: 40 }} />
        </View>
      </LinearGradient>

      {/* Form */}
      <CreateListingForm
        categoryName="Otel & Bakım"
        categoryColor="#06B6D4"
        categoryGradient={["#06B6D4", "#0891B2"]}
        categoryIcon="bed"
        navigation={navigation}
        customFields={customFields}
      />
    </SafeAreaContainer>
  );
};

export default CreateHotelCareScreen;
