import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useAuth } from '../contexts/AuthContext';
import GlassCard from './GlassCard';
import { theme } from '../constants/theme';

export default function FuelPointsCard() {
  const { userData } = useAuth();

  const fuelPoints = userData?.fuel_points || 0;
  const level = userData?.level || 1;
  const progressToNextLevel = Math.min(((fuelPoints % 1000) / 1000) * 100, 100);

  return (
    <GlassCard style={styles.container}>
      <View style={styles.header}>
        <View style={styles.iconContainer}>
          <Ionicons name="flame" size={28} color={theme.primary} />
        </View>
        <Text style={styles.title}>Fuel Points</Text>
      </View>
      <Text style={styles.points}>{fuelPoints.toLocaleString()}</Text>
      <Text style={styles.subtitle}>Keep burning to reach your next level!</Text>
      <View style={styles.progressContainer}>
        <View style={styles.progressBar}>
          <View style={[styles.progressFill, { width: `${progressToNextLevel}%` }]} />
        </View>
        <Text style={styles.progressText}>{Math.round(progressToNextLevel)}% to Level {level + 1}</Text>
      </View>
    </GlassCard>
  );
}

const styles = StyleSheet.create({
  container: {
    marginHorizontal: theme.spacing.lg,
    marginBottom: theme.spacing.md,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: theme.spacing.sm + 4,
  },
  iconContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: `${theme.primary}20`,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: theme.spacing.sm + 4,
    shadowColor: theme.primary,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 4,
  },
  title: {
    fontSize: 20,
    fontWeight: '600',
    color: theme.text,
  },
  points: {
    fontSize: 42,
    fontWeight: 'bold',
    color: theme.primary,
    marginBottom: theme.spacing.sm,
    textShadowColor: `${theme.primary}50`,
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 4,
  },
  subtitle: {
    fontSize: 14,
    color: theme.textSecondary,
    marginBottom: theme.spacing.md,
  },
  progressContainer: {
    gap: theme.spacing.sm,
  },
  progressBar: {
    height: 10,
    backgroundColor: theme.surfaceDark,
    borderRadius: theme.radius.sm,
    overflow: 'hidden',
    shadowColor: 'rgba(0, 0, 0, 0.3)',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 1,
    shadowRadius: 2,
    elevation: 2,
  },
  progressFill: {
    height: '100%',
    backgroundColor: theme.primary,
    borderRadius: theme.radius.sm,
    shadowColor: theme.primary,
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowOpacity: 0.8,
    shadowRadius: 4,
    elevation: 4,
  },
  progressText: {
    fontSize: 13,
    color: theme.textMuted,
    textAlign: 'center',
    fontWeight: '500',
  },
});