import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import GlassCard from '../GlassCard';
import PrimaryButton from '../PrimaryButton';
import { theme } from '../../constants/theme';

interface CommunityIntroProps {
  onNext: () => void;
  loading: boolean;
}

export default function CommunityIntro({ onNext, loading }: CommunityIntroProps) {
  return (
    <GlassCard style={styles.container}>
      <View style={styles.iconContainer}>
        <Ionicons name="people" size={60} color={theme.accent} />
      </View>
      
      <Text style={styles.title}>Join the Health Rocket Community</Text>
      <Text style={styles.subtitle}>
        Connect with fellow health optimizers on the same mission to extend healthspan.
      </Text>
      
      <View style={styles.communityFeatures}>
        <View style={styles.featureRow}>
          <View style={styles.featureIcon}>
            <Ionicons name="chatbubbles" size={24} color={theme.accent} />
          </View>
          <View style={styles.featureContent}>
            <Text style={styles.featureTitle}>Share Your Journey</Text>
            <Text style={styles.featureDescription}>
              Post progress updates and celebrate wins together
            </Text>
          </View>
        </View>

        <View style={styles.featureRow}>
          <View style={styles.featureIcon}>
            <Ionicons name="trophy" size={24} color={theme.warning} />
          </View>
          <View style={styles.featureContent}>
            <Text style={styles.featureTitle}>Friendly Competition</Text>
            <Text style={styles.featureDescription}>
              Join challenges and climb the leaderboards
            </Text>
          </View>
        </View>

        <View style={styles.featureRow}>
          <View style={styles.featureIcon}>
            <Ionicons name="bulb" size={24} color={theme.success} />
          </View>
          <View style={styles.featureContent}>
            <Text style={styles.featureTitle}>Learn & Grow</Text>
            <Text style={styles.featureDescription}>
              Get tips, advice, and motivation from the community
            </Text>
          </View>
        </View>
      </View>

      <View style={styles.communityStats}>
        <Text style={styles.statsTitle}>🌟 Join thousands of health optimizers</Text>
        <Text style={styles.statsSubtitle}>
          Our community has collectively earned over 1M Fuel Points!
        </Text>
      </View>

      <PrimaryButton
        title="Join the Community"
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
  iconContainer: {
    alignItems: 'center',
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
  communityFeatures: {
    gap: theme.spacing.lg,
    marginBottom: theme.spacing.xl,
  },
  featureRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: theme.spacing.md,
  },
  featureIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: `${theme.accent}20`,
    justifyContent: 'center',
    alignItems: 'center',
  },
  featureContent: {
    flex: 1,
  },
  featureTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: theme.text,
    marginBottom: theme.spacing.xs,
  },
  featureDescription: {
    fontSize: 14,
    color: theme.textSecondary,
    lineHeight: 20,
  },
  communityStats: {
    backgroundColor: `${theme.accent}10`,
    borderRadius: theme.radius.md,
    padding: theme.spacing.md,
    marginBottom: theme.spacing.xl,
    borderWidth: 1,
    borderColor: `${theme.accent}30`,
  },
  statsTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: theme.accent,
    textAlign: 'center',
    marginBottom: theme.spacing.xs,
  },
  statsSubtitle: {
    fontSize: 14,
    color: theme.textSecondary,
    textAlign: 'center',
    lineHeight: 20,
  },
  nextButton: {
    marginTop: theme.spacing.md,
  },
});