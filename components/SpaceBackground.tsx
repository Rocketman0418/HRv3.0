import React from 'react';
import { View, ImageBackground, StyleSheet } from 'react-native';
import { SPACE_BACKGROUND, theme } from '../constants/theme';

interface SpaceBackgroundProps {
  children: React.ReactNode;
  overlay?: boolean;
}

export default function SpaceBackground({ children, overlay = true }: SpaceBackgroundProps) {
  return (
    <ImageBackground
      source={{ uri: SPACE_BACKGROUND }}
      style={styles.background}
      resizeMode="cover"
    >
      {overlay && <View style={styles.overlay} />}
      {children}
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0, 0, 0.2)',
  },
});