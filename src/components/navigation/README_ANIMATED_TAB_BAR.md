# Animated Footer Tab Bar

Figma tasarımına uygun, dalgalı animasyonlu özel tab bar bileşeni.

## Özellikler

- ✅ React Native Reanimated v3 ile performanslı animasyonlar
- ✅ SVG ile dalgalı (wave) arka plan
- ✅ Aktif sekme yukarı doğru kalkıyor
- ✅ Dalga animasyonu aktif sekmeye doğru kayıyor
- ✅ Her sekme için özel renkler
- ✅ Safe Area uyumlu
- ✅ Responsive tasarım
- ✅ React Navigation entegrasyonu

## Animasyon Detayları

### Dalga Animasyonu
- Aktif sekmenin altında beyaz dalga şekli belirir
- Sekme değiştiğinde dalga smooth bir şekilde yeni konuma kayar
- Bezier easing ile doğal hareket: `bezier(0.25, 0.1, 0.25, 1)`
- Animasyon süresi: 400ms

### İkon Animasyonu
- Aktif ikon 8px yukarı doğru kalkar (`translateY: -8`)
- Scale efekti: 0.9'dan 1.1'e (10% büyüme)
- Pasif ikonlar gri (#94A3B8), aktif ikonlar renkli

## Kullanım

### 1. Bileşen zaten AppNavigator'a entegre edildi

```jsx
// src/navigation/AppNavigator.js

import AnimatedFooterTabBar from "../components/navigation/AnimatedFooterTabBar";

const TabNavigator = () => {
  return (
    <View style={{ flex: 1, backgroundColor: "#FFFFFF" }}>
      <Tab.Navigator
        tabBar={(props) => <AnimatedFooterTabBar {...props} />}
        screenOptions={{
          headerShown: false,
          tabBarHideOnKeyboard: true,
        }}
      >
        <Tab.Screen name='Home' component={HomeScreen} />
        <Tab.Screen name='PlayMate' component={PlayMateStack} />
        {/* ... diğer sekmeler */}
      </Tab.Navigator>
    </View>
  );
};
```

### 2. Tab Konfigürasyonu

Tab renkleri ve ikonları `AnimatedFooterTabBar.jsx` dosyasındaki `TABS` array'inde tanımlı:

```jsx
const TABS = [
  {
    key: 'Home',
    label: 'Keşfet',
    icon: 'search-outline',        // Pasif ikon
    activeIcon: 'search',           // Aktif ikon
    color: '#14B8A6',               // Aktif renk
    gradient: ['#2DD4BF', '#14B8A6'] // Gradient renkleri
  },
  // ...
];
```

### 3. Sekme Renkleri

| Sekme | Renk | Hex |
|-------|------|-----|
| Keşfet | Turkuaz | #14B8A6 |
| Arkadaşlar | Açık Mavi | #60A5FA |
| Çiftleştirme | Pembe | #EC4899 |
| Sahiplen | Mor | #A855F7 |
| Otel | Turuncu | #F97316 |
| Veteriner | Kırmızı | #EF4444 |
| Kuaför | Yeşil | #10B981 |

## Özelleştirme

### Tab Bar Yüksekliği
```jsx
const TAB_BAR_HEIGHT = 60; // Değiştirilebilir
```

### İkon Boyutu
```jsx
const ICON_SIZE = 24; // Değiştirilebilir
```

### Dalga Yüksekliği
```jsx
const WAVE_HEIGHT = 20; // Değiştirilebilir
```

### Animasyon Süresi
```jsx
const ANIMATION_DURATION = 400; // ms cinsinden
```

### Arka Plan Rengi
```jsx
// Main container background
backgroundColor: '#0D0F24' // Koyu mavi/siyah

// Wave background
fill="#FFFFFF" // Beyaz dalga
```

## Teknik Detaylar

### Kullanılan Kütüphaneler
- `react-native-reanimated` v4.1.3 - Animasyonlar
- `react-native-svg` (Expo ile birlikte gelir) - SVG dalga şekli
- `@expo/vector-icons` - İkonlar
- `react-native-safe-area-context` - Safe area desteği

### Performans Optimizasyonu
- `useDerivedValue` ile derived values
- `useAnimatedStyle` ile UI thread'de animasyon
- `withTiming` ile smooth geçişler
- Minimal re-render

### Safe Area Desteği
Tab bar otomatik olarak cihazın safe area insets'lerini dikkate alır:
- iPhone'da alt gesture bar için padding
- Notch'lu cihazlarda üst kısım için padding

## Sorun Giderme

### Tab bar görünmüyor
1. `react-native-reanimated` kurulu mu kontrol edin
2. `babel.config.js`'de reanimated plugin'i ekli mi kontrol edin:
   ```js
   plugins: ['react-native-reanimated/plugin']
   ```
3. Projeyi yeniden başlatın: `npm start -- --clear`

### Animasyonlar çalışmıyor
1. Reanimated 2+ versiyonu kurulu olmalı
2. Metro bundler'ı yeniden başlatın
3. Cache'i temizleyin: `expo start -c`

### İkonlar görünmüyor
`@expo/vector-icons` yüklü olduğundan emin olun:
```bash
npx expo install @expo/vector-icons
```

## Gelecek Geliştirmeler

- [ ] Haptic feedback ekleme
- [ ] Label gösterme/gizleme özelliği
- [ ] Daha fazla wave şekli seçeneği
- [ ] Gradient dalga arka planı
- [ ] Badge desteği (bildirim sayısı)

## Lisans

Bu bileşen Pawloo projesi için özel olarak geliştirilmiştir.
