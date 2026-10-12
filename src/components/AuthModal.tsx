import React, { useState } from 'react';
import { X, Mail, Lock, User as UserIcon, Shield, AlertCircle, CheckCircle, ArrowRight, Sparkles } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialMode?: 'signin' | 'signup';
}

export const AuthModal: React.FC<AuthModalProps> = ({
  isOpen,
  onClose,
  initialMode = 'signin',
}) => {
  const { signIn, signUp, resetPassword, signInAsDemoUser, isConfigured } = useAuth();
  const [mode, setMode] = useState<'signin' | 'signup' | 'reset'>(initialMode);

  // Form states
  const [displayName, setDisplayName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  // UI status
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);
    setSuccessMessage(null);

    // Validation
    if (mode === 'signup') {
      if (!displayName.trim()) {
        setErrorMessage('Please enter your full name or display name.');
        return;
      }
      if (!email.trim() || !email.includes('@')) {
        setErrorMessage('Please enter a valid email address.');
        return;
      }
      if (password.length < 6) {
        setErrorMessage('Password must be at least 6 characters long.');
        return;
      }
      if (password !== confirmPassword) {
        setErrorMessage('Passwords do not match. Please re-enter.');
        return;
      }

      setLoading(true);
      const { error, needsEmailConfirmation } = await signUp(email, password, displayName);
      setLoading(false);

      if (error) {
        setErrorMessage(error.message);
      } else {
        if (needsEmailConfirmation) {
          setSuccessMessage(
            'Account created! A confirmation link was sent to your email. Please verify before signing in.'
          );
        } else {
          setSuccessMessage('Welcome! Your account and profile have been created successfully.');
          setTimeout(() => {
            onClose();
          }, 1200);
        }
      }
    } else if (mode === 'signin') {
      if (!email.trim() || !password) {
        setErrorMessage('Please provide both your email and password.');
        return;
      }

      setLoading(true);
      const { error } = await signIn(email, password);
      setLoading(false);

      if (error) {
        setErrorMessage(error.message);
      } else {
        setSuccessMessage('Signed in successfully!');
        setTimeout(() => {
          onClose();
        }, 800);
      }
    } else if (mode === 'reset') {
      if (!email.trim() || !email.includes('@')) {
        setErrorMessage('Please enter your valid email address to receive reset instructions.');
        return;
      }

      setLoading(true);
      const { error } = await resetPassword(email);
      setLoading(false);

      if (error) {
        setErrorMessage(error.message);
      } else {
        setSuccessMessage('Password reset link sent to your email! Follow the link to choose a new password.');
      }
    }
  };

  const handleDemoSignIn = (asAdmin: boolean) => {
    signInAsDemoUser(asAdmin);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in">
      <div className="bg-white dark:bg-stone-900 rounded-2xl max-w-md w-full shadow-2xl border border-stone-200 dark:border-stone-800 overflow-hidden transition-colors">
        {/* Header */}
        <div className="bg-stone-900 text-white px-6 py-5 flex items-center justify-between">
          <div>
            <div className="flex items-center gap-2">
              <span className="font-bold text-lg tracking-tight">Seven Wonders</span>
              <span className="text-[11px] bg-emerald-800 text-emerald-200 px-2 py-0.5 rounded font-medium">
                Auth
              </span>
            </div>
            <p className="text-xs text-stone-400 mt-0.5">
              {mode === 'signup'
                ? 'Join our heritage blogging community'
                : mode === 'signin'
                ? 'Sign in to bookmark and comment'
                : 'Reset your account password'}
            </p>
          </div>
          <button
            onClick={onClose}
            className="text-stone-400 hover:text-white p-1 rounded-lg hover:bg-stone-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab switchers */}
        {mode !== 'reset' && (
          <div className="flex border-b border-stone-200 dark:border-stone-800 bg-stone-50 dark:bg-stone-800/50">
            <button
              onClick={() => {
                setMode('signin');
                setErrorMessage(null);
                setSuccessMessage(null);
              }}
              className={`flex-1 py-3 text-xs font-semibold text-center border-b-2 transition-colors ${
                mode === 'signin'
                  ? 'border-emerald-700 text-emerald-800 dark:text-emerald-400 bg-white dark:bg-stone-900'
                  : 'border-transparent text-stone-500 dark:text-stone-400 hover:text-stone-800 dark:hover:text-stone-200'
              }`}
            >
              Sign In
            </button>
            <button
              onClick={() => {
                setMode('signup');
                setErrorMessage(null);
                setSuccessMessage(null);
              }}
              className={`flex-1 py-3 text-xs font-semibold text-center border-b-2 transition-colors ${
                mode === 'signup'
                  ? 'border-emerald-700 text-emerald-800 dark:text-emerald-400 bg-white dark:bg-stone-900'
                  : 'border-transparent text-stone-500 dark:text-stone-400 hover:text-stone-800 dark:hover:text-stone-200'
              }`}
            >
              Create Account
            </button>
          </div>
        )}

        <div className="p-6">
          {/* Quick Reader Mode */}
          <div className="mb-5 p-3 bg-stone-50 dark:bg-stone-800/60 rounded-xl border border-stone-200 dark:border-stone-700 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
              <div>
                <span className="text-xs font-semibold text-stone-800 dark:text-stone-200 block">
                  Quick Reader Mode
                </span>
                <span className="text-[11px] text-stone-500 dark:text-stone-400">
                  Explore and test bookmarks as a reader
                </span>
              </div>
            </div>
            <button
              type="button"
              onClick={() => handleDemoSignIn(false)}
              className="py-1.5 px-3 bg-white dark:bg-stone-800 border border-stone-300 dark:border-stone-700 hover:border-emerald-600 rounded-lg text-xs font-medium text-stone-700 dark:text-stone-200 transition-colors cursor-pointer shadow-2xs"
            >
              Continue as Reader
            </button>
          </div>

          <div className="relative flex py-2 items-center mb-4">
            <div className="flex-grow border-t border-stone-200 dark:border-stone-800"></div>
            <span className="shrink-0 mx-3 text-[11px] text-stone-400 font-medium">Or using credentials</span>
            <div className="flex-grow border-t border-stone-200 dark:border-stone-800"></div>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            {mode === 'signup' && (
              <div>
                <label className="block text-xs font-semibold text-stone-700 dark:text-stone-300 mb-1">
                  Full Display Name
                </label>
                <div className="relative">
                  <UserIcon className="w-4 h-4 text-stone-400 absolute left-3 top-2.5" />
                  <input
                    type="text"
                    required
                    value={displayName}
                    onChange={(e) => setDisplayName(e.target.value)}
                    placeholder="e.g. Maya Chen"
                    className="w-full pl-9 pr-3.5 py-2 text-xs border border-stone-300 dark:border-stone-700 bg-white dark:bg-stone-800 text-stone-900 dark:text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-600"
                  />
                </div>
              </div>
            )}

            <div>
              <label className="block text-xs font-semibold text-stone-700 dark:text-stone-300 mb-1">Email Address</label>
              <div className="relative">
                <Mail className="w-4 h-4 text-stone-400 absolute left-3 top-2.5" />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="your.email@example.com"
                  className="w-full pl-9 pr-3.5 py-2 text-xs border border-stone-300 dark:border-stone-700 bg-white dark:bg-stone-800 text-stone-900 dark:text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-600"
                />
              </div>
            </div>

            {mode !== 'reset' && (
              <div>
                <div className="flex items-center justify-between mb-1">
                  <label className="text-xs font-semibold text-stone-700 dark:text-stone-300">Password</label>
                  {mode === 'signin' && (
                    <button
                      type="button"
                      onClick={() => {
                        setMode('reset');
                        setErrorMessage(null);
                        setSuccessMessage(null);
                      }}
                      className="text-[11px] text-emerald-800 dark:text-emerald-400 hover:text-emerald-950 dark:hover:text-emerald-300 underline"
                    >
                      Forgot?
                    </button>
                  )}
                </div>
                <div className="relative">
                  <Lock className="w-4 h-4 text-stone-400 absolute left-3 top-2.5" />
                  <input
                    type="password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    className="w-full pl-9 pr-3.5 py-2 text-xs border border-stone-300 dark:border-stone-700 bg-white dark:bg-stone-800 text-stone-900 dark:text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-600"
                  />
                </div>
              </div>
            )}

            {mode === 'signup' && (
              <div>
                <label className="block text-xs font-semibold text-stone-700 dark:text-stone-300 mb-1">
                  Confirm Password
                </label>
                <div className="relative">
                  <Lock className="w-4 h-4 text-stone-400 absolute left-3 top-2.5" />
                  <input
                    type="password"
                    required
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    placeholder="••••••••"
                    className="w-full pl-9 pr-3.5 py-2 text-xs border border-stone-300 dark:border-stone-700 bg-white dark:bg-stone-800 text-stone-900 dark:text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-600"
                  />
                </div>
              </div>
            )}

            {/* Error & Success alerts */}
            {errorMessage && (
              <div className="p-3 bg-rose-50 border border-rose-200 text-rose-900 rounded-lg text-xs flex items-start gap-2">
                <AlertCircle className="w-4 h-4 text-rose-600 shrink-0 mt-0.5" />
                <span>{errorMessage}</span>
              </div>
            )}

            {successMessage && (
              <div className="p-3 bg-emerald-50 border border-emerald-200 text-emerald-900 rounded-lg text-xs flex items-start gap-2">
                <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <span>{successMessage}</span>
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full py-2.5 bg-emerald-700 hover:bg-emerald-800 disabled:opacity-50 text-white text-xs font-bold rounded-lg transition-colors shadow-xs flex items-center justify-center gap-1.5"
            >
              {loading ? (
                'Processing...'
              ) : mode === 'signup' ? (
                <>
                  Create Account <ArrowRight className="w-3.5 h-3.5" />
                </>
              ) : mode === 'signin' ? (
                'Sign In to Seven Wonders'
              ) : (
                'Send Password Reset Email'
              )}
            </button>
          </form>

          {mode === 'reset' && (
            <button
              type="button"
              onClick={() => {
                setMode('signin');
                setErrorMessage(null);
                setSuccessMessage(null);
              }}
              className="mt-4 w-full text-center text-xs text-stone-600 hover:text-stone-900"
            >
              ← Back to Sign In
            </button>
          )}

          <div className="mt-5 pt-4 border-t border-stone-200 text-center">
            <span className="text-[11px] text-stone-500">
              {isConfigured
                ? 'Secured with Supabase Auth & PostgreSQL Row Level Security'
                : 'Supabase integration ready (Running in responsive mode)'}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
