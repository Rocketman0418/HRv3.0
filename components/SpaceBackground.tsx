import React from 'react';
import { View, StyleSheet } from 'react-native';

interface SpaceBackgroundProps {
  children: React.ReactNode;
  overlay?: boolean;
}

export default function SpaceBackground({ children, overlay = true }: SpaceBackgroundProps) {
  return (
    <View style={styles.background}>
      {overlay && <View style={styles.overlay} />}
      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    backgroundColor: '#0a0a0a', // Deep space black as fallback
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0, 0, 0.3)', // Subtle overlay for text readability
  },
});