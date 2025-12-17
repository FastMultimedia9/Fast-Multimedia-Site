import { createClient } from '@supabase/supabase-js'

// Your actual credentials
const supabaseUrl = 'https://ymqlxvvschytbkkjexvd.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InltcWx4dnZzY2h5dGJra2pleHZkIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjU5MjI2NjUsImV4cCI6MjA4MTQ5ODY2NX0.oZr6o8cg_WuJ83maXa-d8a3TfVAtQaGp3EXftUidjzo'

// Create Supabase client
export const supabase = createClient(supabaseUrl, supabaseKey, {
  auth: {
    persistSession: true,
    autoRefreshToken: true,
    detectSessionInUrl: true,
    storage: localStorage
  }
})

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
  
  // Check if data uses different field names (backend vs frontend)
  const transformed = {
    id: post.id || post.ID,
    title: post.title || post.Title || 'Untitled Post',
    category: (post.category || post.Category || 'general').toLowerCase(),
    views: parseInt(post.views || post.Views || 0),
    comments: parseInt(post.comments || post.Comments || 0),
    created_at: post.created_at || post.Date || post.createdAt || new Date().toISOString(),
    image_url: post.image_url || post.imageUrl || `https://images.unsplash.com/photo-${Math.floor(Math.random() * 1000)}?w=800&auto=format&fit=crop`,
    excerpt: post.excerpt || post.Excerpt || post.content?.substring(0, 150) + '...' || 'Read more about this topic...',
    content: post.content || post.Content || `<p>${post.title || 'This is a sample article content.'}</p>`,
    readTime: post.readTime || '5 min read',
    author: post.author || post.Author || 'Alex Johnson',
    featured: post.featured || false
  };
  
  return transformed;
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
        .select('*')
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
        .select('*')
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
        .select('*')
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
      
      const currentViews = parseInt(post?.views || post?.Views || 0)
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
      const post = await this.getPost(postId);
      const currentComments = parseInt(post?.comments || 0);
      
      // Update comment count
      await supabase
        .from('posts')
        .update({ comments: currentComments + 1 })
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
      const transformedData = transformPostData(postData);
      
      const { data, error } = await supabase
        .from('posts')
        .insert([{
          ...transformedData,
          created_at: new Date().toISOString(),
          views: 0,
          comments: 0,
          published: true
        }])
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
      const transformedData = transformPostData(postData);
      
      const { data, error } = await supabase
        .from('posts')
        .update(transformedData)
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
  },

  // Sync backend data - ensure all posts have required fields
  async syncPostsData() {
    try {
      console.log('Syncing posts data...');
      
      // Get all posts
      const { data: posts, error } = await supabase
        .from('posts')
        .select('*');
      
      if (error) {
        console.error('Error fetching posts for sync:', error);
        return false;
      }
      
      if (!posts || posts.length === 0) {
        console.log('No posts to sync');
        return false;
      }
      
      // Check and update each post if needed
      let updatedCount = 0;
      
      for (const post of posts) {
        const needsUpdate = 
          !post.image_url || 
          !post.excerpt || 
          !post.readTime ||
          !post.author;
        
        if (needsUpdate) {
          const updateData = {
            image_url: post.image_url || `https://images.unsplash.com/photo-${Math.floor(Math.random() * 1000)}?w=800&auto=format&fit=crop`,
            excerpt: post.excerpt || post.content?.substring(0, 150) + '...' || `Read more about ${post.title || 'this topic'}...`,
            readTime: post.readTime || '5 min read',
            author: post.author || 'Alex Johnson',
            featured: post.featured || false
          };
          
          const { error: updateError } = await supabase
            .from('posts')
            .update(updateData)
            .eq('id', post.id);
          
          if (!updateError) {
            updatedCount++;
          }
        }
      }
      
      console.log(`Synced ${updatedCount} posts`);
      return updatedCount > 0;
    } catch (error) {
      console.error('Error syncing posts:', error);
      return false;
    }
  }
};

// Authentication API (simplified for now)
export const authAPI = {
  async adminLogin(username, password) {
    // Simple validation
    if (username === 'admin' && password === 'admin123') {
      localStorage.setItem('admin_logged_in', 'true');
      localStorage.setItem('admin_username', username);
      localStorage.setItem('admin_session', Date.now().toString());
      
      return {
        success: true,
        user: { username: 'admin', isAdmin: true }
      };
    }
    
    return { success: false, error: 'Invalid credentials' };
  },

  isLoggedIn() {
    const loggedIn = localStorage.getItem('admin_logged_in') === 'true';
    const sessionTime = parseInt(localStorage.getItem('admin_session') || '0');
    const currentTime = Date.now();
    
    if (loggedIn && (currentTime - sessionTime) > 24 * 60 * 60 * 1000) {
      this.logout();
      return false;
    }
    
    return loggedIn;
  },

  getCurrentUser() {
    if (this.isLoggedIn()) {
      return {
        username: localStorage.getItem('admin_username'),
        isAdmin: true
      };
    }
    return null;
  },

  logout() {
    localStorage.removeItem('admin_logged_in');
    localStorage.removeItem('admin_username');
    localStorage.removeItem('admin_session');
    return true;
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
testConnection().then(async success => {
  if (success) {
    console.log('🎉 Supabase is ready to use!');
    
    // Sync data on startup
    try {
      await blogAPI.syncPostsData();
      console.log('✅ Data sync complete');
    } catch (error) {
      console.warn('⚠️ Data sync failed, but continuing...');
    }
  } else {
    console.warn('⚠️ Supabase connection failed. Check your credentials and tables.');
  }
});