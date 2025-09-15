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

const { width } = Dimensions.get('window');

const onboardingSteps = [
  {
    id: 'mission',
    title: 'Welcome to Health Rocket V3',
    subtitle: 'Your mission: Optimize your health and extend your healthspan',
    description: 'Transform your daily habits into fuel points and level up your health game.',
    icon: 'rocket-outline',
    color: '#2563eb',
  },
  {
    id: 'preview',
    title: 'Early Access Preview',
    subtitle: 'You\'re among the first to experience the future of health optimization',
    description: 'This preview gives you access to core features. More exciting updates coming soon!',
    icon: 'eye-outline',
    color: '#7c3aed',
  },
  {
    id: 'burn-streak',
    title: 'Build Your Burn Streak',
    subtitle: 'Consistency is the key to lasting health transformation',
    description: 'Complete daily activities to build your burn streak and unlock higher levels.',
    icon: 'flash-outline',
    color: '#ef4444',
  },
  {
    id: 'health',
    title: 'Track Your Health Score',
    subtitle: 'Monitor your progress with our comprehensive health scoring system',
    description: 'Your health score reflects your overall wellness across multiple dimensions.',
    icon: 'heart-outline',
    color: '#10b981',
  },
  {
    id: 'launch',
    title: 'Ready for Launch?',
    subtitle: 'Your health optimization journey starts now',
    description: 'Complete daily boosts, join challenges, and watch your health score soar!',
    icon: 'checkmark-circle-outline',
    color: '#f59e0b',
  },
];

export default function OnboardingFlow() {
  const [currentStep, setCurrentStep] = useState(0);
  const [loading, setLoading] = useState(false);
  const { userData } = useAuth();

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
    console.log('User ID:', userData?.id);
    setLoading(true);
    try {
      if (!userData?.id) {
        throw new Error('No user ID available');
      }

      const { error } = await supabase
        .from('users')
        .update({
          onboarding_completed: true,
          onboarding_step: 'completed',
        })
        .eq('id', userData?.id);

      if (error) {
        console.error('Database update error:', error);
        throw error;
      }
      
      console.log('=== ONBOARDING COMPLETION SUCCESS ===');
      // The auth context will automatically refresh and redirect to main app
    } catch (error) {
      console.error('=== ONBOARDING COMPLETION ERROR ===', error);
      Alert.alert('Error', 'Failed to complete onboarding. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const currentStepData = onboardingSteps[currentStep];

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
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
              size={64} 
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
            <Ionicons name="chevron-back" size={20} color="#6b7280" />
            <Text style={styles.backButtonText}>Back</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.navButton, styles.nextButton]}
            onPress={handleNext}
            disabled={loading}
          >
            <Text style={styles.nextButtonText}>
              {currentStep === onboardingSteps.length - 1 ? 'Launch!' : 'Next'}
            </Text>
            <Ionicons 
              name={currentStep === onboardingSteps.length - 1 ? 'rocket' : 'chevron-forward'} 
              size={20} 
              color="white" 
            />
          </TouchableOpacity>
        </View>

        {/* Skip Option */}
        {currentStep < onboardingSteps.length - 1 && (
          <TouchableOpacity style={styles.skipButton} onPress={handleComplete}>
            <Text style={styles.skipText}>Skip for now</Text>
          </TouchableOpacity>
        )}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8fafc',
  },
  content: {
    flex: 1,
    paddingHorizontal: 24,
    paddingVertical: 32,
  },
  progressContainer: {
    marginBottom: 48,
  },
  progressBar: {
    height: 4,
    backgroundColor: '#e5e7eb',
    borderRadius: 2,
    marginBottom: 8,
  },
  progressFill: {
    height: '100%',
    backgroundColor: '#2563eb',
    borderRadius: 2,
  },
  progressText: {
    fontSize: 14,
    color: '#6b7280',
    textAlign: 'center',
  },
  stepContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 16,
  },
  iconContainer: {
    width: 120,
    height: 120,
    borderRadius: 60,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 32,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#1f2937',
    textAlign: 'center',
    marginBottom: 16,
  },
  subtitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#4b5563',
    textAlign: 'center',
    marginBottom: 16,
  },
  description: {
    fontSize: 16,
    color: '#6b7280',
    textAlign: 'center',
    lineHeight: 24,
  },
  navigationContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  navButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 12,
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
    color: '#6b7280',
    marginLeft: 4,
  },
  nextButton: {
    backgroundColor: '#2563eb',
    flex: 1,
    marginLeft: 16,
    justifyContent: 'center',
  },
  nextButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: 'white',
    marginRight: 8,
  },
  skipButton: {
    alignItems: 'center',
    paddingVertical: 12,
  },
  skipText: {
    fontSize: 14,
    color: '#6b7280',
  },
});