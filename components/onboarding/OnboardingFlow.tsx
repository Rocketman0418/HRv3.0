import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  Alert,
  Dimensions,
} from 'react-native';
import { useAuth } from '../../contexts/AuthContext';
import SpaceBackground from '../SpaceBackground';
import HealthRocketBrand from '../HealthRocketBrand';
import PrimaryButton from '../PrimaryButton';
import GlassCard from '../GlassCard';
import MissionIntro from './MissionIntro';
import BurnStreakIntro from './BurnStreakIntro';
import CommunityIntro from './CommunityIntro';
import ComprehensiveHealthAssessment from './ComprehensiveHealthAssessment';
import { theme } from '../../constants/theme';
import { supabase } from '../../lib/supabase';

const { width: screenWidth } = Dimensions.get('window');

type OnboardingStep = 'mission' | 'burn-streak' | 'community' | 'health-assessment' | 'launch';

interface HealthAssessmentData {
  mindset: number;
  sleep: number;
  exercise: number;
  nutrition: number;
  biohacking: number;
}

export default function OnboardingFlow() {
  const { userData, fetchUserData } = useAuth();
  const [currentStep, setCurrentStep] = useState<OnboardingStep>('mission');
  const [loading, setLoading] = useState(false);
  const [healthData, setHealthData] = useState<HealthAssessmentData>({
    mindset: 5,
    sleep: 5,
    exercise: 5,
    nutrition: 5,
    biohacking: 5,
  });

  // Initialize step from user data
  useEffect(() => {
    if (userData?.onboarding_step) {
      setCurrentStep(userData.onboarding_step as OnboardingStep);
    }
  }, [userData?.onboarding_step]);

  const updateOnboardingStep = async (step: OnboardingStep) => {
    if (!userData?.id) return;

    try {
      const { error } = await supabase
        .from('users')
        .update({ 
          onboarding_step: step,
          updated_at: new Date().toISOString()
        })
        .eq('id', userData.id);

      if (error) throw error;
      setCurrentStep(step);
    } catch (error) {
      console.error('Error updating onboarding step:', error);
    }
  };

  const calculateHealthScore = (data: HealthAssessmentData): number => {
    const total = data.mindset + data.sleep + data.exercise + data.nutrition + data.biohacking;
    return Math.round((total / 50) * 10 * 100) / 100; // Scale to 0-10 with 2 decimal places
  };

  const calculateHealthspanYears = (healthScore: number): number => {
    // Base healthspan calculation: higher health score = more years added to base
    const baseHealthspan = 75;
    const bonusYears = (healthScore - 5) * 2; // Each point above 5 adds 2 years
    return Math.max(baseHealthspan + bonusYears, 60); // Minimum 60 years
  };

  const saveHealthAssessment = async (data: HealthAssessmentData) => {
    if (!userData?.id) return;

    const healthScore = calculateHealthScore(data);
    const healthspanYears = calculateHealthspanYears(healthScore);

    try {
      // Save health assessment
      const { error: assessmentError } = await supabase
        .from('health_assessments')
        .insert([{
          user_id: userData.id,
          assessment_data: data,
          calculated_score: healthScore,
          category_scores: {
            mindset: data.mindset,
            sleep: data.sleep,
            exercise: data.exercise,
            nutrition: data.nutrition,
            biohacking: data.biohacking,
          },
          healthspan_impact: healthspanYears - 75, // Years added/subtracted from base
          assessment_version: '3.0',
          completed_at: new Date().toISOString(),
        }]);

      if (assessmentError) throw assessmentError;

      // Update user health metrics
      const { error: userError } = await supabase
        .from('users')
        .update({
          health_score: healthScore,
          healthspan_years: healthspanYears,
          health_assessments_completed: (userData.health_assessments_completed || 0) + 1,
          updated_at: new Date().toISOString(),
        })
        .eq('id', userData.id);

      if (userError) throw userError;

      // Refresh user data
      await fetchUserData(userData.id);
    } catch (error) {
      console.error('Error saving health assessment:', error);
      throw error;
    }
  };

  const handleNext = async () => {
    setLoading(true);
    try {
      switch (currentStep) {
        case 'mission':
          await updateOnboardingStep('burn-streak');
          break;
        case 'burn-streak':
          await updateOnboardingStep('community');
          break;
        case 'community':
          await updateOnboardingStep('health-assessment');
          break;
        case 'health-assessment':
          await saveHealthAssessment(healthData);
          await updateOnboardingStep('launch');
          break;
        case 'launch':
          await handleCompleteOnboarding();
          break;
      }
    } catch (error: any) {
      Alert.alert('Error', error.message || 'Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleCompleteOnboarding = async () => {
    if (!userData?.id) {
      Alert.alert('Error', 'User data not available. Please try again.');
      return;
    }

    try {
      const { error } = await supabase
        .from('users')
        .update({ 
          onboarding_completed: true,
          updated_at: new Date().toISOString()
        })
        .eq('id', userData.id);

      if (error) throw error;

      // Refresh user data
      await fetchUserData(userData.id);
    } catch (error: any) {
      console.error('Onboarding completion error:', error);
      throw new Error(`Failed to complete onboarding: ${error.message}`);
    }
  };

  const getStepProgress = () => {
    const steps: OnboardingStep[] = ['mission', 'burn-streak', 'community', 'health-assessment', 'launch'];
    const currentIndex = steps.indexOf(currentStep);
    return ((currentIndex + 1) / steps.length) * 100;
  };

  const renderProgressBar = () => (
    <View style={styles.progressContainer}>
      <View style={styles.progressBar}>
        <View style={[styles.progressFill, { width: `${getStepProgress()}%` }]} />
      </View>
      <Text style={styles.progressText}>
        {Math.round(getStepProgress())}% Complete
      </Text>
    </View>
  );

  const renderCurrentStep = () => {
    switch (currentStep) {
      case 'mission':
        return <MissionIntro onNext={handleNext} loading={loading} />;
      case 'burn-streak':
        return <BurnStreakIntro onNext={handleNext} loading={loading} />;
      case 'community':
        return <CommunityIntro onNext={handleNext} loading={loading} />;
      case 'health-assessment':
        return (
          <ComprehensiveHealthAssessment
            healthData={healthData}
            onHealthDataChange={setHealthData}
            onNext={handleNext}
            loading={loading}
          />
        );
      case 'launch':
        return (
          <GlassCard style={styles.launchCard}>
            <Text style={styles.launchTitle}>🚀 Ready for Launch!</Text>
            <Text style={styles.launchSubtitle}>
              Your health journey is about to begin. Let's optimize your healthspan together!
            </Text>
            <View style={styles.launchStats}>
              <Text style={styles.statText}>
                Health Score: <Text style={styles.statValue}>{userData?.health_score || 0}/10</Text>
              </Text>
              <Text style={styles.statText}>
                Projected Healthspan: <Text style={styles.statValue}>{userData?.healthspan_years || 75} years</Text>
              </Text>
            </View>
            <PrimaryButton
              title="Launch My Journey"
              onPress={handleNext}
              loading={loading}
              style={styles.launchButton}
            />
          </GlassCard>
        );
      default:
        return null;
    }
  };

  return (
    <SpaceBackground>
      <SafeAreaView style={styles.container}>
        <View style={styles.content}>
          <View style={styles.header}>
            <HealthRocketBrand variant="horizontal" size="medium" showTagline={true} />
            {renderProgressBar()}
          </View>

          <View style={styles.stepContainer}>
            {renderCurrentStep()}
          </View>
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
    paddingHorizontal: theme.spacing.lg,
  },
  header: {
    alignItems: 'center',
    paddingVertical: theme.spacing.lg,
  },
  progressContainer: {
    width: '100%',
    marginTop: theme.spacing.lg,
    gap: theme.spacing.sm,
  },
  progressBar: {
    height: 6,
    backgroundColor: theme.surfaceDark,
    borderRadius: theme.radius.sm,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    backgroundColor: theme.primary,
    borderRadius: theme.radius.sm,
  },
  progressText: {
    fontSize: 12,
    color: theme.textMuted,
    textAlign: 'center',
    fontWeight: '500',
  },
  stepContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  launchCard: {
    padding: theme.spacing.xl,
    alignItems: 'center',
  },
  launchTitle: {
    fontSize: 32,
    fontWeight: 'bold',
    color: theme.text,
    textAlign: 'center',
    marginBottom: theme.spacing.md,
  },
  launchSubtitle: {
    fontSize: 18,
    color: theme.textSecondary,
    textAlign: 'center',
    marginBottom: theme.spacing.xl,
    lineHeight: 26,
  },
  launchStats: {
    alignItems: 'center',
    marginBottom: theme.spacing.xl,
    gap: theme.spacing.sm,
  },
  statText: {
    fontSize: 16,
    color: theme.textSecondary,
  },
  statValue: {
    color: theme.primary,
    fontWeight: 'bold',
  },
  launchButton: {
    marginTop: theme.spacing.md,
    minWidth: 200,
  },
});