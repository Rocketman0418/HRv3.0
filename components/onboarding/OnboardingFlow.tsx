import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  Alert,
} from 'react-native';
import { useAuth } from '../../contexts/AuthContext';
import SpaceBackground from '../SpaceBackground';
import HealthRocketBrand from '../HealthRocketBrand';
import PrimaryButton from '../PrimaryButton';
import GlassCard from '../GlassCard';
import { theme } from '../../constants/theme';

export default function OnboardingFlow() {
  const { userData, fetchUserData } = useAuth();
  const [loading, setLoading] = useState(false);

  const handleCompleteOnboarding = async () => {
    console.log('=== STARTING ONBOARDING COMPLETION ===');
    console.log('Current userData:', userData);
    
    if (!userData?.id) {
      console.error('No user ID available for onboarding completion');
      Alert.alert('Error', 'User data not available. Please try again.');
      return;
    }

    setLoading(true);
    
    try {
      console.log('Updating onboarding_completed to true for user:', userData.id);
      
      const { supabase } = await import('../../lib/supabase');
      
      const { data, error } = await supabase
        .from('users')
        .update({ 
          onboarding_completed: true,
          updated_at: new Date().toISOString()
        })
        .eq('id', userData.id)
        .select()
        .single();

      if (error) {
        console.error('Database update error:', error);
        throw new Error(`Failed to complete onboarding: ${error.message}`);
      }

      console.log('Database update successful:', data);
      
      // Manually refresh user data
      console.log('Refreshing user data...');
      await fetchUserData(userData.id);
      console.log('User data refresh completed');
      
    } catch (error: any) {
      console.error('Onboarding completion error:', error);
      Alert.alert('Error', error.message || 'Failed to complete onboarding. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <SpaceBackground>
      <SafeAreaView style={styles.container}>
        <View style={styles.content}>
          <View style={styles.brandContainer}>
            <HealthRocketBrand variant="horizontal" size="large" showTagline={true} />
          </View>

          <GlassCard style={styles.welcomeCard}>
            <Text style={styles.title}>Welcome to Health Rocket!</Text>
            <Text style={styles.subtitle}>
              Ready to launch your health journey? Let's optimize your healthspan and unlock your potential.
            </Text>
            
            <View style={styles.missionPoints}>
              <Text style={styles.missionTitle}>Your Mission:</Text>
              <Text style={styles.missionPoint}>🚀 Complete daily boosts to earn Fuel Points</Text>
              <Text style={styles.missionPoint}>📈 Track your health score and progress</Text>
              <Text style={styles.missionPoint}>🔥 Build your burn streak for maximum impact</Text>
              <Text style={styles.missionPoint}>🏆 Level up and unlock new challenges</Text>
            </View>

            <PrimaryButton
              title="Launch My Journey"
              onPress={handleCompleteOnboarding}
              loading={loading}
              style={styles.launchButton}
            />
          </GlassCard>
        </View>
      </SafeAreaView>
    </SpaceBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: theme.spacing.lg,
  },
  brandContainer: {
    alignItems: 'center',
    marginBottom: theme.spacing.xl,
  },
  welcomeCard: {
    padding: theme.spacing.xl,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: theme.text,
    textAlign: 'center',
    marginBottom: theme.spacing.md,
  },
  subtitle: {
    fontSize: 18,
    color: theme.textSecondary,
    textAlign: 'center',
    marginBottom: theme.spacing.xl,
    lineHeight: 26,
  },
  missionPoints: {
    marginBottom: theme.spacing.xl,
  },
  missionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: theme.primary,
    marginBottom: theme.spacing.md,
  },
  missionPoint: {
    fontSize: 16,
    color: theme.text,
    marginBottom: theme.spacing.sm,
    lineHeight: 24,
  },
  launchButton: {
    marginTop: theme.spacing.md,
  },
});