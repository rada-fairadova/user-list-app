import React, { useState, useEffect } from 'react';
import { List } from './components/List';
import { Details } from './components/Details';
import { LoadingSpinner } from './components/common/LoadingSpinner';
import { ErrorMessage } from './components/common/ErrorMessage';
import { fetchUsers } from './utils';
import type{ User } from './types';
import './App.css';

const App: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadUsers = async () => {
      try {
        const data = await fetchUsers();
        setUsers(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load users');
      } finally {
        setLoading(false);
      }
    };

    loadUsers();
  }, []);

  const handleSelectUser = (user: User) => {
    setSelectedUser(user);
  };

  return (
    <div className="app">
      <header className="app-header">
        <h1>User List</h1>
      </header>
      
      <main className="main-content">
        {loading ? (
          <LoadingSpinner />
        ) : error ? (
          <ErrorMessage message={error} onRetry={() => window.location.reload()} />
        ) : (
          <>
            <div className="left-column">
              <List
                users={users}
                selectedUserId={selectedUser?.id || null}
                onSelectUser={handleSelectUser}
              />
            </div>
            
            <div className="right-column">
              <Details info={selectedUser} />
            </div>
          </>
        )}
      </main>
    </div>
  );
};

export default App;
