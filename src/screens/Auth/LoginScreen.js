// src/screens/Auth/LoginScreen.js
import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, ScrollView } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import SafeLayout from "../../components/layout/SafeLayout";

const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const handleLogin = () => {
    let isValid = true;

    if (!email) {
      setEmailError("Kullanıcı adı gereklidir");
      isValid = false;
    } else {
      setEmailError("");
    }

    if (!password) {
      setPasswordError("Şifre gereklidir");
      isValid = false;
    } else {
      setPasswordError("");
    }

    if (isValid) {
      if (email === "admin" && password === "1234") {
        navigation.replace("MainApp");
      } else {
        setEmailError("Kullanıcı adı veya şifre hatalı");
        setPasswordError("Kullanıcı adı veya şifre hatalı");
      }
    }
  };

  const handleSocialLogin = provider => {
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

        {/* Logo / Title */}
        <View className='items-center py-8'>
          <View className='w-[100px] h-[100px] rounded-full bg-[#2DD4BF20] items-center justify-center mb-4'>
            <Ionicons name='paw' size={48} color='#2DD4BF' />
          </View>
          <Text className='text-3xl font-bold text-gray-900 mb-1'>Hoş Geldiniz!</Text>
          <Text className='text-base text-gray-600'>Hesabınıza giriş yapın</Text>
        </View>

        {/* Form */}
        <View className='px-4'>
          {/* Username */}
          <View className='mb-4'>
            <Text className='text-sm font-semibold text-gray-700 mb-1'>Kullanıcı Adı</Text>
            <View
              className={`flex-row items-center bg-gray-50 rounded-lg border px-4 h-14 gap-2 ${
                emailError ? "border-red-500 bg-red-50/10" : "border-gray-200"
              }`}
            >
              <Ionicons name='person-outline' size={20} color='#9CA3AF' />
              <TextInput
                className='flex-1 text-base text-gray-900'
                placeholder='admin'
                placeholderTextColor='#9CA3AF'
                value={email}
                onChangeText={t => {
                  setEmail(t);
                  setEmailError("");
                }}
                autoCapitalize='none'
                autoCorrect={false}
                returnKeyType='next'
              />
            </View>
            {emailError ? <Text className='text-xs text-red-500 mt-1 ml-1'>{emailError}</Text> : null}
          </View>

          {/* Password */}
          <View className='mb-4'>
            <Text className='text-sm font-semibold text-gray-700 mb-1'>Şifre</Text>
            <View
              className={`flex-row items-center bg-gray-50 rounded-lg border px-4 h-14 gap-2 ${
                passwordError ? "border-red-500 bg-red-50/10" : "border-gray-200"
              }`}
            >
              <Ionicons name='lock-closed-outline' size={20} color='#9CA3AF' />
              <TextInput
                className='flex-1 text-base text-gray-900'
                placeholder='1234'
                placeholderTextColor='#9CA3AF'
                value={password}
                onChangeText={t => {
                  setPassword(t);
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

          {/* Forgot Password */}
          <TouchableOpacity className='self-end mb-4' onPress={() => navigation.navigate("ForgotPassword")}>
            <Text className='text-sm font-semibold text-[#2DD4BF]'>Şifremi Unuttum</Text>
          </TouchableOpacity>

          {/* Login Button */}
          <TouchableOpacity className='rounded-lg overflow-hidden shadow-md' onPress={handleLogin} activeOpacity={0.8}>
            <LinearGradient
              colors={["#2DD4BF", "#2DD4BF"]}
              className='py-4 items-center'
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
            >
              <Text className='text-lg font-bold text-white'>Giriş Yap</Text>
            </LinearGradient>
          </TouchableOpacity>

          {/* Divider */}
          <View className='flex-row items-center my-6'>
            <View className='flex-1 h-[1px] bg-gray-200' />
            <Text className='text-sm text-gray-500 mx-4'>veya</Text>
            <View className='flex-1 h-[1px] bg-gray-200' />
          </View>

          {/* Social Buttons */}
          <View className='flex-row justify-center gap-4 mb-6'>
            <TouchableOpacity
              className='w-14 h-14 rounded-full bg-white border border-gray-200 items-center justify-center shadow-sm'
              onPress={() => handleSocialLogin("google")}
              activeOpacity={0.8}
            >
              <Ionicons name='logo-google' size={24} color='#DB4437' />
            </TouchableOpacity>
            <TouchableOpacity
              className='w-14 h-14 rounded-full bg-white border border-gray-200 items-center justify-center shadow-sm'
              onPress={() => handleSocialLogin("apple")}
              activeOpacity={0.8}
            >
              <Ionicons name='logo-apple' size={24} color='#111827' />
            </TouchableOpacity>
            <TouchableOpacity
              className='w-14 h-14 rounded-full bg-white border border-gray-200 items-center justify-center shadow-sm'
              onPress={() => handleSocialLogin("facebook")}
              activeOpacity={0.8}
            >
              <Ionicons name='logo-facebook' size={24} color='#4267B2' />
            </TouchableOpacity>
          </View>

          {/* Register Link */}
          <View className='flex-row justify-center items-center pb-4'>
            <Text className='text-base text-gray-600'>Hesabınız yok mu? </Text>
            <TouchableOpacity onPress={() => navigation.navigate("Register")}>
              <Text className='text-base font-bold text-[#2DD4BF]'>Kayıt Olun</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </SafeLayout>
  );
};

export default LoginScreen;
