import { createClient } from '@supabase/supabase-js'

// Use your actual credentials
const supabaseUrl = 'https://ymqlxvvschytbkkjexvd.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InltcWx4dnZzY2h5dGJra2pleHZkIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjU5MjI2NjUsImV4cCI6MjA4MTQ5ODY2NX0.oZr6o8cg_WuJ83maXa-d8a3TfVAtQaGp3EXftUidjzo'

// Create Supabase client
export const supabase = createClient(supabaseUrl, supabaseKey, {
  auth: {
    persistSession: true,
    autoRefreshToken: true,
    detectSessionInUrl: true
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
    console.log('✅ Connected to Supabase!')
    return true
  } catch (error) {
    console.error('❌ Connection error:', error)
    return false
  }
}

// Blog API functions
export const blogAPI = {
  // Get all posts
  async getPosts() {
    const { data, error } = await supabase
      .from('posts')
      .select('*')
      .order('created_at', { ascending: false })
    
    if (error) {
      console.error('Error getting posts:', error)
      return []
    }
    return data
  },

  // Get single post
  async getPost(id) {
    const { data, error } = await supabase
      .from('posts')
      .select('*')
      .eq('id', id)
      .single()
    
    if (error) {
      console.error('Error getting post:', error)
      return null
    }
    return data
  },

  // Get popular posts
  async getPopularPosts(limit = 5) {
    const { data, error } = await supabase
      .from('posts')
      .select('*')
      .order('views', { ascending: false })
      .limit(limit)
    
    if (error) {
      console.error('Error getting popular posts:', error)
      return []
    }
    return data
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
      
      const currentViews = post?.views || 0
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
    const { data, error } = await supabase
      .from('comments')
      .select('*')
      .eq('post_id', postId)
      .order('created_at', { ascending: false })
    
    if (error) {
      console.error('Error getting comments:', error)
      return []
    }
    return data
  },

  // Add comment
  async addComment(postId, commentData) {
    try {
      const { data, error } = await supabase
        .from('comments')
        .insert([{
          post_id: postId,
          author_name: commentData.user,
          author_email: commentData.email || 'anonymous@example.com',
          content: commentData.text,
          avatar_url: commentData.avatar,
          created_at: new Date().toISOString()
        }])
        .select()
      
      if (error) throw error
      
      // Update comment count
      const { data: post } = await this.getPost(postId)
      if (post) {
        await supabase
          .from('posts')
          .update({ comments: (post.comments || 0) + 1 })
          .eq('id', postId)
      }
      
      return data[0]
    } catch (error) {
      console.error('Error adding comment:', error)
      return null
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
      
      const currentLikes = comment?.likes || 0
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
}

// Authentication API
export const authAPI = {
  async adminLogin(username, password) {
    // Simple validation (in production, use Supabase Auth)
    if (username === 'admin' && password === 'admin123') {
      localStorage.setItem('admin_logged_in', 'true')
      localStorage.setItem('admin_username', username)
      localStorage.setItem('admin_session', Date.now().toString())
      
      return {
        success: true,
        user: { username: 'admin', isAdmin: true }
      }
    }
    
    return { success: false, error: 'Invalid credentials' }
  },

  isLoggedIn() {
    const loggedIn = localStorage.getItem('admin_logged_in') === 'true'
    const sessionTime = parseInt(localStorage.getItem('admin_session') || '0')
    const currentTime = Date.now()
    
    if (loggedIn && (currentTime - sessionTime) > 24 * 60 * 60 * 1000) {
      this.logout()
      return false
    }
    
    return loggedIn
  },

  getCurrentUser() {
    if (this.isLoggedIn()) {
      return {
        username: localStorage.getItem('admin_username'),
        isAdmin: true
      }
    }
    return null
  },

  logout() {
    localStorage.removeItem('admin_logged_in')
    localStorage.removeItem('admin_username')
    localStorage.removeItem('admin_session')
    return true
  }
}

// Utility functions
export const formatNumber = (num) => {
  if (!num && num !== 0) return '0'
  
  if (num >= 1000000) return (num / 1000000).toFixed(1) + 'M'
  if (num >= 1000) return (num / 1000).toFixed(1) + 'K'
  return num.toString()
}

export const formatTimeAgo = (timestamp) => {
  if (!timestamp) return 'Just now'
  
  const date = new Date(timestamp)
  const now = new Date()
  const seconds = Math.floor((now - date) / 1000)
  
  let interval = Math.floor(seconds / 31536000)
  if (interval >= 1) return interval + ' year' + (interval > 1 ? 's' : '') + ' ago'
  
  interval = Math.floor(seconds / 2592000)
  if (interval >= 1) return interval + ' month' + (interval > 1 ? 's' : '') + ' ago'
  
  interval = Math.floor(seconds / 86400)
  if (interval >= 1) return interval + ' day' + (interval > 1 ? 's' : '') + ' ago'
  
  interval = Math.floor(seconds / 3600)
  if (interval >= 1) return interval + ' hour' + (interval > 1 ? 's' : '') + ' ago'
  
  interval = Math.floor(seconds / 60)
  if (interval >= 1) return interval + ' minute' + (interval > 1 ? 's' : '') + ' ago'
  
  return 'Just now'
}

// Test the connection immediately
console.log('🔧 Testing Supabase connection...')
testConnection().then(success => {
  if (success) {
    console.log('🎉 Supabase is ready to use!')
  } else {
    console.warn('⚠️ Supabase connection failed. Check your credentials and tables.')
  }
})