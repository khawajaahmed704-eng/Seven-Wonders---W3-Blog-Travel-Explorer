import { createClient, SupabaseClient } from '@supabase/supabase-js';

const STORAGE_KEY_URL = 'seven_wonders_supabase_url';
const STORAGE_KEY_ANON = 'seven_wonders_supabase_anon_key';
export const PRESET_PROJECT_URL = 'https://axgildtwdtxqxulwdwea.supabase.co';
export const PRESET_PUBLISHABLE_KEY = 'sb_publishable_EXQGXD1hdGVODmfPFCcUqQ_-l5fRXxC';

export function getSupabaseCredentials(): { url: string; anonKey: string; isCustom: boolean } {
  const customUrl = typeof window !== 'undefined' ? localStorage.getItem(STORAGE_KEY_URL) : null;
  const customAnon = typeof window !== 'undefined' ? localStorage.getItem(STORAGE_KEY_ANON) : null;

  const envUrl = (import.meta.env.VITE_SUPABASE_URL as string) || '';
  const envAnon = (import.meta.env.VITE_SUPABASE_ANON_KEY as string) || '';

  if (customUrl && customAnon) {
    return { url: customUrl, anonKey: customAnon, isCustom: true };
  }

  const effectiveUrl = (envUrl && !envUrl.includes('your-project-id')) ? envUrl : (customUrl || PRESET_PROJECT_URL);
  const effectiveAnon = (envAnon && !envAnon.includes('your-anon-publishable-key')) ? envAnon : (customAnon || PRESET_PUBLISHABLE_KEY);

  return { url: effectiveUrl, anonKey: effectiveAnon, isCustom: false };
}

let cachedClient: SupabaseClient | null = null;
let cachedClientUrl = '';
let cachedClientKey = '';

export function getSupabase(): SupabaseClient | null {
  const { url, anonKey } = getCredentials();
  
  if (!url || !anonKey || url.includes('your-project-id') || anonKey.includes('your-anon-publishable-key')) {
    return null;
  }

  if (cachedClient && cachedClientUrl === url && cachedClientKey === anonKey) {
    return cachedClient;
  }

  try {
    cachedClient = createClient(url, anonKey, {
      auth: {
        persistSession: true,
        autoRefreshToken: true,
        detectSessionInUrl: true,
      },
    });
    cachedClientUrl = url;
    cachedClientKey = anonKey;
    return cachedClient;
  } catch (err) {
    console.error('Failed to initialize Supabase client:', err);
    return null;
  }
}

export function isSupabaseConfigured(): boolean {
  const { url, anonKey } = getSupabaseCredentials();
  return Boolean(
    url && 
    anonKey && 
    !url.includes('your-project-id') && 
    !anonKey.includes('your-anon-publishable-key')
  );
}

export function saveCustomSupabaseConfig(url: string, anonKey: string): void {
  if (typeof window !== 'undefined') {
    localStorage.setItem(STORAGE_KEY_URL, url.trim());
    localStorage.setItem(STORAGE_KEY_ANON, anonKey.trim());
    cachedClient = null;
    cachedClientUrl = '';
    cachedClientKey = '';
  }
}

export function clearCustomSupabaseConfig(): void {
  if (typeof window !== 'undefined') {
    localStorage.removeItem(STORAGE_KEY_URL);
    localStorage.removeItem(STORAGE_KEY_ANON);
    cachedClient = null;
    cachedClientUrl = '';
    cachedClientKey = '';
  }
}

function getCredentials() {
  return getSupabaseCredentials();
}
