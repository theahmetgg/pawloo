// babel.config.js
module.exports = function (api) {
  api.cache(true);
  return {
    presets: [
      // NativeWind v4 için jsxImportSource'ı preset üzerinden geç
      ["babel-preset-expo", { jsxImportSource: "nativewind" }],
      // v4'te ek preset olarak nativewind/babel ekleyebilirsin
      "nativewind/babel",
    ],
    plugins: [
      // Reanimated her zaman en sonda
      "react-native-reanimated/plugin",
    ],
  };
};
