// Health Rocket V3 Theme - EXACT V2 Brand Preservation with V2 Assets
// Following RocketHub Design System Guidelines with V2 Space Background

export const theme = {
  // Primary brand colors (EXACT V2 PRESERVATION - DO NOT CHANGE)
  primary: '#FF6B00',           // EXACT V2 orange - matches logo
  primaryDark: '#E55A00',       // Darker orange for pressed states
  primaryLight: '#FF8533',      // Lighter orange for highlights
  
  // Space theme foundation (V2 matching)
  background: '#0a0a0a',        // Deep space black base
  backgroundDeep: '#000000',    // Deeper space for contrast
  surface: 'rgba(45, 55, 72, 0.9)', // Semi-transparent panels over space
  surfaceLight: 'rgba(45, 55, 72, 0.7)', // Lighter panels for hierarchy
  surfaceDark: 'rgba(26, 32, 44, 0.95)', // Darker panels for emphasis
  
  // Text system (high contrast for accessibility over space background)
  text: '#FFFFFF',              // Primary text - high contrast on space
  textSecondary: '#E2E8F0',     // Secondary text
  textMuted: '#CBD5E0',         // Muted text
  textDark: '#A0AEC0',          // Dark muted text
  
  // V2 Cosmic accent system (matching V2 colors)
  accent: '#3B82F6',            // Cosmic blue
  accentPurple: '#8B5CF6',      // Cosmic purple
  accentTeal: '#14B8A6',        // Cosmic teal
  
  // Feedback colors (V2 matching)
  success: '#10B981',           // Green for success - matches "LAUNCHING HEALTH-SPAN"
  warning: '#F59E0B',           // Yellow for warnings
  error: '#EF4444',             // Red for errors
  info: '#3B82F6',              // Blue for info
  
  // Gamification colors (V2 exact matching)
  fuelPoints: '#FF6B00',        // Same as primary for consistency
  achievement: '#10B981',       // Green for achievements
  level: '#8B5CF6',             // Purple for level progression
  streak: '#EF4444',            // Red for streak indicators
  healthScore: '#10B981',       // Green for health score
  energyLevel: '#3B82F6',       // Blue for energy
  focusScore: '#8B5CF6',        // Purple for focus
  
  // Glass morphism effects (floating over space background)
  glass: {
    background: 'rgba(45, 55, 72, 0.9)',
    backgroundLight: 'rgba(45, 55, 72, 0.7)',
    border: 'rgba(255, 107, 0, 0.3)',
    borderLight: 'rgba(255, 107, 0, 0.2)',
    shadow: 'rgba(0, 0, 0, 0.5)',
    glow: 'rgba(255, 107, 0, 0.4)',
  },
  
  // Animation durations
  animation: {
    fast: 150,
    normal: 300,
    slow: 500,
  },
  
  // Spacing system (8px base)
  spacing: {
    xs: 4,
    sm: 8,
    md: 16,
    lg: 24,
    xl: 32,
    xxl: 48,
  },
  
  // Border radius
  radius: {
    sm: 8,
    md: 12,
    lg: 16,
    xl: 24,
    full: 9999,
  },
};

// V2 Space background configuration (using existing asset)
export const SPACE_BACKGROUND = require('../assets/images/space-background-v2.png');

// V2 Logo assets (using existing assets)
export const HR_HORIZONTAL_LOGO = require('../assets/images/hr-horizontal-v2.png');
export const HR_ROUND_LOGO = require('../assets/images/hr-round-logo.png');

// Common styles for glass morphism (floating over space background)
export const glassStyles = {
  backgroundColor: theme.glass.background,
  borderWidth: 1,
  borderColor: theme.glass.border,
  backdropFilter: 'blur(10px)',
  shadowColor: theme.glass.shadow,
  shadowOffset: {
    width: 0,
    height: 4,
  },
  shadowOpacity: 0.5,
  shadowRadius: 12,
  elevation: 12,
};

// Enhanced glass styles with glow effect
export const glassStylesWithGlow = {
  ...glassStyles,
  shadowColor: theme.glass.glow,
  shadowOpacity: 0.6,
  shadowRadius: 16,
  elevation: 16,
};

// Button styles (V2 matching)
export const buttonStyles = {
  primary: {
    backgroundColor: theme.primary,
    borderRadius: theme.radius.md,
    paddingVertical: theme.spacing.md,
    paddingHorizontal: theme.spacing.lg,
    minHeight: 44, // Mobile touch target
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: theme.primary,
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.4,
    shadowRadius: 12,
    elevation: 12,
  },
  secondary: {
    backgroundColor: 'transparent',
    borderWidth: 2,
    borderColor: theme.primary,
    borderRadius: theme.radius.md,
    paddingVertical: theme.spacing.md,
    paddingHorizontal: theme.spacing.lg,
    minHeight: 44,
    justifyContent: 'center',
    alignItems: 'center',
  },
};

// V2 Icon styles with exact color matching
export const iconStyles = {
  fuelPoints: {
    backgroundColor: theme.primary,
    color: '#FFFFFF',
  },
  healthScore: {
    backgroundColor: theme.success,
    color: '#FFFFFF',
  },
  burnStreak: {
    backgroundColor: theme.streak,
    color: '#FFFFFF',
  },
  energyLevel: {
    backgroundColor: theme.accent,
    color: '#FFFFFF',
  },
  focusScore: {
    backgroundColor: theme.accentPurple,
    color: '#FFFFFF',
  },
  currentLevel: {
    backgroundColor: theme.accent,
    color: '#FFFFFF',
  },
};

export default theme;