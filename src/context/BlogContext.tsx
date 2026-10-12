import React, { createContext, useContext, useEffect, useState, useCallback } from 'react';
import { BlogPost, Bookmark, Comment } from '../types/database';
import { SEED_POSTS, INITIAL_COMMENTS } from '../data/seedData';
import { getSupabase, isSupabaseConfigured } from '../lib/supabase';
import { useAuth } from './AuthContext';

interface BlogContextType {
  posts: BlogPost[];
  bookmarks: Bookmark[];
  loadingPosts: boolean;
  loadingBookmarks: boolean;
  refreshPosts: () => Promise<void>;
  refreshBookmarks: () => Promise<void>;
  getCommentsForPost: (postId: string) => Promise<Comment[]>;
  addComment: (postId: string, content: string) => Promise<{ error: Error | null }>;
  updateComment: (commentId: string, content: string) => Promise<{ error: Error | null }>;
  deleteComment: (commentId: string) => Promise<{ error: Error | null }>;
  toggleBookmark: (postId: string) => Promise<{ isBookmarked: boolean; error: Error | null }>;
  isBookmarked: (postId: string) => boolean;
  createPost: (post: Omit<BlogPost, 'id' | 'created_at' | 'updated_at'>) => Promise<{ error: Error | null; post?: BlogPost }>;
  updatePost: (id: string, updates: Partial<BlogPost>) => Promise<{ error: Error | null }>;
  deletePost: (id: string) => Promise<{ error: Error | null }>;
}

const BlogContext = createContext<BlogContextType | undefined>(undefined);

const LOCAL_STORAGE_POSTS = 'seven_wonders_posts';
const LOCAL_STORAGE_BOOKMARKS = 'seven_wonders_bookmarks';
const LOCAL_STORAGE_COMMENTS = 'seven_wonders_comments';

export const BlogProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { user, profile, role, isConfigured } = useAuth();
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [bookmarks, setBookmarks] = useState<Bookmark[]>([]);
  const [loadingPosts, setLoadingPosts] = useState<boolean>(true);
  const [loadingBookmarks, setLoadingBookmarks] = useState<boolean>(false);

  // Load posts
  const refreshPosts = useCallback(async () => {
    setLoadingPosts(true);
    const supabase = getSupabase();

    if (isConfigured && supabase) {
      try {
        // Query published posts, or author's drafts
        let query = supabase.from('blog_posts').select('*').order('published_at', { ascending: false });
        const { data, error } = await query;

        if (error) {
          console.error('Error fetching posts from Supabase:', error);
          loadLocalPosts();
        } else if (data && data.length > 0) {
          setPosts(data as BlogPost[]);
        } else {
          // If Supabase table is empty, seed it with initial posts
          setPosts(SEED_POSTS);
        }
      } catch (err) {
        console.error('Fetch posts exception:', err);
        loadLocalPosts();
      }
    } else {
      loadLocalPosts();
    }
    setLoadingPosts(false);
  }, [isConfigured]);

  const loadLocalPosts = () => {
    try {
      const stored = localStorage.getItem(LOCAL_STORAGE_POSTS);
      if (stored) {
        setPosts(JSON.parse(stored));
      } else {
        setPosts(SEED_POSTS);
        localStorage.setItem(LOCAL_STORAGE_POSTS, JSON.stringify(SEED_POSTS));
      }
    } catch {
      setPosts(SEED_POSTS);
    }
  };

  // Load bookmarks for current user
  const refreshBookmarks = useCallback(async () => {
    if (!user) {
      setBookmarks([]);
      return;
    }

    setLoadingBookmarks(true);
    const supabase = getSupabase();

    if (isConfigured && supabase) {
      try {
        const { data, error } = await supabase
          .from('bookmarks')
          .select('*, post:blog_posts(*)')
          .eq('user_id', user.id);

        if (!error && data) {
          setBookmarks(data as Bookmark[]);
        } else {
          loadLocalBookmarks();
        }
      } catch {
        loadLocalBookmarks();
      }
    } else {
      loadLocalBookmarks();
    }
    setLoadingBookmarks(false);
  }, [user, isConfigured]);

  const loadLocalBookmarks = () => {
    if (!user) return;
    try {
      const stored = localStorage.getItem(`${LOCAL_STORAGE_BOOKMARKS}_${user.id}`);
      if (stored) {
        const parsed = JSON.parse(stored) as Bookmark[];
        // Attach post object from current posts
        const hydrated = parsed.map((bm) => ({
          ...bm,
          post: posts.find((p) => p.id === bm.post_id),
        }));
        setBookmarks(hydrated);
      } else {
        setBookmarks([]);
      }
    } catch {
      setBookmarks([]);
    }
  };

  useEffect(() => {
    refreshPosts();
  }, [refreshPosts]);

  useEffect(() => {
    refreshBookmarks();
  }, [refreshBookmarks, posts]);

  const isBookmarked = (postId: string): boolean => {
    return bookmarks.some((b) => b.post_id === postId);
  };

  const toggleBookmark = async (postId: string): Promise<{ isBookmarked: boolean; error: Error | null }> => {
    if (!user) {
      return { isBookmarked: false, error: new Error('Please sign in to save bookmarks.') };
    }

    const currentlySaved = isBookmarked(postId);
    const supabase = getSupabase();

    if (isConfigured && supabase) {
      try {
        if (currentlySaved) {
          const { error } = await supabase
            .from('bookmarks')
            .delete()
            .match({ user_id: user.id, post_id: postId });

          if (error) return { isBookmarked: true, error };
          setBookmarks((prev) => prev.filter((b) => b.post_id !== postId));
          return { isBookmarked: false, error: null };
        } else {
          const { data, error } = await supabase
            .from('bookmarks')
            .insert({ user_id: user.id, post_id: postId })
            .select()
            .single();

          if (error) return { isBookmarked: false, error };
          const post = posts.find((p) => p.id === postId);
          setBookmarks((prev) => [...prev, { ...data, post }]);
          return { isBookmarked: true, error: null };
        }
      } catch (err) {
        return { isBookmarked: currentlySaved, error: err as Error };
      }
    } else {
      // Local fallback
      let updated: Bookmark[];
      if (currentlySaved) {
        updated = bookmarks.filter((b) => b.post_id !== postId);
        setBookmarks(updated);
        localStorage.setItem(`${LOCAL_STORAGE_BOOKMARKS}_${user.id}`, JSON.stringify(updated));
        return { isBookmarked: false, error: null };
      } else {
        const newBm: Bookmark = {
          id: 'bm-' + Date.now(),
          user_id: user.id,
          post_id: postId,
          created_at: new Date().toISOString(),
          post: posts.find((p) => p.id === postId),
        };
        updated = [...bookmarks, newBm];
        setBookmarks(updated);
        localStorage.setItem(`${LOCAL_STORAGE_BOOKMARKS}_${user.id}`, JSON.stringify(updated));
        return { isBookmarked: true, error: null };
      }
    }
  };

  const getCommentsForPost = async (postId: string): Promise<Comment[]> => {
    const supabase = getSupabase();

    if (isConfigured && supabase) {
      try {
        const { data, error } = await supabase
          .from('comments')
          .select('*, user_profile:profiles(*)')
          .eq('post_id', postId)
          .order('created_at', { ascending: true });

        if (!error && data) {
          return data as Comment[];
        }
      } catch (err) {
        console.warn('Error fetching comments from Supabase:', err);
      }
    }

    // Local / seed fallback
    try {
      const stored = localStorage.getItem(`${LOCAL_STORAGE_COMMENTS}_${postId}`);
      if (stored) {
        return JSON.parse(stored);
      }
      const initial = INITIAL_COMMENTS.filter((c) => c.post_id === postId);
      return initial;
    } catch {
      return [];
    }
  };

  const addComment = async (postId: string, content: string): Promise<{ error: Error | null }> => {
    if (!user) {
      return { error: new Error('You must be signed in to post a comment.') };
    }

    const trimmed = content.trim();
    if (!trimmed) {
      return { error: new Error('Comment cannot be empty.') };
    }

    const supabase = getSupabase();

    if (isConfigured && supabase) {
      try {
        const { error } = await supabase.from('comments').insert({
          post_id: postId,
          user_id: user.id,
          content: trimmed,
        });

        return { error };
      } catch (err) {
        return { error: err as Error };
      }
    } else {
      // Local mode
      const newComment: Comment = {
        id: 'comment-' + Date.now(),
        post_id: postId,
        user_id: user.id,
        content: trimmed,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
        user_profile: profile || {
          id: user.id,
          display_name: user.email?.split('@')[0] || 'Traveler',
          avatar_url: `https://api.dicebear.com/7.x/bottts/svg?seed=${user.id}`,
          bio: null,
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
        },
      };

      const existing = await getCommentsForPost(postId);
      const updated = [...existing, newComment];
      localStorage.setItem(`${LOCAL_STORAGE_COMMENTS}_${postId}`, JSON.stringify(updated));
      return { error: null };
    }
  };

  const updateComment = async (commentId: string, content: string): Promise<{ error: Error | null }> => {
    if (!user) return { error: new Error('You must be signed in.') };

    const supabase = getSupabase();
    if (isConfigured && supabase) {
      try {
        const { error } = await supabase
          .from('comments')
          .update({
            content: content.trim(),
            updated_at: new Date().toISOString(),
          })
          .match({ id: commentId, user_id: user.id });

        return { error };
      } catch (err) {
        return { error: err as Error };
      }
    } else {
      // Local fallback for all posts
      for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);
        if (key && key.startsWith(LOCAL_STORAGE_COMMENTS)) {
          const comments: Comment[] = JSON.parse(localStorage.getItem(key) || '[]');
          const idx = comments.findIndex((c) => c.id === commentId && c.user_id === user.id);
          if (idx !== -1) {
            comments[idx].content = content.trim();
            comments[idx].updated_at = new Date().toISOString();
            localStorage.setItem(key, JSON.stringify(comments));
            return { error: null };
          }
        }
      }
      return { error: null };
    }
  };

  const deleteComment = async (commentId: string): Promise<{ error: Error | null }> => {
    if (!user) return { error: new Error('You must be signed in.') };

    const supabase = getSupabase();
    if (isConfigured && supabase) {
      try {
        const { error } = await supabase
          .from('comments')
          .delete()
          .match({ id: commentId, user_id: user.id });

        return { error };
      } catch (err) {
        return { error: err as Error };
      }
    } else {
      // Local fallback
      for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);
        if (key && key.startsWith(LOCAL_STORAGE_COMMENTS)) {
          const comments: Comment[] = JSON.parse(localStorage.getItem(key) || '[]');
          const filtered = comments.filter((c) => !(c.id === commentId && c.user_id === user.id));
          if (filtered.length !== comments.length) {
            localStorage.setItem(key, JSON.stringify(filtered));
            return { error: null };
          }
        }
      }
      return { error: null };
    }
  };

  const createPost = async (
    newPostData: Omit<BlogPost, 'id' | 'created_at' | 'updated_at'>
  ): Promise<{ error: Error | null; post?: BlogPost }> => {
    if (!user) {
      return { error: new Error('You must be signed in to write and publish.') };
    }

    const supabase = getSupabase();
    const now = new Date().toISOString();

    if (isConfigured && supabase) {
      try {
        const { data, error } = await supabase
          .from('blog_posts')
          .insert({
            ...newPostData,
            author_id: user.id,
            created_at: now,
            updated_at: now,
          })
          .select()
          .single();

        if (error) return { error };
        await refreshPosts();
        return { error: null, post: data as BlogPost };
      } catch (err) {
        return { error: err as Error };
      }
    } else {
      const created: BlogPost = {
        ...newPostData,
        id: 'post-' + Date.now(),
        author_id: user.id,
        created_at: now,
        updated_at: now,
        author_profile: profile || undefined,
      };

      const updated = [created, ...posts];
      setPosts(updated);
      localStorage.setItem(LOCAL_STORAGE_POSTS, JSON.stringify(updated));
      return { error: null, post: created };
    }
  };

  const updatePost = async (id: string, updates: Partial<BlogPost>): Promise<{ error: Error | null }> => {
    if (!user) return { error: new Error('Authentication required.') };

    const supabase = getSupabase();
    const now = new Date().toISOString();

    if (isConfigured && supabase) {
      try {
        const { error } = await supabase
          .from('blog_posts')
          .update({
            ...updates,
            updated_at: now,
          })
          .eq('id', id);

        if (error) return { error };
        await refreshPosts();
        return { error: null };
      } catch (err) {
        return { error: err as Error };
      }
    } else {
      const updated = posts.map((p) => (p.id === id ? { ...p, ...updates, updated_at: now } : p));
      setPosts(updated);
      localStorage.setItem(LOCAL_STORAGE_POSTS, JSON.stringify(updated));
      return { error: null };
    }
  };

  const deletePost = async (id: string): Promise<{ error: Error | null }> => {
    if (!user) return { error: new Error('Authentication required.') };

    const supabase = getSupabase();
    if (isConfigured && supabase) {
      try {
        const { error } = await supabase.from('blog_posts').delete().eq('id', id);
        if (error) return { error };
        await refreshPosts();
        return { error: null };
      } catch (err) {
        return { error: err as Error };
      }
    } else {
      const filtered = posts.filter((p) => p.id !== id);
      setPosts(filtered);
      localStorage.setItem(LOCAL_STORAGE_POSTS, JSON.stringify(filtered));
      return { error: null };
    }
  };

  return (
    <BlogContext.Provider
      value={{
        posts,
        bookmarks,
        loadingPosts,
        loadingBookmarks,
        refreshPosts,
        refreshBookmarks,
        getCommentsForPost,
        addComment,
        updateComment,
        deleteComment,
        toggleBookmark,
        isBookmarked,
        createPost,
        updatePost,
        deletePost,
      }}
    >
      {children}
    </BlogContext.Provider>
  );
};

export const useBlog = () => {
  const context = useContext(BlogContext);
  if (!context) {
    throw new Error('useBlog must be used within a BlogProvider');
  }
  return context;
};
