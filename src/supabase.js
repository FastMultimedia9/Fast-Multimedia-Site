import { createClient } from '@supabase/supabase-js'

// Your actual credentials
const supabaseUrl = 'https://ymqlxvvschytbkkjexvd.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InltcWx4dnZzY2h5dGJra2pleHZkIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjU5MjI2NjUsImV4cCI6MjA4MTQ5ODY2NX0.oZr6o8cg_WuJ83maXa-d8a3TfVAtQaGp3EXftUidjzo'

// SINGLETON PATTERN - Only create client once
let supabaseInstance = null;

const getSupabase = () => {
  if (!supabaseInstance) {
    supabaseInstance = createClient(supabaseUrl, supabaseKey, {
      auth: {
        persistSession: true,
        autoRefreshToken: true,
        detectSessionInUrl: true,
        storage: localStorage,
        storageKey: 'sb-auth-token',
        // Disable email confirmation for development
        autoConfirmEmail: true
      },
      global: {
        headers: {
          'Content-Type': 'application/json'
        }
      }
    });
  }
  return supabaseInstance;
};

// Export a single instance
export const supabase = getSupabase();

// Test connection
export const testConnection = async () => {
  try {
    // Simple test query
    const { data, error } = await supabase
      .from('posts')
      .select('id')
      .limit(1);
    
    if (error) {
      console.error('❌ Connection failed:', error.message);
      return false;
    }
    
    console.log('✅ Connected to Supabase!');
    return true;
  } catch (error) {
    console.error('❌ Connection error:', error);
    return false;
  }
}

// Data transformation functions
const transformPostData = (post) => {
  if (!post) return null;
  
  return {
    id: post.id,
    title: post.title || 'Untitled Post',
    excerpt: post.excerpt || (post.content ? post.content.substring(0, 150) + '...' : 'Read more...'),
    content: post.content || '',
    category: (post.category || 'general').toLowerCase(),
    image_url: post.image_url || `https://images.unsplash.com/photo-${Math.floor(Math.random() * 1000)}?w=800&auto=format&fit=crop`,
    theme: post.theme || 'default',
    views: parseInt(post.views || 0),
    comments: parseInt(post.comments_count || 0),
    likes: parseInt(post.likes || 0),
    featured: post.featured || false,
    published: post.published !== false,
    created_at: post.created_at || new Date().toISOString(),
    updated_at: post.updated_at || new Date().toISOString(),
    readTime: '5 min read',
    author: post.users?.name || post.users?.username || 'Author',
    author_id: post.user_id,
    user_id: post.user_id
  };
};

const transformPostsData = (posts) => {
  if (!Array.isArray(posts)) return [];
  return posts.map(transformPostData).filter(Boolean);
};

// Blog API functions
export const blogAPI = {
  // Get posts based on user role
  async getPosts() {
    try {
      const { data, error } = await supabase
        .from('posts')
        .select(`
          *,
          users:user_id (name, username, email)
        `)
        .order('created_at', { ascending: false })
      
      if (error) {
        console.error('Error getting posts:', error)
        return []
      }
      
      return transformPostsData(data) || []
    } catch (error) {
      console.error('Error in getPosts:', error)
      return []
    }
  },

  // Get user-specific posts
  async getUserPosts(userId = null) {
    try {
      const user = await authAPI.getCurrentUserWithProfile();
      const isAdmin = user?.profile?.role === 'admin';
      
      let query = supabase
        .from('posts')
        .select(`
          *,
          users:user_id (name, username, email)
        `)
        .order('created_at', { ascending: false });
      
      // If not admin, filter client-side
      const { data, error } = await query;
      
      if (error) {
        console.error('Error getting user posts:', error);
        return [];
      }
      
      const transformed = transformPostsData(data) || [];
      
      // Client-side filtering
      if (!isAdmin) {
        if (userId && user) {
          return transformed.filter(post => post.user_id === userId);
        } else if (user) {
          return transformed.filter(post => 
            post.user_id === user.id || post.published === true
          );
        } else {
          return transformed.filter(post => post.published === true);
        }
      }
      
      return transformed;
    } catch (error) {
      console.error('Error in getUserPosts:', error);
      return [];
    }
  },

  // Get single post
  async getPost(id) {
    try {
      const { data, error } = await supabase
        .from('posts')
        .select(`
          *,
          users:user_id (name, username, email)
        `)
        .eq('id', id)
        .single()
      
      if (error) {
        console.error('Error getting post:', error)
        return null
      }
      
      return transformPostData(data)
    } catch (error) {
      console.error('Error in getPost:', error)
      return null
    }
  },

  // Get popular posts
  async getPopularPosts(limit = 5) {
    try {
      const { data, error } = await supabase
        .from('posts')
        .select(`
          *,
          users:user_id (name, username, email)
        `)
        .order('views', { ascending: false })
        .limit(limit);
      
      if (error) {
        console.error('Error getting popular posts:', error)
        return []
      }
      
      return transformPostsData(data) || []
    } catch (error) {
      console.error('Error in getPopularPosts:', error)
      return []
    }
  },

  // Track view count
  async trackView(postId) {
    try {
      // Get current views
      const { data: post, error: fetchError } = await supabase
        .from('posts')
        .select('views')
        .eq('id', postId)
        .single()
      
      if (fetchError) {
        console.error('Error fetching post for view tracking:', fetchError)
        return 0
      }
      
      const currentViews = parseInt(post?.views || 0)
      const newViews = currentViews + 1
      
      // Update views
      const { error: updateError } = await supabase
        .from('posts')
        .update({ views: newViews })
        .eq('id', postId)
      
      if (updateError) {
        console.error('Error updating view count:', updateError)
        return currentViews
      }
      
      return newViews
    } catch (error) {
      console.error('Error in trackView:', error)
      return 0
    }
  },

  // Get comments for a post
  async getComments(postId) {
    try {
      const { data, error } = await supabase
        .from('comments')
        .select(`
          *,
          users:user_id (name, email)
        `)
        .eq('post_id', postId)
        .order('created_at', { ascending: false })
      
      if (error) {
        console.error('Error getting comments:', error)
        return []
      }
      
      // Transform comment data
      const transformedComments = data?.map(comment => ({
        id: comment.id,
        author_name: comment.author_name || comment.users?.name || 'Anonymous',
        author_email: comment.author_email || comment.users?.email,
        content: comment.content,
        avatar_url: comment.avatar_url || `https://i.pravatar.cc/150?img=${Math.floor(Math.random() * 70)}`,
        created_at: comment.created_at,
        likes: parseInt(comment.likes || 0),
        post_id: comment.post_id,
        user_id: comment.user_id
      })) || [];
      
      return transformedComments
    } catch (error) {
      console.error('Error in getComments:', error)
      return []
    }
  },

  // Add comment
  async addComment(postId, commentData) {
    try {
      const user = await authAPI.getCurrentUser();
      const commentToInsert = {
        post_id: parseInt(postId),
        user_id: user?.id || null,
        author_name: commentData.user || user?.email?.split('@')[0] || 'Anonymous',
        author_email: commentData.email || user?.email || 'anonymous@example.com',
        content: commentData.text,
        avatar_url: commentData.avatar || `https://i.pravatar.cc/150?img=${Math.floor(Math.random() * 70)}`,
        created_at: new Date().toISOString(),
        likes: 0
      };
      
      const { data, error } = await supabase
        .from('comments')
        .insert([commentToInsert])
        .select()
      
      if (error) {
        console.error('Supabase error adding comment:', error);
        throw error;
      }
      
      // Update comment count
      const { data: post } = await supabase
        .from('posts')
        .select('comments_count')
        .eq('id', postId)
        .single();
      
      const currentComments = parseInt(post?.comments_count || 0);
      
      await supabase
        .from('posts')
        .update({ comments_count: currentComments + 1 })
        .eq('id', postId);
      
      return data[0];
    } catch (error) {
      console.error('Error adding comment:', error);
      return null;
    }
  },

  // Create post
  async createPost(postData) {
    try {
      const user = await authAPI.getCurrentUserWithProfile();
      
      if (!user) {
        throw new Error('User must be logged in to create posts');
      }
      
      const postToInsert = {
        title: postData.title || 'Untitled Post',
        excerpt: postData.excerpt || (postData.content ? postData.content.substring(0, 150) + '...' : 'Read more...'),
        content: postData.content || '',
        category: (postData.category || 'general').toLowerCase(),
        image_url: postData.image_url || `https://images.unsplash.com/photo-${Math.floor(Math.random() * 1000)}?w=800&auto=format&fit=crop`,
        theme: postData.theme || 'default',
        views: 0,
        comments_count: 0,
        likes: 0,
        featured: postData.featured || false,
        published: postData.published !== false,
        user_id: user.id,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      };
      
      const { data, error } = await supabase
        .from('posts')
        .insert([postToInsert])
        .select()
      
      if (error) {
        console.error('Error creating post:', error)
        return null
      }
      return transformPostData(data[0])
    } catch (error) {
      console.error('Error in createPost:', error)
      return null
    }
  },

  // Update post
  async updatePost(id, postData) {
    try {
      const user = await authAPI.getCurrentUserWithProfile();
      const isAdmin = user?.profile?.role === 'admin';
      
      // First, check if user owns the post or is admin
      const { data: existingPost } = await supabase
        .from('posts')
        .select('user_id')
        .eq('id', id)
        .single();
      
      if (!existingPost) {
        throw new Error('Post not found');
      }
      
      if (!isAdmin && existingPost.user_id !== user.id) {
        throw new Error('You do not have permission to update this post');
      }
      
      const { data, error } = await supabase
        .from('posts')
        .update({
          title: postData.title,
          excerpt: postData.excerpt,
          content: postData.content,
          category: postData.category,
          image_url: postData.image_url,
          theme: postData.theme,
          featured: postData.featured,
          published: postData.published,
          updated_at: new Date().toISOString()
        })
        .eq('id', id)
        .select()
      
      if (error) {
        console.error('Error updating post:', error)
        return null
      }
      return transformPostData(data[0])
    } catch (error) {
      console.error('Error in updatePost:', error)
      return null
    }
  },

  // Delete post
  async deletePost(id) {
    try {
      const user = await authAPI.getCurrentUserWithProfile();
      const isAdmin = user?.profile?.role === 'admin';
      
      // First, check if user owns the post or is admin
      const { data: existingPost } = await supabase
        .from('posts')
        .select('user_id')
        .eq('id', id)
        .single();
      
      if (!existingPost) {
        throw new Error('Post not found');
      }
      
      if (!isAdmin && existingPost.user_id !== user.id) {
        throw new Error('You do not have permission to delete this post');
      }
      
      const { error } = await supabase
        .from('posts')
        .delete()
        .eq('id', id)
      
      if (error) {
        console.error('Error deleting post:', error)
        return false
      }
      return true
    } catch (error) {
      console.error('Error in deletePost:', error)
      return false
    }
  },

  // Real-time subscriptions
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
          const comments = await this.getComments(postId)
          callback(comments)
        }
      )
      .subscribe()
    
    return () => {
      supabase.removeChannel(channel)
    }
  },

  onPostsUpdate(callback) {
    const channel = supabase
      .channel('posts')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'posts'
        },
        async () => {
          const posts = await this.getPosts()
          callback(posts)
        }
      )
      .subscribe()
    
    return () => {
      supabase.removeChannel(channel)
    }
  }
};

// Authentication API - SIMPLIFIED VERSION
export const authAPI = {
  async register(email, password, name, username, role = 'user') {
    try {
      console.log('Starting registration for:', { email, name, username, role });
      
      // Disable email confirmation for immediate login
      const { data, error } = await supabase.auth.signUp({
        email: email,
        password: password,
        options: {
          data: {
            name: name,
            username: username,
            role: role
          },
          // Disable email confirmation
          emailRedirectTo: `${window.location.origin}/login`
        }
      });

      if (error) {
        console.error('Supabase auth error:', error);
        return { 
          success: false, 
          error: error.message || 'Registration failed. Please try again.' 
        };
      }

      if (data.user) {
        console.log('Auth user created:', data.user.id);
        
        // Try to manually create user profile with retry
        let retryCount = 0;
        const maxRetries = 3;
        
        while (retryCount < maxRetries) {
          try {
            const { error: profileError } = await supabase
              .from('users')
              .insert({
                id: data.user.id,
                email: email,
                username: username,
                name: name,
                role: role
              })
              .select();
            
            if (!profileError) break;
            
            console.warn(`Profile creation attempt ${retryCount + 1} failed:`, profileError);
            retryCount++;
            await new Promise(resolve => setTimeout(resolve, 1000)); // Wait 1 second
          } catch (profileErr) {
            console.error('Profile creation exception:', profileErr);
            retryCount++;
          }
        }
        
        // Auto-login after registration
        const loginResult = await this.adminLogin(email, password);
        
        if (loginResult.success) {
          return {
            success: true,
            user: loginResult.user,
            profile: loginResult.profile,
            message: 'Registration successful! You are now logged in.'
          };
        }
        
        return {
          success: true,
          user: data.user,
          message: 'Registration successful! You can now log in.'
        };
      }

      return { 
        success: false, 
        error: 'Registration failed - no user returned from server' 
      };
    } catch (error) {
      console.error('Registration exception:', error);
      return { 
        success: false, 
        error: error.message || 'Registration failed. Please try again.' 
      };
    }
  },

  async registerAdmin(email, password, name, username) {
    return this.register(email, password, name, username, 'admin');
  },

  async adminLogin(email, password) {
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email: email,
        password: password
      });

      if (error) {
        console.error('Login error:', error);
        let errorMessage = 'Invalid email or password';
        
        if (error.message.includes('Invalid login credentials')) {
          errorMessage = 'Invalid email or password. Please check your credentials.';
        } else if (error.message.includes('Email not confirmed')) {
          errorMessage = 'Please check your email to confirm your account before logging in.';
        } else {
          errorMessage = error.message;
        }
        
        return { 
          success: false, 
          error: errorMessage 
        };
      }

      if (data.user) {
        // Try to get user profile, but don't fail if it doesn't exist
        let profile = { role: 'user', name: data.user.email?.split('@')[0] || 'User' };
        
        try {
          const { data: profileData, error: profileError } = await supabase
            .from('users')
            .select('*')
            .eq('id', data.user.id)
            .maybeSingle(); // Use maybeSingle to avoid throwing error if no profile
          
          if (!profileError && profileData) {
            profile = profileData;
          } else if (profileError && !profileError.message.includes('No rows found')) {
            console.warn('Profile fetch error (non-critical):', profileError);
          }
        } catch (profileErr) {
          console.warn('Profile fetch exception:', profileErr);
        }

        // Store in localStorage
        localStorage.setItem('admin_logged_in', 'true');
        localStorage.setItem('admin_username', data.user.email);
        localStorage.setItem('admin_session', Date.now().toString());
        if (profile.role === 'admin') {
          localStorage.setItem('admin_role', 'admin');
        }

        return {
          success: true,
          user: data.user,
          profile: profile,
          isAdmin: profile?.role === 'admin'
        };
      }

      return { success: false, error: 'Login failed' };
    } catch (error) {
      console.error('Login exception:', error);
      return { 
        success: false, 
        error: 'Login failed. Please check your connection and try again.' 
      };
    }
  },

  async getCurrentUserWithProfile() {
    try {
      // Get auth session first
      const { data: sessionData } = await supabase.auth.getSession();
      
      if (!sessionData?.session) {
        return null;
      }
      
      // Get user from session
      const { data: authData, error: authError } = await supabase.auth.getUser();
      
      if (authError || !authData?.user) {
        console.error('Auth error:', authError);
        return null;
      }
      
      // Try to get profile
      let profile = { role: 'user', name: authData.user.email?.split('@')[0] || 'User' };
      
      try {
        const { data: profileData } = await supabase
          .from('users')
          .select('*')
          .eq('id', authData.user.id)
          .maybeSingle();
        
        if (profileData) {
          profile = profileData;
        }
      } catch (profileErr) {
        console.warn('Profile fetch in getCurrentUserWithProfile:', profileErr);
      }
      
      return {
        ...authData.user,
        profile: profile
      };
    } catch (error) {
      console.error('Get current user with profile error:', error);
      return null;
    }
  },

  async getCurrentUser() {
    try {
      const { data } = await supabase.auth.getUser();
      return data?.user || null;
    } catch (error) {
      console.error('Get current user error:', error);
      return null;
    }
  },

  async getUserRole() {
    try {
      const user = await this.getCurrentUserWithProfile();
      return user?.profile?.role || 'user';
    } catch (error) {
      console.error('Get user role error:', error);
      return 'user';
    }
  },

  async isAdmin() {
    // Check localStorage first (for backward compatibility)
    if (localStorage.getItem('admin_role') === 'admin') {
      return true;
    }
    
    // Then check from profile
    const role = await this.getUserRole();
    return role === 'admin';
  },

  async isLoggedIn() {
    try {
      // Check Supabase auth session
      const { data } = await supabase.auth.getSession();
      const hasSession = !!data?.session;
      
      // Also check localStorage for backward compatibility
      const localStorageAuth = localStorage.getItem('admin_logged_in') === 'true';
      const sessionTime = parseInt(localStorage.getItem('admin_session') || '0');
      const currentTime = Date.now();
      
      if (localStorageAuth && (currentTime - sessionTime) > 24 * 60 * 60 * 1000) {
        localStorage.removeItem('admin_logged_in');
        localStorage.removeItem('admin_username');
        localStorage.removeItem('admin_session');
        localStorage.removeItem('admin_role');
        return false;
      }
      
      return hasSession || localStorageAuth;
    } catch (error) {
      console.error('Auth check error:', error);
      return false;
    }
  },

  async logout() {
    try {
      const { error } = await supabase.auth.signOut();
      
      // Clear localStorage
      localStorage.removeItem('admin_logged_in');
      localStorage.removeItem('admin_username');
      localStorage.removeItem('admin_session');
      localStorage.removeItem('admin_role');
      
      if (error) {
        console.error('Logout error:', error);
        return false;
      }
      return true;
    } catch (error) {
      console.error('Logout exception:', error);
      return false;
    }
  },

  async resetPassword(email) {
    try {
      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${window.location.origin}/reset-password`,
      });

      if (error) {
        console.error('Reset password error:', error);
        return { success: false, error: error.message };
      }

      return {
        success: true,
        message: 'Password reset instructions sent to your email.'
      };
    } catch (error) {
      console.error('Reset password exception:', error);
      return { success: false, error: 'Password reset failed. Please try again.' };
    }
  },

  // Helper function for backward compatibility
  checkLocalStorageAuth() {
    const loggedIn = localStorage.getItem('admin_logged_in') === 'true';
    const sessionTime = parseInt(localStorage.getItem('admin_session') || '0');
    const currentTime = Date.now();
    
    if (loggedIn && (currentTime - sessionTime) > 24 * 60 * 60 * 1000) {
      localStorage.removeItem('admin_logged_in');
      localStorage.removeItem('admin_username');
      localStorage.removeItem('admin_session');
      localStorage.removeItem('admin_role');
      return false;
    }
    
    return loggedIn;
  }
};

// Utility functions
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

// Test the connection
console.log('🔧 Testing Supabase connection...');
testConnection().then(success => {
  if (success) {
    console.log('🎉 Supabase is ready to use!');
  } else {
    console.warn('⚠️ Supabase connection failed.');
  }
});