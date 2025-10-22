import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Alert,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";

const CreateListingForm = ({
  categoryName,
  categoryColor,
  categoryGradient,
  categoryIcon,
  navigation,
  customFields = [],
}) => {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    photos: [],
    location: "",
    phone: "",
    ...customFields.reduce((acc, field) => ({ ...acc, [field.key]: field.defaultValue || "" }), {}),
  });

  const updateField = (key, value) => {
    setFormData({ ...formData, [key]: value });
  };

  const handleSubmit = () => {
    // Validation
    if (!formData.title || !formData.description) {
      Alert.alert("Hata", "Lütfen zorunlu alanları doldurun");
      return;
    }

    Alert.alert(
      "Başarılı",
      `${categoryName} ilanınız başarıyla oluşturuldu!`,
      [
        {
          text: "Tamam",
          onPress: () => navigation.navigate("Home"),
        },
      ]
    );
  };

  const FormInput = ({ label, placeholder, value, onChangeText, required, multiline, keyboardType }) => (
    <View style={{ marginBottom: 20 }}>
      <Text style={{ fontSize: 15, fontWeight: "600", color: "#0F172A", marginBottom: 8 }}>
        {label} {required && <Text style={{ color: "#EF4444" }}>*</Text>}
      </Text>
      <TextInput
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        placeholderTextColor="#94A3B8"
        multiline={multiline}
        numberOfLines={multiline ? 4 : 1}
        keyboardType={keyboardType || "default"}
        style={{
          backgroundColor: "#FFFFFF",
          borderRadius: 12,
          padding: 14,
          fontSize: 15,
          color: "#0F172A",
          borderWidth: 1,
          borderColor: value ? categoryColor : "#E2E8F0",
          minHeight: multiline ? 100 : 50,
          textAlignVertical: multiline ? "top" : "center",
        }}
      />
    </View>
  );

  const PhotoUploader = () => (
    <View style={{ marginBottom: 20 }}>
      <Text style={{ fontSize: 15, fontWeight: "600", color: "#0F172A", marginBottom: 8 }}>
        Fotoğraflar <Text style={{ color: "#EF4444" }}>*</Text>
      </Text>
      <TouchableOpacity
        onPress={() => Alert.alert("Bilgi", "Fotoğraf yükleme özelliği yakında eklenecek")}
        style={{
          backgroundColor: categoryColor + "15",
          borderRadius: 12,
          padding: 20,
          borderWidth: 2,
          borderStyle: "dashed",
          borderColor: categoryColor,
          alignItems: "center",
        }}
      >
        <Ionicons name="cloud-upload-outline" size={40} color={categoryColor} />
        <Text style={{ fontSize: 15, fontWeight: "600", color: categoryColor, marginTop: 8 }}>
          Fotoğraf Yükle
        </Text>
        <Text style={{ fontSize: 13, color: "#64748B", marginTop: 4 }}>
          En fazla 5 fotoğraf yükleyebilirsiniz
        </Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      contentContainerStyle={{ padding: 20, paddingBottom: 100 }}
    >
      {/* Photo Uploader */}
      <PhotoUploader />

      {/* Title */}
      <FormInput
        label="İlan Başlığı"
        placeholder={`${categoryName} ilanınız için başlık`}
        value={formData.title}
        onChangeText={(val) => updateField("title", val)}
        required
      />

      {/* Description */}
      <FormInput
        label="Açıklama"
        placeholder="Detaylı açıklama yazın..."
        value={formData.description}
        onChangeText={(val) => updateField("description", val)}
        required
        multiline
      />

      {/* Custom Fields */}
      {customFields.map((field) => (
        <FormInput
          key={field.key}
          label={field.label}
          placeholder={field.placeholder}
          value={formData[field.key]}
          onChangeText={(val) => updateField(field.key, val)}
          required={field.required}
          keyboardType={field.keyboardType}
        />
      ))}

      {/* Location */}
      <FormInput
        label="Konum"
        placeholder="Şehir, İlçe"
        value={formData.location}
        onChangeText={(val) => updateField("location", val)}
        required
      />

      {/* Phone */}
      <FormInput
        label="Telefon"
        placeholder="5XX XXX XX XX"
        value={formData.phone}
        onChangeText={(val) => updateField("phone", val)}
        required
        keyboardType="phone-pad"
      />

      {/* Submit Button */}
      <LinearGradient colors={categoryGradient} style={{ borderRadius: 12, marginTop: 8 }}>
        <TouchableOpacity
          onPress={handleSubmit}
          style={{
            paddingVertical: 16,
            alignItems: "center",
            flexDirection: "row",
            justifyContent: "center",
            gap: 8,
          }}
        >
          <Ionicons name="checkmark-circle" size={22} color="#FFF" />
          <Text style={{ color: "#FFF", fontSize: 16, fontWeight: "700" }}>İlanı Yayınla</Text>
        </TouchableOpacity>
      </LinearGradient>
    </ScrollView>
  );
};

export default CreateListingForm;
