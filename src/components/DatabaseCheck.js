import React, { useEffect, useState } from 'react';
import { supabase } from '../supabase';

const DatabaseCheck = () => {
  const [status, setStatus] = useState('Checking...');
  const [tables, setTables] = useState([]);
  const [data, setData] = useState([]);

  useEffect(() => {
    const checkDatabase = async () => {
      try {
        // Check connection
        setStatus('Testing connection...');
        const { data: test, error: testError } = await supabase
          .from('posts')
          .select('*')
          .limit(1);

        if (testError) {
          setStatus(`Error: ${testError.message}`);
          return;
        }

        setStatus('Connected! Checking tables...');

        // Check posts table
        const { data: posts, error: postsError } = await supabase
          .from('posts')
          .select('*');

        if (postsError) {
          setTables(prev => [...prev, `Posts table: ERROR - ${postsError.message}`]);
        } else {
          setTables(prev => [...prev, `Posts table: OK (${posts?.length || 0} posts)`]);
          setData(posts || []);
        }

        // Check users table
        const { data: users, error: usersError } = await supabase
          .from('users')
          .select('*');

        if (usersError) {
          setTables(prev => [...prev, `Users table: ERROR - ${usersError.message}`]);
        } else {
          setTables(prev => [...prev, `Users table: OK (${users?.length || 0} users)`]);
        }

      } catch (error) {
        setStatus(`Fatal error: ${error.message}`);
      }
    };

    checkDatabase();
  }, []);

  return (
    <div style={{
      position: 'fixed',
      bottom: '10px',
      right: '10px',
      background: 'white',
      padding: '15px',
      borderRadius: '8px',
      boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
      zIndex: 9999,
      maxWidth: '300px',
      fontSize: '12px'
    }}>
      <h3 style={{margin: '0 0 10px 0', fontSize: '14px'}}>Database Status</h3>
      <p><strong>Status:</strong> {status}</p>
      <div>
        <strong>Tables:</strong>
        <ul style={{margin: '5px 0', paddingLeft: '15px'}}>
          {tables.map((table, index) => (
            <li key={index}>{table}</li>
          ))}
        </ul>
      </div>
      {data.length > 0 && (
        <div>
          <strong>Sample Data:</strong>
          <pre style={{
            fontSize: '10px',
            background: '#f5f5f5',
            padding: '5px',
            borderRadius: '4px',
            maxHeight: '100px',
            overflow: 'auto'
          }}>
            {JSON.stringify(data[0], null, 2)}
          </pre>
        </div>
      )}
      <button 
        onClick={() => window.location.reload()}
        style={{
          marginTop: '10px',
          padding: '5px 10px',
          fontSize: '10px',
          background: '#007bff',
          color: 'white',
          border: 'none',
          borderRadius: '4px',
          cursor: 'pointer'
        }}
      >
        Refresh Check
      </button>
    </div>
  );
};

export default DatabaseCheck;