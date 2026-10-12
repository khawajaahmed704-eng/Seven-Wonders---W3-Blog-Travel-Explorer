import React, { useState } from 'react';
import { 
  Plus, Edit, Trash2, Shield, Eye, FileText, CheckCircle, 
  AlertCircle, Sparkles, BookOpen, Clock, Tag, Image, RefreshCw 
} from 'lucide-react';
import { BlogPost, WonderCategory } from '../types/database';
import { useBlog } from '../context/BlogContext';
import { useAuth } from '../context/AuthContext';

interface AdminDashboardProps {
  onSelectPost: (post: BlogPost) => void;
  onOpenSupabaseConfig: () => void;
}

export const AdminDashboard: React.FC<AdminDashboardProps> = ({ onSelectPost, onOpenSupabaseConfig }) => {
  const { posts, createPost, updatePost, deletePost, refreshPosts } = useBlog();
  const { user, role, setDemoRole, isConfigured } = useAuth();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingPost, setEditingPost] = useState<BlogPost | null>(null);

  // Form states
  const [title, setTitle] = useState('');
  const [slug, setSlug] = useState('');
  const [excerpt, setExcerpt] = useState('');
  const [content, setContent] = useState('');
  const [category, setCategory] = useState<WonderCategory>('New 7 Wonders');
  const [tags, setTags] = useState('History, Architecture, UNESCO');
  const [coverImage, setCoverImage] = useState('');
  const [status, setStatus] = useState<'draft' | 'published'>('published');
  const [country, setCountry] = useState('');
  const [era, setEra] = useState('');

  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  const isAdmin = role === 'admin';

  const openCreateModal = () => {
    setEditingPost(null);
    setTitle('');
    setSlug('');
    setExcerpt('');
    setContent('');
    setCategory('New 7 Wonders');
    setTags('History, Architecture, UNESCO');
    setCoverImage('https://images.unsplash.com/photo-1508804185872-d7badad00f7d?auto=format&fit=crop&w=1200&q=80');
    setStatus('published');
    setCountry('');
    setEra('');
    setMessage(null);
    setIsModalOpen(true);
  };

  const openEditModal = (post: BlogPost) => {
    setEditingPost(post);
    setTitle(post.title);
    setSlug(post.slug);
    setExcerpt(post.excerpt || '');
    setContent(post.content);
    setCategory((post.category as WonderCategory) || 'New 7 Wonders');
    setTags(post.tags?.join(', ') || '');
    setCoverImage(post.cover_image || '');
    setStatus(post.status);
    setCountry(post.country || '');
    setEra(post.era || '');
    setMessage(null);
    setIsModalOpen(true);
  };

  const handleTitleChange = (val: string) => {
    setTitle(val);
    if (!editingPost) {
      // Auto-generate slug
      const generated = val
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/(^-|-$)+/g, '');
      setSlug(generated);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !slug.trim() || !content.trim()) {
      setMessage({ type: 'error', text: 'Title, slug, and content are required.' });
      return;
    }

    setSaving(true);
    setMessage(null);

    const tagList = tags
      .split(',')
      .map((t) => t.trim())
      .filter(Boolean);

    if (editingPost) {
      const { error } = await updatePost(editingPost.id, {
        title,
        slug,
        excerpt,
        content,
        category,
        tags: tagList,
        cover_image: coverImage,
        status,
        country,
        era,
        published_at: status === 'published' ? editingPost.published_at || new Date().toISOString() : null,
      });

      setSaving(false);
      if (error) {
        setMessage({ type: 'error', text: error.message });
      } else {
        setMessage({ type: 'success', text: 'Article updated successfully!' });
        setTimeout(() => setIsModalOpen(false), 900);
      }
    } else {
      const { error } = await createPost({
        author_id: user?.id || 'admin-author',
        title,
        slug,
        excerpt,
        content,
        category,
        tags: tagList,
        cover_image: coverImage,
        status,
        country,
        era,
        reading_time_minutes: Math.max(3, Math.ceil(content.split(' ').length / 200)),
        published_at: status === 'published' ? new Date().toISOString() : null,
      });

      setSaving(false);
      if (error) {
        setMessage({ type: 'error', text: error.message });
      } else {
        setMessage({ type: 'success', text: 'New article created and published!' });
        setTimeout(() => setIsModalOpen(false), 900);
      }
    }
  };

  const handleDelete = async (post: BlogPost) => {
    if (!confirm(`Are you sure you want to delete "${post.title}"?`)) return;

    const { error } = await deletePost(post.id);
    if (error) {
      alert('Error deleting post: ' + error.message);
    }
  };

  return (
    <div className="space-y-6">
      {/* Top Header */}
      <div className="bg-stone-900 text-white rounded-2xl p-6 sm:p-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <span className="p-1.5 bg-amber-500/20 text-amber-400 rounded-lg">
              <Shield className="w-5 h-5" />
            </span>
            <span className="text-xs font-bold text-amber-400 tracking-wider uppercase">
              Curator & Admin Studio
            </span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
            Manage Seven Wonders Articles
          </h2>
          <p className="text-xs sm:text-sm text-stone-400 mt-1">
            Publish new guides, edit drafts, organize metadata and oversee heritage collections.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          {/* Quick role test switcher */}
          {!isAdmin && (
            <button
              onClick={() => setDemoRole('admin')}
              className="px-3.5 py-2 bg-amber-500 hover:bg-amber-600 text-stone-950 font-bold text-xs rounded-lg transition-colors flex items-center gap-1.5"
            >
              <Sparkles className="w-3.5 h-3.5" />
              Enable Admin Mode
            </button>
          )}

          <button
            onClick={openCreateModal}
            disabled={!isAdmin}
            className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 disabled:opacity-50 text-white font-bold text-xs rounded-lg transition-colors flex items-center gap-1.5 shadow-sm"
          >
            <Plus className="w-4 h-4" />
            Create New Article
          </button>
        </div>
      </div>

      {/* Role Notice & Authorization Box */}
      {!isAdmin ? (
        <div className="bg-amber-50 border border-amber-300 rounded-xl p-5 text-amber-900 space-y-2">
          <div className="flex items-center gap-2 font-bold text-sm">
            <AlertCircle className="w-4 h-4 text-amber-700" />
            Reader Access Level (Admin Authorization Required)
          </div>
          <p className="text-xs leading-relaxed">
            Your current account does not have the <code className="bg-amber-200/60 px-1 py-0.5 rounded">admin</code> role in{' '}
            <code className="bg-amber-200/60 px-1 py-0.5 rounded">public.user_roles</code>. To grant yourself admin access in your Supabase project, execute this query:
          </p>
          <pre className="p-3 bg-stone-900 text-stone-100 rounded-lg text-[11px] font-mono overflow-x-auto">
{`INSERT INTO public.user_roles (user_id, role)
SELECT id, 'admin'
FROM auth.users
WHERE email = '${user?.email || 'YOUR_EMAIL'}'
ON CONFLICT (user_id)
DO UPDATE SET role = 'admin';`}
          </pre>
          <p className="text-xs">
            Or click <strong>"Enable Admin Mode"</strong> above for immediate instant evaluation in this session!
          </p>
        </div>
      ) : (
        <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-4 text-emerald-900 flex items-center justify-between text-xs">
          <div className="flex items-center gap-2">
            <CheckCircle className="w-4 h-4 text-emerald-600" />
            <span>
              <strong>Admin Mode Active:</strong> You have full privileges to create, edit, draft, and delete articles.
            </span>
          </div>
          <button
            onClick={onOpenSupabaseConfig}
            className="text-emerald-800 hover:underline font-semibold"
          >
            Database Settings →
          </button>
        </div>
      )}

      {/* Articles Management Table */}
      <div className="bg-white dark:bg-stone-900 rounded-xl border border-stone-200 dark:border-stone-800 shadow-2xs overflow-hidden">
        <div className="p-4 border-b border-stone-200 dark:border-stone-800 flex items-center justify-between">
          <h3 className="font-bold text-sm text-stone-900 dark:text-white flex items-center gap-2">
            <BookOpen className="w-4 h-4 text-emerald-700 dark:text-emerald-400" />
            All Wonders Articles ({posts.length})
          </h3>
          <button
            onClick={refreshPosts}
            className="text-stone-500 dark:text-stone-400 hover:text-stone-900 dark:hover:text-white p-1.5 rounded-lg hover:bg-stone-100 dark:hover:bg-stone-800 transition-colors"
            title="Refresh list"
          >
            <RefreshCw className="w-4 h-4" />
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="bg-stone-100 dark:bg-stone-800 text-stone-700 dark:text-stone-300 border-b border-stone-200 dark:border-stone-700 font-bold uppercase tracking-wider text-[11px]">
                <th className="py-3 px-4">Article Title</th>
                <th className="py-3 px-4">Category</th>
                <th className="py-3 px-4">Status</th>
                <th className="py-3 px-4">Author</th>
                <th className="py-3 px-4">Date</th>
                <th className="py-3 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-stone-200 dark:divide-stone-800">
              {posts.map((post) => (
                <tr key={post.id} className="hover:bg-stone-50/70 dark:hover:bg-stone-800/60 transition-colors">
                  <td className="py-3 px-4 font-bold text-stone-900 dark:text-white max-w-xs truncate">
                    {post.title}
                  </td>
                  <td className="py-3 px-4">
                    <span className="px-2 py-0.5 rounded text-[10px] font-semibold bg-stone-100 dark:bg-stone-800 text-stone-800 dark:text-stone-300">
                      {post.category}
                    </span>
                  </td>
                  <td className="py-3 px-4">
                    <span
                      className={`px-2 py-0.5 rounded-full text-[10px] font-bold uppercase ${
                        post.status === 'published'
                          ? 'bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300'
                          : 'bg-amber-100 dark:bg-amber-950 text-amber-800 dark:text-amber-300'
                      }`}
                    >
                      {post.status}
                    </span>
                  </td>
                  <td className="py-3 px-4 text-stone-600 dark:text-stone-400">
                    {post.author_profile?.display_name || 'Admin'}
                  </td>
                  <td className="py-3 px-4 text-stone-500 dark:text-stone-400 font-mono text-[11px]">
                    {post.published_at ? new Date(post.published_at).toLocaleDateString() : 'Draft'}
                  </td>
                  <td className="py-3 px-4 text-right space-x-2 whitespace-nowrap">
                    <button
                      onClick={() => onSelectPost(post)}
                      className="p-1 text-stone-500 hover:text-stone-900 dark:hover:text-white"
                      title="View Article"
                    >
                      <Eye className="w-3.5 h-3.5" />
                    </button>
                    {isAdmin && (
                      <>
                        <button
                          onClick={() => openEditModal(post)}
                          className="p-1 text-stone-500 hover:text-emerald-700 dark:hover:text-emerald-400"
                          title="Edit Article"
                        >
                          <Edit className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={() => handleDelete(post)}
                          className="p-1 text-stone-500 hover:text-rose-600"
                          title="Delete Article"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Create / Edit Article Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
          <div className="bg-white rounded-2xl max-w-3xl w-full max-h-[90vh] shadow-2xl border border-stone-200 overflow-hidden flex flex-col">
            <div className="bg-stone-900 text-white px-6 py-4 flex items-center justify-between">
              <h3 className="font-bold text-base flex items-center gap-2">
                <FileText className="w-5 h-5 text-emerald-400" />
                {editingPost ? 'Edit Wonder Article' : 'Compose New Wonder Article'}
              </h3>
              <button onClick={() => setIsModalOpen(false)} className="text-stone-400 hover:text-white">
                ✕
              </button>
            </div>

            <form onSubmit={handleSubmit} className="p-6 overflow-y-auto space-y-4 flex-1 text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block font-semibold text-stone-700 mb-1">Article Title *</label>
                  <input
                    type="text"
                    required
                    value={title}
                    onChange={(e) => handleTitleChange(e.target.value)}
                    placeholder="e.g. Petra: The Rose-Red City"
                    className="w-full px-3 py-2 border border-stone-300 rounded-lg focus:ring-2 focus:ring-emerald-600"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-stone-700 mb-1">URL Slug *</label>
                  <input
                    type="text"
                    required
                    value={slug}
                    onChange={(e) => setSlug(e.target.value)}
                    placeholder="petra-rose-red-city"
                    className="w-full px-3 py-2 border border-stone-300 rounded-lg focus:ring-2 focus:ring-emerald-600 font-mono"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block font-semibold text-stone-700 mb-1">Category</label>
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value as WonderCategory)}
                    className="w-full px-3 py-2 border border-stone-300 rounded-lg focus:ring-2 focus:ring-emerald-600"
                  >
                    <option value="New 7 Wonders">New 7 Wonders</option>
                    <option value="Ancient Wonders">Ancient Wonders</option>
                    <option value="History">History</option>
                    <option value="Architecture">Architecture</option>
                    <option value="Travel Guide">Travel Guide</option>
                  </select>
                </div>
                <div>
                  <label className="block font-semibold text-stone-700 mb-1">Status</label>
                  <select
                    value={status}
                    onChange={(e) => setStatus(e.target.value as 'draft' | 'published')}
                    className="w-full px-3 py-2 border border-stone-300 rounded-lg focus:ring-2 focus:ring-emerald-600"
                  >
                    <option value="published">Published</option>
                    <option value="draft">Draft (Author only)</option>
                  </select>
                </div>
                <div>
                  <label className="block font-semibold text-stone-700 mb-1">Country / Region</label>
                  <input
                    type="text"
                    value={country}
                    onChange={(e) => setCountry(e.target.value)}
                    placeholder="e.g. Jordan · Middle East"
                    className="w-full px-3 py-2 border border-stone-300 rounded-lg focus:ring-2 focus:ring-emerald-600"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block font-semibold text-stone-700 mb-1">Historical Era / Period</label>
                  <input
                    type="text"
                    value={era}
                    onChange={(e) => setEra(e.target.value)}
                    placeholder="e.g. 4th century BCE onward"
                    className="w-full px-3 py-2 border border-stone-300 rounded-lg focus:ring-2 focus:ring-emerald-600"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-stone-700 mb-1">Cover Image URL</label>
                  <input
                    type="url"
                    value={coverImage}
                    onChange={(e) => setCoverImage(e.target.value)}
                    placeholder="https://images.unsplash.com/..."
                    className="w-full px-3 py-2 border border-stone-300 rounded-lg focus:ring-2 focus:ring-emerald-600"
                  />
                </div>
              </div>

              <div>
                <label className="block font-semibold text-stone-700 mb-1">Tags (Comma-separated)</label>
                <input
                  type="text"
                  value={tags}
                  onChange={(e) => setTags(e.target.value)}
                  placeholder="History, UNESCO, Architecture"
                  className="w-full px-3 py-2 border border-stone-300 rounded-lg focus:ring-2 focus:ring-emerald-600"
                />
              </div>

              <div>
                <label className="block font-semibold text-stone-700 mb-1">Short Excerpt *</label>
                <textarea
                  rows={2}
                  required
                  value={excerpt}
                  onChange={(e) => setExcerpt(e.target.value)}
                  placeholder="A concise synopsis of the wonder for article cards..."
                  className="w-full px-3 py-2 border border-stone-300 rounded-lg focus:ring-2 focus:ring-emerald-600"
                />
              </div>

              <div>
                <label className="block font-semibold text-stone-700 mb-1">
                  Article Body (Supports Markdown # Headings, lists, quotes) *
                </label>
                <textarea
                  rows={8}
                  required
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  placeholder="Write the complete in-depth blog post here..."
                  className="w-full p-3 border border-stone-300 rounded-lg focus:ring-2 focus:ring-emerald-600 font-mono"
                />
              </div>

              {message && (
                <div
                  className={`p-3 rounded-lg text-xs flex items-center gap-2 ${
                    message.type === 'success'
                      ? 'bg-emerald-50 text-emerald-900 border border-emerald-200'
                      : 'bg-rose-50 text-rose-900 border border-rose-200'
                  }`}
                >
                  {message.type === 'success' ? (
                    <CheckCircle className="w-4 h-4 text-emerald-600" />
                  ) : (
                    <AlertCircle className="w-4 h-4 text-rose-600" />
                  )}
                  <span>{message.text}</span>
                </div>
              )}

              <div className="pt-2 flex items-center justify-end gap-2 border-t border-stone-200">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 border border-stone-300 rounded-lg font-medium text-stone-700 hover:bg-stone-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={saving}
                  className="px-5 py-2 bg-emerald-700 hover:bg-emerald-800 disabled:opacity-50 text-white font-bold rounded-lg shadow-sm"
                >
                  {saving ? 'Saving...' : editingPost ? 'Update Article' : 'Publish Article'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
