import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  SafeAreaView,
  KeyboardAvoidingView,
  Platform,
  Alert,
  TouchableOpacity,
} from 'react-native';
import { useAuth } from '../contexts/AuthContext';
import SpaceBackground from '../components/SpaceBackground';
import HealthRocketBrand from '../components/HealthRocketBrand';
import PrimaryButton from '../components/PrimaryButton';
import GlassCard from '../components/GlassCard';
import { theme } from '../constants/theme';

export default function AuthScreen() {
  const [isSignUp, setIsSignUp] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [launchCode, setLaunchCode] = useState('');
  const [loading, setLoading] = useState(false);

  const { signIn, signUp } = useAuth();

  const handleAuth = async () => {
    if (!email || !password || (isSignUp && !name)) {
      Alert.alert('Error', 'Please fill in all required fields');
      return;
    }

    setLoading(true);
    try {
      if (isSignUp) {
        const { error } = await signUp(email, password, name, launchCode);
        if (error) throw error;
      } else {
        const { error } = await signIn(email, password);
        if (error) throw error;
      }
    } catch (error: any) {
      Alert.alert('Error', error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <SpaceBackground>
      <SafeAreaView style={styles.container}>
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          style={styles.keyboardView}
        >
          <View style={styles.content}>
            <View style={styles.brandContainer}>
              <HealthRocketBrand variant="horizontal" size="medium" showTagline={true} />
            </View>

            <GlassCard style={styles.formCard}>
              <Text style={styles.title}>
                {isSignUp ? 'Join the Mission' : 'Welcome Back'}
              </Text>
              <Text style={styles.subtitle}>
                {isSignUp ? 'Start your health journey' : 'Continue your health journey'}
              </Text>

              {isSignUp && (
                <TextInput
                  style={styles.input}
                  placeholder="Full Name"
                  placeholderTextColor={theme.textMuted}
                  value={name}
                  onChangeText={setName}
                  autoCapitalize="words"
                />
              )}

              <TextInput
                style={styles.input}
                placeholder="Email"
                placeholderTextColor={theme.textMuted}
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
                autoCapitalize="none"
              />

              <TextInput
                style={styles.input}
                placeholder="Password"
                placeholderTextColor={theme.textMuted}
                value={password}
                onChangeText={setPassword}
                secureTextEntry
              />

              {isSignUp && (
                <TextInput
                  style={styles.input}
                  placeholder="Launch Code (Optional)"
                  placeholderTextColor={theme.textMuted}
                  value={launchCode}
                  onChangeText={setLaunchCode}
                  autoCapitalize="characters"
                />
              )}

              <PrimaryButton
                title={isSignUp ? 'Launch My Journey' : 'Sign In'}
                onPress={handleAuth}
                loading={loading}
                style={styles.authButton}
              />

              <TouchableOpacity
                style={styles.switchButton}
                onPress={() => setIsSignUp(!isSignUp)}
              >
                <Text style={styles.switchText}>
                  {isSignUp ? 'Already have an account? Sign In' : "Don't have an account? Sign Up"}
                </Text>
              </TouchableOpacity>
            </GlassCard>
          </View>
        </KeyboardAvoidingView>
      </SafeAreaView>
    </SpaceBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  keyboardView: {
    flex: 1,
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: theme.spacing.lg,
  },
  brandContainer: {
    alignItems: 'center',
    marginBottom: theme.spacing.xl,
  },
  formCard: {
    padding: theme.spacing.xl,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: theme.text,
    textAlign: 'center',
    marginBottom: theme.spacing.sm,
  },
  subtitle: {
    fontSize: 16,
    color: theme.textSecondary,
    textAlign: 'center',
    marginBottom: theme.spacing.xl,
  },
  input: {
    backgroundColor: theme.surfaceDark,
    borderRadius: theme.radius.md,
    padding: theme.spacing.md,
    marginBottom: theme.spacing.md,
    color: theme.text,
    fontSize: 16,
    borderWidth: 1,
    borderColor: theme.glass.borderLight,
  },
  authButton: {
    marginTop: theme.spacing.md,
    marginBottom: theme.spacing.lg,
  },
  switchButton: {
    alignItems: 'center',
  },
  switchText: {
    color: theme.primary,
    fontSize: 16,
    fontWeight: '500',
  },
});