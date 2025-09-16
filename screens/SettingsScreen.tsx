import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  SafeAreaView,
  TouchableOpacity,
  Switch,
  Alert,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import SpaceBackground from '../components/SpaceBackground';
import { useAuth } from '../contexts/AuthContext';
import HealthRocketBrand from '../components/HealthRocketBrand';
import GlassCard from '../components/GlassCard';
import { theme } from '../constants/theme';

export default function SettingsScreen() {
  const { user, userData, signOut } = useAuth();
  const [notificationsEnabled, setNotificationsEnabled] = React.useState(true);
  const [darkModeEnabled, setDarkModeEnabled] = React.useState(true);
  const [soundEnabled, setSoundEnabled] = React.useState(false);

  const handleSignOut = async () => {
    Alert.alert(
      'Sign Out',
      'Are you sure you want to sign out?',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Sign Out',
          style: 'destructive',
          onPress: async () => {
            try {
              await signOut();
            } catch (error) {
              console.error('Sign out error:', error);
              Alert.alert('Error', 'Failed to sign out. Please try again.');
            }
          },
        },
      ]
    );
  };

  const settingsGroups = [
    {
      title: 'Account',
      items: [
        {
          icon: 'person-outline',
          title: 'Edit Profile',
          subtitle: 'Update your personal information',
          onPress: () => console.log('Edit Profile'),
        },
        {
          icon: 'mail-outline',
          title: 'Email Preferences',
          subtitle: 'Manage email notifications',
          onPress: () => console.log('Email Preferences'),
        },
        {
          icon: 'lock-closed-outline',
          title: 'Privacy & Security',
          subtitle: 'Manage your privacy settings',
          onPress: () => console.log('Privacy & Security'),
        },
      ],
    },
    {
      title: 'Preferences',
      items: [
        {
          icon: 'notifications-outline',
          title: 'Push Notifications',
          subtitle: 'Get notified about activities',
          toggle: true,
          value: notificationsEnabled,
          onToggle: setNotificationsEnabled,
        },
        {
          icon: 'moon-outline',
          title: 'Dark Mode',
          subtitle: 'Use dark theme',
          toggle: true,
          value: darkModeEnabled,
          onToggle: setDarkModeEnabled,
        },
        {
          icon: 'volume-high-outline',
          title: 'Sound Effects',
          subtitle: 'Play sounds for actions',
          toggle: true,
          value: soundEnabled,
          onToggle: setSoundEnabled,
        },
      ],
    },
    {
      title: 'Support',
      items: [
        {
          icon: 'help-circle-outline',
          title: 'Help & FAQ',
          subtitle: 'Get help and find answers',
          onPress: () => console.log('Help & FAQ'),
        },
        {
          icon: 'chatbubble-outline',
          title: 'Contact Support',
          subtitle: 'Get in touch with our team',
          onPress: () => console.log('Contact Support'),
        },
        {
          icon: 'star-outline',
          title: 'Rate the App',
          subtitle: 'Share your feedback',
          onPress: () => console.log('Rate the App'),
        },
      ],
    },
  ];

  return (
    <SpaceBackground>
      <SafeAreaView style={styles.container}>
        <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
          <View style={styles.header}>
            <HealthRocketBrand variant="round" size="small" showTagline={false} />
            <Text style={styles.headerTitle}>Settings</Text>
          </View>

          <GlassCard style={styles.profileCard}>
            <View style={styles.profileRow}>
              <View style={styles.avatarContainer}>
                <Ionicons name="person-circle-outline" size={60} color={theme.primary} />
              </View>
              <View style={styles.profileInfo}>
                <Text style={styles.profileName}>{userData?.name || 'Entrepreneur'}</Text>
                <Text style={styles.profileEmail}>{userData?.email || user?.email}</Text>
                <Text style={styles.profileLevel}>Level {userData?.level || 1}</Text>
              </View>
            </View>
          </GlassCard>

          {settingsGroups.map((group, groupIndex) => (
            <View key={groupIndex} style={styles.settingsGroup}>
              <Text style={styles.groupTitle}>{group.title}</Text>
              <GlassCard style={styles.groupCard}>
                {group.items.map((item, itemIndex) => (
                  <TouchableOpacity
                    key={itemIndex}
                    style={[
                      styles.settingItem,
                      itemIndex < group.items.length - 1 && styles.settingItemBorder,
                    ]}
                    onPress={item.onPress}
                    disabled={item.toggle}
                  >
                    <View style={styles.settingLeft}>
                      <View style={styles.settingIcon}>
                        <Ionicons name={item.icon as any} size={20} color={theme.primary} />
                      </View>
                      <View style={styles.settingText}>
                        <Text style={styles.settingTitle}>{item.title}</Text>
                        <Text style={styles.settingSubtitle}>{item.subtitle}</Text>
                      </View>
                    </View>
                    <View style={styles.settingRight}>
                      {item.toggle ? (
                        <Switch
                          value={item.value}
                          onValueChange={item.onToggle}
                          trackColor={{ false: theme.surfaceDark, true: `${theme.primary}40` }}
                          thumbColor={item.value ? theme.primary : theme.textMuted}
                        />
                      ) : (
                        <Ionicons name="chevron-forward" size={20} color={theme.textMuted} />
                      )}
                    </View>
                  </TouchableOpacity>
                ))}
              </GlassCard>
            </View>
          ))}

          <View style={styles.signOutContainer}>
            <TouchableOpacity style={styles.signOutButton} onPress={handleSignOut}>
              <Ionicons name="log-out-outline" size={20} color={theme.error} />
              <Text style={styles.signOutText}>Sign Out</Text>
            </TouchableOpacity>
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
  profileCard: {
    marginHorizontal: theme.spacing.lg,
    marginBottom: theme.spacing.lg,
  },
  profileRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatarContainer: {
    marginRight: theme.spacing.md,
  },
  profileInfo: {
    flex: 1,
  },
  profileName: {
    fontSize: 20,
    fontWeight: 'bold',
    color: theme.text,
    marginBottom: theme.spacing.xs,
  },
  profileEmail: {
    fontSize: 14,
    color: theme.textSecondary,
    marginBottom: theme.spacing.xs,
  },
  profileLevel: {
    fontSize: 12,
    color: theme.primary,
    fontWeight: '600',
  },
  settingsGroup: {
    marginBottom: theme.spacing.lg,
    paddingHorizontal: theme.spacing.lg,
  },
  groupTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: theme.text,
    marginBottom: theme.spacing.sm,
  },
  groupCard: {
    padding: 0,
  },
  settingItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: theme.spacing.md,
  },
  settingItemBorder: {
    borderBottomWidth: 1,
    borderBottomColor: theme.glass.borderLight,
  },
  settingLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  settingIcon: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: `${theme.primary}20`,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: theme.spacing.sm,
  },
  settingText: {
    flex: 1,
  },
  settingTitle: {
    fontSize: 16,
    fontWeight: '500',
    color: theme.text,
    marginBottom: theme.spacing.xs / 2,
  },
  settingSubtitle: {
    fontSize: 12,
    color: theme.textSecondary,
  },
  settingRight: {
    marginLeft: theme.spacing.sm,
  },
  signOutContainer: {
    paddingHorizontal: theme.spacing.lg,
    paddingBottom: theme.spacing.xl,
  },
  signOutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: `${theme.error}20`,
    borderRadius: theme.radius.md,
    padding: theme.spacing.md,
    borderWidth: 1,
    borderColor: `${theme.error}40`,
  },
  signOutText: {
    fontSize: 16,
    fontWeight: '600',
    color: theme.error,
    marginLeft: theme.spacing.sm,
  },
});