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

const RegisterScreen = ({ navigation }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [agreeTerms, setAgreeTerms] = useState(false);

  const [nameError, setNameError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [confirmPasswordError, setConfirmPasswordError] = useState("");
  const [termsError, setTermsError] = useState("");

  const validateEmail = email => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleRegister = () => {
    let isValid = true;

    // Name validation
    if (!name) {
      setNameError("İsim gereklidir");
      isValid = false;
    } else if (name.length < 2) {
      setNameError("İsim en az 2 karakter olmalıdır");
      isValid = false;
    } else {
      setNameError("");
    }

    // Email validation
    if (!email) {
      setEmailError("Email gereklidir");
      isValid = false;
    } else {
      setEmailError("");
    }

    // Password validation
    if (!password) {
      setPasswordError("Şifre gereklidir");
      isValid = false;
    } else {
      setPasswordError("");
    }

    // Confirm password validation
    if (!confirmPassword) {
      setConfirmPasswordError("Şifre tekrarı gereklidir");
      isValid = false;
    } else if (password !== confirmPassword) {
      setConfirmPasswordError("Şifreler eşleşmiyor");
      isValid = false;
    } else {
      setConfirmPasswordError("");
    }

    // Terms validation
    if (!agreeTerms) {
      setTermsError("Kullanım koşullarını kabul etmelisiniz");
      isValid = false;
    } else {
      setTermsError("");
    }

    if (isValid) {
      // Dummy registration - Backend entegrasyonunda değiştirilecek
      console.log("Registration successful:", name, email);
      // Navigate to main app
      navigation.replace("MainApp");
    }
  };

  const handleSocialRegister = provider => {
    // Dummy social registration - Backend entegrasyonunda değiştirilecek
    console.log("Social register with:", provider);
    navigation.replace("MainApp");
  };

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
          <View className='items-center py-6'>
            <View className='w-[100px] h-[100px] rounded-full bg-primary/20 items-center justify-center mb-4'>
              <Ionicons name='person-add' size={48} color='#2DD4BF' />
            </View>
            <Text className='text-3xl font-bold text-gray-900 mb-1'>Hesap Oluşturun</Text>
            <Text className='text-base text-gray-600 text-center px-6'>Hemen başlayın ve topluluğumuza katılın</Text>
          </View>

          {/* Form */}
          <View className='px-4'>
            {/* Name Input */}
            <View className='mb-3'>
              <Text className='text-sm font-semibold text-gray-700 mb-1'>Ad Soyad</Text>
              <View
                className={`flex-row items-center bg-gray-50 rounded-lg border ${
                  nameError ? "border-red-500 bg-red-50/10" : "border-gray-200"
                } px-4 h-14 gap-2`}
              >
                <Ionicons name='person-outline' size={20} color='#9CA3AF' />
                <TextInput
                  className='flex-1 text-base text-gray-900'
                  placeholder='Adınız Soyadınız'
                  placeholderTextColor='#9CA3AF'
                  value={name}
                  onChangeText={text => {
                    setName(text);
                    setNameError("");
                  }}
                  autoCapitalize='words'
                  autoCorrect={false}
                />
              </View>
              {nameError ? <Text className='text-xs text-red-500 mt-1 ml-1'>{nameError}</Text> : null}
            </View>

            {/* Email Input */}
            <View className='mb-3'>
              <Text className='text-sm font-semibold text-gray-700 mb-1'>Email</Text>
              <View
                className={`flex-row items-center bg-gray-50 rounded-lg border ${
                  emailError ? "border-red-500 bg-red-50/10" : "border-gray-200"
                } px-4 h-14 gap-2`}
              >
                <Ionicons name='mail-outline' size={20} color='#9CA3AF' />
                <TextInput
                  className='flex-1 text-base text-gray-900'
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
                />
              </View>
              {emailError ? <Text className='text-xs text-red-500 mt-1 ml-1'>{emailError}</Text> : null}
            </View>

            {/* Password Input */}
            <View className='mb-3'>
              <Text className='text-sm font-semibold text-gray-700 mb-1'>Şifre</Text>
              <View
                className={`flex-row items-center bg-gray-50 rounded-lg border ${
                  passwordError ? "border-red-500 bg-red-50/10" : "border-gray-200"
                } px-4 h-14 gap-2`}
              >
                <Ionicons name='lock-closed-outline' size={20} color='#9CA3AF' />
                <TextInput
                  className='flex-1 text-base text-gray-900'
                  placeholder='••••••••'
                  placeholderTextColor='#9CA3AF'
                  value={password}
                  onChangeText={text => {
                    setPassword(text);
                    setPasswordError("");
                  }}
                  secureTextEntry={!showPassword}
                  autoCapitalize='none'
                />
                <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
                  <Ionicons name={showPassword ? "eye-outline" : "eye-off-outline"} size={20} color='#9CA3AF' />
                </TouchableOpacity>
              </View>
              {passwordError ? <Text className='text-xs text-red-500 mt-1 ml-1'>{passwordError}</Text> : null}
            </View>

            {/* Confirm Password Input */}
            <View className='mb-3'>
              <Text className='text-sm font-semibold text-gray-700 mb-1'>Şifre Tekrarı</Text>
              <View
                className={`flex-row items-center bg-gray-50 rounded-lg border ${
                  confirmPasswordError ? "border-red-500 bg-red-50/10" : "border-gray-200"
                } px-4 h-14 gap-2`}
              >
                <Ionicons name='lock-closed-outline' size={20} color='#9CA3AF' />
                <TextInput
                  className='flex-1 text-base text-gray-900'
                  placeholder='••••••••'
                  placeholderTextColor='#9CA3AF'
                  value={confirmPassword}
                  onChangeText={text => {
                    setConfirmPassword(text);
                    setConfirmPasswordError("");
                  }}
                  secureTextEntry={!showConfirmPassword}
                  autoCapitalize='none'
                />
                <TouchableOpacity onPress={() => setShowConfirmPassword(!showConfirmPassword)}>
                  <Ionicons name={showConfirmPassword ? "eye-outline" : "eye-off-outline"} size={20} color='#9CA3AF' />
                </TouchableOpacity>
              </View>
              {confirmPasswordError ? (
                <Text className='text-xs text-red-500 mt-1 ml-1'>{confirmPasswordError}</Text>
              ) : null}
            </View>

            {/* Terms and Conditions */}
            <TouchableOpacity
              className='flex-row items-start mb-4 px-1'
              onPress={() => {
                setAgreeTerms(!agreeTerms);
                setTermsError("");
              }}
              activeOpacity={0.7}
            >
              <View
                className={`w-5 h-5 rounded border-2 ${
                  agreeTerms ? "bg-primary border-primary" : "border-gray-300"
                } items-center justify-center mr-2 mt-0.5`}
              >
                {agreeTerms && <Ionicons name='checkmark' size={16} color='white' />}
              </View>
              <Text className='flex-1 text-sm leading-5'>
                <Text className='text-gray-600'>Kullanım koşullarını ve </Text>
                <Text className='text-primary font-semibold'>gizlilik politikasını</Text>
                <Text className='text-gray-600'> kabul ediyorum</Text>
              </Text>
            </TouchableOpacity>
            {termsError ? <Text className='text-xs text-red-500 mt-1 ml-1'>{termsError}</Text> : null}

            {/* Register Button */}
            <TouchableOpacity
              className='rounded-lg overflow-hidden shadow-md mb-4'
              onPress={handleRegister}
              activeOpacity={0.8}
            >
              <LinearGradient
                colors={["#2DD4BF", "#FFFFFF"]}
                className='py-4 items-center'
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
              >
                <Text className='text-lg font-bold text-white'>Kayıt Ol</Text>
              </LinearGradient>
            </TouchableOpacity>

            {/* Divider */}
            <View className='flex-row items-center my-4'>
              <View className='flex-1 h-[1px] bg-gray-200' />
              <Text className='text-sm text-gray-500 mx-4'>veya</Text>
              <View className='flex-1 h-[1px] bg-gray-200' />
            </View>

            {/* Social Register Buttons */}
            <View className='flex-row justify-center gap-4 mb-6'>
              <TouchableOpacity
                className='w-14 h-14 rounded-full bg-white border border-gray-200 items-center justify-center shadow-sm'
                onPress={() => handleSocialRegister("google")}
                activeOpacity={0.8}
              >
                <Ionicons name='logo-google' size={24} color='#DB4437' />
              </TouchableOpacity>
              <TouchableOpacity
                className='w-14 h-14 rounded-full bg-white border border-gray-200 items-center justify-center shadow-sm'
                onPress={() => handleSocialRegister("apple")}
                activeOpacity={0.8}
              >
                <Ionicons name='logo-apple' size={24} color='#111827' />
              </TouchableOpacity>
              <TouchableOpacity
                className='w-14 h-14 rounded-full bg-white border border-gray-200 items-center justify-center shadow-sm'
                onPress={() => handleSocialRegister("facebook")}
                activeOpacity={0.8}
              >
                <Ionicons name='logo-facebook' size={24} color='#4267B2' />
              </TouchableOpacity>
            </View>

            {/* Login Link */}
            <View className='flex-row justify-center items-center'>
              <Text className='text-base text-gray-600'>Zaten hesabınız var mı? </Text>
              <TouchableOpacity onPress={() => navigation.navigate("Login")}>
                <Text className='text-base font-bold text-primary'>Giriş Yapın</Text>
              </TouchableOpacity>
            </View>
          </View>
      </ScrollView>
    </SafeLayout>
  );
};

export default RegisterScreen;
