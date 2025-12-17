import React, { useState, useEffect } from 'react';
import { supabase } from '../supabase';
import './AdminView.css';

const AdminView = () => {
  const [posts, setPosts] = useState([]);
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('posts');

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    setLoading(true);
    
    // Fetch posts
    const { data: postsData } = await supabase
      .from('posts')
      .select('*')
      .order('created_at', { ascending: false });
    
    // Fetch comments with post info
    const { data: commentsData } = await supabase
      .from('comments')
      .select(`
        *,
        posts(title)
      `)
      .order('created_at', { ascending: false });
    
    setPosts(postsData || []);
    setComments(commentsData || []);
    setLoading(false);
  };

  const deletePost = async (id) => {
    if (window.confirm('Delete this post?')) {
      await supabase.from('posts').delete().eq('id', id);
      fetchData();
    }
  };

  const deleteComment = async (id) => {
    if (window.confirm('Delete this comment?')) {
      await supabase.from('comments').delete().eq('id', id);
      fetchData();
    }
  };

  if (loading) {
    return <div className="loading">Loading database content...</div>;
  }

  return (
    <div className="admin-view">
      <h1>Database Content Viewer</h1>
      
      <div className="tabs">
        <button 
          className={activeTab === 'posts' ? 'active' : ''}
          onClick={() => setActiveTab('posts')}
        >
          Posts ({posts.length})
        </button>
        <button 
          className={activeTab === 'comments' ? 'active' : ''}
          onClick={() => setActiveTab('comments')}
        >
          Comments ({comments.length})
        </button>
        <button 
          className={activeTab === 'stats' ? 'active' : ''}
          onClick={() => setActiveTab('stats')}
        >
          Stats
        </button>
      </div>

      {activeTab === 'posts' && (
        <div className="posts-table">
          <h2>Blog Posts</h2>
          <table>
            <thead>
              <tr>
                <th>ID</th>
                <th>Title</th>
                <th>Category</th>
                <th>Views</th>
                <th>Comments</th>
                <th>Created</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {posts.map(post => (
                <tr key={post.id}>
                  <td>{post.id}</td>
                  <td className="title-cell">
                    <strong>{post.title}</strong>
                    <small>{post.excerpt?.substring(0, 50)}...</small>
                  </td>
                  <td><span className="category-badge">{post.category}</span></td>
                  <td>{post.views}</td>
                  <td>{post.comments}</td>
                  <td>{new Date(post.created_at).toLocaleDateString()}</td>
                  <td>
                    <button 
                      className="btn-view"
                      onClick={() => window.open(`/blog/${post.id}`, '_blank')}
                    >
                      View
                    </button>
                    <button 
                      className="btn-delete"
                      onClick={() => deletePost(post.id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {activeTab === 'comments' && (
        <div className="comments-table">
          <h2>Comments</h2>
          <table>
            <thead>
              <tr>
                <th>ID</th>
                <th>Post</th>
                <th>Author</th>
                <th>Comment</th>
                <th>Likes</th>
                <th>Created</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {comments.map(comment => (
                <tr key={comment.id}>
                  <td>{comment.id}</td>
                  <td>{comment.posts?.title || `Post ${comment.post_id}`}</td>
                  <td>
                    <div className="author-info">
                      <strong>{comment.author_name}</strong>
                      <small>{comment.author_email}</small>
                    </div>
                  </td>
                  <td className="comment-content">{comment.content}</td>
                  <td>{comment.likes}</td>
                  <td>{new Date(comment.created_at).toLocaleDateString()}</td>
                  <td>
                    <button 
                      className="btn-delete"
                      onClick={() => deleteComment(comment.id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {activeTab === 'stats' && (
        <div className="stats">
          <h2>Database Statistics</h2>
          <div className="stats-grid">
            <div className="stat-card">
              <h3>{posts.length}</h3>
              <p>Total Posts</p>
            </div>
            <div className="stat-card">
              <h3>{comments.length}</h3>
              <p>Total Comments</p>
            </div>
            <div className="stat-card">
              <h3>{posts.reduce((sum, post) => sum + (post.views || 0), 0)}</h3>
              <p>Total Views</p>
            </div>
            <div className="stat-card">
              <h3>{posts.filter(p => p.featured).length}</h3>
              <p>Featured Posts</p>
            </div>
          </div>
          
          <div className="category-stats">
            <h3>Posts by Category</h3>
            <ul>
              {Object.entries(
                posts.reduce((acc, post) => {
                  acc[post.category || 'uncategorized'] = (acc[post.category || 'uncategorized'] || 0) + 1;
                  return acc;
                }, {})
              ).map(([category, count]) => (
                <li key={category}>
                  <span className="category-name">{category}</span>
                  <span className="category-count">{count} posts</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}

      <div className="refresh-section">
        <button onClick={fetchData} className="refresh-btn">
          ↻ Refresh Data
        </button>
        <small>Last updated: {new Date().toLocaleTimeString()}</small>
      </div>
    </div>
  );
};

export default AdminView;