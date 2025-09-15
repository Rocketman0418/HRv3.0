// Health Rocket V3 Theme - Exact V2 Brand Preservation
// Following RocketHub Design System Guidelines

export const theme = {
  // Primary brand colors (DO NOT CHANGE - Exact V2 preservation)
  primary: '#FF6B00',           // Exact V2 orange
  primaryDark: '#E55A00',       // Darker orange for pressed states
  primaryLight: '#FF8533',      // Lighter orange for highlights
  
  // Space theme foundation
  background: '#111827',        // Dark space base
  backgroundDeep: '#0F172A',    // Deeper space for contrast
  surface: 'rgba(17, 24, 39, 0.7)', // Semi-transparent panels
  surfaceLight: 'rgba(17, 24, 39, 0.5)', // Lighter panels for hierarchy
  surfaceDark: 'rgba(17, 24, 39, 0.9)', // Darker panels for emphasis
  
  // Text system (high contrast for accessibility)
  text: '#FFFFFF',              // Primary text
  textSecondary: '#D1D5DB',     // Secondary text
  textMuted: '#9CA3AF',         // Muted text
  textDark: '#6B7280',          // Dark muted text
  
  // Cosmic accent system
  accent: '#3B82F6',            // Cosmic blue
  accentPurple: '#8B5CF6',      // Cosmic purple
  accentTeal: '#14B8A6',        // Cosmic teal
  
  // Feedback colors
  success: '#10B981',           // Green for success
  warning: '#F59E0B',           // Yellow for warnings
  error: '#EF4444',             // Red for errors
  info: '#3B82F6',              // Blue for info
  
  // Gamification colors
  fuelPoints: '#FF6B00',        // Same as primary for consistency
  achievement: '#10B981',       // Green for achievements
  level: '#8B5CF6',             // Purple for level progression
  streak: '#EF4444',            // Red for streak indicators
  
  // Glass morphism effects
  glass: {
    background: 'rgba(17, 24, 39, 0.7)',
    border: 'rgba(255, 107, 0, 0.2)',
    shadow: 'rgba(0, 0, 0, 0.3)',
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

// Space background configuration
export const SPACE_BACKGROUND = 'https://images.unsplash.com/photo-1475274047050-1d0c0975c63e?auto=format&fit=crop&q=80&w=2000';

// Alternative space backgrounds for variety
export const SPACE_BACKGROUNDS = [
  'https://images.unsplash.com/photo-1475274047050-1d0c0975c63e?auto=format&fit=crop&q=80&w=2000',
  'https://images.unsplash.com/photo-1446776877081-d282a0f896e2?auto=format&fit=crop&q=80&w=2000',
  'https://images.unsplash.com/photo-1502134249126-9f3755a50d78?auto=format&fit=crop&q=80&w=2000',
];

// Common styles for glass morphism
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
  shadowOpacity: 0.3,
  shadowRadius: 8,
  elevation: 8,
};

// Button styles
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
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  secondary: {
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: theme.primary,
    borderRadius: theme.radius.md,
    paddingVertical: theme.spacing.md,
    paddingHorizontal: theme.spacing.lg,
    minHeight: 44,
    justifyContent: 'center',
    alignItems: 'center',
  },
};

export default theme;