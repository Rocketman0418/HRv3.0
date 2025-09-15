import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useAuth } from '../contexts/AuthContext';


export default function StatsGrid() {
  const { userData } = useAuth();

  const stats = [
    {
      title: 'Health Score',
      value: userData?.health_score?.toString() || '0',
      unit: '/10',
      icon: 'heart',
      color: '#10b981',
      bgColor: '#d1fae5',
    },
    {
      title: 'Burn Streak',
      value: userData?.burn_streak?.toString() || '0',
      unit: 'days',
      icon: 'flash',
      color: '#ef4444',
      bgColor: '#fee2e2',
    },
    {
      title: 'Energy Level',
      value: '0', // This would come from a calculation or separate field
      unit: '%',
      icon: 'battery-charging',
      color: '#3b82f6',
      bgColor: '#dbeafe',
    },
    {
      title: 'Focus Score',
      value: '0', // This would come from a calculation or separate field
      unit: '/10',
      icon: 'eye',
      color: '#8b5cf6',
      bgColor: '#ede9fe',
    },
  ];

  return (
    <View style={styles.container}>
      <Text style={styles.sectionTitle}>Today's Performance</Text>
      <View style={styles.grid}>
        {stats.map((stat, index) => (
          <View key={index} style={styles.statCard}>
            <View style={[styles.iconContainer, { backgroundColor: stat.bgColor }]}>
              <Ionicons name={stat.icon as any} size={20} color={stat.color} />
            </View>
            <Text style={styles.statValue}>
              {stat.value}
              <Text style={styles.statUnit}>{stat.unit}</Text>
            </Text>
            <Text style={styles.statTitle}>{stat.title}</Text>
          </View>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#f9fafb',
    marginBottom: 16,
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  statCard: {
    backgroundColor: '#1f2937',
    borderRadius: 12,
    padding: 16,
    flex: 1,
    minWidth: '45%',
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
    width: 36,
    height: 36,
    borderRadius: 18,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
  },
  statValue: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#f9fafb',
    marginBottom: 4,
  },
  statUnit: {
    fontSize: 14,
    fontWeight: 'normal',
    color: '#9ca3af',
  },
  statTitle: {
    fontSize: 12,
    color: '#9ca3af',
    textAlign: 'center',
  },
});