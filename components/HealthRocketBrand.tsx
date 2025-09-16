import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import { HR_HORIZONTAL_LOGO, HR_ROUND_LOGO, theme } from '../constants/theme';

interface HealthRocketBrandProps {
  variant?: 'horizontal' | 'round';
  size?: 'small' | 'medium' | 'large';
  showTagline?: boolean;
}

export default function HealthRocketBrand({ 
  variant = 'horizontal', 
  size = 'medium',
  showTagline = true 
}: HealthRocketBrandProps) {
  const logoSource = variant === 'horizontal' ? HR_HORIZONTAL_LOGO : HR_ROUND_LOGO;
  
  const sizeStyles = {
    small: { width: 120, height: 40 },
    medium: { width: 200, height: 67 },
    large: { width: 300, height: 100 },
  };

  const textSizes = {
    small: { title: 16, tagline: 12 },
    medium: { title: 24, tagline: 16 },
    large: { title: 32, tagline: 20 },
  };

  if (variant === 'horizontal') {
    return (
      <View style={styles.container}>
        <Image 
          source={logoSource} 
          style={[styles.horizontalLogo, sizeStyles[size]]}
          resizeMode="contain"
        />
        {showTagline && (
          <Text style={[styles.tagline, { fontSize: textSizes[size].tagline }]}>
            LAUNCHING HEALTH-SPAN
          </Text>
        )}
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Image 
        source={logoSource} 
        style={[styles.roundLogo, { width: sizeStyles[size].width, height: sizeStyles[size].width }]}
        resizeMode="contain"
      />
      <Text style={[styles.brandTitle, { fontSize: textSizes[size].title }]}>
        HEALTH ROCKET
      </Text>
      {showTagline && (
        <Text style={[styles.tagline, { fontSize: textSizes[size].tagline }]}>
          LAUNCHING HEALTH-SPAN
        </Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  horizontalLogo: {
    marginBottom: 8,
  },
  roundLogo: {
    marginBottom: 12,
  },
  brandTitle: {
    fontWeight: 'bold',
    color: theme.primary,
    letterSpacing: 2,
    textAlign: 'center',
    marginBottom: 4,
    textShadowColor: 'rgba(255, 107, 0, 0.5)',
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 4,
  },
  tagline: {
    color: theme.success,
    fontWeight: '600',
    letterSpacing: 1,
    textAlign: 'center',
    textShadowColor: 'rgba(16, 185, 129, 0.5)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 2,
  },
});