import React from "react";
import { Platform } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function SafeAreaContainer({
  edges = ["top", "right", "bottom", "left"],
  className = "flex-1 bg-white",
  style,
  withPadding = false,
  extraTop = 0,
  extraBottom = 0,
  androidBottomSoft = 4, // alt yumuşatma (opsiyonel)
  children,
}) {
  return (
    <SafeAreaView
      edges={edges}
      className={className}
      style={[
        { flex: 1, paddingHorizontal: withPadding ? 16 : 0 },
        {
          paddingTop: extraTop,
          paddingBottom: extraBottom + (Platform.OS === "android" && edges.includes("bottom") ? androidBottomSoft : 0),
        },
        style,
      ]}
    >
      {children}
    </SafeAreaView>
  );
}
