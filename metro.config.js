// metro.config.js
const { getDefaultConfig } = require("expo/metro-config");
const { withNativeWind } = require("nativewind/metro");

const config = getDefaultConfig(__dirname);

// global.css'i NativeWind'e tanıt
module.exports = withNativeWind(config, { input: "./global.css" });
