import { createClient } from '@supabase/supabase-js'

// Your actual credentials
const supabaseUrl = 'https://ymqlxvvschytbkkjexvd.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InltcWx4dnZzY2h5dGJra2pleHZkIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjU5MjI2NjUsImV4cCI6MjA4MTQ5ODY2NX0.oZr6o8cg_WuJ83maXa-d8a3TfVAtQaGp3EXftUidjzo'

// Create client - SIMPLIFIED
export const supabase = createClient(supabaseUrl, supabaseKey)

// Simple data transformation
const transformPostData = (post) => {
  if (!post) return null;
  
  return {
    id: post.id,
    title: post.title || 'Untitled Post',
    excerpt: post.excerpt || (post.content ? post.content.substring(0, 150) + '...' : 'Read more...'),
    content: post.content || '',
    category: (post.category || 'general').toLowerCase(),
    image_url: post.image_url || `https://images.unsplash.com/photo-${Math.floor(Math.random() * 1000)}?w=800&auto=format&fit=crop`,
    views: parseInt(post.views || 0),
    comments: parseInt(post.comments_count || 0),
    likes: parseInt(post.likes || 0),
    featured: post.featured || false,
    published: post.published !== false,
    created_at: post.created_at || new Date().toISOString(),
    readTime: '5 min read',
    author: 'Author',
    user_id: post.user_id
  };
};

const transformPostsData = (posts) => {
  if (!Array.isArray(posts)) return [];
  return posts.map(transformPostData).filter(Boolean);
};

// Utility functions - ADDED THESE
export const formatNumber = (num) => {
  if (!num && num !== 0) return '0';
  
  const number = parseInt(num);
  
  if (isNaN(number)) return '0';
  
  if (number >= 1000000) return (number / 1000000).toFixed(1) + 'M';
  if (number >= 1000) return (number / 1000).toFixed(1) + 'K';
  return number.toString();
};

export const formatTimeAgo = (timestamp) => {
  if (!timestamp) return 'Just now';
  
  const date = new Date(timestamp);
  const now = new Date();
  const seconds = Math.floor((now - date) / 1000);
  
  let interval = Math.floor(seconds / 31536000);
  if (interval >= 1) return interval + ' year' + (interval > 1 ? 's' : '') + ' ago';
  
  interval = Math.floor(seconds / 2592000);
  if (interval >= 1) return interval + ' month' + (interval > 1 ? 's' : '') + ' ago';
  
  interval = Math.floor(seconds / 86400);
  if (interval >= 1) return interval + ' day' + (interval > 1 ? 's' : '') + ' ago';
  
  interval = Math.floor(seconds / 3600);
  if (interval >= 1) return interval + ' hour' + (interval > 1 ? 's' : '') + ' ago';
  
  interval = Math.floor(seconds / 60);
  if (interval >= 1) return interval + ' minute' + (interval > 1 ? 's' : '') + ' ago';
  
  return 'Just now';
};

// SIMPLE BLOG API
export const blogAPI = {
  async getPosts() {
    try {
      console.log('📡 Fetching posts from Supabase...');
      
      const { data, error } = await supabase
        .from('posts')
        .select('*')
        .order('created_at', { ascending: false });
      
      if (error) {
        console.log('⚠️ Error fetching posts:', error.message);
        // Return empty array for any error
        return [];
      }
      
      console.log(`✅ Found ${data?.length || 0} posts`);
      return data || [];
    } catch (error) {
      console.log('❌ Exception in getPosts:', error.message);
      return [];
    }
  },

  async getUserPosts() {
    try {
      // Just get all published posts for simplicity
      const { data, error } = await supabase
        .from('posts')
        .select('*')
        .eq('published', true)
        .order('created_at', { ascending: false });
      
      if (error) {
        console.log('⚠️ Error in getUserPosts:', error.message);
        return transformPostsData([]);
      }
      
      return transformPostsData(data || []);
    } catch (error) {
      console.log('❌ Exception in getUserPosts:', error.message);
      return transformPostsData([]);
    }
  },

  async getPost(id) {
    try {
      const { data, error } = await supabase
        .from('posts')
        .select('*')
        .eq('id', id)
        .maybeSingle();
      
      if (error) throw error;
      if (!data) return null;
      
      return transformPostData(data);
    } catch (error) {
      console.log('❌ Error in getPost:', error.message);
      return null;
    }
  },

  async trackView(postId) {
    try {
      const { data: post } = await supabase
        .from('posts')
        .select('views')
        .eq('id', postId)
        .single();
      
      const currentViews = parseInt(post?.views || 0);
      const newViews = currentViews + 1;
      
      await supabase
        .from('posts')
        .update({ views: newViews })
        .eq('id', postId);
      
      return newViews;
    } catch (error) {
      console.log('⚠️ Error tracking view:', error.message);
      return 0;
    }
  },

  // Get comments for a post
  async getComments(postId) {
    try {
      const { data, error } = await supabase
        .from('comments')
        .select('*')
        .eq('post_id', postId)
        .order('created_at', { ascending: false });
      
      if (error) {
        console.log('Error getting comments:', error.message);
        return [];
      }
      
      // Transform comment data
      const transformedComments = data?.map(comment => ({
        id: comment.id,
        author_name: comment.author_name || 'Anonymous',
        author_email: comment.author_email,
        content: comment.content,
        avatar_url: comment.avatar_url || `https://i.pravatar.cc/150?img=${Math.floor(Math.random() * 70)}`,
        created_at: comment.created_at,
        likes: parseInt(comment.likes || 0),
        post_id: comment.post_id,
        user_id: comment.user_id
      })) || [];
      
      return transformedComments;
    } catch (error) {
      console.log('Error in getComments:', error.message);
      return [];
    }
  },

  // Add comment
  async addComment(postId, commentData) {
    try {
      const { data: user } = await supabase.auth.getUser();
      
      const commentToInsert = {
        post_id: parseInt(postId),
        user_id: user?.user?.id || null,
        author_name: commentData.user || user?.user?.email?.split('@')[0] || 'Anonymous',
        author_email: commentData.email || user?.user?.email || 'anonymous@example.com',
        content: commentData.text,
        avatar_url: commentData.avatar || `https://i.pravatar.cc/150?img=${Math.floor(Math.random() * 70)}`,
        created_at: new Date().toISOString(),
        likes: 0
      };
      
      const { data, error } = await supabase
        .from('comments')
        .insert([commentToInsert])
        .select();
      
      if (error) throw error;
      
      return data[0];
    } catch (error) {
      console.log('Error adding comment:', error.message);
      return null;
    }
  },

  // Like comment
  async likeComment(commentId) {
    try {
      // Get current likes
      const { data: comment, error: fetchError } = await supabase
        .from('comments')
        .select('likes')
        .eq('id', commentId)
        .single();
      
      if (fetchError) throw fetchError;
      
      const currentLikes = parseInt(comment?.likes || 0);
      const newLikes = currentLikes + 1;
      
      // Update likes
      const { error: updateError } = await supabase
        .from('comments')
        .update({ likes: newLikes })
        .eq('id', commentId);
      
      if (updateError) throw updateError;
      
      return newLikes;
    } catch (error) {
      console.log('Error in likeComment:', error.message);
      return null;
    }
  },

  // Create post
  async createPost(postData) {
    try {
      const { data: user } = await supabase.auth.getUser();
      
      if (!user?.user) {
        throw new Error('User must be logged in to create posts');
      }
      
      const postToInsert = {
        title: postData.title || 'Untitled Post',
        excerpt: postData.excerpt || (postData.content ? postData.content.substring(0, 150) + '...' : 'Read more...'),
        content: postData.content || '',
        category: (postData.category || 'general').toLowerCase(),
        image_url: postData.image_url || `https://images.unsplash.com/photo-${Math.floor(Math.random() * 1000)}?w=800&auto=format&fit=crop`,
        views: 0,
        comments_count: 0,
        likes: 0,
        featured: postData.featured || false,
        published: postData.published !== false,
        user_id: user.user.id,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      };
      
      const { data, error } = await supabase
        .from('posts')
        .insert([postToInsert])
        .select();
      
      if (error) throw error;
      
      return transformPostData(data[0]);
    } catch (error) {
      console.log('Error in createPost:', error.message);
      return null;
    }
  },

  // Real-time subscriptions (optional, commented out for simplicity)
  /*
  onCommentsUpdate(postId, callback) {
    const channel = supabase
      .channel(`comments:${postId}`)
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'comments',
          filter: `post_id=eq.${postId}`
        },
        async () => {
          const comments = await this.getComments(postId);
          callback(comments);
        }
      )
      .subscribe();
    
    return () => {
      supabase.removeChannel(channel);
    };
  }
  */
};

// SIMPLE AUTH API
export const authAPI = {
  async getCurrentUser() {
    try {
      const { data } = await supabase.auth.getSession();
      return data?.session?.user || null;
    } catch {
      return null;
    }
  },

  async getCurrentUserWithProfile() {
    try {
      const { data: sessionData } = await supabase.auth.getSession();
      
      if (!sessionData?.session?.user) {
        return null;
      }
      
      const user = sessionData.session.user;
      
      // Simple profile - can be extended if you have a users table
      const profile = { 
        role: 'user', 
        name: user.email?.split('@')[0] || 'User' 
      };
      
      return {
        ...user,
        profile: profile
      };
    } catch (error) {
      console.log('Get current user error:', error.message);
      return null;
    }
  }
};

console.log('✅ Supabase initialized successfully');