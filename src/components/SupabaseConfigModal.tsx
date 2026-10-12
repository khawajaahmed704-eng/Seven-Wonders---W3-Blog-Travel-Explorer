import React, { useState } from 'react';
import { X, Database, CheckCircle2, AlertTriangle, Copy, Check, ExternalLink, RefreshCw, KeyRound, Sparkles } from 'lucide-react';
import { getSupabaseCredentials, saveCustomSupabaseConfig, clearCustomSupabaseConfig, getSupabase } from '../lib/supabase';

interface SupabaseConfigModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConnectedChange?: () => void;
}

export const SupabaseConfigModal: React.FC<SupabaseConfigModalProps> = ({
  isOpen,
  onClose,
  onConnectedChange,
}) => {
  const currentCreds = getSupabaseCredentials();
  const [url, setUrl] = useState(currentCreds.url || '');
  const [anonKey, setAnonKey] = useState(
    currentCreds.anonKey || 'sb_publishable_EXQGXD1hdGVODmfPFCcUqQ_-l5fRXxC'
  );
  const [testing, setTesting] = useState(false);
  const [testResult, setTestResult] = useState<{ success: boolean; message: string } | null>(null);
  const [copiedSql, setCopiedSql] = useState(false);
  const [activeTab, setActiveTab] = useState<'credentials' | 'sql'>('credentials');

  if (!isOpen) return null;

  const handleSave = async () => {
    let cleanUrl = url.trim();

    // If user pasted a dashboard URL: https://supabase.com/dashboard/project/xyz
    if (cleanUrl.includes('supabase.com/dashboard/project/')) {
      const parts = cleanUrl.split('/project/');
      const ref = parts[1]?.split('/')[0]?.split('?')[0];
      if (ref) {
        cleanUrl = `https://${ref}.supabase.co`;
        setUrl(cleanUrl);
      }
    } else if (cleanUrl && !cleanUrl.startsWith('http://') && !cleanUrl.startsWith('https://')) {
      if (!cleanUrl.includes('.')) {
        cleanUrl = `https://${cleanUrl}.supabase.co`;
        setUrl(cleanUrl);
      } else {
        cleanUrl = `https://${cleanUrl}`;
        setUrl(cleanUrl);
      }
    }

    if (!cleanUrl || !anonKey.trim()) {
      setTestResult({
        success: false,
        message: 'Please provide your Supabase Project URL (e.g. https://your-project.supabase.co).',
      });
      return;
    }

    saveCustomSupabaseConfig(cleanUrl, anonKey.trim());
    setTesting(true);
    setTestResult(null);

    try {
      const client = getSupabase();
      if (!client) {
        setTestResult({ success: false, message: 'Invalid URL or key format.' });
        setTesting(false);
        return;
      }

      // Quick test query against public.blog_posts or public.profiles
      const { error } = await client.from('blog_posts').select('id').limit(1);
      
      if (error && error.code !== 'PGRST116') {
        // Table might not be created yet, but connection was made!
        setTestResult({
          success: true,
          message: `Connected to Supabase! Notice: ${error.message} (Run the SQL script in SQL Editor if you haven't yet).`,
        });
      } else {
        setTestResult({
          success: true,
          message: 'Connected successfully to your Supabase PostgreSQL database!',
        });
      }

      if (onConnectedChange) {
        onConnectedChange();
      }
    } catch (err: any) {
      setTestResult({
        success: false,
        message: 'Connection failed: ' + (err.message || 'Unknown network error'),
      });
    } finally {
      setTesting(false);
    }
  };

  const handleClear = () => {
    clearCustomSupabaseConfig();
    setUrl('');
    setAnonKey('');
    setTestResult({ success: true, message: 'Reset to local demo mode.' });
    if (onConnectedChange) {
      onConnectedChange();
    }
  };

  const fullSqlScript = `-- ==========================================
-- SEVEN WONDERS BLOGGING DATABASE SCHEMA
-- ==========================================

-- 1. Create profiles table
CREATE TABLE IF NOT EXISTS public.profiles (
    id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
    display_name TEXT,
    avatar_url TEXT,
    bio TEXT,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
GRANT SELECT, INSERT, UPDATE ON public.profiles TO authenticated;

CREATE POLICY "Users can view their own profile"
ON public.profiles FOR SELECT TO authenticated
USING ((SELECT auth.uid()) = id);

CREATE POLICY "Users can create their own profile"
ON public.profiles FOR INSERT TO authenticated
WITH CHECK ((SELECT auth.uid()) = id);

CREATE POLICY "Users can update their own profile"
ON public.profiles FOR UPDATE TO authenticated
USING ((SELECT auth.uid()) = id)
WITH CHECK ((SELECT auth.uid()) = id);

-- 2. Trigger on new user sign-up
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER LANGUAGE plpgsql SECURITY DEFINER SET search_path = ''
AS $$
BEGIN
    INSERT INTO public.profiles (id, display_name)
    VALUES (
        NEW.id,
        COALESCE(
            NEW.raw_user_meta_data ->> 'display_name',
            split_part(COALESCE(NEW.email, ''), '@', 1)
        )
    );
    RETURN NEW;
END;
$$;

DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
AFTER INSERT ON auth.users
FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- 3. Create blog_posts table
CREATE TABLE IF NOT EXISTS public.blog_posts (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    author_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
    title TEXT NOT NULL,
    slug TEXT UNIQUE NOT NULL,
    excerpt TEXT,
    content TEXT NOT NULL DEFAULT '',
    cover_image TEXT,
    category TEXT DEFAULT 'History',
    tags TEXT[] DEFAULT '{}',
    status TEXT NOT NULL DEFAULT 'draft' CHECK (status IN ('draft', 'published')),
    published_at TIMESTAMPTZ,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

ALTER TABLE public.blog_posts ENABLE ROW LEVEL SECURITY;
GRANT SELECT ON public.blog_posts TO anon, authenticated;
GRANT INSERT, UPDATE, DELETE ON public.blog_posts TO authenticated;

CREATE POLICY "Anyone can read published posts"
ON public.blog_posts FOR SELECT TO anon, authenticated
USING (status = 'published' OR (SELECT auth.uid()) = author_id);

CREATE POLICY "Users can create their own posts"
ON public.blog_posts FOR INSERT TO authenticated
WITH CHECK ((SELECT auth.uid()) = author_id);

CREATE POLICY "Authors can update their own posts"
ON public.blog_posts FOR UPDATE TO authenticated
USING ((SELECT auth.uid()) = author_id)
WITH CHECK ((SELECT auth.uid()) = author_id);

CREATE POLICY "Authors can delete their own posts"
ON public.blog_posts FOR DELETE TO authenticated
USING ((SELECT auth.uid()) = author_id);

CREATE INDEX IF NOT EXISTS blog_posts_published_idx
ON public.blog_posts (published_at DESC) WHERE status = 'published';

-- 4. Create bookmarks table
CREATE TABLE IF NOT EXISTS public.bookmarks (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
    post_id UUID NOT NULL REFERENCES public.blog_posts(id) ON DELETE CASCADE,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    UNIQUE (user_id, post_id)
);

ALTER TABLE public.bookmarks ENABLE ROW LEVEL SECURITY;
GRANT SELECT, INSERT, DELETE ON public.bookmarks TO authenticated;

CREATE POLICY "Users can view their bookmarks"
ON public.bookmarks FOR SELECT TO authenticated
USING ((SELECT auth.uid()) = user_id);

CREATE POLICY "Users can add their own bookmarks"
ON public.bookmarks FOR INSERT TO authenticated
WITH CHECK ((SELECT auth.uid()) = user_id);

CREATE POLICY "Users can remove their own bookmarks"
ON public.bookmarks FOR DELETE TO authenticated
USING ((SELECT auth.uid()) = user_id);

-- 5. Create comments table
CREATE TABLE IF NOT EXISTS public.comments (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    post_id UUID NOT NULL REFERENCES public.blog_posts(id) ON DELETE CASCADE,
    user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
    content TEXT NOT NULL CHECK (char_length(trim(content)) BETWEEN 1 AND 3000),
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

ALTER TABLE public.comments ENABLE ROW LEVEL SECURITY;
GRANT SELECT, INSERT, UPDATE, DELETE ON public.comments TO authenticated;
GRANT SELECT ON public.comments TO anon;

CREATE POLICY "Anyone can read comments on published posts"
ON public.comments FOR SELECT TO anon, authenticated
USING (
    EXISTS (SELECT 1 FROM public.blog_posts p WHERE p.id = comments.post_id AND p.status = 'published')
);

CREATE POLICY "Signed in users can comment on published posts"
ON public.comments FOR INSERT TO authenticated
WITH CHECK (
    (SELECT auth.uid()) = user_id AND
    EXISTS (SELECT 1 FROM public.blog_posts p WHERE p.id = comments.post_id AND p.status = 'published')
);

CREATE POLICY "Users can update their own comments"
ON public.comments FOR UPDATE TO authenticated
USING ((SELECT auth.uid()) = user_id)
WITH CHECK ((SELECT auth.uid()) = user_id);

CREATE POLICY "Users can delete their own comments"
ON public.comments FOR DELETE TO authenticated
USING ((SELECT auth.uid()) = user_id);

-- 6. Create user_roles table
CREATE TABLE IF NOT EXISTS public.user_roles (
    user_id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
    role TEXT NOT NULL DEFAULT 'reader' CHECK (role IN ('reader', 'admin')),
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;
GRANT SELECT ON public.user_roles TO authenticated;

CREATE POLICY "Users can view their own role"
ON public.user_roles FOR SELECT TO authenticated
USING ((SELECT auth.uid()) = user_id);

-- Indexes
CREATE INDEX IF NOT EXISTS comments_post_id_idx ON public.comments (post_id, created_at DESC);
CREATE INDEX IF NOT EXISTS bookmarks_user_id_idx ON public.bookmarks (user_id);
CREATE INDEX IF NOT EXISTS blog_posts_author_id_idx ON public.blog_posts (author_id);
CREATE INDEX IF NOT EXISTS blog_posts_category_idx ON public.blog_posts (category);
`;

  const copySql = () => {
    navigator.clipboard.writeText(fullSqlScript);
    setCopiedSql(true);
    setTimeout(() => setCopiedSql(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in">
      <div className="bg-white dark:bg-stone-900 rounded-2xl max-w-2xl w-full shadow-2xl border border-stone-200 dark:border-stone-800 overflow-hidden max-h-[90vh] flex flex-col transition-colors">
        {/* Header */}
        <div className="bg-stone-900 text-white px-6 py-4 flex items-center justify-between border-b border-stone-800">
          <div className="flex items-center gap-2.5">
            <div className="p-2 bg-emerald-700/80 rounded-lg text-white">
              <Database className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-bold text-base">Supabase (PostgreSQL) Integration</h3>
              <p className="text-xs text-stone-400">Configure authentication, posts, bookmarks & comments</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-stone-400 hover:text-white p-1 rounded-lg hover:bg-stone-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab switch */}
        <div className="flex border-b border-stone-200 dark:border-stone-800 bg-stone-50 dark:bg-stone-800/60 px-6 pt-2">
          <button
            onClick={() => setActiveTab('credentials')}
            className={`px-4 py-2 text-xs font-semibold border-b-2 transition-colors flex items-center gap-1.5 ${
              activeTab === 'credentials'
                ? 'border-emerald-600 text-emerald-800 dark:text-emerald-400 bg-white dark:bg-stone-900 rounded-t-lg'
                : 'border-transparent text-stone-500 dark:text-stone-400 hover:text-stone-800 dark:hover:text-stone-200'
            }`}
          >
            <KeyRound className="w-3.5 h-3.5" />
            API Connection
          </button>
          <button
            onClick={() => setActiveTab('sql')}
            className={`px-4 py-2 text-xs font-semibold border-b-2 transition-colors flex items-center gap-1.5 ${
              activeTab === 'sql'
                ? 'border-emerald-600 text-emerald-800 dark:text-emerald-400 bg-white dark:bg-stone-900 rounded-t-lg'
                : 'border-transparent text-stone-500 dark:text-stone-400 hover:text-stone-800 dark:hover:text-stone-200'
            }`}
          >
            <Database className="w-3.5 h-3.5" />
            SQL Schema Scripts
          </button>
        </div>

        {/* Body */}
        <div className="p-6 overflow-y-auto space-y-5 flex-1">
          {activeTab === 'credentials' ? (
            <>
              <div className="bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800/50 rounded-xl p-4 text-xs text-emerald-950 dark:text-emerald-200 flex items-start gap-3">
                <Sparkles className="w-5 h-5 text-emerald-700 dark:text-emerald-400 shrink-0 mt-0.5" />
                <div className="space-y-1">
                  <p className="font-semibold text-emerald-900 dark:text-emerald-100">
                    Publishable Key Pre-Configured ({anonKey.slice(0, 16)}...)
                  </p>
                  <p className="text-emerald-900/90 dark:text-emerald-200/80 text-[11px] leading-relaxed">
                    Your publishable key is saved. Now, just paste your <strong>Supabase Project URL</strong> below (found in Supabase under <em>Project Settings → API</em>, e.g. <code className="bg-emerald-100/80 dark:bg-emerald-900/60 px-1 py-0.5 rounded font-mono">https://xxxxxxxxxxxx.supabase.co</code>) and click <strong>Connect Database</strong>!
                  </p>
                </div>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-xs font-semibold text-stone-700 dark:text-stone-300 mb-1">
                    Supabase Project URL (e.g. https://your-id.supabase.co)
                  </label>
                  <input
                    type="url"
                    value={url}
                    onChange={(e) => setUrl(e.target.value)}
                    placeholder="https://xyzabcdefghijkl.supabase.co"
                    className="w-full px-3.5 py-2 text-xs border border-stone-300 dark:border-stone-700 bg-white dark:bg-stone-800 text-stone-900 dark:text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-600 font-mono"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-stone-700 dark:text-stone-300 mb-1">
                    Supabase Publishable Anon Key
                  </label>
                  <textarea
                    rows={3}
                    value={anonKey}
                    onChange={(e) => setAnonKey(e.target.value)}
                    placeholder="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
                    className="w-full px-3.5 py-2 text-xs border border-stone-300 dark:border-stone-700 bg-white dark:bg-stone-800 text-stone-900 dark:text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-600 font-mono break-all"
                  />
                  <p className="text-[11px] text-stone-500 dark:text-stone-400 mt-1">
                    * Never provide your service_role secret key here. Only provide the publishable <strong>anon key</strong>.
                  </p>
                </div>

                {testResult && (
                  <div
                    className={`p-3 rounded-lg text-xs flex items-start gap-2 ${
                      testResult.success
                        ? 'bg-emerald-50 text-emerald-900 border border-emerald-200'
                        : 'bg-rose-50 text-rose-900 border border-rose-200'
                    }`}
                  >
                    {testResult.success ? (
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    ) : (
                      <AlertTriangle className="w-4 h-4 text-rose-600 shrink-0 mt-0.5" />
                    )}
                    <span>{testResult.message}</span>
                  </div>
                )}
              </div>
            </>
          ) : (
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold text-stone-700">
                  SQL Editor Query (Tables, RLS & Trigger):
                </span>
                <button
                  onClick={copySql}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-stone-900 hover:bg-black text-white text-xs font-medium rounded-lg transition-colors"
                >
                  {copiedSql ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-emerald-400" />
                      Copied!
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5" />
                      Copy SQL Script
                    </>
                  )}
                </button>
              </div>
              <pre className="p-4 bg-stone-950 text-stone-200 text-[11px] font-mono rounded-xl overflow-x-auto max-h-80 border border-stone-800 leading-relaxed">
                {fullSqlScript}
              </pre>
              <div className="bg-amber-50 border border-amber-200 rounded-lg p-3 text-xs text-amber-900">
                <strong>How to assign yourself the Admin role:</strong>
                <pre className="mt-1 p-2 bg-stone-900 text-stone-200 rounded font-mono text-[10px]">
{`INSERT INTO public.user_roles (user_id, role)
SELECT id, 'admin'
FROM auth.users
WHERE email = 'khawajaahmed704@gmail.com'
ON CONFLICT (user_id)
DO UPDATE SET role = 'admin';`}
                </pre>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="px-6 py-4 bg-stone-50 border-t border-stone-200 flex items-center justify-between">
          <button
            onClick={handleClear}
            className="text-xs text-stone-600 hover:text-stone-900 hover:underline"
          >
            Clear / Revert to Demo Mode
          </button>
          <div className="flex items-center gap-2">
            <button
              onClick={onClose}
              className="px-4 py-2 border border-stone-300 rounded-lg text-xs font-medium text-stone-700 hover:bg-stone-100 transition-colors"
            >
              Close
            </button>
            {activeTab === 'credentials' && (
              <button
                onClick={handleSave}
                disabled={testing}
                className="inline-flex items-center gap-1.5 px-5 py-2 bg-emerald-700 hover:bg-emerald-800 disabled:opacity-50 text-white text-xs font-semibold rounded-lg transition-colors shadow-xs"
              >
                {testing && <RefreshCw className="w-3.5 h-3.5 animate-spin" />}
                Connect Database
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
