import React, { useState, useEffect } from 'react';
import { supabase } from '../supabase'; // Make sure you're importing supabase
import './TestSupabase.css';

const TestSupabase = () => {
  const [connectionStatus, setConnectionStatus] = useState('Testing...');
  const [tables, setTables] = useState([]);
  const [sampleData, setSampleData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const testConnection = async () => {
      try {
        setIsLoading(true);
        
        // Test posts table
        const { data: postsData, error: postsError } = await supabase
          .from('posts')
          .select('*')
          .limit(3);
        
        // Test users table
        const { data: usersData, error: usersError } = await supabase
          .from('users')
          .select('*')
          .limit(3);
        
        // Test comments table
        const { data: commentsData, error: commentsError } = await supabase
          .from('comments')
          .select('*')
          .limit(3);

        if (postsError && usersError && commentsError) {
          setConnectionStatus('❌ Failed to connect to any tables');
        } else {
          setConnectionStatus('✅ Connected to Supabase!');
          
          // Get available tables
          const availableTables = [];
          if (!postsError) availableTables.push({ name: 'posts', count: postsData?.length || 0 });
          if (!usersError) availableTables.push({ name: 'users', count: usersData?.length || 0 });
          if (!commentsError) availableTables.push({ name: 'comments', count: commentsData?.length || 0 });
          
          setTables(availableTables);
          
          // Show sample data
          if (postsData && postsData.length > 0) {
            setSampleData({
              table: 'posts',
              data: postsData
            });
          } else if (usersData && usersData.length > 0) {
            setSampleData({
              table: 'users',
              data: usersData
            });
          } else if (commentsData && commentsData.length > 0) {
            setSampleData({
              table: 'comments',
              data: commentsData
            });
          }
        }
      } catch (error) {
        setConnectionStatus(`❌ Error: ${error.message}`);
      } finally {
        setIsLoading(false);
      }
    };

    testConnection();
  }, []);

  const handleInsertTestData = async () => {
    try {
      // Insert a test post
      const { data, error } = await supabase
        .from('posts')
        .insert([
          {
            title: 'Test Post',
            content: 'This is a test post to verify database connection.',
            excerpt: 'Testing Supabase connection...',
            category: 'development',
            image_url: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=800&auto=format&fit=crop',
            views: 0,
            comments_count: 0,
            likes: 0,
            featured: false,
            published: true,
            created_at: new Date().toISOString(),
            updated_at: new Date().toISOString()
          }
        ])
        .select();

      if (error) {
        alert(`Error inserting test data: ${error.message}`);
      } else {
        alert('✅ Test data inserted successfully!');
        // Refresh the page to show new data
        window.location.reload();
      }
    } catch (error) {
      alert(`Error: ${error.message}`);
    }
  };

  const handleCreateTables = async () => {
    try {
      alert('Note: Tables should be created via SQL in the Supabase dashboard. \n\nCheck the console for SQL commands.');
      console.log('Run these SQL commands in Supabase SQL Editor:');
      console.log(`
        -- Create users table
        CREATE TABLE IF NOT EXISTS public.users (
          id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
          username VARCHAR(50) UNIQUE NOT NULL,
          email VARCHAR(255) UNIQUE NOT NULL,
          name VARCHAR(100),
          avatar_url TEXT,
          role VARCHAR(20) DEFAULT 'user' CHECK (role IN ('user', 'admin')),
          created_at TIMESTAMPTZ DEFAULT NOW(),
          updated_at TIMESTAMPTZ DEFAULT NOW()
        );

        -- Create posts table
        CREATE TABLE IF NOT EXISTS public.posts (
          id BIGSERIAL PRIMARY KEY,
          title VARCHAR(255) NOT NULL,
          excerpt TEXT,
          content TEXT NOT NULL,
          category VARCHAR(100),
          image_url TEXT,
          theme VARCHAR(50),
          views INTEGER DEFAULT 0,
          comments_count INTEGER DEFAULT 0,
          likes INTEGER DEFAULT 0,
          featured BOOLEAN DEFAULT false,
          published BOOLEAN DEFAULT true,
          user_id UUID REFERENCES public.users(id) ON DELETE SET NULL,
          created_at TIMESTAMPTZ DEFAULT NOW(),
          updated_at TIMESTAMPTZ DEFAULT NOW()
        );

        -- Create comments table
        CREATE TABLE IF NOT EXISTS public.comments (
          id BIGSERIAL PRIMARY KEY,
          post_id BIGINT REFERENCES public.posts(id) ON DELETE CASCADE,
          user_id UUID REFERENCES public.users(id) ON DELETE SET NULL,
          author_name VARCHAR(100) NOT NULL,
          author_email VARCHAR(255),
          content TEXT NOT NULL,
          avatar_url TEXT,
          likes INTEGER DEFAULT 0,
          created_at TIMESTAMPTZ DEFAULT NOW()
        );
      `);
    } catch (error) {
      alert(`Error: ${error.message}`);
    }
  };

  return (
    <div className="test-supabase-page">
      <div className="container">
        <h1>Supabase Connection Test</h1>
        
        <div className="status-card">
          <div className="status-header">
            <h2>Connection Status</h2>
            <span className={`status-badge ${connectionStatus.includes('✅') ? 'success' : 'error'}`}>
              {isLoading ? '🔄 Testing...' : connectionStatus}
            </span>
          </div>
          
          <div className="status-details">
            <h3>Available Tables:</h3>
            {tables.length > 0 ? (
              <div className="tables-list">
                {tables.map((table, index) => (
                  <div key={index} className="table-item">
                    <span className="table-name">{table.name}</span>
                    <span className="table-count">{table.count} records</span>
                  </div>
                ))}
              </div>
            ) : (
              <p>No tables found. You may need to create them.</p>
            )}
          </div>
        </div>

        {sampleData && (
          <div className="sample-data-card">
            <h2>Sample Data from {sampleData.table}</h2>
            <pre className="sample-data">
              {JSON.stringify(sampleData.data, null, 2)}
            </pre>
          </div>
        )}

        <div className="actions-card">
          <h2>Actions</h2>
          <div className="action-buttons">
            <button 
              onClick={handleInsertTestData}
              className="action-btn primary"
              disabled={isLoading}
            >
              Insert Test Data
            </button>
            <button 
              onClick={handleCreateTables}
              className="action-btn secondary"
            >
              View SQL for Creating Tables
            </button>
            <button 
              onClick={() => window.location.href = '/admin/login'}
              className="action-btn"
            >
              Go to Admin Login
            </button>
            <button 
              onClick={() => window.location.href = '/blog'}
              className="action-btn"
            >
              View Blog
            </button>
          </div>
        </div>

        <div className="instructions-card">
          <h2>Setup Instructions</h2>
          <ol>
            <li>Make sure you have created the tables in Supabase (use SQL from above)</li>
            <li>Enable RLS (Row Level Security) on your tables</li>
            <li>Configure authentication in Supabase dashboard</li>
            <li>Test the connection using the buttons above</li>
            <li>If tables are empty, insert test data</li>
          </ol>
        </div>
      </div>
    </div>
  );
};

export default TestSupabase;