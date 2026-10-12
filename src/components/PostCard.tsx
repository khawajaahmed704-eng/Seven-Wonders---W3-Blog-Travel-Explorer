import React from 'react';
import { Bookmark, Clock, MapPin, Calendar, ArrowRight } from 'lucide-react';
import { BlogPost } from '../types/database';
import { useBlog } from '../context/BlogContext';
import { useAuth } from '../context/AuthContext';

interface PostCardProps {
  post: BlogPost;
  onSelect: (post: BlogPost) => void;
  onAuthRequired?: () => void;
}

export const PostCard: React.FC<PostCardProps> = ({ post, onSelect, onAuthRequired }) => {
  const { isBookmarked, toggleBookmark } = useBlog();
  const { user } = useAuth();
  const saved = isBookmarked(post.id);

  const handleBookmarkClick = async (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!user) {
      if (onAuthRequired) onAuthRequired();
      return;
    }
    await toggleBookmark(post.id);
  };

  const formattedDate = post.published_at
    ? new Date(post.published_at).toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric',
      })
    : 'Draft';

  return (
    <article
      onClick={() => onSelect(post)}
      className="group bg-white dark:bg-stone-900 rounded-xl border border-stone-200 dark:border-stone-800 overflow-hidden shadow-2xs hover:shadow-md transition-all duration-200 flex flex-col cursor-pointer hover:border-stone-300 dark:hover:border-stone-700"
    >
      {/* Cover Image Container */}
      <div className="relative aspect-16/10 overflow-hidden bg-stone-100 dark:bg-stone-800">
        <img
          src={post.cover_image || 'https://images.unsplash.com/photo-1508804185872-d7badad00f7d?auto=format&fit=crop&w=600&q=80'}
          alt={post.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          loading="lazy"
        />

        {/* Category Badge */}
        <div className="absolute top-3 left-3 flex items-center gap-1.5">
          <span
            className={`text-[11px] font-bold px-2.5 py-1 rounded-full uppercase tracking-wider backdrop-blur-md shadow-xs ${
              post.category === 'New 7 Wonders'
                ? 'bg-emerald-900/90 text-emerald-100 border border-emerald-700/50'
                : post.category === 'Ancient Wonders'
                ? 'bg-amber-900/90 text-amber-100 border border-amber-700/50'
                : 'bg-stone-900/90 text-stone-100 border border-stone-700/50'
            }`}
          >
            {post.category}
          </span>
          {post.status === 'draft' && (
            <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-rose-600 text-white uppercase tracking-wider">
              Draft
            </span>
          )}
        </div>

        {/* Bookmark Action */}
        <button
          onClick={handleBookmarkClick}
          aria-label={saved ? 'Remove bookmark' : 'Bookmark post'}
          className={`absolute top-3 right-3 p-2 rounded-full backdrop-blur-md transition-all duration-150 shadow-xs ${
            saved
              ? 'bg-amber-500 text-white hover:bg-amber-600'
              : 'bg-stone-900/60 text-white/90 hover:bg-stone-900 hover:text-white'
          }`}
        >
          <Bookmark className={`w-4 h-4 ${saved ? 'fill-current' : ''}`} />
        </button>

        {/* Country / Location Tag */}
        {post.country && (
          <div className="absolute bottom-2.5 left-3 bg-black/60 backdrop-blur-xs text-white text-[11px] font-medium px-2 py-0.5 rounded-md flex items-center gap-1">
            <MapPin className="w-3 h-3 text-emerald-400" />
            <span>{post.country}</span>
          </div>
        )}
      </div>

      {/* Card Content */}
      <div className="p-5 flex-1 flex flex-col justify-between">
        <div>
          {/* Metadata Bar */}
          <div className="flex items-center gap-3 text-[11px] text-stone-500 dark:text-stone-400 mb-2">
            <span className="flex items-center gap-1">
              <Calendar className="w-3 h-3 text-stone-400" />
              {formattedDate}
            </span>
            <span>•</span>
            <span className="flex items-center gap-1">
              <Clock className="w-3 h-3 text-stone-400" />
              {post.reading_time_minutes || 6} min read
            </span>
          </div>

          <h3 className="font-bold text-base text-stone-900 dark:text-stone-100 group-hover:text-emerald-700 dark:group-hover:text-emerald-400 transition-colors line-clamp-2 leading-snug mb-2">
            {post.title}
          </h3>

          <p className="text-xs text-stone-600 dark:text-stone-400 line-clamp-2 leading-relaxed mb-4">
            {post.excerpt}
          </p>
        </div>

        {/* Author & Read More */}
        <div className="pt-3 border-t border-stone-100 dark:border-stone-800 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <img
              src={
                post.author_profile?.avatar_url ||
                `https://api.dicebear.com/7.x/bottts/svg?seed=${post.author_id}`
              }
              alt={post.author_profile?.display_name || 'Author'}
              className="w-6 h-6 rounded-full object-cover border border-stone-200 dark:border-stone-700"
            />
            <span className="text-xs font-medium text-stone-700 dark:text-stone-300 truncate max-w-[120px]">
              {post.author_profile?.display_name || 'Historian'}
            </span>
          </div>

          <span className="text-xs font-semibold text-emerald-700 dark:text-emerald-400 group-hover:text-emerald-800 dark:group-hover:text-emerald-300 flex items-center gap-1">
            Read article
            <ArrowRight className="w-3 h-3 transition-transform group-hover:translate-x-0.5" />
          </span>
        </div>
      </div>
    </article>
  );
};
