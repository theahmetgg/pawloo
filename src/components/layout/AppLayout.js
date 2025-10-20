import React, { useState } from "react";
import { View, KeyboardAvoidingView, Platform, StatusBar as RNStatusBar, Dimensions } from "react-native";
import { SafeAreaView, useSafeAreaInsets } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
import { getContrastColor, getGradientTopColor } from "../../utils/contrast";
import FooterBar from "./FooterBar";

const { width: SCREEN_WIDTH } = Dimensions.get("window");
const BASE_WIDTH = 375;

export const scale = size => {
  return (SCREEN_WIDTH / BASE_WIDTH) * size;
};

/**
 * AppLayout - Uygulama geneli layout sistemi
 *
 * - Üst bant (status bar + safe area + header arkası) sayfa renginde
 * - Footer global tek renkte (FooterBar)
 * - Status bar icon rengi otomatik kontrast
 * - Safe area + keyboard yönetimi
 */
const AppLayout = ({
  children,
  header,
  footer,
  headerBgColor,
  useGradientHeader = false,
  gradientColors = [],
  headerFixedHeight,
  keyboardBehavior = Platform.OS === "ios" ? "padding" : "height",
  className = "flex-1",
  contentClassName = "flex-1",
  // ÖNEMLİ: top dahil! (iOS notch/Android status bar için)
  edges = ["top", "right", "left", "bottom"],
}) => {
  const insets = useSafeAreaInsets();
  const [headerHeight, setHeaderHeight] = useState(headerFixedHeight || 60);

  // Android translucent StatusBar yükseklik bilgisi
  // NOT: edges içinde 'top' kullandığımız için ekstra padding olarak UYGULAMAYACAĞIZ.
  const extraTop = Platform.OS === "android" ? RNStatusBar.currentHeight ?? 0 : 0;

  // Safe area + header için baz renk (gradient ise tepesi, değilse headerBgColor)
  const safeAreaBgColor = useGradientHeader ? getGradientTopColor(gradientColors) : headerBgColor || "#FFFFFF";

  // Status bar icon rengi (light/dark)
  const statusBarStyle = getContrastColor(safeAreaBgColor);

  // Klavye offset: header yüksekliği + tepedeki safe area
  // DİKKAT: extraTop eklemiyoruz (edges top varken yeterli)
  const keyboardVerticalOffset = headerHeight + insets.top;

  const handleHeaderLayout = event => {
    if (!headerFixedHeight) {
      const { height } = event.nativeEvent.layout;
      if (height > 0 && height !== headerHeight) {
        setHeaderHeight(height);
      }
    }
  };

  return (
    <SafeAreaView
      edges={edges}
      className={className}
      // Tepe bant + header arkası bu renkte görünsün
      style={{ backgroundColor: safeAreaBgColor }}
    >
      {/* Üst ikon rengi safeAreaBgColor'a göre ayarlanır */}
      <StatusBar style={statusBarStyle} translucent backgroundColor='transparent' />

      <KeyboardAvoidingView
        className='flex-1'
        behavior={keyboardBehavior}
        keyboardVerticalOffset={keyboardVerticalOffset}
      >
        <View className='flex-1'>
          {/* HEADER: arkaplanı sayfa renginde olacak */}
          {header && (
            <View
              onLayout={handleHeaderLayout}
              // Header arkası aynı renge boyanır -> tepeyle birleşik görünür
              style={{ backgroundColor: "transparent" }}
              className='min-h-[60px]'
            >
              {header}
            </View>
          )}

          {/* ANA İÇERİK: ayrı yüzey (genelde beyaz) */}
          <View
            className={contentClassName}
            // İstersen burayı da prop ile yönetebilirsin
            style={{ backgroundColor: "#FFFFFF", flex: 1 }}
          >
            {children}
          </View>

          {/* FOOTER:
              - footer prop verilirse onu kullan
              - verilmezse global tek renkli FooterBar (içeride insets.bottom handle) */}
          {footer !== undefined ? footer && <View>{footer}</View> : <FooterBar />}
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default AppLayout;
