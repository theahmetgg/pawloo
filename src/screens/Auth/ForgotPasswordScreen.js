import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import SafeLayout from "../../components/layout/SafeLayout";

const ForgotPasswordScreen = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState("");
  const [emailSent, setEmailSent] = useState(false);

  const validateEmail = email => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleResetPassword = () => {
    let isValid = true;

    // Email validation
    if (!email) {
      setEmailError("Email gereklidir");
      isValid = false;
    } else if (!validateEmail(email)) {
      setEmailError("Geçerli bir email giriniz");
      isValid = false;
    } else {
      setEmailError("");
    }

    if (isValid) {
      // TODO: Implement actual password reset logic with Firebase
      console.log("Password reset request for:", email);
      setEmailSent(true);
    }
  };

  if (emailSent) {
    return (
      <SafeLayout backgroundColor='#FFFFFF' footer={null}>
        <View className='px-4 pt-2'>
          <TouchableOpacity
            className='w-10 h-10 rounded-full bg-gray-100 items-center justify-center'
            onPress={() => navigation.goBack()}
          >
            <Ionicons name='arrow-back' size={24} color='#111827' />
          </TouchableOpacity>
        </View>

        <View className='flex-1 items-center justify-center px-6'>
          <View className='w-[120px] h-[120px] rounded-full bg-primary/20 items-center justify-center mb-6'>
            <Ionicons name='mail' size={64} color='#2DD4BF' />
          </View>
          <Text className='text-3xl font-bold text-gray-900 mb-3'>Email Gönderildi!</Text>
          <Text className='text-base text-gray-600 text-center leading-[22px] mb-4'>
            Şifre sıfırlama bağlantısı email adresinize gönderildi. Lütfen gelen kutunuzu kontrol edin.
          </Text>
          <Text className='text-lg font-semibold text-primary mb-8'>{email}</Text>

          <TouchableOpacity
            className='w-full rounded-lg overflow-hidden shadow-md mb-6'
            onPress={() => navigation.navigate("Login")}
            activeOpacity={0.8}
          >
            <LinearGradient
              colors={["#2DD4BF", "#FFFFFF"]}
              className='py-4 items-center'
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
            >
              <Text className='text-lg font-bold text-white'>Giriş Sayfasına Dön</Text>
            </LinearGradient>
          </TouchableOpacity>

          <TouchableOpacity
            className='flex-row items-center mt-3'
            onPress={() => {
              setEmailSent(false);
              handleResetPassword();
            }}
          >
            <Text className='text-base text-gray-600'>Email almadınız mı? </Text>
            <Text className='text-base font-bold text-primary'>Tekrar Gönder</Text>
          </TouchableOpacity>
        </View>
      </SafeLayout>
    );
  }

  return (
    <SafeLayout backgroundColor='#FFFFFF' footer={null}>
      <ScrollView showsVerticalScrollIndicator={false} contentContainerClassName='pb-6'>
        {/* Header */}
        <View className='px-4 pt-2'>
          <TouchableOpacity
            className='w-10 h-10 rounded-full bg-gray-100 items-center justify-center'
            onPress={() => navigation.goBack()}
          >
            <Ionicons name='arrow-back' size={24} color='#111827' />
          </TouchableOpacity>
        </View>

          {/* Logo/Icon Section */}
          <View className='items-center py-8 px-6'>
            <View className='w-[100px] h-[100px] rounded-full bg-primary/20 items-center justify-center mb-4'>
              <Ionicons name='lock-closed' size={48} color='#2DD4BF' />
            </View>
            <Text className='text-3xl font-bold text-gray-900 mb-1'>Şifremi Unuttum</Text>
            <Text className='text-base text-gray-600 text-center leading-[22px]'>
              Email adresinizi girin, size şifre sıfırlama bağlantısı gönderelim
            </Text>
          </View>

          {/* Form */}
          <View className='px-4'>
            {/* Email Input */}
            <View className='mb-4'>
              <Text className='text-sm font-semibold text-gray-700 mb-1'>Email</Text>
              <View
                className={`flex-row items-center bg-gray-50 rounded-lg border ${
                  emailError ? "border-red-500 bg-red-500/10" : "border-gray-200"
                } px-3 h-14`}
              >
                <Ionicons name='mail-outline' size={20} color='#9CA3AF' />
                <TextInput
                  className='flex-1 text-base text-gray-900 ml-2'
                  placeholder='ornek@email.com'
                  placeholderTextColor='#9CA3AF'
                  value={email}
                  onChangeText={text => {
                    setEmail(text);
                    setEmailError("");
                  }}
                  keyboardType='email-address'
                  autoCapitalize='none'
                  autoCorrect={false}
                  autoFocus={true}
                />
              </View>
              {emailError ? <Text className='text-xs text-red-500 mt-1 ml-1'>{emailError}</Text> : null}
            </View>

            {/* Info Box */}
            <View className='flex-row bg-primary/10 rounded-lg p-3 mb-6'>
              <Ionicons name='information-circle-outline' size={20} color='#2DD4BF' />
              <Text className='flex-1 text-sm text-gray-700 leading-5 ml-2'>
                Kayıtlı email adresinize şifre sıfırlama talimatları göndereceğiz.
              </Text>
            </View>

            {/* Reset Button */}
            <TouchableOpacity
              className='rounded-lg overflow-hidden shadow-md mb-6'
              onPress={handleResetPassword}
              activeOpacity={0.8}
            >
              <LinearGradient
                colors={["#2DD4BF", "#FFFFFF"]}
                className='py-4 items-center'
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
              >
                <Text className='text-lg font-bold text-white'>Sıfırlama Bağlantısı Gönder</Text>
              </LinearGradient>
            </TouchableOpacity>

            {/* Back to Login Link */}
            <View className='items-center'>
              <TouchableOpacity onPress={() => navigation.navigate("Login")}>
                <View className='flex-row items-center py-2'>
                  <Ionicons name='arrow-back' size={16} color='#2DD4BF' />
                  <Text className='text-base font-semibold text-primary ml-1'>Giriş sayfasına dön</Text>
                </View>
              </TouchableOpacity>
            </View>
          </View>
      </ScrollView>
    </SafeLayout>
  );
};

export default ForgotPasswordScreen;
