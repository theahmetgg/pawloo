/**
 * WCAG luma hesabı ile bir rengin açık mı koyu mu olduğunu belirler
 * @param {string} hexColor - Hex renk kodu (#RRGGBB veya #RGB)
 * @returns {'light' | 'dark'} - Status bar icon rengi için
 */
export const getContrastColor = (hexColor) => {
  if (!hexColor) return 'dark';

  // # karakterini kaldır
  let hex = hexColor.replace('#', '');

  // Kısa format (#RGB) ise uzun formata çevir (#RRGGBB)
  if (hex.length === 3) {
    hex = hex
      .split('')
      .map((char) => char + char)
      .join('');
  }

  // RGB değerlerini çıkar
  const r = parseInt(hex.substring(0, 2), 16);
  const g = parseInt(hex.substring(2, 4), 16);
  const b = parseInt(hex.substring(4, 6), 16);

  // WCAG luma hesabı
  // https://www.w3.org/TR/WCAG20-TECHS/G17.html
  const luma = 0.299 * r + 0.587 * g + 0.114 * b;

  // 186 threshold (0-255 arası, orta nokta ~128 ama kontrast için 186 daha iyi)
  return luma > 186 ? 'dark' : 'light';
};

/**
 * Gradient array'den ilk rengi alır (safe area için)
 * @param {string[]} colors - Gradient renk array'i
 * @returns {string} - İlk renk
 */
export const getGradientTopColor = (colors) => {
  if (!colors || !Array.isArray(colors) || colors.length === 0) {
    return '#FFFFFF';
  }
  return colors[0];
};
