import React, { useState } from 'react';
import { 
  X, PenLine, Sparkles, Image, Check, AlertCircle, 
  BookOpen, Globe, Calendar, Tag, Bold, Italic, List, Quote, Heading 
} from 'lucide-react';
import { useBlog } from '../context/BlogContext';
import { useAuth } from '../context/AuthContext';
import { WonderCategory, BlogPost } from '../types/database';

interface WriteModalProps {
  isOpen: boolean;
  onClose: () => void;
  onPostCreated: (post: BlogPost) => void;
  onAuthRequired: () => void;
}

const PRESET_IMAGES = [
  { name: 'Petra', url: 'https://images.unsplash.com/photo-1579606032824-2c67995a6ec8?auto=format&fit=crop&w=1200&q=80' },
  { name: 'Great Wall', url: 'https://images.unsplash.com/photo-1508804185872-d7badad00f7d?auto=format&fit=crop&w=1200&q=80' },
  { name: 'Machu Picchu', url: 'https://images.unsplash.com/photo-1526392060635-9d6019884377?auto=format&fit=crop&w=1200&q=80' },
  { name: 'Colosseum', url: 'https://images.unsplash.com/photo-1552832230-c0197dd311b5?auto=format&fit=crop&w=1200&q=80' },
  { name: 'Taj Mahal', url: 'https://images.unsplash.com/photo-1564507592333-c60657eea523?auto=format&fit=crop&w=1200&q=80' },
  { name: 'Chichén Itzá', url: 'https://images.unsplash.com/photo-1518638150340-f706e86654de?auto=format&fit=crop&w=1200&q=80' },
  { name: 'Giza Pyramids', url: 'https://images.unsplash.com/photo-1503177119275-0aa32b3a9368?auto=format&fit=crop&w=1200&q=80' },
  { name: 'Christ Redeemer', url: 'https://images.unsplash.com/photo-1593995863951-b79b472e3a89?auto=format&fit=crop&w=1200&q=80' },
];

export const WriteModal: React.FC<WriteModalProps> = ({
  isOpen,
  onClose,
  onPostCreated,
  onAuthRequired,
}) => {
  const { createPost } = useBlog();
  const { user } = useAuth();

  const [topic, setTopic] = useState('');
  const [slug, setSlug] = useState('');
  const [category, setCategory] = useState<WonderCategory>('New 7 Wonders');
  const [country, setCountry] = useState('');
  const [era, setEra] = useState('');
  const [excerpt, setExcerpt] = useState('');
  const [content, setContent] = useState('');
  const [tags, setTags] = useState('Heritage, History, Wonder');
  const [coverImage, setCoverImage] = useState(PRESET_IMAGES[0].url);
  const [status, setStatus] = useState<'published' | 'draft'>('published');

  const [saving, setSaving] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleTopicChange = (val: string) => {
    setTopic(val);
    const autoSlug = val
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)+/g, '');
    setSlug(autoSlug);
  };

  const insertFormatting = (prefix: string, suffix: string = '') => {
    setContent((prev) => prev + `\n${prefix} ${suffix}`);
  };

  const wordCount = content.trim() ? content.trim().split(/\s+/).length : 0;
  const estimatedReadTime = Math.max(1, Math.ceil(wordCount / 180));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);

    if (!user) {
      onAuthRequired();
      return;
    }

    if (!topic.trim()) {
      setErrorMsg('Please enter a topic title.');
      return;
    }

    if (!content.trim()) {
      setErrorMsg('Please write your explanation or article content.');
      return;
    }

    const tagList = tags
      .split(',')
      .map((t) => t.trim())
      .filter(Boolean);

    setSaving(true);

    const generatedSlug = slug.trim() || `topic-${Date.now()}`;

    const { error, post } = await createPost({
      author_id: user.id,
      title: topic.trim(),
      slug: generatedSlug,
      excerpt: excerpt.trim() || topic.slice(0, 140) + '...',
      content: content.trim(),
      category,
      tags: tagList,
      cover_image: coverImage || PRESET_IMAGES[0].url,
      status,
      country: country.trim() || undefined,
      era: era.trim() || undefined,
      reading_time_minutes: estimatedReadTime,
      published_at: status === 'published' ? new Date().toISOString() : null,
    });

    setSaving(false);

    if (error) {
      setErrorMsg(error.message);
    } else if (post) {
      onPostCreated(post);
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 bg-black/60 backdrop-blur-xs animate-in fade-in overflow-y-auto">
      <div className="bg-white dark:bg-stone-900 rounded-2xl max-w-3xl w-full shadow-2xl border border-stone-200 dark:border-stone-800 overflow-hidden max-h-[92vh] flex flex-col my-auto transition-colors">
        {/* Header */}
        <div className="bg-stone-900 text-white px-6 py-4.5 flex items-center justify-between border-b border-stone-800 shrink-0">
          <div className="flex items-center gap-2.5">
            <div className="p-2 bg-emerald-600 rounded-lg text-white">
              <PenLine className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-bold text-base leading-tight">Write & Share Something</h3>
              <p className="text-xs text-stone-400">
                Explain a wonder, write a travel story, or share historical research
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-stone-400 hover:text-white p-1.5 rounded-lg hover:bg-stone-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Not signed in notice */}
        {!user && (
          <div className="bg-amber-50 dark:bg-amber-950/40 border-b border-amber-200 dark:border-amber-800/50 px-6 py-2.5 text-xs text-amber-900 dark:text-amber-200 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-amber-600 dark:text-amber-400" />
              <span>You are composing as a guest. Sign in to publish under your profile!</span>
            </div>
            <button
              onClick={onAuthRequired}
              className="text-xs font-bold underline hover:text-amber-950 dark:hover:text-amber-100"
            >
              Sign In Now →
            </button>
          </div>
        )}

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="p-6 overflow-y-auto space-y-5 flex-1 text-xs">
          {/* Topic Title */}
          <div>
            <label className="block font-bold text-stone-800 dark:text-stone-200 mb-1 text-xs uppercase tracking-wider">
              Topic / Headline *
            </label>
            <input
              type="text"
              required
              value={topic}
              onChange={(e) => handleTopicChange(e.target.value)}
              placeholder="e.g. The Untold Architectural Secrets of Petra's Water Channels"
              className="w-full px-3.5 py-2.5 text-sm font-semibold border border-stone-300 dark:border-stone-700 bg-white dark:bg-stone-800 text-stone-900 dark:text-white rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-600 placeholder:font-normal placeholder:text-stone-400"
            />
          </div>

          {/* Category, Location, and Status */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div>
              <label className="block font-semibold text-stone-700 dark:text-stone-300 mb-1">
                Category
              </label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value as WonderCategory)}
                className="w-full px-3 py-2 border border-stone-300 dark:border-stone-700 bg-white dark:bg-stone-800 text-stone-900 dark:text-stone-100 rounded-lg focus:ring-2 focus:ring-emerald-600"
              >
                <option value="New 7 Wonders">New 7 Wonders</option>
                <option value="Ancient Wonders">Ancient Wonders</option>
                <option value="History">History & Origins</option>
                <option value="Architecture">Architecture & Engineering</option>
                <option value="Travel Guide">Travel Guide / Journey</option>
              </select>
            </div>

            <div>
              <label className="block font-semibold text-stone-700 dark:text-stone-300 mb-1">
                Country / Region
              </label>
              <input
                type="text"
                value={country}
                onChange={(e) => setCountry(e.target.value)}
                placeholder="e.g. Jordan · Middle East"
                className="w-full px-3 py-2 border border-stone-300 dark:border-stone-700 bg-white dark:bg-stone-800 text-stone-900 dark:text-stone-100 rounded-lg focus:ring-2 focus:ring-emerald-600"
              />
            </div>

            <div>
              <label className="block font-semibold text-stone-700 dark:text-stone-300 mb-1">
                Publish Status
              </label>
              <select
                value={status}
                onChange={(e) => setStatus(e.target.value as 'published' | 'draft')}
                className="w-full px-3 py-2 border border-stone-300 dark:border-stone-700 bg-white dark:bg-stone-800 text-stone-900 dark:text-stone-100 rounded-lg focus:ring-2 focus:ring-emerald-600 font-semibold"
              >
                <option value="published">🚀 Publish to Community</option>
                <option value="draft">📝 Save as Private Draft</option>
              </select>
            </div>
          </div>

          {/* Quick Excerpt / Summary */}
          <div>
            <label className="block font-semibold text-stone-700 dark:text-stone-300 mb-1">
              Short Summary / Teaser
            </label>
            <input
              type="text"
              value={excerpt}
              onChange={(e) => setExcerpt(e.target.value)}
              placeholder="A brief 1-2 sentence preview for readers..."
              className="w-full px-3 py-2 border border-stone-300 dark:border-stone-700 bg-white dark:bg-stone-800 text-stone-900 dark:text-stone-100 rounded-lg focus:ring-2 focus:ring-emerald-600"
            />
          </div>

          {/* Explanation Content with Toolbar */}
          <div className="space-y-1.5">
            <div className="flex items-center justify-between">
              <label className="font-semibold text-stone-700 dark:text-stone-300">
                Detailed Explanation & Story *
              </label>
              <div className="flex items-center gap-3 text-[11px] text-stone-500 dark:text-stone-400">
                <span>{wordCount} words</span>
                <span>•</span>
                <span>~{estimatedReadTime} min read</span>
              </div>
            </div>

            {/* Formatting Toolbar */}
            <div className="flex flex-wrap items-center gap-1 p-1.5 bg-stone-100 dark:bg-stone-800 rounded-t-lg border border-b-0 border-stone-300 dark:border-stone-700 text-stone-700 dark:text-stone-300">
              <button
                type="button"
                onClick={() => insertFormatting('## Section Heading')}
                className="p-1 hover:bg-stone-200 dark:hover:bg-stone-700 rounded text-[11px] flex items-center gap-1 font-semibold"
                title="Heading"
              >
                <Heading className="w-3.5 h-3.5" /> H2
              </button>
              <button
                type="button"
                onClick={() => insertFormatting('**Bold Text**')}
                className="p-1 hover:bg-stone-200 dark:hover:bg-stone-700 rounded text-[11px] flex items-center gap-1 font-bold"
                title="Bold"
              >
                <Bold className="w-3.5 h-3.5" />
              </button>
              <button
                type="button"
                onClick={() => insertFormatting('*Italicized statement*')}
                className="p-1 hover:bg-stone-200 dark:hover:bg-stone-700 rounded text-[11px] flex items-center gap-1 italic"
                title="Italic"
              >
                <Italic className="w-3.5 h-3.5" />
              </button>
              <button
                type="button"
                onClick={() => insertFormatting('> Quotable historical detail or explorer insight')}
                className="p-1 hover:bg-stone-200 dark:hover:bg-stone-700 rounded text-[11px] flex items-center gap-1"
                title="Blockquote"
              >
                <Quote className="w-3.5 h-3.5" /> Quote
              </button>
              <button
                type="button"
                onClick={() => insertFormatting('- Key takeaway point 1\n- Key takeaway point 2')}
                className="p-1 hover:bg-stone-200 dark:hover:bg-stone-700 rounded text-[11px] flex items-center gap-1"
                title="Bullet List"
              >
                <List className="w-3.5 h-3.5" /> List
              </button>
            </div>

            <textarea
              rows={8}
              required
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="Explain your topic here in detail... Share the history, your personal observation, engineering facts, or travel recommendations."
              className="w-full p-3.5 text-xs sm:text-sm border border-stone-300 dark:border-stone-700 bg-white dark:bg-stone-800 text-stone-900 dark:text-stone-100 rounded-b-lg focus:outline-none focus:ring-2 focus:ring-emerald-600 font-mono leading-relaxed"
            />
          </div>

          {/* Cover Photo Choice (Presets or custom URL) */}
          <div className="space-y-2">
            <label className="block font-semibold text-stone-700 dark:text-stone-300">
              Select or Enter Cover Photo
            </label>
            <div className="grid grid-cols-4 sm:grid-cols-8 gap-2">
              {PRESET_IMAGES.map((preset) => (
                <button
                  type="button"
                  key={preset.name}
                  onClick={() => setCoverImage(preset.url)}
                  className={`relative rounded-lg overflow-hidden aspect-square border-2 transition-all ${
                    coverImage === preset.url
                      ? 'border-emerald-600 scale-105 shadow-xs'
                      : 'border-transparent opacity-75 hover:opacity-100'
                  }`}
                  title={preset.name}
                >
                  <img src={preset.url} alt={preset.name} className="w-full h-full object-cover" />
                  <span className="absolute inset-x-0 bottom-0 bg-black/60 text-white text-[9px] truncate px-1 py-0.5 text-center">
                    {preset.name}
                  </span>
                </button>
              ))}
            </div>

            <input
              type="url"
              value={coverImage}
              onChange={(e) => setCoverImage(e.target.value)}
              placeholder="Or enter custom image URL: https://images.unsplash.com/..."
              className="w-full px-3 py-1.5 text-xs border border-stone-300 dark:border-stone-700 bg-white dark:bg-stone-800 text-stone-900 dark:text-stone-100 rounded-lg focus:ring-2 focus:ring-emerald-600"
            />
          </div>

          {/* Tags */}
          <div>
            <label className="block font-semibold text-stone-700 dark:text-stone-300 mb-1">
              Tags (comma-separated)
            </label>
            <input
              type="text"
              value={tags}
              onChange={(e) => setTags(e.target.value)}
              placeholder="Engineering, History, Petra, Architecture"
              className="w-full px-3 py-2 border border-stone-300 dark:border-stone-700 bg-white dark:bg-stone-800 text-stone-900 dark:text-stone-100 rounded-lg focus:ring-2 focus:ring-emerald-600"
            />
          </div>

          {errorMsg && (
            <div className="p-3 rounded-lg bg-rose-50 dark:bg-rose-950/50 border border-rose-200 dark:border-rose-800 text-rose-900 dark:text-rose-200 flex items-center gap-2">
              <AlertCircle className="w-4 h-4 text-rose-600 shrink-0" />
              <span>{errorMsg}</span>
            </div>
          )}

          {/* Footer Actions */}
          <div className="pt-3 border-t border-stone-200 dark:border-stone-800 flex items-center justify-between">
            <span className="text-[11px] text-stone-500 dark:text-stone-400">
              Saved securely to Supabase PostgreSQL database
            </span>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 border border-stone-300 dark:border-stone-700 rounded-lg text-stone-700 dark:text-stone-300 hover:bg-stone-100 dark:hover:bg-stone-800 transition-colors"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={saving}
                className="inline-flex items-center gap-1.5 px-5 py-2 bg-emerald-700 hover:bg-emerald-800 disabled:opacity-50 text-white font-bold rounded-lg shadow-sm transition-colors text-xs"
              >
                <Sparkles className="w-3.5 h-3.5" />
                {saving ? 'Saving to Database...' : status === 'published' ? 'Publish Story' : 'Save Draft'}
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};
