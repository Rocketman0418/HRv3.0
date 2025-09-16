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
import { theme, iconStyles } from '../constants/theme';
import HealthRocketBrand from '../components/HealthRocketBrand';
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

  const handleDebugSignOut = async () => {
    console.log('=== DEBUG SIGN OUT BUTTON PRESSED ===');
    try {
      console.log('DEBUG: Calling signOut function...');
      await signOut();
      console.log('=== DEBUG SIGN OUT COMPLETED SUCCESSFULLY ===');
    } catch (error) {
      console.error('=== DEBUG SIGN OUT ERROR ===', error);
      Alert.alert('Debug Error', 'Failed to sign out. Please try again.');
    }
  };

  const stats = [
    {
      label: 'Total Fuel Points',
      value: userData?.fuel_points?.toLocaleString() || '0',
      icon: 'flame-outline',
      style: iconStyles.fuelPoints,
    },
    {
      label: 'Current Level',
      value: userData?.level || 1,
      icon: 'trophy-outline',
      style: iconStyles.currentLevel,
    },
    {
      label: 'Burn Streak',
      value: `${userData?.burn_streak || 0} days`,
      icon: 'flash-outline',
      style: iconStyles.burnStreak,
    },
    {
      label: 'Health Score',
      value: `${userData?.health_score || 0}/10`,
      icon: 'heart-outline',
      style: iconStyles.healthScore,
    },
  ];

  return (
    <SpaceBackground>
      <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <HealthRocketBrand variant="round" size="small" showTagline={false} />
          <View style={styles.avatarContainer}>
            <Ionicons name="person-circle-outline" size={80} color={theme.primary} />
          </View>
          <Text style={styles.name}>{userData?.name || 'Entrepreneur'}</Text>
          <Text style={styles.email}>{userData?.email || user?.email}</Text>
        </View>

        <View style={styles.statsContainer}>
          <Text style={styles.sectionTitle}>Your Stats</Text>
          {stats.map((stat, index) => (
            <View key={index} style={styles.statCard}>
              <View style={[styles.statIcon, stat.style]}>
                <Ionicons name={stat.icon as any} size={24} color="white" />
              </View>
              <View style={styles.statContent}>
                <Text style={styles.statLabel}>{stat.label}</Text>
                <Text style={styles.statValue}>{stat.value}</Text>
              </View>
            </View>
          ))}
        </View>

        <View style={styles.actionsContainer}>
          <TouchableOpacity style={styles.actionButton}>
            <Ionicons name="person-outline" size={20} color="#2563eb" />
            <Text style={styles.actionText}>Edit Profile</Text>
            <Ionicons name="chevron-forward" size={20} color="#9ca3af" />
          </TouchableOpacity>

          <TouchableOpacity style={styles.actionButton}>
            <Ionicons name="notifications-outline" size={20} color="#2563eb" />
            <Text style={styles.actionText}>Notifications</Text>
            <Ionicons name="chevron-forward" size={20} color="#9ca3af" />
          </TouchableOpacity>

          <TouchableOpacity style={styles.actionButton}>
            <Ionicons name="help-circle-outline" size={20} color="#2563eb" />
            <Text style={styles.actionText}>Help & Support</Text>
            <Ionicons name="chevron-forward" size={20} color="#9ca3af" />
          </TouchableOpacity>

          <TouchableOpacity style={[styles.actionButton, styles.signOutButton]} onPress={handleSignOut}>
            <Ionicons name="log-out-outline" size={20} color="#ef4444" />
            <Text style={[styles.actionText, styles.signOutText]}>Sign Out</Text>
          </TouchableOpacity>

          {/* DEBUG: Alternative sign out button */}
          <TouchableOpacity 
            style={[styles.actionButton, { backgroundColor: '#fee2e2', marginTop: 8 }]} 
            onPress={handleDebugSignOut}
          >
            <Ionicons name="bug-outline" size={20} color="#ef4444" />
            <Text style={[styles.actionText, { color: '#ef4444' }]}>DEBUG: Force Sign Out</Text>
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
    backgroundColor: '#0a0a0a',
  },
  scrollView: {
    flex: 1,
  },
  header: {
    alignItems: 'center',
    paddingVertical: 32,
    paddingHorizontal: 20,
  },
  avatarContainer: {
    marginBottom: 16,
  },
  name: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#f9fafb',
    marginBottom: 4,
  },
  email: {
    fontSize: 16,
    color: '#9ca3af',
  },
  statsContainer: {
    paddingHorizontal: 20,
    marginBottom: 32,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#f9fafb',
    marginBottom: 16,
  },
  statCard: {
    backgroundColor: '#1f2937',
    borderRadius: 12,
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  statIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  statContent: {
    flex: 1,
  },
  statLabel: {
    fontSize: 14,
    color: '#9ca3af',
    marginBottom: 4,
  },
  statValue: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#f9fafb',
  },
  actionsContainer: {
    paddingHorizontal: 20,
    paddingBottom: 32,
  },
  actionButton: {
    backgroundColor: '#1f2937',
    borderRadius: 12,
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  actionText: {
    flex: 1,
    fontSize: 16,
    color: '#f9fafb',
    marginLeft: 12,
  },
  signOutButton: {
    marginTop: 16,
  },
  signOutText: {
    color: '#ef4444',
  },
});