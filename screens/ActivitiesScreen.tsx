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

const activities = [
  {
    id: 1,
    title: 'Morning Meditation',
    description: '10 minutes of mindfulness',
    points: 50,
    icon: 'leaf-outline',
    color: '#10b981',
  },
  {
    id: 2,
    title: 'Hydration Check',
    description: 'Drink 8 glasses of water',
    points: 30,
    icon: 'water-outline',
    color: '#3b82f6',
  },
  {
    id: 3,
    title: 'Power Walk',
    description: '30 minutes of walking',
    points: 75,
    icon: 'walk-outline',
    color: '#f59e0b',
  },
  {
    id: 4,
    title: 'Healthy Meal',
    description: 'Eat a nutritious meal',
    points: 40,
    icon: 'restaurant-outline',
    color: '#ef4444',
  },
];

export default function ActivitiesScreen() {
  const handleActivityPress = (activity: any) => {
    // TODO: Implement activity completion logic
    console.log('Activity pressed:', activity.title);
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <Text style={styles.title}>Daily Activities</Text>
          <Text style={styles.subtitle}>Complete activities to earn Fuel Points</Text>
        </View>

        <View style={styles.activitiesContainer}>
          {activities.map((activity) => (
            <TouchableOpacity
              key={activity.id}
              style={styles.activityCard}
              onPress={() => handleActivityPress(activity)}
            >
              <View style={[styles.iconContainer, { backgroundColor: activity.color }]}>
                <Ionicons name={activity.icon as any} size={24} color="white" />
              </View>
              <View style={styles.activityContent}>
                <Text style={styles.activityTitle}>{activity.title}</Text>
                <Text style={styles.activityDescription}>{activity.description}</Text>
              </View>
              <View style={styles.pointsContainer}>
                <Text style={styles.pointsText}>+{activity.points}</Text>
                <Text style={styles.fpText}>FP</Text>
              </View>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8fafc',
  },
  scrollView: {
    flex: 1,
  },
  header: {
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 16,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#1f2937',
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 16,
    color: '#6b7280',
  },
  activitiesContainer: {
    paddingHorizontal: 20,
    gap: 12,
  },
  activityCard: {
    backgroundColor: 'white',
    borderRadius: 16,
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  iconContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  activityContent: {
    flex: 1,
  },
  activityTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1f2937',
    marginBottom: 4,
  },
  activityDescription: {
    fontSize: 14,
    color: '#6b7280',
  },
  pointsContainer: {
    alignItems: 'center',
  },
  pointsText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#2563eb',
  },
  fpText: {
    fontSize: 12,
    color: '#6b7280',
    marginTop: 2,
  },
});