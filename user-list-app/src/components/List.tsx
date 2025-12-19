import React from 'react';
import type{ ListProps } from '../types';

export const List: React.FC<ListProps> = ({ users, selectedUserId, onSelectUser }) => {
  return (
    <div style={{ padding: '20px' }}>
      <h2 style={{ marginBottom: '20px', color: '#333' }}>Users</h2>
      {users.length === 0 ? (
        <p>No users found</p>
      ) : (
        <ul style={{ listStyle: 'none', padding: 0 }}>
          {users.map((user) => (
            <li
              key={user.id}
              onClick={() => onSelectUser(user)}
              style={{
                padding: '12px 15px',
                marginBottom: '8px',
                backgroundColor: selectedUserId === user.id ? '#007bff' : '#f8f9fa',
                color: selectedUserId === user.id ? 'white' : '#333',
                border: '1px solid #dee2e6',
                borderRadius: '4px',
                cursor: 'pointer',
                transition: 'all 0.2s ease',
                ...(selectedUserId === user.id ? {
                  fontWeight: 'bold',
                  borderColor: '#0056b3'
                } : {})
              }}
            >
              {user.name}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};