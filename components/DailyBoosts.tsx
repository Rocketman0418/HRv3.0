import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import GlassCard from './GlassCard';
import { theme } from '../constants/theme';

const boosts = [
  {
    id: 1,
    title: 'Morning Hydration',
    description: 'Drink 16oz of water',
    points: 25,
    icon: 'water',
    color: theme.accent,
    completed: true,
  },
  {
    id: 2,
    title: 'Power Breakfast',
    description: 'Eat a protein-rich meal',
    points: 40,
    icon: 'restaurant',
    color: theme.warning,
    completed: false,
  },
  {
    id: 3,
    title: 'Deep Breathing',
    description: '5 minutes of breathing exercise',
    points: 30,
    icon: 'leaf',
    color: theme.success,
    completed: false,
  },
];

export default function DailyBoosts() {
  const handleBoostPress = (boost: any) => {
    console.log('Boost pressed:', boost.title);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.sectionTitle}>Daily Boosts</Text>
      <Text style={styles.subtitle}>Quick wins to optimize your day</Text>
      
      <View style={styles.boostsList}>
        {boosts.map((boost) => (
          <GlassCard
            key={boost.id}
            style={[styles.boostCard, boost.completed && styles.completedCard]}
          >
            <TouchableOpacity
              style={styles.boostContent}
              onPress={() => handleBoostPress(boost)}
              activeOpacity={0.8}
            >
              <View style={styles.boostRow}>
                <View style={[
                  styles.iconContainer,
                  { backgroundColor: boost.completed ? `${theme.success}20` : `${boost.color}20` }
                ]}>
                  <Ionicons 
                    name={boost.completed ? 'checkmark-circle' : boost.icon as any} 
                    size={24} 
                    color={boost.completed ? theme.success : boost.color} 
                  />
                </View>
                <View style={styles.textContainer}>
                  <Text style={[
                    styles.boostTitle,
                    boost.completed && styles.completedText,
                  ]}>
                    {boost.title}
                  </Text>
                  <Text style={[
                    styles.boostDescription,
                    boost.completed && styles.completedDescription,
                  ]}>
                    {boost.description}
                  </Text>
                </View>
                <View style={styles.pointsContainer}>
                  <Text style={[
                    styles.pointsText,
                    boost.completed && styles.completedPoints,
                  ]}>
                    +{boost.points}
                  </Text>
                  <Text style={styles.fpText}>FP</Text>
                </View>
              </View>
            </TouchableOpacity>
          </GlassCard>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: theme.spacing.lg,
    paddingBottom: theme.spacing.xl,
  },
  sectionTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: theme.text,
    marginBottom: theme.spacing.xs,
    textShadowColor: 'rgba(0, 0, 0, 0.5)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 2,
  },
  subtitle: {
    fontSize: 14,
    color: theme.textSecondary,
    marginBottom: theme.spacing.md,
  },
  boostsList: {
    gap: theme.spacing.sm + 4,
  },
  boostCard: {
    padding: 0,
  },
  completedCard: {
    opacity: 0.8,
  },
  boostContent: {
    padding: theme.spacing.md,
  },
  boostRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: theme.spacing.sm + 4,
    shadowColor: 'rgba(0, 0, 0, 0.2)',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 1,
    shadowRadius: 3,
    elevation: 3,
  },
  textContainer: {
    flex: 1,
  },
  boostTitle: {
    fontSize: 17,
    fontWeight: '600',
    color: theme.text,
    marginBottom: theme.spacing.xs,
  },
  completedText: {
    textDecorationLine: 'line-through',
    color: theme.textMuted,
  },
  boostDescription: {
    fontSize: 14,
    color: theme.textSecondary,
  },
  completedDescription: {
    color: theme.textDark,
  },
  pointsContainer: {
    alignItems: 'center',
  },
  pointsText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: theme.primary,
  },
  completedPoints: {
    color: theme.success,
  },
  fpText: {
    fontSize: 11,
    color: theme.textMuted,
    marginTop: theme.spacing.xs / 2,
    fontWeight: '500',
  },
});