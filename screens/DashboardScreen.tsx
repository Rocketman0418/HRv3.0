import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  SafeAreaView,
} from 'react-native';
import SpaceBackground from '../components/SpaceBackground';
import HealthRocketBrand from '../components/HealthRocketBrand';
import FuelPointsCard from '../components/FuelPointsCard';
import StatsGrid from '../components/StatsGrid';
import DailyBoosts from '../components/DailyBoosts';
import { theme } from '../constants/theme';

export default function DashboardScreen() {
  return (
    <SpaceBackground>
      <SafeAreaView style={styles.container}>
        <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
          <View style={styles.header}>
            <HealthRocketBrand variant="round" size="small" showTagline={false} />
          </View>

          <FuelPointsCard />
          <StatsGrid />
          <DailyBoosts />
        </ScrollView>
      </SafeAreaView>
    </SpaceBackground>
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
    alignItems: 'center',
    paddingVertical: theme.spacing.lg,
    paddingHorizontal: theme.spacing.lg,
  },
});