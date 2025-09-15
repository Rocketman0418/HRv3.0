import React, { createContext, useContext, useEffect, useState } from 'react';
import { Session, User } from '@supabase/supabase-js';
import { Alert } from 'react-native';
import { supabase, supabaseAdmin } from '../lib/supabase';

interface AuthContextType {
  session: Session | null;
  user: User | null;
  userData: any;
  loading: boolean;
  signIn: (email: string, password: string) => Promise<{ error: any }>;
  signUp: (email: string, password: string, name: string, launchCode?: string) => Promise<{ error: any }>;
  signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [session, setSession] = useState<Session | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [userData, setUserData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  // Fetch user data from our users table
  const fetchUserData = async (userId: string) => {
    try {
      const { data, error } = await supabase
        .from('users')
        .select('*')
        .eq('id', userId)
        .maybeSingle();
      
      if (error) {
        console.error('Error fetching user data:', error);
        return;
      }
      setUserData(data);
    } catch (error) {
      console.error('Error fetching user data:', error);
    }
  };

  useEffect(() => {
    // Get initial session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setUser(session?.user ?? null);
      if (session?.user) {
        fetchUserData(session.user.id);
      }
      setLoading(false);
    });

    // Listen for auth changes
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(async (_event, session) => {
      setSession(session);
      setUser(session?.user ?? null);
      if (session?.user) {
        await fetchUserData(session.user.id);
      } else {
        setUserData(null);
      }
      setLoading(false);
    });

    return () => subscription.unsubscribe();
  }, []);

  const signIn = async (email: string, password: string) => {
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    if (error) throw error;
    return { error };
  };

  const signUp = async (email: string, password: string, name: string, launchCode?: string) => {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        emailRedirectTo: undefined,
      },
    });
    
    if (error) throw error;

    // Create user profile in our users table
    if (data.user) {
      try {
        const { error: profileError } = await supabaseAdmin
          .from('users')
          .insert([
            {
              id: data.user.id,
              email: data.user.email,
              name: name,
              onboarding_completed: false,
              onboarding_step: 'mission',
            }
          ]);

        if (profileError) {
          console.error('Error creating user profile:', profileError);
          throw new Error('Failed to create user profile');
        }
      } catch (profileError) {
        console.error('Error creating user profile:', profileError);
        throw profileError;
      }

      // Handle launch code if provided
      if (launchCode) {
        try {
          const { data: codeData, error: codeError } = await supabaseAdmin
            .from('launch_codes')
            .select('*')
            .eq('code', launchCode.toUpperCase())
            .eq('is_active', true)
            .maybeSingle();

          if (!codeError && codeData) {
            // Record launch code usage
            try {
              await supabaseAdmin
                .from('launch_code_usages')
                .insert([
                  {
                    user_id: data.user.id,
                    launch_code_id: codeData.id,
                  }
                ]);
            } catch (usageError) {
              console.error('Error recording launch code usage:', usageError);
            }
          }
        } catch (codeError) {
          console.error('Error processing launch code:', codeError);
        }
      }
    }

    return { error };
  };

  const signOut = async () => {
    setUserData(null);
    await supabase.auth.signOut();
  };
  const value = {
    session,
    user,
    userData,
    loading,
    signIn,
    signUp,
    signOut,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}