import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import GlassCard from '../GlassCard';
import PrimaryButton from '../PrimaryButton';
import { theme } from '../../constants/theme';

interface BurnStreakIntroProps {
  onNext: () => void;
  loading: boolean;
}

export default function BurnStreakIntro({ onNext, loading }: BurnStreakIntroProps) {
  return (
    <GlassCard style={styles.container}>
      <View style={styles.iconContainer}>
        <Ionicons name="flame" size={60} color={theme.primary} />
      </View>
      
      <Text style={styles.title}>Build Your Burn Streak</Text>
      <Text style={styles.subtitle}>
        Consistency is the rocket fuel of transformation. Your burn streak tracks daily progress.
      </Text>
      
      <View style={styles.streakExamples}>
        <View style={styles.streakItem}>
          <View style={styles.streakDay}>
            <Text style={styles.dayNumber}>1</Text>
          </View>
          <Text style={styles.streakLabel}>Day 1</Text>
        </View>
        
        <View style={styles.streakItem}>
          <View style={[styles.streakDay, styles.streakDayActive]}>
            <Text style={styles.dayNumber}>7</Text>
          </View>
          <Text style={styles.streakLabel}>Week 1</Text>
        </View>
        
        <View style={styles.streakItem}>
          <View style={[styles.streakDay, styles.streakDayFire]}>
            <Ionicons name="flame" size={20} color="#FFFFFF" />
          </View>
          <Text style={styles.streakLabel}>On Fire!</Text>
        </View>
      </View>

      <View style={styles.benefitsContainer}>
        <Text style={styles.benefitsTitle}>🔥 Streak Benefits:</Text>
        <Text style={styles.benefitText}>• Bonus Fuel Points for consistency</Text>
        <Text style={styles.benefitText}>• Unlock streak-based achievements</Text>
        <Text style={styles.benefitText}>• Build unstoppable momentum</Text>
        <Text style={styles.benefitText}>• Track your longest streak record</Text>
      </View>

      <PrimaryButton
        title="Start My Streak"
        onPress={onNext}
        loading={loading}
        style={styles.nextButton}
      />
    </GlassCard>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: theme.spacing.xl,
    alignItems: 'center',
  },
  iconContainer: {
    marginBottom: theme.spacing.lg,
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    color: theme.text,
    textAlign: 'center',
    marginBottom: theme.spacing.md,
  },
  subtitle: {
    fontSize: 16,
    color: theme.textSecondary,
    textAlign: 'center',
    marginBottom: theme.spacing.xl,
    lineHeight: 24,
  },
  streakExamples: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
    marginBottom: theme.spacing.xl,
  },
  streakItem: {
    alignItems: 'center',
    gap: theme.spacing.sm,
  },
  streakDay: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: theme.surfaceDark,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: theme.glass.borderLight,
  },
  streakDayActive: {
    backgroundColor: theme.primary,
    borderColor: theme.primary,
  },
  streakDayFire: {
    backgroundColor: theme.error,
    borderColor: theme.error,
  },
  dayNumber: {
    fontSize: 18,
    fontWeight: 'bold',
    color: theme.text,
  },
  streakLabel: {
    fontSize: 12,
    color: theme.textMuted,
    fontWeight: '500',
  },
  benefitsContainer: {
    alignSelf: 'stretch',
    marginBottom: theme.spacing.xl,
  },
  benefitsTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: theme.primary,
    marginBottom: theme.spacing.md,
    textAlign: 'center',
  },
  benefitText: {
    fontSize: 14,
    color: theme.text,
    marginBottom: theme.spacing.sm,
    lineHeight: 20,
  },
  nextButton: {
    marginTop: theme.spacing.md,
    minWidth: 200,
  },
});