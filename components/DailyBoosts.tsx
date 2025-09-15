import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const boosts = [
  {
    id: 1,
    title: 'Morning Hydration',
    description: 'Drink 16oz of water',
    points: 25,
    icon: 'water',
    color: '#3b82f6',
    completed: true,
  },
  {
    id: 2,
    title: 'Power Breakfast',
    description: 'Eat a protein-rich meal',
    points: 40,
    icon: 'restaurant',
    color: '#f59e0b',
    completed: false,
  },
  {
    id: 3,
    title: 'Deep Breathing',
    description: '5 minutes of breathing exercise',
    points: 30,
    icon: 'leaf',
    color: '#10b981',
    completed: false,
  },
];

export default function DailyBoosts() {
  const handleBoostPress = (boost: any) => {
    console.log('Boost pressed:', boost.title);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.sectionTitle}>Daily Boosts</Text>
      <Text style={styles.subtitle}>Quick wins to optimize your day</Text>
      
      <View style={styles.boostsList}>
        {boosts.map((boost) => (
          <TouchableOpacity
            key={boost.id}
            style={[
              styles.boostCard,
              boost.completed && styles.completedCard,
            ]}
            onPress={() => handleBoostPress(boost)}
          >
            <View style={styles.boostContent}>
              <View style={[
                styles.iconContainer,
                { backgroundColor: boost.completed ? '#f3f4f6' : `${boost.color}20` }
              ]}>
                <Ionicons 
                  name={boost.completed ? 'checkmark' : boost.icon as any} 
                  size={20} 
                  color={boost.completed ? '#10b981' : boost.color} 
                />
              </View>
              <View style={styles.textContainer}>
                <Text style={[
                  styles.boostTitle,
                  boost.completed && styles.completedText,
                ]}>
                  {boost.title}
                </Text>
                <Text style={[
                  styles.boostDescription,
                  boost.completed && styles.completedDescription,
                ]}>
                  {boost.description}
                </Text>
              </View>
              <View style={styles.pointsContainer}>
                <Text style={[
                  styles.pointsText,
                  boost.completed && styles.completedPoints,
                ]}>
                  +{boost.points}
                </Text>
                <Text style={styles.fpText}>FP</Text>
              </View>
            </View>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
    paddingBottom: 32,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#f9fafb',
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 14,
    color: '#9ca3af',
    marginBottom: 16,
  },
  boostsList: {
    gap: 12,
  },
  boostCard: {
    backgroundColor: '#1f2937',
    borderRadius: 12,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  completedCard: {
    backgroundColor: '#374151',
    opacity: 0.8,
  },
  boostContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  textContainer: {
    flex: 1,
  },
  boostTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#f9fafb',
    marginBottom: 4,
  },
  completedText: {
    textDecorationLine: 'line-through',
    color: '#9ca3af',
  },
  boostDescription: {
    fontSize: 14,
    color: '#9ca3af',
  },
  completedDescription: {
    color: '#6b7280',
  },
  pointsContainer: {
    alignItems: 'center',
  },
  pointsText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#ff6b35',
  },
  completedPoints: {
    color: '#10b981',
  },
  fpText: {
    fontSize: 10,
    color: '#9ca3af',
    marginTop: 2,
  },
});