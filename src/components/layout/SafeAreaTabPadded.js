import React from 'react';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import { View } from 'react-native';

/**
 * SafeAreaTabPadded - Safe area wrapper with extra bottom padding for tab bar
 *
 * Use this for tab screens where content might overlap with the tab bar.
 * Adds bottom padding based on safe area insets to prevent content clipping.
 *
 * @param {Object|Array} style - Custom styles
 * @param {string} className - NativeWind classes
 * @param {ReactNode} children - Child components
 *
 * Usage: Only for screens within tab navigator where bottom content needs clearance
 */
export default function SafeAreaTabPadded({
  style,
  className = 'flex-1',
  children
}) {
  const insets = useSafeAreaInsets();

  return (
    <SafeAreaView edges={['top']} style={style} className={className}>
      <View style={{ flex: 1, paddingBottom: insets.bottom }}>
        {children}
      </View>
    </SafeAreaView>
  );
}
