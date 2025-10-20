import React from "react";
import AppLayout from "./AppLayout";

/**
 * ScreenWrapper
 *
 * AppLayout'u daha kolay kullanmak için wrapper component.
 * headerBgColor ZORUNLU (sayfa tepe rengi için). Verilmezse '#FFFFFF' düşer.
 *
 * Kullanım 1:
 * <ScreenWrapper headerBgColor="#F59E0B" header={...} footer={...}>
 *   <YourContent />
 * </ScreenWrapper>
 *
 * Kullanım 2 (HOC):
 * export default withScreenLayout(YourScreen, {
 *   headerBgColor: '#10B981',
 *   header: <Header />,
 *   footer: <Footer />
 * })
 */
const ScreenWrapper = ({
  children,
  header,
  footer,
  className,
  contentClassName,
  keyboardBehavior,
  edges,
  // yeni props
  headerBgColor = "#FFFFFF",
  useGradientHeader = false,
  gradientColors = [],
}) => {
  return (
    <AppLayout
      header={header}
      footer={footer}
      className={className}
      contentClassName={contentClassName}
      keyboardBehavior={keyboardBehavior}
      edges={edges}
      headerBgColor={headerBgColor}
      useGradientHeader={useGradientHeader}
      gradientColors={gradientColors}
    >
      {children}
    </AppLayout>
  );
};

/**
 * HOC: withScreenLayout
 *
 * Bir ekranı otomatik olarak AppLayout ile sarar.
 * headerBgColor sağlanmazsa '#FFFFFF' kullanır.
 */
export function withScreenLayout(Component, layoutProps = {}) {
  const { headerBgColor = "#FFFFFF", useGradientHeader, gradientColors, ...rest } = layoutProps;

  return props => (
    <ScreenWrapper
      headerBgColor={headerBgColor}
      useGradientHeader={useGradientHeader}
      gradientColors={gradientColors}
      {...rest}
    >
      <Component {...props} />
    </ScreenWrapper>
  );
}

export default ScreenWrapper;
