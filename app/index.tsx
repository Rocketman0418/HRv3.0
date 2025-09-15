import React from 'react';
import { View, ActivityIndicator, StyleSheet } from 'react-native';
import { Redirect } from 'expo-router';
import { useAuth } from '../contexts/AuthContext';
import AuthScreen from '../screens/AuthScreen';
import OnboardingFlow from '@/components/onboarding/OnboardingFlow';

export default function IndexScreen() {
  const { session, userData, loading } = useAuth();

  console.log('IndexScreen render - session exists:', !!session);
  console.log('IndexScreen render - userData:', userData);
  console.log('IndexScreen render - loading:', loading);

  if (loading) {
    console.log('IndexScreen: Still loading...');
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#2563eb" />
      </View>
    );
  }

  if (session) {
    // Check if user needs onboarding
    console.log('User logged in - userData exists:', !!userData);
    console.log('User logged in - onboarding_completed:', userData?.onboarding_completed);
    
    if (userData && !userData.onboarding_completed) {
      console.log('Showing onboarding flow');
      return <OnboardingFlow />;
    }
    console.log('Redirecting to main app (onboarding completed or no userData)');
    return <Redirect href="/(tabs)" />;
  }

  console.log('No session - showing auth screen');
  return <AuthScreen />;
}

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f8fafc',
  },
});