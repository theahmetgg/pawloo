import React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';

/**
 * SafeAreaContainer - Consistent safe area wrapper for all screens
 *
 * @param {Array} edges - Which edges to apply safe area ['top', 'bottom', 'left', 'right']
 * @param {Object|Array} style - Custom styles
 * @param {string} className - NativeWind classes
 * @param {ReactNode} children - Child components
 *
 * Default: Protects top and bottom edges for consistent iOS/Android behavior
 *
 * Usage:
 * - Full screen: edges={['top', 'bottom']}
 * - With tab bar: edges={['top', 'right', 'left']} (bottom handled by tab bar)
 * - Immersive: edges={[]} or edges={['bottom']}
 * - Modal: edges={['bottom']}
 */
export default function SafeAreaContainer({
  edges = ['top', 'bottom'],
  style,
  className = 'flex-1',
  children
}) {
  return (
    <SafeAreaView edges={edges} style={style} className={className}>
      {children}
    </SafeAreaView>
  );
}
