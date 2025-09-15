import React from 'react';
import { View, StyleSheet, ViewStyle } from 'react-native';
import { glassStyles, theme } from '../constants/theme';

interface GlassCardProps {
  children: React.ReactNode;
  style?: ViewStyle;
  padding?: keyof typeof theme.spacing;
}

export default function GlassCard({ children, style, padding = 'md' }: GlassCardProps) {
  return (
    <View style={[
      styles.container,
      { padding: theme.spacing[padding] },
      style
    ]}>
      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    ...glassStyles,
    borderRadius: theme.radius.lg,
  },
});