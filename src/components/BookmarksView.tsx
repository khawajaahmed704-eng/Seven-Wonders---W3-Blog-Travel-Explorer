import React from 'react';
import { Bookmark, Trash2, ArrowRight, Compass } from 'lucide-react';
import { useBlog } from '../context/BlogContext';
import { useAuth } from '../context/AuthContext';
import { BlogPost } from '../types/database';

interface BookmarksViewProps {
  onSelectPost: (post: BlogPost) => void;
  onExplorePosts: () => void;
  onAuthRequired: () => void;
}

export const BookmarksView: React.FC<BookmarksViewProps> = ({
  onSelectPost,
  onExplorePosts,
  onAuthRequired,
}) => {
  const { bookmarks, toggleBookmark, loadingBookmarks } = useBlog();
  const { user } = useAuth();

  if (!user) {
    return (
      <div className="bg-white dark:bg-stone-900 rounded-2xl border border-stone-200 dark:border-stone-800 p-8 sm:p-12 text-center max-w-lg mx-auto shadow-2xs space-y-4">
        <div className="w-12 h-12 bg-amber-100 dark:bg-amber-950/60 text-amber-700 dark:text-amber-400 rounded-full flex items-center justify-center mx-auto">
          <Bookmark className="w-6 h-6" />
        </div>
        <h3 className="text-lg font-bold text-stone-900 dark:text-white">Sign in to Save Articles</h3>
        <p className="text-xs text-stone-600 dark:text-stone-400 leading-relaxed">
          Create an account or sign in to bookmark your favorite Seven Wonders articles and access them anytime across all your devices.
        </p>
        <button
          onClick={onAuthRequired}
          className="px-5 py-2.5 bg-emerald-700 hover:bg-emerald-800 text-white text-xs font-bold rounded-lg transition-colors shadow-2xs"
        >
          Sign In / Create Account
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between border-b border-stone-200 dark:border-stone-800 pb-4">
        <div>
          <h2 className="text-2xl font-extrabold text-stone-900 dark:text-white tracking-tight flex items-center gap-2">
            <Bookmark className="w-6 h-6 text-amber-500 fill-current" />
            Your Saved Articles ({bookmarks.length})
          </h2>
          <p className="text-xs text-stone-500 dark:text-stone-400 mt-0.5">
            Personal reading list synced to your Supabase account
          </p>
        </div>
        <button
          onClick={onExplorePosts}
          className="text-xs font-semibold text-emerald-700 dark:text-emerald-400 hover:text-emerald-800 dark:hover:text-emerald-300 flex items-center gap-1"
        >
          Browse all wonders <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </div>

      {loadingBookmarks ? (
        <div className="py-12 text-center text-xs text-stone-400">Loading saved bookmarks...</div>
      ) : bookmarks.length === 0 ? (
        <div className="bg-white dark:bg-stone-900 rounded-2xl border border-dashed border-stone-300 dark:border-stone-800 p-12 text-center max-w-md mx-auto space-y-3">
          <Compass className="w-10 h-10 text-stone-400 mx-auto" />
          <h4 className="text-base font-bold text-stone-800 dark:text-stone-200">No saved articles yet</h4>
          <p className="text-xs text-stone-500 dark:text-stone-400 leading-relaxed">
            Click the bookmark icon on any wonder article to save it to your reading list.
          </p>
          <button
            onClick={onExplorePosts}
            className="inline-flex items-center gap-1.5 px-4 py-2 bg-emerald-700 hover:bg-emerald-800 text-white text-xs font-semibold rounded-lg transition-colors mt-2"
          >
            Explore Wonders Now
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {bookmarks.map((bm) => {
            const post = bm.post;
            if (!post) return null;

            return (
              <div
                key={bm.id}
                className="bg-white dark:bg-stone-900 rounded-xl border border-stone-200 dark:border-stone-800 p-4 hover:border-stone-300 dark:hover:border-stone-700 hover:shadow-xs transition-all flex gap-4 items-center group"
              >
                <img
                  src={post.cover_image || 'https://images.unsplash.com/photo-1508804185872-d7badad00f7d?auto=format&fit=crop&w=300&q=80'}
                  alt={post.title}
                  className="w-24 h-24 rounded-lg object-cover shrink-0 cursor-pointer"
                  onClick={() => onSelectPost(post)}
                />
                <div className="flex-1 min-w-0">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-800 dark:text-emerald-300 bg-emerald-50 dark:bg-emerald-950 px-2 py-0.5 rounded-full inline-block mb-1">
                    {post.category}
                  </span>
                  <h4
                    onClick={() => onSelectPost(post)}
                    className="text-sm font-bold text-stone-900 dark:text-white group-hover:text-emerald-700 dark:group-hover:text-emerald-400 transition-colors line-clamp-2 cursor-pointer leading-snug"
                  >
                    {post.title}
                  </h4>
                  <p className="text-[11px] text-stone-500 dark:text-stone-400 line-clamp-1 mt-1">
                    {post.country || post.location}
                  </p>
                  <div className="flex items-center justify-between mt-3 pt-2 border-t border-stone-100 dark:border-stone-800">
                    <button
                      onClick={() => onSelectPost(post)}
                      className="text-xs font-semibold text-emerald-700 dark:text-emerald-400 hover:text-emerald-800 flex items-center gap-1"
                    >
                      Read Now →
                    </button>
                    <button
                      onClick={() => toggleBookmark(post.id)}
                      className="text-stone-400 hover:text-rose-600 p-1 transition-colors"
                      title="Remove bookmark"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};
