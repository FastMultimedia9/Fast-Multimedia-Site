import React, { useState, useEffect } from 'react';
import { supabase, testConnection, blogAPI } from '../supabase';

const TestSupabase = () => {
  const [connectionStatus, setConnectionStatus] = useState('Testing...');
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({
    posts: 0,
    comments: 0,
    views: 0
  });

  useEffect(() => {
    const runTests = async () => {
      setLoading(true);
      
      // Test 1: Basic connection
      const connected = await testConnection();
      setConnectionStatus(connected ? '✅ Connected' : '❌ Failed');
      
      if (connected) {
        // Test 2: Get posts
        const postsData = await blogAPI.getPosts();
        setPosts(postsData);
        
        // Test 3: Get comments
        const allPosts = postsData || [];
        const commentsCount = allPosts.reduce((sum, post) => sum + (post.comments || 0), 0);
        const viewsCount = allPosts.reduce((sum, post) => sum + (post.views || 0), 0);
        
        setStats({
          posts: allPosts.length,
          comments: commentsCount,
          views: viewsCount
        });
      }
      
      setLoading(false);
    };
    
    runTests();
  }, []);

  const createTestPost = async () => {
    try {
      const newPost = {
        title: 'Test Post - ' + new Date().toLocaleString(),
        excerpt: 'This is a test post created from the admin panel.',
        content: '<h2>Test Content</h2><p>This post was created to test the Supabase connection.</p>',
        category: 'development',
        image_url: 'https://images.unsplash.com/photo-1551650975-87deedd944c3?w=800&auto=format&fit=crop',
        featured: false
      };
      
      const post = await blogAPI.createPost(newPost);
      if (post) {
        alert('Test post created successfully!');
        // Refresh posts
        const postsData = await blogAPI.getPosts();
        setPosts(postsData);
        setStats(prev => ({ ...prev, posts: postsData.length }));
      }
    } catch (error) {
      console.error('Error creating test post:', error);
      alert('Error creating test post');
    }
  };

  return (
    <div className="test-page">
      <div className="container">
        <h1>Supabase Connection Test</h1>
        
        <div className="connection-status">
          <h2>Connection Status: <span className={connectionStatus.includes('✅') ? 'success' : 'error'}>
            {connectionStatus}
          </span></h2>
          <p>Project: ymqlxvvschytbkkjexvd.supabase.co</p>
        </div>
        
        <div className="stats-grid">
          <div className="stat-card">
            <h3>{stats.posts}</h3>
            <p>Total Posts</p>
          </div>
          <div className="stat-card">
            <h3>{stats.comments}</h3>
            <p>Total Comments</p>
          </div>
          <div className="stat-card">
            <h3>{stats.views}</h3>
            <p>Total Views</p>
          </div>
        </div>
        
        <div className="test-actions">
          <button onClick={createTestPost} className="test-btn">
            Create Test Post
          </button>
          <button onClick={() => window.location.reload()} className="test-btn">
            Refresh Data
          </button>
        </div>
        
        {loading ? (
          <div className="loading">Loading data...</div>
        ) : posts.length > 0 ? (
          <div className="posts-table">
            <h2>Posts from Database</h2>
            <table>
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Title</th>
                  <th>Category</th>
                  <th>Views</th>
                  <th>Comments</th>
                  <th>Created</th>
                </tr>
              </thead>
              <tbody>
                {posts.map(post => (
                  <tr key={post.id}>
                    <td>{post.id}</td>
                    <td>{post.title}</td>
                    <td><span className="category-badge">{post.category}</span></td>
                    <td>{post.views}</td>
                    <td>{post.comments}</td>
                    <td>{new Date(post.created_at).toLocaleDateString()}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="no-data">
            <p>No posts found in database.</p>
            <button onClick={createTestPost} className="test-btn">
              Create Sample Data
            </button>
          </div>
        )}
      </div>
      
      <style jsx>{`
        .test-page {
          padding: 40px 20px;
          min-height: 100vh;
          background: #f8fafc;
        }
        
        .container {
          max-width: 1200px;
          margin: 0 auto;
        }
        
        h1 {
          color: #2d3748;
          margin-bottom: 30px;
        }
        
        .connection-status {
          background: white;
          padding: 25px;
          border-radius: 15px;
          margin-bottom: 30px;
          box-shadow: 0 10px 30px rgba(0,0,0,0.08);
        }
        
        .success {
          color: #38a169;
        }
        
        .error {
          color: #e53e3e;
        }
        
        .stats-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
          gap: 20px;
          margin-bottom: 30px;
        }
        
        .stat-card {
          background: white;
          padding: 25px;
          border-radius: 15px;
          text-align: center;
          box-shadow: 0 10px 30px rgba(0,0,0,0.08);
        }
        
        .stat-card h3 {
          font-size: 32px;
          color: #667eea;
          margin: 0 0 10px;
        }
        
        .stat-card p {
          color: #718096;
          margin: 0;
        }
        
        .test-actions {
          display: flex;
          gap: 15px;
          margin-bottom: 30px;
        }
        
        .test-btn {
          padding: 12px 25px;
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          color: white;
          border: none;
          border-radius: 10px;
          font-size: 16px;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.3s;
        }
        
        .test-btn:hover {
          transform: translateY(-2px);
          box-shadow: 0 10px 25px rgba(102, 126, 234, 0.3);
        }
        
        .posts-table {
          background: white;
          padding: 25px;
          border-radius: 15px;
          box-shadow: 0 10px 30px rgba(0,0,0,0.08);
        }
        
        table {
          width: 100%;
          border-collapse: collapse;
        }
        
        th, td {
          padding: 15px;
          text-align: left;
          border-bottom: 1px solid #e2e8f0;
        }
        
        th {
          background: #f7fafc;
          font-weight: 600;
          color: #2d3748;
        }
        
        .category-badge {
          background: #e0e7ff;
          color: #3730a3;
          padding: 4px 12px;
          border-radius: 20px;
          font-size: 12px;
          font-weight: 600;
        }
        
        .loading, .no-data {
          text-align: center;
          padding: 40px;
          background: white;
          border-radius: 15px;
          box-shadow: 0 10px 30px rgba(0,0,0,0.08);
          color: #718096;
        }
      `}</style>
    </div>
  );
};

export default TestSupabase;