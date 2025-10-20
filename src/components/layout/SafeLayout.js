// src/components/layout/SafeLayout.js
import React from "react";
import { View } from "react-native";
import AppLayout from "./AppLayout";

const SafeLayout = ({
  children,
  style,
  backgroundColor = "#FFFFFF",
  // barStyle artık kullanılmıyor; kontrastı AppLayout hesaplıyor
  barStyle, // eslint-disable-line no-unused-vars
  header,
  footer,
  useGradientHeader = false,
  gradientColors = [],
  // İleride ihtiyaç olursa aşağıdakileri de prop olarak alıp forward edebilirsin:
  className = "flex-1",
  contentClassName = "flex-1",
  keyboardBehavior, // iOS=padding, Android=height önerilir (AppLayout default’ları var)
  edges, // AppLayout default: ['top','right','left','bottom']
}) => {
  // Gradient aktifse, üst bant rengi olarak ilk tonu kullan
  const headerBgColor = useGradientHeader ? (gradientColors && gradientColors[0]) || backgroundColor : backgroundColor;

  return (
    <AppLayout
      header={header}
      footer={footer} // undefined: global FooterBar, null: hiç footer yok
      headerBgColor={headerBgColor}
      useGradientHeader={useGradientHeader}
      gradientColors={gradientColors}
      className={className}
      contentClassName={contentClassName}
      keyboardBehavior={keyboardBehavior}
      edges={edges}
    >
      {/* Eski SafeLayout'tan gelen 'style' içerik paneline uygulanır */}
      <View style={style} className='flex-1'>
        {children}
      </View>
    </AppLayout>
  );
};

export default SafeLayout;
