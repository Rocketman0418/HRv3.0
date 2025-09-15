import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  SafeAreaView,
} from 'react-native';
import { useAuth } from '../contexts/AuthContext';
import FuelPointsCard from '../components/FuelPointsCard';
import StatsGrid from '../components/StatsGrid';
import DailyBoosts from '../components/DailyBoosts';
import { theme } from '../constants/theme';

export default function DashboardScreen() {
  const { user, userData } = useAuth();

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <Text style={styles.greeting}>
            Welcome back, {userData?.name || 'Entrepreneur'}!
          </Text>
          <Text style={styles.subtitle}>Ready to optimize your health?</Text>
        </View>

        <FuelPointsCard />
        <StatsGrid />
        <DailyBoosts />
      </ScrollView>
    </SafeAreaView>
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
    paddingHorizontal: theme.spacing.lg,
    paddingTop: theme.spacing.lg,
    paddingBottom: theme.spacing.md,
  },
  greeting: {
    fontSize: 28,
    fontWeight: 'bold',
    color: theme.text,
    marginBottom: theme.spacing.xs,
    textShadowColor: 'rgba(0, 0, 0, 0.5)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 2,
  },
  subtitle: {
    fontSize: 16,
    color: theme.textSecondary,
  },
});