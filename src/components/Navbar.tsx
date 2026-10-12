import React, { useState } from 'react';
import { 
  Globe2, Bookmark, Shield, User, LogOut, 
  Menu, X, Table2, Search, ChevronDown, 
  Sun, Moon, PenLine 
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useBlog } from '../context/BlogContext';
import { useTheme } from '../context/ThemeContext';

interface NavbarProps {
  currentTab: string;
  onSelectTab: (tab: string) => void;
  onOpenAuth: (mode?: 'signin' | 'signup') => void;
  onOpenProfile: () => void;
  onOpenSupabaseConfig?: () => void;
  onOpenWriteModal: () => void;
  onOpenAboutDeveloper: (tab?: 'about' | 'contact') => void;
  searchQuery: string;
  onSearchChange: (q: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentTab,
  onSelectTab,
  onOpenAuth,
  onOpenProfile,
  onOpenSupabaseConfig,
  onOpenWriteModal,
  onOpenAboutDeveloper,
  searchQuery,
  onSearchChange,
}) => {
  const { user, profile, role, signOut, isConfigured } = useAuth();
  const { bookmarks } = useBlog();
  const { theme, toggleTheme } = useTheme();

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);

  const navLinks = [
    { id: 'all', label: 'All Articles' },
    { id: 'new-wonders', label: 'New 7 Wonders' },
    { id: 'ancient-wonders', label: 'Ancient Wonders' },
    { id: 'comparison', label: 'Comparison', icon: Table2 },
    { id: 'bookmarks', label: 'Saved', count: bookmarks.length, icon: Bookmark },
    { id: 'about-developer', label: 'About Me', icon: User, isSpecial: true },
    { id: 'admin', label: 'Admin Studio', icon: Shield, badge: role === 'admin' ? 'Admin' : undefined },
  ];

  return (
    <header className="sticky top-0 z-40 bg-white dark:bg-stone-900 border-b border-stone-200 dark:border-stone-800 shadow-2xs transition-colors">
      {/* Top Database Status Bar */}
      <div className="bg-stone-900 dark:bg-black text-stone-300 text-[11px] px-4 py-1.5 flex items-center justify-between border-b border-stone-800">
        <div className="flex items-center gap-2 max-w-7xl mx-auto w-full justify-between">
          <div className="flex items-center gap-2">
            <span className="flex h-2 w-2 relative">
              <span
                className={`animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 ${
                  isConfigured ? 'bg-emerald-400' : 'bg-amber-400'
                }`}
              ></span>
              <span
                className={`relative inline-flex rounded-full h-2 w-2 ${
                  isConfigured ? 'bg-emerald-500' : 'bg-amber-500'
                }`}
              ></span>
            </span>
            <span className="text-stone-300">
              {isConfigured ? (
                <span>
                  Supabase Database: <strong className="text-emerald-400">Connected & Synced</strong>
                </span>
              ) : (
                <span>
                  Database: <strong className="text-amber-300">Responsive Demo Mode</strong>
                </span>
              )}
            </span>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => onOpenAboutDeveloper('about')}
              className="text-stone-300 hover:text-white underline cursor-pointer"
            >
              About Developer
            </button>
            <span className="hidden sm:inline text-stone-500">|</span>
            <button
              onClick={() => onOpenAboutDeveloper('contact')}
              className="text-stone-300 hover:text-white underline cursor-pointer"
            >
              Contact
            </button>
          </div>
        </div>
      </div>

      {/* Main Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3">
        <div className="flex items-center justify-between gap-3 sm:gap-4">
          {/* Logo & Brand */}
          <div
            onClick={() => onSelectTab('all')}
            className="flex items-center gap-2.5 sm:gap-3 cursor-pointer select-none group shrink-0"
          >
            <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-emerald-700 text-white flex items-center justify-center shadow-xs group-hover:bg-emerald-800 transition-colors">
              <Globe2 className="w-5 h-5 sm:w-6 sm:h-6 text-emerald-100" />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="font-extrabold text-base sm:text-lg text-stone-900 dark:text-white tracking-tight leading-tight">
                  Seven Wonders
                </span>
                <span className="text-[10px] font-bold px-1.5 py-0.2 rounded bg-stone-100 dark:bg-stone-800 text-stone-700 dark:text-stone-300 font-mono">
                  W3
                </span>
              </div>
              <p className="text-[11px] text-stone-500 dark:text-stone-400 hidden sm:block">
                Ancient & Modern Heritage Blog
              </p>
            </div>
          </div>

          {/* Quick Search Bar */}
          <div className="hidden md:flex items-center flex-1 max-w-xs relative mx-2">
            <Search className="w-4 h-4 text-stone-400 absolute left-3 top-2.5" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              placeholder="Search wonders, topics, eras..."
              className="w-full pl-9 pr-3.5 py-1.5 text-xs bg-stone-50 dark:bg-stone-800/80 border border-stone-200 dark:border-stone-700 text-stone-900 dark:text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-600 focus:bg-white dark:focus:bg-stone-800 placeholder:text-stone-400"
            />
          </div>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-1">
            {navLinks.map((item) => {
              const active = currentTab === item.id;
              const Icon = item.icon;

              return (
                <button
                  key={item.id}
                  onClick={() => onSelectTab(item.id)}
                  className={`px-2.5 py-1.5 rounded-lg text-xs font-semibold transition-all flex items-center gap-1.5 ${
                    active
                      ? 'bg-stone-900 dark:bg-emerald-700 text-white shadow-2xs'
                      : 'text-stone-600 dark:text-stone-300 hover:text-stone-900 dark:hover:text-white hover:bg-stone-100 dark:hover:bg-stone-800'
                  }`}
                >
                  {Icon && <Icon className="w-3.5 h-3.5" />}
                  <span>{item.label}</span>
                  {item.count !== undefined && item.count > 0 && (
                    <span
                      className={`text-[10px] px-1.5 py-0.2 rounded-full font-bold ${
                        active ? 'bg-amber-400 text-stone-900' : 'bg-amber-100 text-amber-900'
                      }`}
                    >
                      {item.count}
                    </span>
                  )}
                  {item.badge && (
                    <span className="text-[9px] px-1.5 py-0.2 rounded bg-amber-400 text-stone-950 font-bold uppercase">
                      {item.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </nav>

          {/* Right Header Controls: Write Something Button + Theme Switcher + Auth */}
          <div className="flex items-center gap-1.5 sm:gap-2">
            {/* "Write Something" Button */}
            <button
              onClick={onOpenWriteModal}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-emerald-700 hover:bg-emerald-800 text-white text-xs font-bold rounded-lg transition-all shadow-xs hover:shadow-sm"
              title="Write a topic explanation or story"
            >
              <PenLine className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Write Something</span>
              <span className="sm:hidden">Write</span>
            </button>

            {/* Theme Toggle (Light / Dark) */}
            <button
              onClick={toggleTheme}
              aria-label="Toggle color theme"
              className="p-2 rounded-lg text-stone-600 dark:text-stone-300 hover:bg-stone-100 dark:hover:bg-stone-800 transition-colors border border-stone-200 dark:border-stone-700 flex items-center justify-center"
              title={theme === 'dark' ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
            >
              {theme === 'dark' ? (
                <Sun className="w-4 h-4 text-amber-400" />
              ) : (
                <Moon className="w-4 h-4 text-stone-600" />
              )}
            </button>

            {/* User Auth & Dropdown */}
            {user ? (
              <div className="relative">
                <button
                  onClick={() => setUserDropdownOpen(!userDropdownOpen)}
                  className="flex items-center gap-1.5 p-1 pl-1.5 rounded-xl hover:bg-stone-100 dark:hover:bg-stone-800 transition-colors border border-stone-200 dark:border-stone-700"
                >
                  <img
                    src={
                      profile?.avatar_url ||
                      `https://api.dicebear.com/7.x/bottts/svg?seed=${user.email}`
                    }
                    alt="User Avatar"
                    className="w-7 h-7 rounded-full object-cover border border-stone-300 dark:border-stone-600"
                  />
                  <ChevronDown className="w-3.5 h-3.5 text-stone-400" />
                </button>

                {/* Dropdown Menu */}
                {userDropdownOpen && (
                  <div className="absolute right-0 mt-2 w-56 bg-white dark:bg-stone-800 rounded-xl shadow-xl border border-stone-200 dark:border-stone-700 py-1.5 z-50 text-xs animate-in fade-in">
                    <div className="px-3.5 py-2 border-b border-stone-100 dark:border-stone-700">
                      <p className="font-bold text-stone-900 dark:text-white truncate">
                        {profile?.display_name || 'Wonder Explorer'}
                      </p>
                      <p className="text-[11px] text-stone-500 dark:text-stone-400 truncate">
                        {user.email}
                      </p>
                      <span className="inline-block mt-1 text-[10px] font-bold uppercase tracking-wider px-1.5 py-0.2 bg-emerald-100 dark:bg-emerald-900/60 text-emerald-800 dark:text-emerald-300 rounded">
                        {role === 'admin' ? 'Administrator' : 'Reader Member'}
                      </span>
                    </div>

                    <button
                      onClick={() => {
                        setUserDropdownOpen(false);
                        onOpenWriteModal();
                      }}
                      className="w-full px-3.5 py-2 text-left text-emerald-700 dark:text-emerald-400 font-medium hover:bg-stone-50 dark:hover:bg-stone-700/50 flex items-center gap-2"
                    >
                      <PenLine className="w-4 h-4" />
                      Write Something
                    </button>

                    <button
                      onClick={() => {
                        setUserDropdownOpen(false);
                        onOpenProfile();
                      }}
                      className="w-full px-3.5 py-2 text-left text-stone-700 dark:text-stone-200 hover:bg-stone-50 dark:hover:bg-stone-700/50 flex items-center gap-2"
                    >
                      <User className="w-4 h-4 text-stone-400" />
                      Account Profile
                    </button>

                    <button
                      onClick={() => {
                        setUserDropdownOpen(false);
                        onSelectTab('bookmarks');
                      }}
                      className="w-full px-3.5 py-2 text-left text-stone-700 dark:text-stone-200 hover:bg-stone-50 dark:hover:bg-stone-700/50 flex items-center gap-2"
                    >
                      <Bookmark className="w-4 h-4 text-stone-400" />
                      Saved Articles ({bookmarks.length})
                    </button>

                    <button
                      onClick={() => {
                        setUserDropdownOpen(false);
                        onSelectTab('admin');
                      }}
                      className="w-full px-3.5 py-2 text-left text-stone-700 dark:text-stone-200 hover:bg-stone-50 dark:hover:bg-stone-700/50 flex items-center gap-2"
                    >
                      <Shield className="w-4 h-4 text-amber-500" />
                      Admin Studio
                    </button>

                    <div className="border-t border-stone-100 dark:border-stone-700 my-1"></div>

                    <button
                      onClick={() => {
                        setUserDropdownOpen(false);
                        signOut();
                      }}
                      className="w-full px-3.5 py-2 text-left text-rose-600 dark:text-rose-400 hover:bg-rose-50 dark:hover:bg-rose-950/30 flex items-center gap-2"
                    >
                      <LogOut className="w-4 h-4" />
                      Sign Out
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <div className="flex items-center gap-1.5">
                <button
                  onClick={() => onOpenAuth('signin')}
                  className="px-2.5 py-1.5 text-xs font-semibold text-stone-700 dark:text-stone-300 hover:text-stone-900 dark:hover:text-white hover:bg-stone-100 dark:hover:bg-stone-800 rounded-lg transition-colors"
                >
                  Sign In
                </button>
                <button
                  onClick={() => onOpenAuth('signup')}
                  className="hidden sm:inline-block px-3 py-1.5 text-xs font-bold bg-stone-900 dark:bg-stone-800 hover:bg-stone-800 dark:hover:bg-stone-700 text-white rounded-lg transition-colors border border-stone-700"
                >
                  Sign Up
                </button>
              </div>
            )}

            {/* Mobile menu trigger */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-1.5 rounded-lg text-stone-600 dark:text-stone-300 hover:bg-stone-100 dark:hover:bg-stone-800"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Dropdown */}
        {mobileMenuOpen && (
          <div className="lg:hidden pt-3 mt-3 border-t border-stone-200 dark:border-stone-800 space-y-2">
            <div className="relative mb-2">
              <Search className="w-4 h-4 text-stone-400 absolute left-3 top-2.5" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => onSearchChange(e.target.value)}
                placeholder="Search wonders..."
                className="w-full pl-9 pr-3.5 py-1.5 text-xs bg-stone-50 dark:bg-stone-800 border border-stone-200 dark:border-stone-700 text-stone-900 dark:text-white rounded-lg"
              />
            </div>
            {navLinks.map((item) => (
              <button
                key={item.id}
                onClick={() => {
                  onSelectTab(item.id);
                  setMobileMenuOpen(false);
                }}
                className={`w-full text-left px-3 py-2 rounded-lg text-xs font-semibold flex items-center justify-between ${
                  currentTab === item.id 
                    ? 'bg-stone-900 dark:bg-emerald-700 text-white' 
                    : 'text-stone-700 dark:text-stone-300 hover:bg-stone-100 dark:hover:bg-stone-800'
                }`}
              >
                <span>{item.label}</span>
                {item.count !== undefined && item.count > 0 && (
                  <span className="text-[10px] px-2 py-0.5 rounded-full bg-amber-400 text-stone-900 font-bold">
                    {item.count}
                  </span>
                )}
              </button>
            ))}
          </div>
        )}
      </div>
    </header>
  );
};
