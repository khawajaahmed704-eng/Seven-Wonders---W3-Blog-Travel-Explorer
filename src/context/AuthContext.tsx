import React, { createContext, useContext, useEffect, useState } from 'react';
import { User, Session } from '@supabase/supabase-js';
import { getSupabase, isSupabaseConfigured } from '../lib/supabase';
import { Profile } from '../types/database';

interface AuthContextType {
  user: User | null;
  profile: Profile | null;
  role: 'reader' | 'admin';
  loading: boolean;
  isConfigured: boolean;
  signIn: (email: string, password: string) => Promise<{ error: Error | null }>;
  signUp: (email: string, password: string, displayName: string) => Promise<{ error: Error | null; needsEmailConfirmation?: boolean }>;
  signOut: () => Promise<void>;
  resetPassword: (email: string) => Promise<{ error: Error | null }>;
  updateProfile: (updates: Partial<Profile>) => Promise<{ error: Error | null }>;
  setDemoRole: (role: 'reader' | 'admin') => void;
  signInAsDemoUser: (asAdmin?: boolean) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const DEMO_USER_STORAGE_KEY = 'seven_wonders_demo_user';

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [profile, setProfile] = useState<Profile | null>(null);
  const [role, setRole] = useState<'reader' | 'admin'>('reader');
  const [loading, setLoading] = useState<boolean>(true);
  const [configured, setConfigured] = useState<boolean>(false);

  // Check Supabase configuration and initial session
  useEffect(() => {
    const isConfig = isSupabaseConfigured();
    setConfigured(isConfig);

    if (isConfig) {
      const supabase = getSupabase();
      if (!supabase) {
        setLoading(false);
        return;
      }

      // 1. Get initial session
      supabase.auth.getSession().then(({ data: { session } }) => {
        if (session?.user) {
          setUser(session.user);
          loadUserData(session.user.id, session.user.email);
        } else {
          setUser(null);
          setProfile(null);
          setRole('reader');
          setLoading(false);
        }
      });

      // 2. Listen for auth state changes
      const { data: { subscription } } = supabase.auth.onAuthStateChange(
        async (_event, session) => {
          if (session?.user) {
            setUser(session.user);
            await loadUserData(session.user.id, session.user.email);
          } else {
            setUser(null);
            setProfile(null);
            setRole('reader');
            setLoading(false);
          }
        }
      );

      return () => {
        subscription.unsubscribe();
      };
    } else {
      // Demo mode session retrieval
      const storedDemo = localStorage.getItem(DEMO_USER_STORAGE_KEY);
      if (storedDemo) {
        try {
          const parsed = JSON.parse(storedDemo);
          setUser(parsed.user);
          setProfile(parsed.profile);
          setRole(parsed.role || 'reader');
        } catch {
          localStorage.removeItem(DEMO_USER_STORAGE_KEY);
        }
      }
      setLoading(false);
    }
  }, []);

  const loadUserData = async (userId: string, email?: string) => {
    const supabase = getSupabase();
    if (!supabase) return;

    try {
      // Fetch profile
      const { data: profileData, error: profileError } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', userId)
        .maybeSingle();

      if (profileData) {
        setProfile(profileData as Profile);
      } else if (!profileError) {
        // Fallback: create initial profile if trigger did not execute
        const initialProfile: Partial<Profile> = {
          id: userId,
          display_name: email ? email.split('@')[0] : 'Explorer',
          bio: 'Passionate historical wonder enthusiast.',
        };
        await supabase.from('profiles').insert(initialProfile);
        setProfile(initialProfile as Profile);
      }

      // Fetch user role
      const { data: roleData } = await supabase
        .from('user_roles')
        .select('role')
        .eq('user_id', userId)
        .maybeSingle();

      if (roleData?.role === 'admin') {
        setRole('admin');
      } else {
        setRole('reader');
      }
    } catch (err) {
      console.warn('Could not load user profile/role:', err);
    } finally {
      setLoading(false);
    }
  };

  const signIn = async (email: string, password: string) => {
    const supabase = getSupabase();
    if (!supabase) {
      // Demo sign in fallback
      const demoUser = {
        id: 'demo-user-id-' + Math.random().toString(36).substring(7),
        email,
        app_metadata: {},
        user_metadata: { display_name: email.split('@')[0] },
        aud: 'authenticated',
        created_at: new Date().toISOString(),
      } as unknown as User;

      const demoProfile: Profile = {
        id: demoUser.id,
        display_name: email.split('@')[0],
        avatar_url: `https://api.dicebear.com/7.x/bottts/svg?seed=${email}`,
        bio: 'Explorer of the world wonders.',
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      };

      const demoRole = email.toLowerCase().includes('admin') ? 'admin' : 'reader';

      setUser(demoUser);
      setProfile(demoProfile);
      setRole(demoRole);

      localStorage.setItem(
        DEMO_USER_STORAGE_KEY,
        JSON.stringify({ user: demoUser, profile: demoProfile, role: demoRole })
      );
      return { error: null };
    }

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    return { error };
  };

  const signUp = async (email: string, password: string, displayName: string) => {
    const supabase = getSupabase();
    if (!supabase) {
      // Demo sign up
      const demoUser = {
        id: 'demo-user-id-' + Math.random().toString(36).substring(7),
        email,
        app_metadata: {},
        user_metadata: { display_name: displayName },
        aud: 'authenticated',
        created_at: new Date().toISOString(),
      } as unknown as User;

      const demoProfile: Profile = {
        id: demoUser.id,
        display_name: displayName,
        avatar_url: `https://api.dicebear.com/7.x/bottts/svg?seed=${displayName}`,
        bio: 'New wonder enthusiast reader.',
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      };

      const demoRole = 'reader';

      setUser(demoUser);
      setProfile(demoProfile);
      setRole(demoRole);

      localStorage.setItem(
        DEMO_USER_STORAGE_KEY,
        JSON.stringify({ user: demoUser, profile: demoProfile, role: demoRole })
      );

      return { error: null, needsEmailConfirmation: false };
    }

    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          display_name: displayName,
        },
      },
    });

    if (error) {
      return { error };
    }

    // Check if email confirmation is required
    const needsEmailConfirmation = data.session === null;
    return { error: null, needsEmailConfirmation };
  };

  const signOut = async () => {
    const supabase = getSupabase();
    if (supabase) {
      await supabase.auth.signOut();
    } else {
      localStorage.removeItem(DEMO_USER_STORAGE_KEY);
      setUser(null);
      setProfile(null);
      setRole('reader');
    }
  };

  const resetPassword = async (email: string) => {
    const supabase = getSupabase();
    if (!supabase) {
      return { error: null };
    }
    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: window.location.origin,
    });
    return { error };
  };

  const updateProfile = async (updates: Partial<Profile>) => {
    if (!user) return { error: new Error('User not authenticated') };

    const supabase = getSupabase();
    if (!supabase) {
      if (profile) {
        const updated = { ...profile, ...updates, updated_at: new Date().toISOString() };
        setProfile(updated);
        localStorage.setItem(
          DEMO_USER_STORAGE_KEY,
          JSON.stringify({ user, profile: updated, role })
        );
      }
      return { error: null };
    }

    const { error } = await supabase
      .from('profiles')
      .update({
        ...updates,
        updated_at: new Date().toISOString(),
      })
      .eq('id', user.id);

    if (!error && profile) {
      setProfile({ ...profile, ...updates });
    }

    return { error };
  };

  const setDemoRole = (newRole: 'reader' | 'admin') => {
    setRole(newRole);
    if (!configured && user && profile) {
      localStorage.setItem(
        DEMO_USER_STORAGE_KEY,
        JSON.stringify({ user, profile, role: newRole })
      );
    }
  };

  const signInAsDemoUser = (asAdmin: boolean = false) => {
    const demoUser = {
      id: asAdmin ? 'demo-admin-id' : 'demo-reader-id',
      email: asAdmin ? 'admin@sevenwonders.org' : 'traveler@sevenwonders.org',
      app_metadata: {},
      user_metadata: { display_name: asAdmin ? 'Wonder Administrator' : 'Curious Traveler' },
      aud: 'authenticated',
      created_at: new Date().toISOString(),
    } as unknown as User;

    const demoProfile: Profile = {
      id: demoUser.id,
      display_name: asAdmin ? 'Wonder Administrator' : 'Curious Traveler',
      avatar_url: asAdmin
        ? 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80'
        : 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80',
      bio: asAdmin
        ? 'Lead editor & curator at Seven Wonders Explorer.'
        : 'Globetrotter documenting ancient and modern marvels.',
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    };

    const roleName = asAdmin ? 'admin' : 'reader';
    setUser(demoUser);
    setProfile(demoProfile);
    setRole(roleName);

    localStorage.setItem(
      DEMO_USER_STORAGE_KEY,
      JSON.stringify({ user: demoUser, profile: demoProfile, role: roleName })
    );
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        profile,
        role,
        loading,
        isConfigured: configured,
        signIn,
        signUp,
        signOut,
        resetPassword,
        updateProfile,
        setDemoRole,
        signInAsDemoUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
