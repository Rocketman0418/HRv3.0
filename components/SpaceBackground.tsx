import React from 'react';
import { View, StyleSheet, Dimensions } from 'react-native';

const { width: screenWidth, height: screenHeight } = Dimensions.get('window');

// Generate random star positions
const generateStars = (count: number) => {
  const stars = [];
  for (let i = 0; i < count; i++) {
    stars.push({
      id: i,
      left: Math.random() * screenWidth,
      top: Math.random() * screenHeight,
      size: Math.random() * 2 + 1, // 1-3px
      opacity: Math.random() * 0.8 + 0.2, // 0.2-1.0
    });
  }
  return stars;
};

const stars = generateStars(150); // 150 stars across the screen

interface SpaceBackgroundProps {
  children: React.ReactNode;
  overlay?: boolean;
}

export default function SpaceBackground({ children, overlay = true }: SpaceBackgroundProps) {
  return (
    <View style={styles.background}>
      {/* Render stars */}
      {stars.map((star) => (
        <View
          key={star.id}
          style={[
            styles.star,
            {
              left: star.left,
              top: star.top,
              width: star.size,
              height: star.size,
              opacity: star.opacity,
            },
          ]}
        />
      ))}
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
  star: {
    position: 'absolute',
    backgroundColor: '#FFFFFF',
    borderRadius: 50,
    shadowColor: '#FFFFFF',
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowOpacity: 0.8,
    shadowRadius: 1,
    elevation: 1,
  },
});