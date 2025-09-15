import React from 'react';
import { View, ActivityIndicator, StyleSheet } from 'react-native';
import { Redirect } from 'expo-router';
import { useAuth } from '../contexts/AuthContext';
import AuthScreen from '../screens/AuthScreen';
import OnboardingFlow from '@/components/onboarding/OnboardingFlow';

export default function IndexScreen() {
  const { session, userData, loading } = useAuth();

  console.log('IndexScreen - session:', !!session, 'userData onboarding_completed:', userData?.onboarding_completed, 'loading:', loading);

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#2563eb" />
      </View>
    );
  }

  if (session) {
    // Check if user needs onboarding
    console.log('User logged in, userData exists:', !!userData, 'onboarding_completed:', userData?.onboarding_completed);
    if (userData && !userData.onboarding_completed) {
      console.log('Showing onboarding flow');
      return <OnboardingFlow />;
    }
    console.log('Redirecting to main app');
    return <Redirect href="/(tabs)" />;
  }

  console.log('Showing auth screen');
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