export type WonderCategory = 
  | 'New 7 Wonders'
  | 'Ancient Wonders'
  | 'History'
  | 'Architecture'
  | 'Travel Guide';

export interface Profile {
  id: string;
  display_name: string | null;
  avatar_url: string | null;
  bio: string | null;
  created_at: string;
  updated_at: string;
}

export interface UserRole {
  user_id: string;
  role: 'reader' | 'admin';
  created_at: string;
}

export interface BlogPost {
  id: string;
  author_id: string;
  title: string;
  slug: string;
  excerpt: string | null;
  content: string;
  cover_image: string | null;
  category: WonderCategory | string;
  tags: string[];
  status: 'draft' | 'published';
  published_at: string | null;
  created_at: string;
  updated_at: string;
  // Extended fields for rich display
  location?: string;
  country?: string;
  era?: string;
  reading_time_minutes?: number;
  author_profile?: Profile;
}

export interface Bookmark {
  id: string;
  user_id: string;
  post_id: string;
  created_at: string;
  post?: BlogPost;
}

export interface Comment {
  id: string;
  post_id: string;
  user_id: string;
  content: string;
  created_at: string;
  updated_at: string;
  user_profile?: Profile;
}

export interface WonderComparisonItem {
  id: string;
  wonder: string;
  type: 'Modern' | 'Ancient' | 'Honorary';
  country: string;
  period: string;
  highlight: string;
  statusText: string;
  coordinates?: string;
  image: string;
  slug: string;
}
