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
    backgroundColor: '#0a0a0a',
  },
  scrollView: {
    flex: 1,
  },
  header: {
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 16,
  },
  greeting: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#f9fafb',
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 16,
    color: '#9ca3af',
  },
});