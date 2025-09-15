import React from 'react';
import { View, ActivityIndicator, StyleSheet } from 'react-native';
import { Redirect } from 'expo-router';
import { useAuth } from '../contexts/AuthContext';
import AuthScreen from '../screens/AuthScreen';
import OnboardingFlow from '../components/onboarding/OnboardingFlow';

export default function IndexScreen() {
  const { session, userData, loading } = useAuth();

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#2563eb" />
      </View>
    );
  }

  if (session) {
    // Check if user needs onboarding
    if (userData && !userData.onboarding_completed) {
      return <OnboardingFlow />;
    }
    return <Redirect href="/(tabs)" />;
  }

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