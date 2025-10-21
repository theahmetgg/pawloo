const THEME_COLORS = {
  playMate: {
    bg: "#F9FAFB",
    accent: "#F59E0B",
    accentLight: "#FEF3C7",
    card: "#FFFFFF",
    text: "#0F172A",
    textSecondary: "#475569",
    border: "#E2E8F0",
    overlay: "rgba(255, 255, 255, 0.95)",
  },
  breeding: {
    bg: "#FFFFFF",
    accent: "#E11D48",
    accentLight: "#FFE4E6",
    card: "#F8FAFC",
    text: "#0F172A",
    textSecondary: "#475569",
    border: "#E2E8F0",
    overlay: "rgba(255, 255, 255, 0.95)",
  },
  adoption: {
    bg: "#F8FAFC",
    accent: "#22C55E",
    accentLight: "#DCFCE7",
    card: "#FFFFFF",
    text: "#0F172A",
    textSecondary: "#475569",
    border: "#E2E8F0",
    overlay: "rgba(255, 255, 255, 0.95)",
  },
  hotelCare: {
    bg: "#F9FAFB",
    accent: "#06B6D4",
    accentLight: "#CFFAFE",
    card: "#FFFFFF",
    text: "#0F172A",
    textSecondary: "#475569",
    border: "#E2E8F0",
    overlay: "rgba(255, 255, 255, 0.95)",
  },
  veterinary: {
    bg: "#FFFFFF",
    accent: "#3B82F6",
    accentLight: "#DBEAFE",
    card: "#F8FAFC",
    text: "#0F172A",
    textSecondary: "#475569",
    border: "#E2E8F0",
    overlay: "rgba(255, 255, 255, 0.95)",
  },
  petGrooming: {
    bg: "#F8FAFC",
    accent: "#EC4899",
    accentLight: "#FCE7F3",
    card: "#FFFFFF",
    text: "#0F172A",
    textSecondary: "#475569",
    border: "#E2E8F0",
    overlay: "rgba(255, 255, 255, 0.95)",
  },
};

/**
 * Hook to get theme colors for a specific screen
 * @param {string} screenKey - The screen identifier (playMate, breeding, adoption, etc.)
 * @returns {object} Theme colors object
 */
export const useThemeColors = (screenKey) => {
  return THEME_COLORS[screenKey] || THEME_COLORS.playMate;
};

export default useThemeColors;
