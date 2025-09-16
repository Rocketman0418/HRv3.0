import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  SafeAreaView,
  TouchableOpacity,
  Alert,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useAuth } from '../contexts/AuthContext';
import HealthRocketBrand from '../components/HealthRocketBrand';
import SpaceBackground from '../components/SpaceBackground';
import GlassCard from '../components/GlassCard';
import { theme, iconStyles } from '../constants/theme';

export default function ProfileScreen() {
  const { user, userData, signOut } = useAuth();

  const handleSignOut = async () => {
    console.log('=== SIGN OUT BUTTON PRESSED ===');
    try {
      console.log('Calling signOut function...');
      await signOut();
      console.log('=== SIGN OUT COMPLETED SUCCESSFULLY ===');
    } catch (error) {
      console.error('=== SIGN OUT ERROR ===', error);
      Alert.alert('Error', 'Failed to sign out. Please try again.');
    }
  };

  const stats = [
    {
      label: 'Total Fuel Points',
      value: userData?.fuel_points?.toLocaleString() || '0',
      icon: 'flame',
      style: iconStyles.fuelPoints,
    },
    {
      label: 'Current Level',
      value: userData?.level || 1,
      icon: 'trophy',
      style: iconStyles.currentLevel,
    },
    {
      label: 'Burn Streak',
      value: `${userData?.burn_streak || 0} days`,
      icon: 'flash',
      style: iconStyles.burnStreak,
    },
    {
      label: 'Health Score',
      value: `${userData?.health_score || 0}/10`,
      icon: 'heart',
      style: iconStyles.healthScore,
    },
  ];

  const actions = [
    {
      icon: 'person-outline',
      title: 'Edit Profile',
      subtitle: 'Update your personal information',
      onPress: () => console.log('Edit Profile'),
    },
    {
      icon: 'notifications-outline',
      title: 'Notifications',
      subtitle: 'Manage notification preferences',
      onPress: () => console.log('Notifications'),
    },
    {
      icon: 'help-circle-outline',
      title: 'Help & Support',
      subtitle: 'Get help and find answers',
      onPress: () => console.log('Help & Support'),
    },
  ];

  return (
    <SpaceBackground>
      <SafeAreaView style={styles.container}>
        <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
          <View style={styles.header}>
            <HealthRocketBrand variant="round" size="small" showTagline={false} />
            <Text style={styles.headerTitle}>Profile</Text>
          </View>

          <GlassCard style={styles.profileCard}>
            <View style={styles.avatarContainer}>
              <Ionicons name="person-circle-outline" size={80} color={theme.primary} />
            </View>
            <Text style={styles.name}>{userData?.name || 'Entrepreneur'}</Text>
            <Text style={styles.email}>{userData?.email || user?.email}</Text>
            <Text style={styles.level}>Level {userData?.level || 1}</Text>
          </GlassCard>

          <View style={styles.statsContainer}>
            <Text style={styles.sectionTitle}>Your Stats</Text>
            <View style={styles.statsGrid}>
              {stats.map((stat, index) => (
                <GlassCard key={index} style={styles.statCard}>
                  <View style={[styles.statIcon, stat.style]}>
                    <Ionicons name={stat.icon as any} size={20} color="white" />
                  </View>
                  <Text style={styles.statValue}>{stat.value}</Text>
                  <Text style={styles.statLabel}>{stat.label}</Text>
                </GlassCard>
              ))}
            </View>
          </View>

          <View style={styles.actionsContainer}>
            <Text style={styles.sectionTitle}>Account</Text>
            <GlassCard style={styles.actionsCard}>
              {actions.map((action, index) => (
                <TouchableOpacity
                  key={index}
                  style={[
                    styles.actionButton,
                    index < actions.length - 1 && styles.actionButtonBorder,
                  ]}
                  onPress={action.onPress}
                >
                  <View style={styles.actionLeft}>
                    <View style={styles.actionIcon}>
                      <Ionicons name={action.icon as any} size={20} color={theme.primary} />
                    </View>
                    <View style={styles.actionText}>
                      <Text style={styles.actionTitle}>{action.title}</Text>
                      <Text style={styles.actionSubtitle}>{action.subtitle}</Text>
                    </View>
                  </View>
                  <Ionicons name="chevron-forward" size={20} color={theme.textMuted} />
                </TouchableOpacity>
              ))}
            </GlassCard>
          </View>

          <View style={styles.signOutContainer}>
            <TouchableOpacity style={styles.signOutButton} onPress={handleSignOut}>
              <Ionicons name="log-out-outline" size={20} color={theme.error} />
              <Text style={styles.signOutText}>Sign Out</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </SafeAreaView>
    </SpaceBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollView: {
    flex: 1,
  },
  header: {
    alignItems: 'center',
    paddingVertical: theme.spacing.lg,
    paddingHorizontal: theme.spacing.lg,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: theme.text,
    marginTop: theme.spacing.sm,
  },
  profileCard: {
    marginHorizontal: theme.spacing.lg,
    marginBottom: theme.spacing.lg,
    alignItems: 'center',
  },
  avatarContainer: {
    marginBottom: theme.spacing.md,
  },
  name: {
    fontSize: 24,
    fontWeight: 'bold',
    color: theme.text,
    marginBottom: theme.spacing.xs,
  },
  email: {
    fontSize: 16,
    color: theme.textSecondary,
    marginBottom: theme.spacing.xs,
  },
  level: {
    fontSize: 14,
    color: theme.primary,
    fontWeight: '600',
  },
  statsContainer: {
    paddingHorizontal: theme.spacing.lg,
    marginBottom: theme.spacing.lg,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: theme.text,
    marginBottom: theme.spacing.md,
    textShadowColor: 'rgba(0, 0, 0, 0.5)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 2,
  },
  statsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: theme.spacing.sm,
  },
  statCard: {
    flex: 1,
    minWidth: '45%',
    alignItems: 'center',
    padding: theme.spacing.md,
  },
  statIcon: {
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
    fontSize: 18,
    fontWeight: 'bold',
    color: theme.text,
    marginBottom: theme.spacing.xs,
    textAlign: 'center',
  },
  statLabel: {
    fontSize: 12,
    color: theme.textSecondary,
    textAlign: 'center',
    fontWeight: '500',
  },
  actionsContainer: {
    paddingHorizontal: theme.spacing.lg,
    marginBottom: theme.spacing.lg,
  },
  actionsCard: {
    padding: 0,
  },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: theme.spacing.md,
  },
  actionButtonBorder: {
    borderBottomWidth: 1,
    borderBottomColor: theme.glass.borderLight,
  },
  actionLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  actionIcon: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: `${theme.primary}20`,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: theme.spacing.sm,
  },
  actionText: {
    flex: 1,
  },
  actionTitle: {
    fontSize: 16,
    fontWeight: '500',
    color: theme.text,
    marginBottom: theme.spacing.xs / 2,
  },
  actionSubtitle: {
    fontSize: 12,
    color: theme.textSecondary,
  },
  signOutContainer: {
    paddingHorizontal: theme.spacing.lg,
    paddingBottom: theme.spacing.xl,
  },
  signOutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: `${theme.error}20`,
    borderRadius: theme.radius.md,
    padding: theme.spacing.md,
    borderWidth: 1,
    borderColor: `${theme.error}40`,
  },
  signOutText: {
    fontSize: 16,
    fontWeight: '600',
    color: theme.error,
    marginLeft: theme.spacing.sm,
  },
});