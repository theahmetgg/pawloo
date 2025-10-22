import React, { useState } from "react";
import { View, Text, ScrollView, TouchableOpacity, StatusBar } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import SafeAreaContainer from "../components/shared/SafeAreaContainer";

const HelpScreen = ({ navigation }) => {
  const insets = useSafeAreaInsets();
  const [expandedId, setExpandedId] = useState(null);

  const helpCategories = [
    {
      id: "listing",
      title: "İlan Oluşturma",
      icon: "add-circle-outline",
      color: "#8B5CF6",
      questions: [
        {
          id: "q1",
          question: "Nasıl ilan oluşturabilirim?",
          answer:
            "Ana sayfadaki + (artı) butonuna tıklayın. Açılan sayfadan ilan vermek istediğiniz kategoriyi seçin. Formu doldurun ve 'İlanı Yayınla' butonuna basın.",
        },
        {
          id: "q2",
          question: "İlan oluştururken nelere dikkat etmeliyim?",
          answer:
            "Net ve kaliteli fotoğraflar kullanın, detaylı açıklama yazın, doğru bilgiler verin ve iletişim bilgilerinizi eksiksiz girin. Dürüst olmak en önemli kural!",
        },
        {
          id: "q3",
          question: "İlanımı nasıl düzenleyebilirim?",
          answer: "Profil > İlanlarım bölümünden ilanlarınızı görebilir, düzenleyebilir veya silebilirsiniz.",
        },
        {
          id: "q4",
          question: "Kaç tane ilan oluşturabilirim?",
          answer: "Ücretsiz hesaplarda eş zamanlı 5 ilan, premium hesaplarda sınırsız ilan oluşturabilirsiniz.",
        },
      ],
    },
    {
      id: "photos",
      title: "Fotoğraf Yükleme",
      icon: "camera-outline",
      color: "#8B5CF6",
      questions: [
        {
          id: "q5",
          question: "Kaç fotoğraf yükleyebilirim?",
          answer: "Her ilan için en fazla 5 fotoğraf yükleyebilirsiniz. İlk fotoğraf kapak fotoğrafı olarak görünür.",
        },
        {
          id: "q6",
          question: "Fotoğraflarım hangi formatta olmalı?",
          answer:
            "JPG, PNG veya HEIC formatlarını destekliyoruz. Her fotoğraf maksimum 5MB olabilir. En iyi sonuç için yüksek çözünürlüklü fotoğraflar kullanın.",
        },
        {
          id: "q7",
          question: "Fotoğraflarımı nasıl silerim?",
          answer: "İlan düzenleme ekranında fotoğrafların üzerindeki X işaretine tıklayarak silebilirsiniz.",
        },
      ],
    },
    {
      id: "messages",
      title: "Mesajlaşma",
      icon: "chatbubbles-outline",
      color: "#DB2777",
      questions: [
        {
          id: "q8",
          question: "Mesajlarıma nereden ulaşabilirim?",
          answer:
            "Ana sayfadaki 'Mesajlar' butonuna veya alt menüdeki mesaj ikonuna tıklayarak tüm mesajlarınızı görebilirsiniz.",
        },
        {
          id: "q9",
          question: "Mesajlarım güvenli mi?",
          answer:
            "Evet, tüm mesajlarınız şifrelenmiş olarak saklanır. Kişisel bilgilerinizi paylaşmadan güvenle iletişim kurabilirsiniz.",
        },
        {
          id: "q10",
          question: "Spam mesajları nasıl bildirebilirim?",
          answer: "Mesaj penceresinde sağ üstteki üç nokta ikonuna tıklayın ve 'Bildir' seçeneğini seçin.",
        },
      ],
    },
    {
      id: "account",
      title: "Hesap & Güvenlik",
      icon: "shield-checkmark-outline",
      color: "#10B981",
      questions: [
        {
          id: "q11",
          question: "Hesabımı nasıl doğrulayabilirim?",
          answer:
            "Profil > Profil Bilgilerim bölümünden telefon numaranızı ve e-posta adresinizi doğrulayabilirsiniz. Doğrulanmış hesaplar daha güvenilir görünür.",
        },
        {
          id: "q12",
          question: "Şifremi nasıl değiştirebilirim?",
          answer:
            "Profil > Gizlilik > Şifre Değiştir bölümünden mevcut şifrenizi girip yeni şifrenizi belirleyebilirsiniz.",
        },
        {
          id: "q13",
          question: "Hesabımı nasıl silebilirim?",
          answer:
            "Profil > Gizlilik > Hesabımı Sil bölümünden hesabınızı kalıcı olarak silebilirsiniz. Bu işlem geri alınamaz!",
        },
      ],
    },
    {
      id: "payment",
      title: "Ödeme & Fiyatlandırma",
      icon: "card-outline",
      color: "#F59E0B",
      questions: [
        {
          id: "q14",
          question: "Ücretsiz mi kullanabilirim?",
          answer:
            "Evet! Pawloo tamamen ücretsizdir. İlan oluşturmak, mesajlaşmak ve diğer tüm özellikler ücretsiz kullanılabilir.",
        },
        {
          id: "q15",
          question: "Premium özellikler var mı?",
          answer: "Şu an için tüm özellikler ücretsizdir. Gelecekte ek özellikler için premium paketler sunabiliriz.",
        },
      ],
    },
  ];

  const FAQItem = ({ question }) => {
    const isExpanded = expandedId === question.id;

    return (
      <TouchableOpacity
        onPress={() => setExpandedId(isExpanded ? null : question.id)}
        activeOpacity={0.7}
        style={{
          backgroundColor: "#FFFFFF",
          borderRadius: 12,
          marginBottom: 12,
          overflow: "hidden",
          shadowColor: "#000",
          shadowOffset: { width: 0, height: 1 },
          shadowOpacity: 0.06,
          shadowRadius: 8,
          elevation: 1,
        }}
      >
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
            padding: 16,
          }}
        >
          <Text
            style={{
              flex: 1,
              fontSize: 15,
              fontWeight: "600",
              color: "#0F172A",
              marginRight: 12,
            }}
          >
            {question.question}
          </Text>
          <Ionicons name={isExpanded ? "chevron-up" : "chevron-down"} size={20} color='#64748B' />
        </View>

        {isExpanded && (
          <View
            style={{
              padding: 16,
              paddingTop: 0,
              borderTopWidth: 1,
              borderTopColor: "#F1F5F9",
            }}
          >
            <Text
              style={{
                fontSize: 14,
                color: "#64748B",
                lineHeight: 20,
              }}
            >
              {question.answer}
            </Text>
          </View>
        )}
      </TouchableOpacity>
    );
  };

  return (
    <SafeAreaContainer bgColor='#F9FAFB' edges={["top"]}>
      <StatusBar barStyle='light-content' backgroundColor='transparent' translucent />

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 100 }}>
        {/* Header */}
        <LinearGradient
          colors={["#8B5CF6", "#7C3AED"]}
          style={{
            paddingTop: insets.top + 16,
            paddingBottom: 32,
            paddingHorizontal: 20,
          }}
        >
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
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
            >
              <Ionicons name='arrow-back' size={24} color='#FFF' />
            </TouchableOpacity>

            <Text style={{ fontSize: 18, fontWeight: "700", color: "#FFF" }}>Yardım Merkezi</Text>

            <View style={{ width: 40 }} />
          </View>

          {/* Hero */}
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
              <Ionicons name='help-circle' size={50} color='#FFF' />
            </View>
            <Text
              style={{
                fontSize: 24,
                fontWeight: "700",
                color: "#FFF",
                marginBottom: 8,
              }}
            >
              Size Nasıl Yardımcı Olabiliriz?
            </Text>
            <Text
              style={{
                fontSize: 14,
                color: "rgba(255, 255, 255, 0.85)",
                textAlign: "center",
              }}
            >
              Sıkça sorulan sorulara göz atın
            </Text>
          </View>
        </LinearGradient>

        {/* Quick Contact */}
        <View style={{ paddingHorizontal: 20, marginTop: 24, marginBottom: 16 }}>
          <View
            style={{
              flexDirection: "row",
              gap: 12,
            }}
          >
            <TouchableOpacity
              style={{
                flex: 1,
                backgroundColor: "#FFFFFF",
                borderRadius: 16,
                padding: 16,
                alignItems: "center",
                shadowColor: "#000",
                shadowOffset: { width: 0, height: 1 },
                shadowOpacity: 0.06,
                shadowRadius: 8,
                elevation: 1,
              }}
            >
              <View
                style={{
                  width: 48,
                  height: 48,
                  borderRadius: 14,
                  backgroundColor: "#EDE9FE",
                  alignItems: "center",
                  justifyContent: "center",
                  marginBottom: 8,
                }}
              >
                <Ionicons name='mail-outline' size={24} color='#8B5CF6' />
              </View>
              <Text
                style={{
                  fontSize: 14,
                  fontWeight: "600",
                  color: "#0F172A",
                  marginBottom: 2,
                }}
              >
                E-posta
              </Text>
              <Text style={{ fontSize: 12, color: "#64748B" }}>support@Pawloo.com</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={{
                flex: 1,
                backgroundColor: "#FFFFFF",
                borderRadius: 16,
                padding: 16,
                alignItems: "center",
                shadowColor: "#000",
                shadowOffset: { width: 0, height: 1 },
                shadowOpacity: 0.06,
                shadowRadius: 8,
                elevation: 1,
              }}
            >
              <View
                style={{
                  width: 48,
                  height: 48,
                  borderRadius: 14,
                  backgroundColor: "#D1FAE5",
                  alignItems: "center",
                  justifyContent: "center",
                  marginBottom: 8,
                }}
              >
                <Ionicons name='call-outline' size={24} color='#10B981' />
              </View>
              <Text
                style={{
                  fontSize: 14,
                  fontWeight: "600",
                  color: "#0F172A",
                  marginBottom: 2,
                }}
              >
                Telefon
              </Text>
              <Text style={{ fontSize: 12, color: "#64748B" }}>0850 XXX XX XX</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* FAQ Categories */}
        <View style={{ paddingHorizontal: 20 }}>
          {helpCategories.map(category => (
            <View key={category.id} style={{ marginBottom: 24 }}>
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  marginBottom: 12,
                }}
              >
                <View
                  style={{
                    width: 40,
                    height: 40,
                    borderRadius: 12,
                    backgroundColor: category.color + "15",
                    alignItems: "center",
                    justifyContent: "center",
                    marginRight: 12,
                  }}
                >
                  <Ionicons name={category.icon} size={22} color={category.color} />
                </View>
                <Text
                  style={{
                    fontSize: 18,
                    fontWeight: "700",
                    color: "#0F172A",
                  }}
                >
                  {category.title}
                </Text>
              </View>

              {category.questions.map(question => (
                <FAQItem key={question.id} question={question} />
              ))}
            </View>
          ))}
        </View>

        {/* Still Need Help */}
        <View style={{ paddingHorizontal: 20, marginTop: 8 }}>
          <View
            style={{
              backgroundColor: "#FEF3C7",
              borderRadius: 16,
              padding: 20,
              alignItems: "center",
            }}
          >
            <Ionicons name='chatbubbles' size={40} color='#F59E0B' />
            <Text
              style={{
                fontSize: 18,
                fontWeight: "700",
                color: "#78350F",
                marginTop: 12,
                marginBottom: 8,
              }}
            >
              Hala yardıma mı ihtiyacınız var?
            </Text>
            <Text
              style={{
                fontSize: 14,
                color: "#92400E",
                textAlign: "center",
                marginBottom: 16,
              }}
            >
              Destek ekibimiz size yardımcı olmak için burada
            </Text>
            <TouchableOpacity
              style={{
                backgroundColor: "#F59E0B",
                paddingHorizontal: 24,
                paddingVertical: 12,
                borderRadius: 12,
              }}
            >
              <Text
                style={{
                  fontSize: 15,
                  fontWeight: "700",
                  color: "#FFF",
                }}
              >
                Destek Talebi Oluştur
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </SafeAreaContainer>
  );
};

export default HelpScreen;
