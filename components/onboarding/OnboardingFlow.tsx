import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  Dimensions,
  Alert,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useAuth } from '../../contexts/AuthContext';
import { supabase } from '../../lib/supabase';
import GlassCard from '../GlassCard';
import PrimaryButton from '../PrimaryButton';
import { theme } from '../../constants/theme';

const { width } = Dimensions.get('window');

const onboardingSteps = [
  {
    id: 'mission',
    title: 'Welcome to Health Rocket V3',
    subtitle: 'Your mission: Optimize your health and extend your healthspan',
    description: 'Transform your daily habits into fuel points and level up your health game.',
    icon: 'rocket-outline',
    color: theme.primary,
  },
  {
    id: 'preview',
    title: 'Early Access Preview',
    subtitle: 'You\'re among the first to experience the future of health optimization',
    description: 'This preview gives you access to core features. More exciting updates coming soon!',
    icon: 'eye-outline',
    color: theme.accentPurple,
  },
  {
    id: 'burn-streak',
    title: 'Build Your Burn Streak',
    subtitle: 'Consistency is the key to lasting health transformation',
    description: 'Complete daily activities to build your burn streak and unlock higher levels.',
    icon: 'flash-outline',
    color: theme.streak,
  },
  {
    id: 'health',
    title: 'Track Your Health Score',
    subtitle: 'Monitor your progress with our comprehensive health scoring system',
    description: 'Your health score reflects your overall wellness across multiple dimensions.',
    icon: 'heart-outline',
    color: theme.success,
  },
  {
    id: 'launch',
    title: 'Ready for Launch?',
    subtitle: 'Your health optimization journey starts now',
    description: 'Complete daily boosts, join challenges, and watch your health score soar!',
    icon: 'checkmark-circle-outline',
    color: theme.warning,
  },
];

export default function OnboardingFlow() {
  const [currentStep, setCurrentStep] = useState(0);
  const [loading, setLoading] = useState(false);
  const { userData, user, session, fetchUserData } = useAuth();

  const handleNext = () => {
    if (currentStep < onboardingSteps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      handleComplete();
    }
  };

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleComplete = async () => {
    console.log('=== ONBOARDING COMPLETION STARTED ===');
    console.log('Current userData:', userData);
    console.log('User ID:', userData?.id);
    console.log('Session exists:', !!session);
    console.log('User exists:', !!user);
    
    setLoading(true);
    try {
      if (!userData?.id) {
        console.error('ERROR: No user ID available');
        console.log('userData:', userData);
        console.log('user from session:', user);
        throw new Error('No user ID available. Please try signing in again.');
      }

      console.log('Attempting to update user with ID:', userData.id);
      const { error } = await supabase
        .from('users')
        .update({
          onboarding_completed: true,
          onboarding_step: 'completed',
          updated_at: new Date().toISOString(),
        })
        .eq('id', userData?.id);

      if (error) {
        console.error('=== DATABASE UPDATE ERROR ===', error);
        console.log('Error details:', {
          message: error.message,
          details: error.details,
          hint: error.hint,
          code: error.code
        });
        throw error;
      }
      
      console.log('=== ONBOARDING COMPLETION SUCCESS ===');
      console.log('Database update successful, waiting for auth context refresh...');
      
      // Force a refresh of user data
      console.log('Manually triggering user data refresh...');
      if (userData?.id) {
        await fetchUserData(userData.id);
      }
      
    } catch (error) {
      console.error('=== ONBOARDING COMPLETION ERROR ===', error);
      Alert.alert(
        'Error', 
        `Failed to complete onboarding: ${error.message || 'Unknown error'}. Please try again.`
      );
    } finally {
      setLoading(false);
    }
  };

  const currentStepData = onboardingSteps[currentStep];

  return (
    <SafeAreaView style={styles.container}>
      <GlassCard style={styles.content}>
        <View style={styles.innerContent}>
          {/* Progress Indicator */}
          <View style={styles.progressContainer}>
            <View style={styles.progressBar}>
              <View 
                style={[
                  styles.progressFill, 
                  { width: `${((currentStep + 1) / onboardingSteps.length) * 100}%` }
                ]} 
              />
            </View>
            <Text style={styles.progressText}>
              {currentStep + 1} of {onboardingSteps.length}
            </Text>
          </View>

          {/* Step Content */}
          <View style={styles.stepContainer}>
            <View style={[styles.iconContainer, { backgroundColor: `${currentStepData.color}20` }]}>
              <Ionicons 
                name={currentStepData.icon as any} 
                size={72} 
                color={currentStepData.color} 
              />
            </View>

            <Text style={styles.title}>{currentStepData.title}</Text>
            <Text style={styles.subtitle}>{currentStepData.subtitle}</Text>
            <Text style={styles.description}>{currentStepData.description}</Text>
          </View>

          {/* Navigation */}
          <View style={styles.navigationContainer}>
            <TouchableOpacity
              style={[styles.navButton, styles.backButton, currentStep === 0 && styles.hiddenButton]}
              onPress={handleBack}
              disabled={currentStep === 0}
            >
              <Ionicons name="chevron-back" size={20} color={theme.textMuted} />
              <Text style={styles.backButtonText}>Back</Text>
            </TouchableOpacity>

            <PrimaryButton
              title={currentStep === onboardingSteps.length - 1 ? 'Launch! 🚀' : 'Next'}
              onPress={handleNext}
              loading={loading}
              disabled={loading}
              style={styles.nextButton}
            />
          </View>

          {/* Skip Option */}
          {currentStep < onboardingSteps.length - 1 && (
            <TouchableOpacity style={styles.skipButton} onPress={handleComplete}>
              <Text style={styles.skipText}>Skip for now</Text>
            </TouchableOpacity>
          )}
        </View>
      </GlassCard>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: theme.spacing.lg,
  },
  content: {
    flex: 1,
    margin: 0,
  },
  innerContent: {
    flex: 1,
    paddingHorizontal: theme.spacing.lg,
    paddingVertical: theme.spacing.xl,
  },
  progressContainer: {
    marginBottom: theme.spacing.xxl,
  },
  progressBar: {
    height: 6,
    backgroundColor: theme.surfaceDark,
    borderRadius: theme.radius.sm,
    marginBottom: theme.spacing.sm,
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
    fontSize: 14,
    color: theme.textMuted,
    textAlign: 'center',
    fontWeight: '500',
  },
  stepContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: theme.spacing.md,
  },
  iconContainer: {
    width: 140,
    height: 140,
    borderRadius: 70,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: theme.spacing.xl,
    shadowColor: 'rgba(0, 0, 0, 0.3)',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 1,
    shadowRadius: 8,
    elevation: 8,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: theme.text,
    textAlign: 'center',
    marginBottom: theme.spacing.md,
    textShadowColor: 'rgba(0, 0, 0, 0.5)',
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 4,
  },
  subtitle: {
    fontSize: 20,
    fontWeight: '600',
    color: theme.textSecondary,
    textAlign: 'center',
    marginBottom: theme.spacing.md,
  },
  description: {
    fontSize: 17,
    color: theme.textMuted,
    textAlign: 'center',
    lineHeight: 24,
  },
  navigationContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: theme.spacing.md,
  },
  navButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: theme.spacing.sm + 4,
    paddingHorizontal: theme.spacing.lg,
    borderRadius: theme.radius.md,
    minHeight: 48,
  },
  backButton: {
    backgroundColor: 'transparent',
  },
  hiddenButton: {
    opacity: 0,
  },
  backButtonText: {
    fontSize: 16,
    color: theme.textMuted,
    marginLeft: theme.spacing.xs,
  },
  nextButton: {
    flex: 1,
    marginLeft: theme.spacing.md,
  },
  skipButton: {
    alignItems: 'center',
    paddingVertical: theme.spacing.sm + 4,
  },
  skipText: {
    fontSize: 14,
    color: theme.textMuted,
  },
});