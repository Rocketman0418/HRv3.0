import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useAuth } from '../contexts/AuthContext';
import GlassCard from './GlassCard';
import { theme, iconStyles } from '../constants/theme';


export default function StatsGrid() {
  const { userData } = useAuth();

  const stats = [
    {
      title: 'Health Score',
      value: userData?.health_score?.toString() || '0',
      unit: '/10',
      icon: 'heart',
      style: iconStyles.healthScore,
    },
    {
      title: 'Burn Streak',
      value: userData?.burn_streak?.toString() || '0',
      unit: 'days',
      icon: 'flash',
      style: iconStyles.burnStreak,
    },
    {
      title: 'Energy Level',
      value: '0', // This would come from a calculation or separate field
      unit: '%',
      icon: 'battery-charging',
      style: iconStyles.energyLevel,
    },
    {
      title: 'Focus Score',
      value: '0', // This would come from a calculation or separate field
      unit: '/10',
      icon: 'eye',
      style: iconStyles.focusScore,
    },
  ];

  return (
    <View style={styles.container}>
      <Text style={styles.sectionTitle}>Today's Performance</Text>
      <View style={styles.grid}>
        {stats.map((stat, index) => (
          <GlassCard key={index} style={styles.statCard} padding="md">
            <View style={[styles.iconContainer, stat.style]}>
              <Ionicons name={stat.icon as any} size={20} color="#FFFFFF" />
            </View>
            <Text style={styles.statValue}>
              {stat.value}
              <Text style={styles.statUnit}>{stat.unit}</Text>
            </Text>
            <Text style={styles.statTitle}>{stat.title}</Text>
          </GlassCard>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: theme.spacing.lg,
    marginBottom: theme.spacing.md,
  },
  sectionTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: theme.text,
    marginBottom: theme.spacing.md,
    textShadowColor: 'rgba(0, 0, 0, 0.5)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 2,
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: theme.spacing.sm + 4,
  },
  statCard: {
    flex: 1,
    minWidth: '45%',
    alignItems: 'center',
  },
  iconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: theme.spacing.sm,
    shadowColor: theme.glass.glow,
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.6,
    shadowRadius: 8,
    elevation: 8,
  },
  statValue: {
    fontSize: 26,
    fontWeight: 'bold',
    color: theme.text,
    marginBottom: theme.spacing.xs,
  },
  statUnit: {
    fontSize: 16,
    fontWeight: 'normal',
    color: theme.textMuted,
  },
  statTitle: {
    fontSize: 13,
    color: theme.textSecondary,
    textAlign: 'center',
    fontWeight: '500',
  },
});