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
        storageKey: 'sb-ymqlxvvschytbkkjexvd-auth-token'
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
    const { data, error } = await supabase.from('posts').select('*').limit(1)
    if (error) {
      console.error('❌ Connection failed:', error.message)
      return false
    }
    console.log('✅ Connected to Supabase! Sample data:', data)
    return true
  } catch (error) {
    console.error('❌ Connection error:', error)
    return false
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
    readTime: post.readTime || '5 min read',
    author: post.users?.name || post.author_name || 'Alex Johnson',
    author_id: post.user_id
  };
};

const transformPostsData = (posts) => {
  if (!Array.isArray(posts)) return [];
  return posts.map(transformPostData).filter(Boolean);
};

// Blog API functions
export const blogAPI = {
  // Get all posts
  async getPosts() {
    try {
      const { data, error } = await supabase
        .from('posts')
        .select(`
          *,
          users:user_id (name)
        `)
        .order('created_at', { ascending: false })
      
      if (error) {
        console.error('Error getting posts:', error)
        return []
      }
      
      const transformed = transformPostsData(data);
      console.log('Transformed posts:', transformed);
      return transformed || []
    } catch (error) {
      console.error('Error in getPosts:', error)
      return []
    }
  },

  // Get single post
  async getPost(id) {
    try {
      const { data, error } = await supabase
        .from('posts')
        .select(`
          *,
          users:user_id (name)
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
          users:user_id (name)
        `)
        .order('views', { ascending: false })
        .limit(limit)
      
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

  // Get comments
  async getComments(postId) {
    try {
      const { data, error } = await supabase
        .from('comments')
        .select('*')
        .eq('post_id', postId)
        .order('created_at', { ascending: false })
      
      if (error) {
        console.error('Error getting comments:', error)
        return []
      }
      
      // Transform comment data if needed
      const transformedComments = data?.map(comment => ({
        id: comment.id,
        author_name: comment.author_name || comment.author,
        content: comment.content || comment.text,
        avatar_url: comment.avatar_url || `https://i.pravatar.cc/150?img=${Math.floor(Math.random() * 70)}`,
        created_at: comment.created_at,
        likes: parseInt(comment.likes || 0),
        post_id: comment.post_id
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
      console.log('Adding comment with data:', { postId, commentData });
      
      const { data, error } = await supabase
        .from('comments')
        .insert([{
          post_id: parseInt(postId),
          author_name: commentData.user,
          author_email: commentData.email || 'anonymous@example.com',
          content: commentData.text,
          avatar_url: commentData.avatar || `https://i.pravatar.cc/150?img=${Math.floor(Math.random() * 70)}`,
          created_at: new Date().toISOString(),
          likes: 0
        }])
        .select()
      
      if (error) {
        console.error('Supabase error adding comment:', error);
        throw error;
      }
      
      console.log('Comment added successfully:', data);
      
      // Get current comment count
      const { data: post, error: postError } = await supabase
        .from('posts')
        .select('comments_count')
        .eq('id', postId)
        .single();
      
      const currentComments = postError ? 0 : parseInt(post?.comments_count || 0);
      
      // Update comment count
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

  // Like comment
  async likeComment(commentId) {
    try {
      const { data: comment, error: fetchError } = await supabase
        .from('comments')
        .select('likes')
        .eq('id', commentId)
        .single()
      
      if (fetchError) throw fetchError
      
      const currentLikes = parseInt(comment?.likes || 0)
      const newLikes = currentLikes + 1
      
      const { error: updateError } = await supabase
        .from('comments')
        .update({ likes: newLikes })
        .eq('id', commentId)
      
      if (updateError) throw updateError
      
      return newLikes
    } catch (error) {
      console.error('Error liking comment:', error)
      return 0
    }
  },

  // Create post (for admin)
  async createPost(postData) {
    try {
      const user = await authAPI.getCurrentUser();
      
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
        user_id: user?.id || null,
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

// Authentication API - FIXED VERSION
export const authAPI = {
  async register(email, password, name, username, role = 'user') {
    try {
      console.log('Starting registration for:', { email, name, username, role });
      
      // First, create the auth user WITHOUT email confirmation requirement
      const { data, error } = await supabase.auth.signUp({
        email: email,
        password: password,
        options: {
          data: {
            name: name,
            username: username,
            role: role
          },
          emailRedirectTo: `${window.location.origin}/admin/login` // Optional: where to redirect after confirmation
        }
      });

      console.log('Supabase auth response:', { data, error });

      if (error) {
        console.error('Supabase auth error:', error);
        return { 
          success: false, 
          error: error.message || 'Authentication failed' 
        };
      }

      if (data.user) {
        console.log('User created in auth, now creating profile...');
        
        // Wait a moment to ensure auth user is fully created
        await new Promise(resolve => setTimeout(resolve, 500));
        
        // Try to create user profile in public.users table
        try {
          const { data: profileData, error: profileError } = await supabase
            .from('users')
            .upsert({
              id: data.user.id,
              email: data.user.email,
              username: username || data.user.email.split('@')[0],
              name: name || 'User',
              role: role,
              created_at: new Date().toISOString(),
              updated_at: new Date().toISOString()
            }, {
              onConflict: 'id'
            })
            .select()
            .single();

          console.log('Profile creation response:', { profileData, profileError });

          if (profileError) {
            console.warn('Profile creation error:', profileError);
            
            // Try simpler insert without .single() and .select()
            const { error: simpleError } = await supabase
              .from('users')
              .insert({
                id: data.user.id,
                email: data.user.email,
                username: username || data.user.email.split('@')[0],
                name: name || 'User',
                role: role,
                created_at: new Date().toISOString(),
                updated_at: new Date().toISOString()
              });

            if (simpleError) {
              console.warn('Simple insert also failed:', simpleError);
            }
          }

          // Return success message based on email confirmation status
          const message = data.user.confirmed_at || data.user.email_confirmed_at
            ? 'Registration successful! You can now log in.'
            : 'Registration successful! Please check your email to confirm your account before logging in.';

          return {
            success: true,
            user: data.user,
            profile: profileData,
            message: message,
            emailConfirmed: !!(data.user.confirmed_at || data.user.email_confirmed_at)
          };
        } catch (profileError) {
          console.warn('Profile creation exception:', profileError);
          return {
            success: true,
            user: data.user,
            message: 'Account created! You can now log in.'
          };
        }
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
    console.log('Registering admin user:', { email, name, username });
    return this.register(email, password, name, username, 'admin');
  },

  async adminLogin(email, password) {
    try {
      console.log('Attempting login for:', email);
      
      const { data, error } = await supabase.auth.signInWithPassword({
        email: email,
        password: password
      });

      console.log('Login response:', { data, error });

      if (error) {
        console.error('Login error details:', error);
        
        // Provide more specific error messages
        let errorMessage = 'Invalid email or password';
        
        if (error.message.includes('Invalid login credentials')) {
          errorMessage = 'Invalid email or password. Please check your credentials.';
        } else if (error.message.includes('Email not confirmed')) {
          errorMessage = 'Please check your email to confirm your account before logging in.';
        } else if (error.message.includes('Email rate limit exceeded')) {
          errorMessage = 'Too many attempts. Please try again later.';
        } else if (error.message.includes('User already registered')) {
          errorMessage = 'An account with this email already exists. Please log in instead.';
        }
        
        return { 
          success: false, 
          error: errorMessage 
        };
      }

      if (data.user) {
        console.log('Login successful for user:', data.user.email);
        
        // Check if email is confirmed
        if (!data.user.email_confirmed_at && !data.user.confirmed_at) {
          console.warn('User email not confirmed:', data.user.email);
          
          // You can choose to allow login anyway or require confirmation
          // For now, we'll allow login but show a warning
          console.log('Allowing login even though email is not confirmed (for testing)');
        }
        
        // Try to get or create user profile
        try {
          const { data: userProfile, error: profileError } = await supabase
            .from('users')
            .select('role')
            .eq('id', data.user.id)
            .single();

          if (profileError || !userProfile) {
            console.log('Creating user profile on login...');
            
            const name = data.user.user_metadata?.name || 
                        data.user.email.split('@')[0] || 
                        'User';
            
            const { error: upsertError } = await supabase
              .from('users')
              .upsert({
                id: data.user.id,
                email: data.user.email,
                username: data.user.user_metadata?.username || data.user.email.split('@')[0],
                name: name,
                role: data.user.user_metadata?.role || 'user',
                updated_at: new Date().toISOString()
              }, {
                onConflict: 'id'
              });

            if (upsertError) {
              console.warn('Profile upsert error:', upsertError);
            } else {
              // Get the updated profile
              const { data: updatedProfile } = await supabase
                .from('users')
                .select('role')
                .eq('id', data.user.id)
                .single();
              userProfile = updatedProfile;
            }
          }

          // Store in localStorage for backward compatibility
          localStorage.setItem('admin_logged_in', 'true');
          localStorage.setItem('admin_username', data.user.email);
          localStorage.setItem('admin_session', Date.now().toString());

          return {
            success: true,
            user: data.user,
            isAdmin: userProfile?.role === 'admin'
          };
        } catch (profileError) {
          console.error('Profile handling error:', profileError);
          
          // Even if profile fails, still allow login
          localStorage.setItem('admin_logged_in', 'true');
          localStorage.setItem('admin_username', data.user.email);
          localStorage.setItem('admin_session', Date.now().toString());
          
          return {
            success: true,
            user: data.user,
            isAdmin: false
          };
        }
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

  async isLoggedIn() {
    try {
      // Check Supabase auth first
      const { data } = await supabase.auth.getSession();
      const hasSession = !!data.session;
      
      // Also check localStorage for backward compatibility
      const localStorageAuth = localStorage.getItem('admin_logged_in') === 'true';
      const sessionTime = parseInt(localStorage.getItem('admin_session') || '0');
      const currentTime = Date.now();
      
      if (localStorageAuth && (currentTime - sessionTime) > 24 * 60 * 60 * 1000) {
        localStorage.removeItem('admin_logged_in');
        localStorage.removeItem('admin_username');
        localStorage.removeItem('admin_session');
        return false;
      }
      
      return hasSession || localStorageAuth;
    } catch (error) {
      console.error('Auth check error:', error);
      return false;
    }
  },

  async getCurrentUser() {
    try {
      const { data } = await supabase.auth.getUser();
      return data.user;
    } catch (error) {
      console.error('Get current user error:', error);
      return null;
    }
  },

  async logout() {
    try {
      const { error } = await supabase.auth.signOut();
      
      // Clear localStorage
      localStorage.removeItem('admin_logged_in');
      localStorage.removeItem('admin_username');
      localStorage.removeItem('admin_session');
      
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
        return { success: false, error: error.message };
      }

      return {
        success: true,
        message: 'Password reset instructions sent to your email.'
      };
    } catch (error) {
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

// Test the connection and sync data
console.log('🔧 Testing Supabase connection...');
testConnection().then(success => {
  if (success) {
    console.log('🎉 Supabase is ready to use!');
  } else {
    console.warn('⚠️ Supabase connection failed. Check your credentials and tables.');
  }
});