import React, { useState, useEffect } from 'react';
import { supabase, blogAPI } from '../supabase';
import './DatabaseViewer.css';

const DatabaseViewer = () => {
  const [activeTable, setActiveTable] = useState('posts');
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [stats, setStats] = useState({
    posts: 0,
    comments: 0,
    totalViews: 0,
    totalComments: 0
  });

  useEffect(() => {
    fetchData();
  }, [activeTable]);

  const fetchData = async () => {
    setLoading(true);
    
    try {
      let result;
      
      if (activeTable === 'posts') {
        result = await supabase
          .from('posts')
          .select('*')
          .order('created_at', { ascending: false });
      } else if (activeTable === 'comments') {
        result = await supabase
          .from('comments')
          .select(`
            *,
            posts(title)
          `)
          .order('created_at', { ascending: false });
      }
      
      if (result.data) {
        setData(result.data);
      }
      
      // Fetch stats
      const postsData = await blogAPI.getPosts();
      const commentsData = await supabase
        .from('comments')
        .select('*');
      
      setStats({
        posts: postsData.length,
        comments: commentsData.data?.length || 0,
        totalViews: postsData.reduce((sum, post) => sum + (post.views || 0), 0),
        totalComments: postsData.reduce((sum, post) => sum + (post.comments || 0), 0)
      });
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this item?')) {
      try {
        const { error } = await supabase
          .from(activeTable)
          .delete()
          .eq('id', id);
        
        if (error) throw error;
        
        alert('Item deleted successfully!');
        fetchData();
      } catch (error) {
        console.error('Error deleting item:', error);
        alert('Error deleting item');
      }
    }
  };

  const filteredData = data.filter(item => {
    if (!searchQuery.trim()) return true;
    
    const searchLower = searchQuery.toLowerCase();
    
    if (activeTable === 'posts') {
      return (
        item.title?.toLowerCase().includes(searchLower) ||
        item.content?.toLowerCase().includes(searchLower) ||
        item.category?.toLowerCase().includes(searchLower)
      );
    } else if (activeTable === 'comments') {
      return (
        item.author_name?.toLowerCase().includes(searchLower) ||
        item.content?.toLowerCase().includes(searchLower) ||
        item.posts?.title?.toLowerCase().includes(searchLower)
      );
    }
    
    return true;
  });

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div className="database-viewer">
      <div className="container">
        <div className="viewer-header">
          <h1>Database Viewer</h1>
          <p>View and manage your Supabase database tables</p>
        </div>
        
        <div className="stats-overview">
          <div className="stat-item">
            <i className="fas fa-newspaper"></i>
            <div>
              <h3>{stats.posts}</h3>
              <p>Total Posts</p>
            </div>
          </div>
          <div className="stat-item">
            <i className="fas fa-comments"></i>
            <div>
              <h3>{stats.comments}</h3>
              <p>Total Comments</p>
            </div>
          </div>
          <div className="stat-item">
            <i className="fas fa-eye"></i>
            <div>
              <h3>{stats.totalViews}</h3>
              <p>Total Views</p>
            </div>
          </div>
          <div className="stat-item">
            <i className="fas fa-comment-alt"></i>
            <div>
              <h3>{stats.totalComments}</h3>
              <p>Post Comments</p>
            </div>
          </div>
        </div>
        
        <div className="viewer-controls">
          <div className="table-tabs">
            <button 
              className={`tab-btn ${activeTable === 'posts' ? 'active' : ''}`}
              onClick={() => setActiveTable('posts')}
            >
              <i className="fas fa-newspaper"></i> Posts
            </button>
            <button 
              className={`tab-btn ${activeTable === 'comments' ? 'active' : ''}`}
              onClick={() => setActiveTable('comments')}
            >
              <i className="fas fa-comments"></i> Comments
            </button>
          </div>
          
          <div className="search-box">
            <i className="fas fa-search"></i>
            <input
              type="text"
              placeholder={`Search ${activeTable}...`}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="search-input"
            />
          </div>
          
          <button onClick={fetchData} className="refresh-btn">
            <i className="fas fa-sync-alt"></i> Refresh
          </button>
        </div>
        
        {loading ? (
          <div className="loading">
            <div className="spinner"></div>
            <p>Loading data...</p>
          </div>
        ) : (
          <div className="data-table">
            {activeTable === 'posts' ? (
              <table>
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Title</th>
                    <th>Category</th>
                    <th>Views</th>
                    <th>Comments</th>
                    <th>Featured</th>
                    <th>Created</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredData.map(post => (
                    <tr key={post.id}>
                      <td>{post.id}</td>
                      <td className="title-cell">
                        <strong>{post.title}</strong>
                        <small>{post.excerpt?.substring(0, 60)}...</small>
                      </td>
                      <td>
                        <span className={`category-badge ${post.category}`}>
                          {post.category}
                        </span>
                      </td>
                      <td>{post.views}</td>
                      <td>{post.comments}</td>
                      <td>
                        {post.featured ? (
                          <span className="featured-tag">✓</span>
                        ) : (
                          <span className="not-featured">—</span>
                        )}
                      </td>
                      <td>{formatDate(post.created_at)}</td>
                      <td>
                        <button 
                          className="view-btn"
                          onClick={() => window.open(`/blog/${post.id}`, '_blank')}
                        >
                          <i className="fas fa-eye"></i>
                        </button>
                        <button 
                          className="delete-btn"
                          onClick={() => handleDelete(post.id)}
                        >
                          <i className="fas fa-trash"></i>
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
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
                  {filteredData.map(comment => (
                    <tr key={comment.id}>
                      <td>{comment.id}</td>
                      <td>
                        <a 
                          href={`/blog/${comment.post_id}`} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="post-link"
                        >
                          {comment.posts?.title || `Post ${comment.post_id}`}
                        </a>
                      </td>
                      <td>
                        <div className="author-info">
                          <strong>{comment.author_name}</strong>
                          <small>{comment.author_email}</small>
                        </div>
                      </td>
                      <td className="comment-cell">{comment.content}</td>
                      <td>{comment.likes}</td>
                      <td>{formatDate(comment.created_at)}</td>
                      <td>
                        <button 
                          className="delete-btn"
                          onClick={() => handleDelete(comment.id)}
                        >
                          <i className="fas fa-trash"></i>
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
            
            {filteredData.length === 0 && (
              <div className="no-data">
                <i className="fas fa-database"></i>
                <h3>No {activeTable} found</h3>
                <p>{searchQuery ? 'Try a different search term' : 'Database table is empty'}</p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default DatabaseViewer;