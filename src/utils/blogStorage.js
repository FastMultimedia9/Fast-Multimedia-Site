// Storage utilities for fallback
export const trackView = (postId) => {
  try {
    const views = JSON.parse(localStorage.getItem('blog_views') || '{}')
    const currentViews = views[postId] || 0
    views[postId] = currentViews + 1
    localStorage.setItem('blog_views', JSON.stringify(views))
    return currentViews + 1
  } catch (error) {
    console.error('Error tracking view locally:', error)
    return 0
  }
}

export const getViews = (postId) => {
  try {
    const views = JSON.parse(localStorage.getItem('blog_views') || '{}')
    return views[postId] || 0
  } catch (error) {
    return 0
  }
}

export const addComment = (postId, commentData) => {
  try {
    const comments = JSON.parse(localStorage.getItem(`blog_comments_${postId}`) || '[]')
    comments.push({
      id: Date.now(),
      ...commentData,
      timestamp: new Date().toISOString(),
      likes: 0
    })
    localStorage.setItem(`blog_comments_${postId}`, JSON.stringify(comments))
  } catch (error) {
    console.error('Error adding comment locally:', error)
  }
}

export const getComments = (postId) => {
  try {
    return JSON.parse(localStorage.getItem(`blog_comments_${postId}`) || '[]')
  } catch (error) {
    return []
  }
}

export const likeComment = (postId, commentId) => {
  try {
    const comments = JSON.parse(localStorage.getItem(`blog_comments_${postId}`) || '[]')
    const updatedComments = comments.map(comment => {
      if (comment.id === commentId) {
        return { ...comment, likes: (comment.likes || 0) + 1 }
      }
      return comment
    })
    localStorage.setItem(`blog_comments_${postId}`, JSON.stringify(updatedComments))
  } catch (error) {
    console.error('Error liking comment locally:', error)
  }
}

export const saveArticle = (postId) => {
  try {
    const saved = JSON.parse(localStorage.getItem('blog_saved') || '[]')
    if (!saved.includes(postId)) {
      saved.push(postId)
      localStorage.setItem('blog_saved', JSON.stringify(saved))
    }
  } catch (error) {
    console.error('Error saving article:', error)
  }
}

export const isArticleSaved = (postId) => {
  try {
    const saved = JSON.parse(localStorage.getItem('blog_saved') || '[]')
    return saved.includes(postId)
  } catch (error) {
    return false
  }
}

export const removeSavedArticle = (postId) => {
  try {
    const saved = JSON.parse(localStorage.getItem('blog_saved') || '[]')
    const filtered = saved.filter(id => id !== postId)
    localStorage.setItem('blog_saved', JSON.stringify(filtered))
  } catch (error) {
    console.error('Error removing saved article:', error)
  }
}

export const getPopularPosts = (posts, limit = 5) => {
  return [...posts]
    .sort((a, b) => (b.views || 0) - (a.views || 0))
    .slice(0, limit)
}