import React, { useState, useMemo } from 'react';
import { ThemeProvider } from './context/ThemeContext';
import { AuthProvider, useAuth } from './context/AuthContext';
import { BlogProvider, useBlog } from './context/BlogContext';
import { Navbar } from './components/Navbar';
import { PostCard } from './components/PostCard';
import { PostDetail } from './components/PostDetail';
import { ComparisonTable } from './components/ComparisonTable';
import { BookmarksView } from './components/BookmarksView';
import { AdminDashboard } from './components/AdminDashboard';
import { SponsorSidebar } from './components/SponsorSidebar';
import { AuthModal } from './components/AuthModal';
import { UserProfileModal } from './components/UserProfileModal';
import { SupabaseConfigModal } from './components/SupabaseConfigModal';
import { WriteModal } from './components/WriteModal';
import { AboutDeveloperModal } from './components/AboutDeveloperModal';
import { AboutDeveloperSection } from './components/AboutDeveloperSection';
import { AdminBottomPortal } from './components/AdminBottomPortal';
import { Footer } from './components/Footer';
import { BlogPost } from './types/database';
import { 
  Sparkles, Compass, Filter, 
  MapPin, BookOpen, Layers, ArrowRight, PenLine 
} from 'lucide-react';

function MainApp() {
  const { posts, loadingPosts, refreshPosts } = useBlog();
  const { user } = useAuth();

  // Navigation & state
  const [currentTab, setCurrentTab] = useState<string>('all');
  const [selectedPost, setSelectedPost] = useState<BlogPost | null>(null);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');

  // Modals
  const [authModalOpen, setAuthModalOpen] = useState(false);
  const [authModalMode, setAuthModalMode] = useState<'signin' | 'signup'>('signin');
  const [profileModalOpen, setProfileModalOpen] = useState(false);
  const [supabaseConfigOpen, setSupabaseConfigOpen] = useState(false);
  const [writeModalOpen, setWriteModalOpen] = useState(false);
  const [aboutDeveloperOpen, setAboutDeveloperOpen] = useState(false);
  const [aboutDeveloperTab, setAboutDeveloperTab] = useState<'about' | 'contact'>('about');

  // Filter posts based on currentTab, selectedCategory, and searchQuery
  const filteredPosts = useMemo(() => {
    return posts.filter((post) => {
      // Tab filter
      if (currentTab === 'new-wonders' && post.category !== 'New 7 Wonders') {
        return false;
      }
      if (currentTab === 'ancient-wonders' && post.category !== 'Ancient Wonders') {
        return false;
      }

      // Category / Pill filter
      if (selectedCategory !== 'All' && post.category !== selectedCategory) {
        return false;
      }

      // Search query
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchesTitle = post.title.toLowerCase().includes(q);
        const matchesExcerpt = post.excerpt?.toLowerCase().includes(q) || false;
        const matchesContent = post.content.toLowerCase().includes(q);
        const matchesCountry = post.country?.toLowerCase().includes(q) || false;
        const matchesTags = post.tags?.some((t) => t.toLowerCase().includes(q)) || false;

        return matchesTitle || matchesExcerpt || matchesContent || matchesCountry || matchesTags;
      }

      return true;
    });
  }, [posts, currentTab, selectedCategory, searchQuery]);

  const handleOpenAuth = (mode: 'signin' | 'signup' = 'signin') => {
    setAuthModalMode(mode);
    setAuthModalOpen(true);
  };

  const handleSelectWonderBySlug = (slug: string) => {
    const found = posts.find((p) => p.slug === slug);
    if (found) {
      setSelectedPost(found);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      setCurrentTab('all');
      setSearchQuery(slug.replace(/-/g, ' '));
    }
  };

  const handlePostCreated = (newPost: BlogPost) => {
    setSelectedPost(newPost);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const categories = ['All', 'New 7 Wonders', 'Ancient Wonders', 'History', 'Architecture'];

  return (
    <div className="min-h-screen bg-stone-100/70 dark:bg-stone-950 text-stone-900 dark:text-stone-100 flex flex-col font-sans selection:bg-emerald-200 dark:selection:bg-emerald-900 transition-colors">
      {/* Navbar with Dark Mode Toggle & Write Button */}
      <Navbar
        currentTab={currentTab}
        onSelectTab={(tab) => {
          setSelectedPost(null);
          setCurrentTab(tab);
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        onOpenAuth={handleOpenAuth}
        onOpenProfile={() => setProfileModalOpen(true)}
        onOpenSupabaseConfig={() => setSupabaseConfigOpen(true)}
        onOpenWriteModal={() => setWriteModalOpen(true)}
        onOpenAboutDeveloper={(tab = 'about') => {
          setAboutDeveloperTab(tab);
          setAboutDeveloperOpen(true);
        }}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
      />

      {/* Hero Banner (Only shown on post lists and home view) */}
      {!selectedPost && (currentTab === 'all' || currentTab === 'new-wonders' || currentTab === 'ancient-wonders') && (
        <section className="bg-stone-900 dark:bg-black text-white border-b border-stone-800 relative overflow-hidden">
          {/* Subtle background glow */}
          <div className="absolute inset-0 opacity-20 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-emerald-500 via-transparent to-transparent pointer-events-none" />

          <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10 sm:py-14 relative z-10">
            <div className="max-w-3xl space-y-4">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-950/80 border border-emerald-700/60 text-emerald-300 text-xs font-semibold">
                <Sparkles className="w-3.5 h-3.5" />
                Seven Wonders Heritage Platform • PostgreSQL Supabase Sync
              </div>

              <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight leading-tight">
                {currentTab === 'new-wonders'
                  ? 'The New Seven Wonders of the World'
                  : currentTab === 'ancient-wonders'
                  ? 'The Seven Wonders of the Ancient World'
                  : 'Chronicles of the Seven Wonders'}
              </h1>

              <p className="text-stone-300 text-sm sm:text-base leading-relaxed">
                {currentTab === 'new-wonders'
                  ? 'Elected by over 100 million votes in 2007: from the high Andes of Machu Picchu and the rose sandstone of Petra, to the marble dome of the Taj Mahal.'
                  : currentTab === 'ancient-wonders'
                  ? 'The classical Hellenistic canonical marvels of human ingenuity, led by the surviving Great Pyramid of Giza and the legends of Babylon.'
                  : 'Explore in-depth architectural analyses, archaeological histories, and travel guides for both the New Seven Wonders and the Ancient Seven Wonders of Antiquity.'}
              </p>

              {/* Quick Jump & Action Buttons */}
              <div className="flex flex-wrap items-center gap-2.5 pt-2">
                <button
                  onClick={() => setWriteModalOpen(true)}
                  className="px-4 py-2 bg-emerald-700 hover:bg-emerald-800 text-white rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 shadow-sm hover:shadow-md cursor-pointer"
                >
                  <PenLine className="w-4 h-4" />
                  Write Something
                </button>

                <button
                  onClick={() => {
                    setCurrentTab('comparison');
                    setSelectedPost(null);
                  }}
                  className="px-4 py-2 bg-stone-800 hover:bg-stone-700 text-white rounded-lg text-xs font-bold transition-colors flex items-center gap-1.5 shadow-sm cursor-pointer"
                >
                  <Compass className="w-4 h-4" />
                  View Comparison Table
                </button>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Main Content Area with Side Sponsored Area */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 py-8 flex-1 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Main Column (8 cols on large screens) */}
          <div className="lg:col-span-8 space-y-6">
            {/* View 1: Selected Post Detail */}
            {selectedPost ? (
              <PostDetail
                post={selectedPost}
                onBack={() => setSelectedPost(null)}
                onAuthRequired={() => handleOpenAuth('signin')}
              />
            ) : currentTab === 'comparison' ? (
              /* View 2: Comparison Table */
              <ComparisonTable onSelectWonder={handleSelectWonderBySlug} />
            ) : currentTab === 'bookmarks' ? (
              /* View 3: Saved Bookmarks */
              <BookmarksView
                onSelectPost={(post) => setSelectedPost(post)}
                onExplorePosts={() => {
                  setCurrentTab('all');
                  setSelectedPost(null);
                }}
                onAuthRequired={() => handleOpenAuth('signin')}
              />
            ) : currentTab === 'about-developer' || currentTab === 'contact' ? (
              /* View 4: About Developer & Contact Profile */
              <AboutDeveloperSection
                initialTab={currentTab === 'contact' ? 'contact' : 'about'}
                onBackToArticles={() => {
                  setCurrentTab('all');
                  setSelectedPost(null);
                }}
              />
            ) : currentTab === 'admin' ? (
              /* View 5: Admin Studio */
              <AdminDashboard
                onSelectPost={(post) => setSelectedPost(post)}
                onOpenSupabaseConfig={() => setSupabaseConfigOpen(true)}
              />
            ) : (
              /* View 6: Article Listing (All / New / Ancient) */
              <div className="space-y-6">
                {/* Filter and Results bar */}
                <div className="flex flex-wrap items-center justify-between gap-3 bg-white dark:bg-stone-900 p-3.5 rounded-xl border border-stone-200 dark:border-stone-800 shadow-2xs">
                  <div className="flex items-center gap-1.5 overflow-x-auto py-0.5">
                    <span className="text-xs font-bold text-stone-500 dark:text-stone-400 mr-1 flex items-center gap-1">
                      <Filter className="w-3.5 h-3.5" />
                      Filter:
                    </span>
                    {categories.map((cat) => (
                      <button
                        key={cat}
                        onClick={() => setSelectedCategory(cat)}
                        className={`px-3 py-1 rounded-lg text-xs font-semibold whitespace-nowrap transition-colors ${
                          selectedCategory === cat
                            ? 'bg-stone-900 dark:bg-emerald-700 text-white'
                            : 'bg-stone-100 dark:bg-stone-800 text-stone-600 dark:text-stone-300 hover:bg-stone-200 dark:hover:bg-stone-700'
                        }`}
                      >
                        {cat}
                      </button>
                    ))}
                  </div>

                  <div className="flex items-center gap-3">
                    <span className="text-xs text-stone-500 dark:text-stone-400 font-medium">
                      Showing <strong>{filteredPosts.length}</strong> wonder guides
                    </span>
                    <button
                      onClick={() => setWriteModalOpen(true)}
                      className="text-xs font-semibold text-emerald-700 dark:text-emerald-400 hover:underline flex items-center gap-1 cursor-pointer"
                    >
                      <PenLine className="w-3 h-3" />
                      Add Topic
                    </button>
                  </div>
                </div>

                {/* Article Cards Grid */}
                {loadingPosts ? (
                  <div className="py-20 text-center text-xs text-stone-400">
                    Loading heritage blog posts...
                  </div>
                ) : filteredPosts.length === 0 ? (
                  <div className="bg-white dark:bg-stone-900 rounded-2xl border border-stone-200 dark:border-stone-800 p-12 text-center space-y-3">
                    <Compass className="w-10 h-10 text-stone-400 mx-auto" />
                    <h3 className="text-base font-bold text-stone-800 dark:text-stone-200">No articles found</h3>
                    <p className="text-xs text-stone-500 dark:text-stone-400">
                      Try searching for a different keyword or resetting your filters.
                    </p>
                    <div className="flex items-center justify-center gap-2 pt-2">
                      <button
                        onClick={() => {
                          setSearchQuery('');
                          setSelectedCategory('All');
                          setCurrentTab('all');
                        }}
                        className="px-4 py-2 bg-stone-900 dark:bg-stone-800 text-white rounded-lg text-xs font-medium cursor-pointer"
                      >
                        Clear Filters
                      </button>
                      <button
                        onClick={() => setWriteModalOpen(true)}
                        className="px-4 py-2 bg-emerald-700 hover:bg-emerald-800 text-white rounded-lg text-xs font-medium cursor-pointer"
                      >
                        Write First Topic
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    {filteredPosts.map((post) => (
                      <PostCard
                        key={post.id}
                        post={post}
                        onSelect={(p) => {
                          setSelectedPost(p);
                          window.scrollTo({ top: 0, behavior: 'smooth' });
                        }}
                        onAuthRequired={() => handleOpenAuth('signin')}
                      />
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Right Column: Sponsor & Ads Column (4 cols on large screens) */}
          <div className="lg:col-span-4">
            <div className="sticky top-20">
              <SponsorSidebar onSelectWonder={handleSelectWonderBySlug} />
            </div>
          </div>
        </div>
      </main>

      {/* Bottom Admin Portal Section */}
      <AdminBottomPortal
        onOpenAdminStudio={() => {
          setSelectedPost(null);
          setCurrentTab('admin');
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
      />

      {/* Footer */}
      <Footer
        onSelectTab={(tab) => {
          setSelectedPost(null);
          setCurrentTab(tab);
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        onOpenSupabaseConfig={() => setSupabaseConfigOpen(true)}
        onOpenAboutDeveloper={(tab = 'about') => {
          setAboutDeveloperTab(tab);
          setAboutDeveloperOpen(true);
        }}
      />

      {/* Modals */}
      <AboutDeveloperModal
        isOpen={aboutDeveloperOpen}
        onClose={() => setAboutDeveloperOpen(false)}
        initialTab={aboutDeveloperTab}
      />

      <WriteModal
        isOpen={writeModalOpen}
        onClose={() => setWriteModalOpen(false)}
        onPostCreated={handlePostCreated}
        onAuthRequired={() => {
          setWriteModalOpen(false);
          handleOpenAuth('signin');
        }}
      />

      <AuthModal
        isOpen={authModalOpen}
        onClose={() => setAuthModalOpen(false)}
        initialMode={authModalMode}
      />

      <UserProfileModal
        isOpen={profileModalOpen}
        onClose={() => setProfileModalOpen(false)}
      />

      <SupabaseConfigModal
        isOpen={supabaseConfigOpen}
        onClose={() => setSupabaseConfigOpen(false)}
        onConnectedChange={() => {
          refreshPosts();
        }}
      />
    </div>
  );
}

export default function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <BlogProvider>
          <MainApp />
        </BlogProvider>
      </AuthProvider>
    </ThemeProvider>
  );
}
