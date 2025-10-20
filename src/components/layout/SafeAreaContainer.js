import React from "react";
import { View, Platform } from "react-native";
import { SafeAreaView, useSafeAreaInsets } from "react-native-safe-area-context";

/**
 * SafeAreaContainer - Geliştirilmiş güvenli alan sarmalayıcısı
 *
 * ✅ Otomatik olarak üst boşluğu (status bar / notch) ekler
 * ✅ Alt kenarda tab bar varsa gereksiz boşluğu kaldırır
 * ✅ NativeWind className + style birlikte çalışır
 *
 * Props:
 * - edges: ['top','bottom','left','right'] (varsayılan: ['top','bottom'])
 * - withPadding?: boolean → true ise otomatik iç padding ekler
 */
export default function SafeAreaContainer({
  edges = ["top", "bottom"],
  style,
  className = "flex-1 bg-white",
  withPadding = false,
  children,
}) {
  const insets = useSafeAreaInsets();

  return (
    <SafeAreaView
      edges={edges}
      style={[
        {
          paddingTop: insets.top,
          paddingBottom: edges.includes("bottom") && Platform.OS === "android" ? insets.bottom + 4 : insets.bottom,
          paddingHorizontal: withPadding ? 16 : 0,
          flex: 1,
        },
        style,
      ]}
      className={className}
    >
      <View className='flex-1'>{children}</View>
    </SafeAreaView>
  );
}
