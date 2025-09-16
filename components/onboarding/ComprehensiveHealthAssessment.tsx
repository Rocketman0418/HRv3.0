import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import GlassCard from '../GlassCard';
import PrimaryButton from '../PrimaryButton';
import { theme } from '../../constants/theme';

interface HealthAssessmentData {
  mindset: number;
  sleep: number;
  exercise: number;
  nutrition: number;
  biohacking: number;
}

interface ComprehensiveHealthAssessmentProps {
  healthData: HealthAssessmentData;
  onHealthDataChange: (data: HealthAssessmentData) => void;
  onNext: () => void;
  loading: boolean;
}

interface HealthCategory {
  key: keyof HealthAssessmentData;
  title: string;
  icon: string;
  color: string;
  description: string;
  examples: string[];
}

const healthCategories: HealthCategory[] = [
  {
    key: 'mindset',
    title: 'Mindset & Mental Health',
    icon: 'brain',
    color: theme.accentPurple,
    description: 'Your mental resilience, stress management, and overall psychological wellbeing',
    examples: ['Stress levels', 'Emotional regulation', 'Mental clarity', 'Positive outlook'],
  },
  {
    key: 'sleep',
    title: 'Sleep Quality',
    icon: 'moon',
    color: theme.accent,
    description: 'Your sleep duration, quality, and recovery patterns',
    examples: ['Sleep duration', 'Sleep consistency', 'Morning energy', 'Recovery quality'],
  },
  {
    key: 'exercise',
    title: 'Physical Activity',
    icon: 'fitness',
    color: theme.success,
    description: 'Your movement, strength, cardiovascular health, and physical capabilities',
    examples: ['Regular exercise', 'Strength training', 'Cardio fitness', 'Daily movement'],
  },
  {
    key: 'nutrition',
    title: 'Nutrition & Diet',
    icon: 'nutrition',
    color: theme.warning,
    description: 'Your eating habits, nutrient intake, and relationship with food',
    examples: ['Balanced meals', 'Nutrient density', 'Hydration', 'Eating patterns'],
  },
  {
    key: 'biohacking',
    title: 'Optimization & Recovery',
    icon: 'pulse',
    color: theme.primary,
    description: 'Your use of tools, techniques, and practices to optimize health',
    examples: ['Recovery practices', 'Health tracking', 'Supplements', 'Wellness routines'],
  },
];

export default function ComprehensiveHealthAssessment({
  healthData,
  onHealthDataChange,
  onNext,
  loading,
}: ComprehensiveHealthAssessmentProps) {
  const [currentCategoryIndex, setCurrentCategoryIndex] = useState(0);
  const currentCategory = healthCategories[currentCategoryIndex];

  const updateRating = (value: number) => {
    const newData = {
      ...healthData,
      [currentCategory.key]: value,
    };
    onHealthDataChange(newData);
  };

  const handleNext = () => {
    if (currentCategoryIndex < healthCategories.length - 1) {
      setCurrentCategoryIndex(currentCategoryIndex + 1);
    } else {
      onNext();
    }
  };

  const handlePrevious = () => {
    if (currentCategoryIndex > 0) {
      setCurrentCategoryIndex(currentCategoryIndex - 1);
    }
  };

  const getProgressPercentage = () => {
    return ((currentCategoryIndex + 1) / healthCategories.length) * 100;
  };

  const calculateCurrentScore = () => {
    const total = Object.values(healthData).reduce((sum, value) => sum + value, 0);
    return Math.round((total / 50) * 10 * 100) / 100;
  };

  const renderRatingScale = () => {
    const currentRating = healthData[currentCategory.key];
    
    return (
      <View style={styles.ratingContainer}>
        <Text style={styles.ratingTitle}>Rate your current level (1-10)</Text>
        <View style={styles.ratingScale}>
          {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((rating) => (
            <TouchableOpacity
              key={rating}
              style={[
                styles.ratingButton,
                currentRating === rating && styles.ratingButtonActive,
                { borderColor: currentCategory.color },
                currentRating === rating && { backgroundColor: currentCategory.color },
              ]}
              onPress={() => updateRating(rating)}
            >
              <Text
                style={[
                  styles.ratingText,
                  currentRating === rating && styles.ratingTextActive,
                ]}
              >
                {rating}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
        <View style={styles.ratingLabels}>
          <Text style={styles.ratingLabel}>Poor</Text>
          <Text style={styles.ratingLabel}>Excellent</Text>
        </View>
      </View>
    );
  };

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <GlassCard style={styles.assessmentCard}>
        <View style={styles.header}>
          <Text style={styles.title}>Health Assessment</Text>
          <Text style={styles.subtitle}>
            Let's establish your baseline health metrics
          </Text>
        </View>

        <View style={styles.progressContainer}>
          <View style={styles.progressBar}>
            <View style={[styles.progressFill, { width: `${getProgressPercentage()}%` }]} />
          </View>
          <Text style={styles.progressText}>
            {currentCategoryIndex + 1} of {healthCategories.length}
          </Text>
        </View>

        <View style={styles.categoryContainer}>
          <View style={[styles.categoryIcon, { backgroundColor: `${currentCategory.color}20` }]}>
            <Ionicons name={currentCategory.icon as any} size={32} color={currentCategory.color} />
          </View>
          
          <Text style={styles.categoryTitle}>{currentCategory.title}</Text>
          <Text style={styles.categoryDescription}>{currentCategory.description}</Text>
          
          <View style={styles.examplesContainer}>
            <Text style={styles.examplesTitle}>Consider these factors:</Text>
            {currentCategory.examples.map((example, index) => (
              <Text key={index} style={styles.exampleItem}>• {example}</Text>
            ))}
          </View>

          {renderRatingScale()}
        </View>

        <View style={styles.navigationContainer}>
          <View style={styles.buttonRow}>
            {currentCategoryIndex > 0 && (
              <PrimaryButton
                title="Previous"
                onPress={handlePrevious}
                variant="secondary"
                style={styles.navButton}
              />
            )}
            <PrimaryButton
              title={currentCategoryIndex === healthCategories.length - 1 ? 'Complete Assessment' : 'Next'}
              onPress={handleNext}
              loading={loading}
              style={[styles.navButton, styles.nextButton]}
            />
          </View>
        </View>

        {currentCategoryIndex === healthCategories.length - 1 && (
          <View style={styles.previewContainer}>
            <Text style={styles.previewTitle}>Your Health Score Preview</Text>
            <Text style={styles.previewScore}>{calculateCurrentScore()}/10</Text>
            <Text style={styles.previewSubtitle}>
              Complete the assessment to see your full health profile!
            </Text>
          </View>
        )}
      </GlassCard>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  assessmentCard: {
    padding: theme.spacing.xl,
    marginBottom: theme.spacing.xl,
  },
  header: {
    alignItems: 'center',
    marginBottom: theme.spacing.lg,
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    color: theme.text,
    marginBottom: theme.spacing.sm,
  },
  subtitle: {
    fontSize: 16,
    color: theme.textSecondary,
    textAlign: 'center',
    lineHeight: 22,
  },
  progressContainer: {
    marginBottom: theme.spacing.xl,
  },
  progressBar: {
    height: 8,
    backgroundColor: theme.surfaceDark,
    borderRadius: theme.radius.sm,
    overflow: 'hidden',
    marginBottom: theme.spacing.sm,
  },
  progressFill: {
    height: '100%',
    backgroundColor: theme.primary,
    borderRadius: theme.radius.sm,
  },
  progressText: {
    fontSize: 12,
    color: theme.textMuted,
    textAlign: 'center',
    fontWeight: '500',
  },
  categoryContainer: {
    alignItems: 'center',
    marginBottom: theme.spacing.xl,
  },
  categoryIcon: {
    width: 80,
    height: 80,
    borderRadius: 40,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: theme.spacing.md,
  },
  categoryTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: theme.text,
    textAlign: 'center',
    marginBottom: theme.spacing.sm,
  },
  categoryDescription: {
    fontSize: 16,
    color: theme.textSecondary,
    textAlign: 'center',
    lineHeight: 22,
    marginBottom: theme.spacing.lg,
  },
  examplesContainer: {
    alignSelf: 'stretch',
    marginBottom: theme.spacing.xl,
  },
  examplesTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: theme.text,
    marginBottom: theme.spacing.sm,
  },
  exampleItem: {
    fontSize: 14,
    color: theme.textSecondary,
    marginBottom: theme.spacing.xs,
    lineHeight: 20,
  },
  ratingContainer: {
    alignSelf: 'stretch',
    marginBottom: theme.spacing.lg,
  },
  ratingTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: theme.text,
    textAlign: 'center',
    marginBottom: theme.spacing.md,
  },
  ratingScale: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: theme.spacing.sm,
  },
  ratingButton: {
    width: 32,
    height: 32,
    borderRadius: 16,
    borderWidth: 2,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'transparent',
  },
  ratingButtonActive: {
    borderWidth: 2,
  },
  ratingText: {
    fontSize: 14,
    fontWeight: '600',
    color: theme.textMuted,
  },
  ratingTextActive: {
    color: '#FFFFFF',
  },
  ratingLabels: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: theme.spacing.xs,
  },
  ratingLabel: {
    fontSize: 12,
    color: theme.textMuted,
    fontWeight: '500',
  },
  navigationContainer: {
    alignSelf: 'stretch',
  },
  buttonRow: {
    flexDirection: 'row',
    gap: theme.spacing.md,
  },
  navButton: {
    flex: 1,
  },
  nextButton: {
    // Primary button styling will be applied automatically
  },
  previewContainer: {
    alignItems: 'center',
    marginTop: theme.spacing.lg,
    padding: theme.spacing.lg,
    backgroundColor: `${theme.primary}10`,
    borderRadius: theme.radius.md,
    borderWidth: 1,
    borderColor: `${theme.primary}30`,
  },
  previewTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: theme.primary,
    marginBottom: theme.spacing.sm,
  },
  previewScore: {
    fontSize: 32,
    fontWeight: 'bold',
    color: theme.primary,
    marginBottom: theme.spacing.sm,
  },
  previewSubtitle: {
    fontSize: 14,
    color: theme.textSecondary,
    textAlign: 'center',
  },
});