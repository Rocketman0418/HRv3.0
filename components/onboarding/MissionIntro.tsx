import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import GlassCard from '../GlassCard';
import PrimaryButton from '../PrimaryButton';
import { theme } from '../../constants/theme';

interface MissionIntroProps {
  onNext: () => void;
  loading: boolean;
}

export default function MissionIntro({ onNext, loading }: MissionIntroProps) {
  return (
    <GlassCard style={styles.container}>
      <Text style={styles.title}>Welcome to Health Rocket!</Text>
      <Text style={styles.subtitle}>
        Your personal mission control for optimizing healthspan and unlocking your potential.
      </Text>
      
      <View style={styles.featuresContainer}>
        <Text style={styles.featuresTitle}>🚀 Your Free Mission Includes:</Text>
        
        <View style={styles.featuresList}>
          <View style={styles.featureItem}>
            <Text style={styles.featureIcon}>⚡</Text>
            <Text style={styles.featureText}>Daily health boosts to earn Fuel Points</Text>
          </View>
          
          <View style={styles.featureItem}>
            <Text style={styles.featureIcon}>📊</Text>
            <Text style={styles.featureText}>Personal health score tracking</Text>
          </View>
          
          <View style={styles.featureItem}>
            <Text style={styles.featureIcon}>🔥</Text>
            <Text style={styles.featureText}>Build your burn streak for consistency</Text>
          </View>
          
          <View style={styles.featureItem}>
            <Text style={styles.featureIcon}>🏆</Text>
            <Text style={styles.featureText}>Level up and unlock achievements</Text>
          </View>
        </View>

        <View style={styles.upgradeHint}>
          <Text style={styles.upgradeText}>
            💎 <Text style={styles.upgradeHighlight}>Upgrade anytime</Text> for advanced challenges, AI coaching, and premium features
          </Text>
        </View>
      </View>

      <PrimaryButton
        title="Begin Mission"
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
  },
  title: {
    fontSize: 28,
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
  featuresContainer: {
    marginBottom: theme.spacing.xl,
  },
  featuresTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: theme.primary,
    marginBottom: theme.spacing.md,
    textAlign: 'center',
  },
  featuresList: {
    gap: theme.spacing.md,
    marginBottom: theme.spacing.lg,
  },
  featureItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: theme.spacing.sm,
  },
  featureIcon: {
    fontSize: 20,
    marginRight: theme.spacing.md,
    width: 30,
  },
  featureText: {
    fontSize: 16,
    color: theme.text,
    flex: 1,
    lineHeight: 22,
  },
  upgradeHint: {
    backgroundColor: `${theme.primary}10`,
    borderRadius: theme.radius.md,
    padding: theme.spacing.md,
    borderWidth: 1,
    borderColor: `${theme.primary}30`,
  },
  upgradeText: {
    fontSize: 14,
    color: theme.textSecondary,
    textAlign: 'center',
    lineHeight: 20,
  },
  upgradeHighlight: {
    color: theme.primary,
    fontWeight: '600',
  },
  nextButton: {
    marginTop: theme.spacing.md,
  },
});