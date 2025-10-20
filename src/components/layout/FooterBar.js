import React from "react";
import { View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const BRAND_PRIMARY = "#2DD4BF";

/**
 * FooterBar - Global footer component
 * Tüm uygulamada aynı renkte görünür (brand.primary)
 */
const FooterBar = ({ children }) => {
  const insets = useSafeAreaInsets();

  return (
    <View
      // border artık gereksiz, global renkle birleştiğinde belli olmuyor
      style={{
        backgroundColor: BRAND_PRIMARY,
        paddingBottom: insets.bottom, // alt çene/gesture bar kadar
        paddingTop: 12, // biraz üst boşluk
        paddingHorizontal: 16,
        minHeight: 64, // tutarlı yükseklik (örneğin buton bar)
        justifyContent: "center",
      }}
    >
      {children || null}
    </View>
  );
};

export default FooterBar;
