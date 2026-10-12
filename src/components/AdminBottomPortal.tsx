import React, { useState } from 'react';
import { Shield, Lock, Mail, ArrowRight, CheckCircle2, AlertCircle, LogOut, ExternalLink, Sparkles } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

interface AdminBottomPortalProps {
  onOpenAdminStudio: () => void;
}

export const AdminBottomPortal: React.FC<AdminBottomPortalProps> = ({ onOpenAdminStudio }) => {
  const { user, profile, role, signIn, signInAsDemoUser, signOut, isConfigured } = useAuth();

  const [adminEmail, setAdminEmail] = useState('khawajaahmed704@gmail.com');
  const [adminPassword, setAdminPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);
  const [showForm, setShowForm] = useState(false);

  const isAdmin = user && role === 'admin';

  const handleAdminCredentialsLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);
    setSuccessMsg(null);

    if (!adminEmail.trim() || !adminPassword.trim()) {
      setErrorMsg('Please enter both administrator email and password.');
      return;
    }

    setLoading(true);
    const { error } = await signIn(adminEmail.trim(), adminPassword);
    setLoading(false);

    if (error) {
      setErrorMsg(error.message);
    } else {
      setSuccessMsg('Admin credentials verified. Opening Admin Studio...');
      setTimeout(() => {
        onOpenAdminStudio();
        setSuccessMsg(null);
      }, 700);
    }
  };

  const handleQuickAdminLogin = async () => {
    setErrorMsg(null);
    setLoading(true);
    await signInAsDemoUser(true);
    setLoading(false);
    setSuccessMsg('Signed in as Administrator!');
    setTimeout(() => {
      onOpenAdminStudio();
      setSuccessMsg(null);
    }, 600);
  };

  return (
    <section className="bg-stone-950 text-stone-200 border-t border-stone-800 py-10 px-4 sm:px-6 transition-colors relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-amber-500/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="bg-stone-900/90 rounded-2xl border border-stone-800 p-6 sm:p-8 shadow-xl">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
            {/* Left Info Column */}
            <div className="lg:col-span-6 space-y-3">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-950/60 border border-amber-700/60 text-amber-300 text-xs font-semibold">
                <Shield className="w-3.5 h-3.5 text-amber-400" />
                Administrative & Staff Access
              </div>

              <h3 className="text-xl sm:text-2xl font-extrabold text-white tracking-tight">
                Administrator Portal
              </h3>

              <p className="text-xs sm:text-sm text-stone-400 leading-relaxed max-w-xl">
                This section is dedicated for administrators to log in and manage the Seven Wonders encyclopedia. 
                From here, authorized editors can publish new articles, review drafts, and maintain database entries.
              </p>

              {isAdmin ? (
                <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-emerald-950/80 border border-emerald-700 text-emerald-300 text-xs font-semibold">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  Currently signed in with full Admin privileges ({profile?.display_name || user?.email})
                </div>
              ) : (
                <div className="text-[11px] text-stone-500">
                  {isConfigured
                    ? 'Connected to Supabase PostgreSQL • Roles checked via public.user_roles'
                    : 'Running in demo mode • Instant admin evaluation available'}
                </div>
              )}
            </div>

            {/* Right Controls Column */}
            <div className="lg:col-span-6">
              {isAdmin ? (
                /* Already logged in as Admin */
                <div className="bg-stone-950/90 border border-stone-800 rounded-xl p-5 space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="text-sm font-bold text-white flex items-center gap-1.5">
                        <Shield className="w-4 h-4 text-amber-400" />
                        Admin Session Active
                      </h4>
                      <p className="text-xs text-stone-400">{user?.email}</p>
                    </div>
                    <span className="px-2 py-0.5 rounded bg-amber-500/20 text-amber-300 text-[10px] font-bold uppercase tracking-wider border border-amber-500/30">
                      Admin
                    </span>
                  </div>

                  <div className="flex flex-wrap items-center gap-3 pt-1">
                    <button
                      onClick={onOpenAdminStudio}
                      className="px-4 py-2.5 bg-emerald-700 hover:bg-emerald-800 text-white rounded-lg text-xs font-bold transition-all shadow-sm flex items-center gap-1.5 cursor-pointer"
                    >
                      <ArrowRight className="w-4 h-4" />
                      Open Admin Content Studio
                    </button>
                    <button
                      onClick={() => signOut()}
                      className="px-3.5 py-2.5 bg-stone-800 hover:bg-stone-700 text-stone-300 rounded-lg text-xs font-semibold transition-colors flex items-center gap-1.5 cursor-pointer"
                    >
                      <LogOut className="w-3.5 h-3.5" />
                      Sign Out
                    </button>
                  </div>
                </div>
              ) : (
                /* Not logged in as Admin */
                <div className="bg-stone-950/90 border border-stone-800 rounded-xl p-5 space-y-4">
                  <div className="flex items-center justify-between">
                    <h4 className="text-sm font-bold text-white flex items-center gap-1.5">
                      <Lock className="w-4 h-4 text-amber-400" />
                      Admin Login
                    </h4>
                    <span className="text-[11px] text-stone-400">
                      Bottom-of-page verification
                    </span>
                  </div>

                  {errorMsg && (
                    <div className="p-3 bg-rose-950/50 border border-rose-800 text-rose-200 rounded-lg text-xs flex items-start gap-2">
                      <AlertCircle className="w-4 h-4 text-rose-400 shrink-0 mt-0.5" />
                      <span>{errorMsg}</span>
                    </div>
                  )}

                  {successMsg && (
                    <div className="p-3 bg-emerald-950/50 border border-emerald-800 text-emerald-200 rounded-lg text-xs flex items-start gap-2">
                      <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                      <span>{successMsg}</span>
                    </div>
                  )}

                  {showForm ? (
                    /* Credentials form */
                    <form onSubmit={handleAdminCredentialsLogin} className="space-y-3">
                      <div>
                        <label className="block text-xs font-semibold text-stone-300 mb-1">
                          Admin Email Address
                        </label>
                        <div className="relative">
                          <Mail className="w-4 h-4 text-stone-400 absolute left-3 top-2.5" />
                          <input
                            type="email"
                            required
                            value={adminEmail}
                            onChange={(e) => setAdminEmail(e.target.value)}
                            placeholder="admin@example.com"
                            className="w-full pl-9 pr-3.5 py-1.5 text-xs bg-stone-900 border border-stone-700 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-xs font-semibold text-stone-300 mb-1">
                          Admin Password
                        </label>
                        <div className="relative">
                          <Lock className="w-4 h-4 text-stone-400 absolute left-3 top-2.5" />
                          <input
                            type="password"
                            required
                            value={adminPassword}
                            onChange={(e) => setAdminPassword(e.target.value)}
                            placeholder="••••••••"
                            className="w-full pl-9 pr-3.5 py-1.5 text-xs bg-stone-900 border border-stone-700 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500"
                          />
                        </div>
                      </div>

                      <div className="flex items-center gap-2 pt-1">
                        <button
                          type="submit"
                          disabled={loading}
                          className="flex-1 py-2 bg-amber-600 hover:bg-amber-700 disabled:opacity-50 text-white text-xs font-bold rounded-lg transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
                        >
                          {loading ? 'Verifying...' : 'Sign In as Admin'}
                        </button>
                        <button
                          type="button"
                          onClick={() => setShowForm(false)}
                          className="py-2 px-3 bg-stone-800 hover:bg-stone-700 text-stone-300 text-xs font-semibold rounded-lg transition-colors cursor-pointer"
                        >
                          Quick Mode
                        </button>
                      </div>
                    </form>
                  ) : (
                    /* 1-Click Fast Admin Mode with option for credentials */
                    <div className="space-y-3">
                      <button
                        type="button"
                        onClick={handleQuickAdminLogin}
                        disabled={loading}
                        className="w-full py-2.5 px-4 bg-gradient-to-r from-amber-600 to-amber-700 hover:from-amber-700 hover:to-amber-800 disabled:opacity-50 text-white text-xs font-bold rounded-xl transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer"
                      >
                        <Shield className="w-4 h-4 text-amber-200" />
                        <span>{loading ? 'Signing in...' : 'Log in as Admin (1-Click)'}</span>
                      </button>

                      <div className="flex items-center justify-between text-xs text-stone-400 pt-1">
                        <span>Have specific Supabase credentials?</span>
                        <button
                          type="button"
                          onClick={() => setShowForm(true)}
                          className="text-amber-400 hover:text-amber-300 underline font-medium cursor-pointer"
                        >
                          Use Email & Password
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
