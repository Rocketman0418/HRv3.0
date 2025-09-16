import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  SafeAreaView,
  TouchableOpacity,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import SpaceBackground from '../components/SpaceBackground';
import { useAuth } from '../contexts/AuthContext';
import HealthRocketBrand from '../components/HealthRocketBrand';
import GlassCard from '../components/GlassCard';
import { theme } from '../constants/theme';

export default function ActivitiesScreen() {
  const { userData } = useAuth();

  const activities = [
    {
      id: 1,
      title: 'Morning Hydration',
      description: 'Drink 16oz of water',
      points: 25,
      icon: 'water',
      color: theme.accent,
      completed: true,
      time: '8:30 AM',
    },
    {
      id: 2,
      title: 'Power Breakfast',
      description: 'Eat a protein-rich meal',
      points: 40,
      icon: 'restaurant',
      color: theme.warning,
      completed: true,
      time: '9:15 AM',
    },
    {
      id: 3,
      title: 'Deep Breathing',
      description: '5 minutes of breathing exercise',
      points: 30,
      icon: 'leaf',
      color: theme.success,
      completed: false,
      time: 'Pending',
    },
    {
      id: 4,
      title: 'Afternoon Walk',
      description: '15 minute outdoor walk',
      points: 35,
      icon: 'walk',
      color: theme.accentPurple,
      completed: false,
      time: 'Pending',
    },
  ];

  const todayStats = {
    completed: activities.filter(a => a.completed).length,
    total: activities.length,
    pointsEarned: activities.filter(a => a.completed).reduce((sum, a) => sum + a.points, 0),
  };

  return (
    <SpaceBackground>
      <SafeAreaView style={styles.container}>
        <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
          <View style={styles.header}>
            <HealthRocketBrand variant="round" size="small" showTagline={false} />
            <Text style={styles.headerTitle}>Today's Activities</Text>
          </View>

          <GlassCard style={styles.statsCard}>
            <View style={styles.statsRow}>
              <View style={styles.statItem}>
                <Text style={styles.statNumber}>{todayStats.completed}/{todayStats.total}</Text>
                <Text style={styles.statLabel}>Completed</Text>
              </View>
              <View style={styles.statItem}>
                <Text style={styles.statNumber}>{todayStats.pointsEarned}</Text>
                <Text style={styles.statLabel}>FP Earned</Text>
              </View>
              <View style={styles.statItem}>
                <Text style={styles.statNumber}>{Math.round((todayStats.completed / todayStats.total) * 100)}%</Text>
                <Text style={styles.statLabel}>Progress</Text>
              </View>
            </View>
          </GlassCard>

          <View style={styles.activitiesContainer}>
            <Text style={styles.sectionTitle}>Daily Activities</Text>
            {activities.map((activity) => (
              <GlassCard key={activity.id} style={styles.activityCard}>
                <TouchableOpacity style={styles.activityContent}>
                  <View style={styles.activityRow}>
                    <View style={[
                      styles.activityIcon,
                      { backgroundColor: activity.completed ? `${theme.success}20` : `${activity.color}20` }
                    ]}>
                      <Ionicons 
                        name={activity.completed ? 'checkmark-circle' : activity.icon as any} 
                        size={24} 
                        color={activity.completed ? theme.success : activity.color} 
                      />
                    </View>
                    <View style={styles.activityInfo}>
                      <Text style={[
                        styles.activityTitle,
                        activity.completed && styles.completedText,
                      ]}>
                        {activity.title}
                      </Text>
                      <Text style={styles.activityDescription}>
                        {activity.description}
                      </Text>
                      <Text style={styles.activityTime}>
                        {activity.time}
                      </Text>
                    </View>
                    <View style={styles.pointsContainer}>
                      <Text style={[
                        styles.pointsText,
                        activity.completed && styles.completedPoints,
                      ]}>
                        +{activity.points}
                      </Text>
                      <Text style={styles.fpText}>FP</Text>
                    </View>
                  </View>
                </TouchableOpacity>
              </GlassCard>
            ))}
          </View>
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
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: theme.text,
    marginTop: theme.spacing.sm,
  },
  statsCard: {
    marginHorizontal: theme.spacing.lg,
    marginBottom: theme.spacing.md,
  },
  statsRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  statItem: {
    alignItems: 'center',
  },
  statNumber: {
    fontSize: 24,
    fontWeight: 'bold',
    color: theme.primary,
    marginBottom: theme.spacing.xs,
  },
  statLabel: {
    fontSize: 12,
    color: theme.textMuted,
    fontWeight: '500',
  },
  activitiesContainer: {
    paddingHorizontal: theme.spacing.lg,
    paddingBottom: theme.spacing.xl,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: theme.text,
    marginBottom: theme.spacing.md,
  },
  activityCard: {
    marginBottom: theme.spacing.sm,
    padding: 0,
  },
  activityContent: {
    padding: theme.spacing.md,
  },
  activityRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  activityIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: theme.spacing.md,
  },
  activityInfo: {
    flex: 1,
  },
  activityTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: theme.text,
    marginBottom: theme.spacing.xs,
  },
  completedText: {
    textDecorationLine: 'line-through',
    color: theme.textMuted,
  },
  activityDescription: {
    fontSize: 14,
    color: theme.textSecondary,
    marginBottom: theme.spacing.xs,
  },
  activityTime: {
    fontSize: 12,
    color: theme.textMuted,
    fontWeight: '500',
  },
  pointsContainer: {
    alignItems: 'center',
  },
  pointsText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: theme.primary,
  },
  completedPoints: {
    color: theme.success,
  },
  fpText: {
    fontSize: 10,
    color: theme.textMuted,
    marginTop: theme.spacing.xs / 2,
    fontWeight: '500',
  },
});