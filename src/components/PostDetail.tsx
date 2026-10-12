import React, { useState, useEffect } from 'react';
import { 
  ArrowLeft, Bookmark, Share2, Clock, Calendar, MapPin, 
  Send, Trash2, Edit2, Check, X, MessageSquare, AlertCircle, 
  Sparkles, ShieldCheck 
} from 'lucide-react';
import { BlogPost, Comment } from '../types/database';
import { useBlog } from '../context/BlogContext';
import { useAuth } from '../context/AuthContext';

interface PostDetailProps {
  post: BlogPost;
  onBack: () => void;
  onAuthRequired: () => void;
}

export const PostDetail: React.FC<PostDetailProps> = ({ post, onBack, onAuthRequired }) => {
  const { 
    isBookmarked, toggleBookmark, getCommentsForPost, 
    addComment, updateComment, deleteComment 
  } = useBlog();
  const { user } = useAuth();

  const [comments, setComments] = useState<Comment[]>([]);
  const [loadingComments, setLoadingComments] = useState(true);
  const [newCommentText, setNewCommentText] = useState('');
  const [submittingComment, setSubmittingComment] = useState(false);
  
  // Comment editing state
  const [editingCommentId, setEditingCommentId] = useState<string | null>(null);
  const [editContent, setEditContent] = useState('');
  const [copiedShare, setCopiedShare] = useState(false);

  const saved = isBookmarked(post.id);

  useEffect(() => {
    loadComments();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [post.id]);

  const loadComments = async () => {
    setLoadingComments(true);
    const data = await getCommentsForPost(post.id);
    setComments(data);
    setLoadingComments(false);
  };

  const handleBookmark = async () => {
    if (!user) {
      onAuthRequired();
      return;
    }
    await toggleBookmark(post.id);
  };

  const handleAddComment = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) {
      onAuthRequired();
      return;
    }

    if (!newCommentText.trim()) return;

    setSubmittingComment(true);
    const { error } = await addComment(post.id, newCommentText);
    setSubmittingComment(false);

    if (!error) {
      setNewCommentText('');
      await loadComments();
    } else {
      alert('Error adding comment: ' + error.message);
    }
  };

  const handleStartEdit = (comment: Comment) => {
    setEditingCommentId(comment.id);
    setEditContent(comment.content);
  };

  const handleSaveEdit = async (commentId: string) => {
    if (!editContent.trim()) return;

    const { error } = await updateComment(commentId, editContent);
    if (!error) {
      setEditingCommentId(null);
      await loadComments();
    } else {
      alert('Error updating comment: ' + error.message);
    }
  };

  const handleDeleteComment = async (commentId: string) => {
    if (!confirm('Are you sure you want to delete this comment?')) return;

    const { error } = await deleteComment(commentId);
    if (!error) {
      await loadComments();
    } else {
      alert('Error deleting comment: ' + error.message);
    }
  };

  const handleShare = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href);
      setCopiedShare(true);
      setTimeout(() => setCopiedShare(false), 2000);
    }
  };

  const formattedDate = post.published_at
    ? new Date(post.published_at).toLocaleDateString('en-US', {
        month: 'long',
        day: 'numeric',
        year: 'numeric',
      })
    : 'Draft';

  // Render markdown lines into structured elements
  const renderContent = (content: string) => {
    return content.split('\n\n').map((paragraph, index) => {
      const trimmed = paragraph.trim();
      if (!trimmed) return null;

      if (trimmed.startsWith('# ')) {
        return (
          <h1 key={index} className="text-2xl sm:text-3xl font-extrabold text-stone-900 mt-8 mb-4 tracking-tight leading-tight">
            {trimmed.replace('# ', '')}
          </h1>
        );
      }
      if (trimmed.startsWith('## ')) {
        return (
          <h2 key={index} className="text-xl sm:text-2xl font-bold text-stone-900 mt-6 mb-3 tracking-tight">
            {trimmed.replace('## ', '')}
          </h2>
        );
      }
      if (trimmed.startsWith('### ')) {
        return (
          <h3 key={index} className="text-lg font-bold text-stone-800 mt-5 mb-2">
            {trimmed.replace('### ', '')}
          </h3>
        );
      }
      if (trimmed.startsWith('> ')) {
        return (
          <blockquote key={index} className="border-l-4 border-emerald-600 pl-4 py-2 my-5 italic text-stone-700 bg-stone-50 rounded-r-lg">
            {trimmed.replace('> ', '')}
          </blockquote>
        );
      }
      if (trimmed.startsWith('---')) {
        return <hr key={index} className="my-6 border-stone-200" />;
      }
      if (trimmed.startsWith('- ') || trimmed.startsWith('* ')) {
        const items = trimmed.split('\n').map((item) => item.replace(/^[-*]\s*/, ''));
        return (
          <ul key={index} className="list-disc list-inside space-y-2 text-stone-700 my-4 text-sm sm:text-base leading-relaxed pl-2">
            {items.map((it, idx) => (
              <li key={idx} dangerouslySetInnerHTML={{ __html: formatInline(it) }} />
            ))}
          </ul>
        );
      }
      if (/^\d+\.\s/.test(trimmed)) {
        const items = trimmed.split('\n').map((item) => item.replace(/^\d+\.\s*/, ''));
        return (
          <ol key={index} className="list-decimal list-inside space-y-2 text-stone-700 my-4 text-sm sm:text-base leading-relaxed pl-2">
            {items.map((it, idx) => (
              <li key={idx} dangerouslySetInnerHTML={{ __html: formatInline(it) }} />
            ))}
          </ol>
        );
      }

      return (
        <p
          key={index}
          className="text-stone-700 text-sm sm:text-base leading-relaxed mb-4"
          dangerouslySetInnerHTML={{ __html: formatInline(trimmed) }}
        />
      );
    });
  };

  const formatInline = (text: string) => {
    // Bold
    return text
      .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
      .replace(/\*(.*?)\*/g, '<em>$1</em>');
  };

  return (
    <article className="max-w-4xl mx-auto space-y-8 animate-in fade-in pb-12">
      {/* Top Bar Navigation */}
      <div className="flex items-center justify-between">
        <button
          onClick={onBack}
          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold text-stone-600 dark:text-stone-300 hover:text-stone-900 dark:hover:text-white hover:bg-stone-100 dark:hover:bg-stone-800 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to all wonders
        </button>

        <div className="flex items-center gap-2">
          <button
            onClick={handleShare}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-white dark:bg-stone-800 border border-stone-200 dark:border-stone-700 hover:bg-stone-50 dark:hover:bg-stone-700 text-stone-700 dark:text-stone-200 rounded-lg text-xs font-medium transition-colors shadow-2xs"
          >
            <Share2 className="w-3.5 h-3.5" />
            {copiedShare ? 'Copied link!' : 'Share'}
          </button>

          <button
            onClick={handleBookmark}
            className={`inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-xs font-medium transition-colors shadow-2xs ${
              saved
                ? 'bg-amber-500 text-white hover:bg-amber-600'
                : 'bg-white dark:bg-stone-800 border border-stone-200 dark:border-stone-700 text-stone-700 dark:text-stone-200 hover:bg-stone-50 dark:hover:bg-stone-700'
            }`}
          >
            <Bookmark className={`w-3.5 h-3.5 ${saved ? 'fill-current' : ''}`} />
            {saved ? 'Saved' : 'Bookmark'}
          </button>
        </div>
      </div>

      {/* Header Info */}
      <div className="space-y-3">
        <div className="flex flex-wrap items-center gap-2">
          <span className="text-xs font-bold px-2.5 py-1 rounded-full bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300 uppercase tracking-wider">
            {post.category}
          </span>
          {post.country && (
            <span className="text-xs font-medium px-2.5 py-1 rounded-full bg-stone-100 dark:bg-stone-800 text-stone-700 dark:text-stone-300 flex items-center gap-1">
              <MapPin className="w-3 h-3 text-emerald-600 dark:text-emerald-400" />
              {post.country}
            </span>
          )}
          {post.status === 'draft' && (
            <span className="text-xs font-bold px-2.5 py-1 rounded-full bg-rose-100 dark:bg-rose-950 text-rose-800 dark:text-rose-300 uppercase tracking-wider">
              Draft Mode
            </span>
          )}
        </div>

        <h1 className="text-3xl sm:text-4xl font-extrabold text-stone-900 dark:text-white tracking-tight leading-tight">
          {post.title}
        </h1>

        <div className="flex flex-wrap items-center gap-4 text-xs text-stone-500 dark:text-stone-400 pt-2 border-b border-stone-200 dark:border-stone-800 pb-4">
          <div className="flex items-center gap-2">
            <img
              src={
                post.author_profile?.avatar_url ||
                `https://api.dicebear.com/7.x/bottts/svg?seed=${post.author_id}`
              }
              alt="Author"
              className="w-7 h-7 rounded-full object-cover border border-stone-300 dark:border-stone-600"
            />
            <span className="font-semibold text-stone-800 dark:text-stone-200">
              {post.author_profile?.display_name || 'Dr. Evelyn Lin'}
            </span>
          </div>
          <span>•</span>
          <span className="flex items-center gap-1">
            <Calendar className="w-3.5 h-3.5 text-stone-400" />
            {formattedDate}
          </span>
          <span>•</span>
          <span className="flex items-center gap-1">
            <Clock className="w-3.5 h-3.5 text-stone-400" />
            {post.reading_time_minutes || 7} min read
          </span>
          <span>•</span>
          <span className="flex items-center gap-1">
            <MessageSquare className="w-3.5 h-3.5 text-stone-400" />
            {comments.length} comments
          </span>
        </div>
      </div>

      {/* Cover Image Hero */}
      <div className="relative rounded-2xl overflow-hidden aspect-16/9 bg-stone-100 dark:bg-stone-800 shadow-md border border-stone-200 dark:border-stone-800">
        <img
          src={post.cover_image || 'https://images.unsplash.com/photo-1508804185872-d7badad00f7d?auto=format&fit=crop&w=1200&q=80'}
          alt={post.title}
          className="w-full h-full object-cover"
        />
      </div>

      {/* Quick Facts W3 Box */}
      <div className="bg-stone-50 dark:bg-stone-900 rounded-xl p-5 border border-stone-200 dark:border-stone-800 grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div>
          <span className="text-[11px] font-semibold text-stone-500 dark:text-stone-400 uppercase tracking-wider block">
            Location
          </span>
          <span className="text-sm font-bold text-stone-900 dark:text-stone-100">
            {post.location || post.country || 'Global Heritage Site'}
          </span>
        </div>
        <div>
          <span className="text-[11px] font-semibold text-stone-500 dark:text-stone-400 uppercase tracking-wider block">
            Historical Period
          </span>
          <span className="text-sm font-bold text-stone-900 dark:text-stone-100">
            {post.era || 'Antiquity to Classical Era'}
          </span>
        </div>
        <div>
          <span className="text-[11px] font-semibold text-stone-500 dark:text-stone-400 uppercase tracking-wider block">
            Category Status
          </span>
          <span className="text-sm font-bold text-emerald-800 dark:text-emerald-400 flex items-center gap-1">
            <ShieldCheck className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
            {post.category}
          </span>
        </div>
      </div>

      {/* Main Body */}
      <div className="prose dark:prose-invert max-w-none text-stone-800 dark:text-stone-200 bg-white dark:bg-stone-900 p-6 sm:p-8 rounded-2xl border border-stone-200 dark:border-stone-800 shadow-2xs">
        {renderContent(post.content)}
      </div>

      {/* Tags */}
      {post.tags && post.tags.length > 0 && (
        <div className="flex flex-wrap items-center gap-2 pt-2">
          <span className="text-xs font-semibold text-stone-500 dark:text-stone-400">Tags:</span>
          {post.tags.map((tag) => (
            <span
              key={tag}
              className="text-xs px-2.5 py-1 bg-stone-100 dark:bg-stone-800 text-stone-700 dark:text-stone-300 rounded-md font-medium"
            >
              #{tag}
            </span>
          ))}
        </div>
      )}

      {/* Author Bio Box */}
      {post.author_profile && (
        <div className="bg-stone-50 dark:bg-stone-900 rounded-xl p-5 border border-stone-200 dark:border-stone-800 flex items-start gap-4">
          <img
            src={post.author_profile.avatar_url || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80'}
            alt={post.author_profile.display_name || 'Author'}
            className="w-14 h-14 rounded-full object-cover border-2 border-emerald-600 shrink-0"
          />
          <div>
            <div className="flex items-center gap-2">
              <h4 className="text-sm font-bold text-stone-900 dark:text-white">
                {post.author_profile.display_name}
              </h4>
              <span className="text-[10px] bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300 font-semibold px-2 py-0.5 rounded-full">
                Author
              </span>
            </div>
            <p className="text-xs text-stone-600 dark:text-stone-400 mt-1 leading-relaxed">
              {post.author_profile.bio || 'Contributing researcher and travel documentarian for the Seven Wonders platform.'}
            </p>
          </div>
        </div>
      )}

      {/* Comments Section */}
      <section className="bg-white dark:bg-stone-900 rounded-2xl border border-stone-200 dark:border-stone-800 p-6 sm:p-8 shadow-2xs space-y-6">
        <div className="flex items-center justify-between border-b border-stone-200 dark:border-stone-800 pb-4">
          <div className="flex items-center gap-2">
            <MessageSquare className="w-5 h-5 text-emerald-700 dark:text-emerald-400" />
            <h3 className="text-lg font-bold text-stone-900 dark:text-white">
              Community Discussion ({comments.length})
            </h3>
          </div>
          <span className="text-xs text-stone-500 dark:text-stone-400">
            {user ? 'Commenting as signed-in user' : 'Sign in to join the conversation'}
          </span>
        </div>

        {/* Add comment form */}
        <form onSubmit={handleAddComment} className="space-y-3">
          <textarea
            rows={3}
            value={newCommentText}
            onChange={(e) => setNewCommentText(e.target.value)}
            placeholder={
              user
                ? 'Share your thoughts, experiences, or historical queries about this wonder...'
                : 'Sign in to join the discussion and share your thoughts...'
            }
            disabled={!user || submittingComment}
            className="w-full p-3.5 text-xs sm:text-sm border border-stone-300 dark:border-stone-700 bg-white dark:bg-stone-800 text-stone-900 dark:text-white rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-600 disabled:bg-stone-50 dark:disabled:bg-stone-850 disabled:text-stone-400"
          />

          <div className="flex items-center justify-between">
            <span className="text-[11px] text-stone-500 dark:text-stone-400">
              Be respectful and constructive in comments.
            </span>
            {user ? (
              <button
                type="submit"
                disabled={submittingComment || !newCommentText.trim()}
                className="inline-flex items-center gap-1.5 px-4 py-2 bg-emerald-700 hover:bg-emerald-800 disabled:opacity-50 text-white text-xs font-semibold rounded-lg transition-colors shadow-2xs cursor-pointer"
              >
                <Send className="w-3.5 h-3.5" />
                {submittingComment ? 'Posting...' : 'Post Comment'}
              </button>
            ) : (
              <button
                type="button"
                onClick={onAuthRequired}
                className="px-4 py-2 bg-stone-900 dark:bg-stone-800 hover:bg-black dark:hover:bg-stone-700 text-white text-xs font-semibold rounded-lg transition-colors cursor-pointer"
              >
                Sign In to Comment
              </button>
            )}
          </div>
        </form>

        {/* Comments list */}
        {loadingComments ? (
          <div className="py-6 text-center text-xs text-stone-400">Loading comments...</div>
        ) : comments.length === 0 ? (
          <div className="py-8 text-center text-stone-500 dark:text-stone-400 border border-dashed border-stone-200 dark:border-stone-800 rounded-xl">
            <p className="text-xs">No comments on this article yet. Be the first to share your thoughts!</p>
          </div>
        ) : (
          <div className="space-y-4 pt-2">
            {comments.map((comment) => {
              const isOwner = user?.id === comment.user_id;
              const isEditing = editingCommentId === comment.id;

              return (
                <div
                  key={comment.id}
                  className="p-4 rounded-xl border border-stone-200 dark:border-stone-800 bg-stone-50/50 dark:bg-stone-800/40 space-y-2 hover:bg-stone-50 dark:hover:bg-stone-800/60 transition-colors"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2.5">
                      <img
                        src={
                          comment.user_profile?.avatar_url ||
                          `https://api.dicebear.com/7.x/bottts/svg?seed=${comment.user_id}`
                        }
                        alt="User"
                        className="w-7 h-7 rounded-full object-cover border border-stone-300 dark:border-stone-600"
                      />
                      <div>
                        <span className="text-xs font-bold text-stone-800 dark:text-stone-200 block leading-tight">
                          {comment.user_profile?.display_name || 'Traveler'}
                        </span>
                        <span className="text-[10px] text-stone-400 dark:text-stone-500">
                          {new Date(comment.created_at).toLocaleDateString()}
                        </span>
                      </div>
                    </div>

                    {isOwner && !isEditing && (
                      <div className="flex items-center gap-1">
                        <button
                          onClick={() => handleStartEdit(comment)}
                          className="p-1 text-stone-400 hover:text-stone-700 dark:hover:text-stone-200 rounded transition-colors"
                          title="Edit comment"
                        >
                          <Edit2 className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={() => handleDeleteComment(comment.id)}
                          className="p-1 text-stone-400 hover:text-rose-600 rounded transition-colors"
                          title="Delete comment"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    )}
                  </div>

                  {isEditing ? (
                    <div className="space-y-2 pt-1">
                      <textarea
                        rows={2}
                        value={editContent}
                        onChange={(e) => setEditContent(e.target.value)}
                        className="w-full p-2.5 text-xs border border-stone-300 dark:border-stone-700 bg-white dark:bg-stone-800 text-stone-900 dark:text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-600"
                      />
                      <div className="flex justify-end gap-2">
                        <button
                          onClick={() => setEditingCommentId(null)}
                          className="px-2.5 py-1 text-xs border border-stone-300 dark:border-stone-700 rounded text-stone-600 dark:text-stone-300 hover:bg-white dark:hover:bg-stone-700"
                        >
                          Cancel
                        </button>
                        <button
                          onClick={() => handleSaveEdit(comment.id)}
                          className="px-3 py-1 text-xs bg-emerald-700 hover:bg-emerald-800 text-white rounded font-medium"
                        >
                          Save Changes
                        </button>
                      </div>
                    </div>
                  ) : (
                    <p className="text-xs sm:text-sm text-stone-700 dark:text-stone-300 leading-relaxed pl-9">
                      {comment.content}
                    </p>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </section>
    </article>
  );
};
