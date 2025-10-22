import React from "react";
import { View, Text, StatusBar, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import SafeAreaContainer from "../../components/shared/SafeAreaContainer";
import CreateListingForm from "../../components/forms/CreateListingForm";

const CreateAdoptionScreen = ({ navigation }) => {
  const insets = useSafeAreaInsets();

  const customFields = [
    { key: "petName", label: "Evcil Hayvan Adı", placeholder: "Örn: Pamuk", required: true },
    { key: "petType", label: "Hayvan Türü", placeholder: "Örn: Köpek, Kedi", required: true },
    { key: "breed", label: "Cins", placeholder: "Örn: Terrier", required: false },
    { key: "age", label: "Yaş", placeholder: "Kaç yaşında?", required: true },
    { key: "gender", label: "Cinsiyet", placeholder: "Erkek / Dişi", required: true },
    { key: "vaccinated", label: "Aşı Durumu", placeholder: "Aşıları tam / Eksik", required: true },
    { key: "healthStatus", label: "Sağlık Durumu", placeholder: "Sağlıklı, tedavi altında vb.", required: true },
    { key: "price", label: "Sahiplendirme Ücreti (TL)", placeholder: "Ücretsiz / Ücretli", required: false, keyboardType: "numeric" },
  ];

  return (
    <SafeAreaContainer bgColor="#F9FAFB" edges={["top"]}>
      <StatusBar barStyle="light-content" backgroundColor="transparent" translucent />

      {/* Header */}
      <LinearGradient
        colors={["#0891B2", "#0E7490"]}
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
              Sahiplendirme İlanı
            </Text>
          </View>

          <View style={{ width: 40 }} />
        </View>
      </LinearGradient>

      {/* Form */}
      <CreateListingForm
        categoryName="Sahiplendirme"
        categoryColor="#0891B2"
        categoryGradient={["#0891B2", "#0E7490"]}
        categoryIcon="home"
        navigation={navigation}
        customFields={customFields}
      />
    </SafeAreaContainer>
  );
};

export default CreateAdoptionScreen;
