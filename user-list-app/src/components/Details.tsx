import React, { useState, useEffect } from 'react';
import type{ UserDetails, DetailsProps } from '../types';
import { fetchUserDetails } from '../utils';
import { LoadingSpinner } from './common/LoadingSpinner';
import { ErrorMessage } from './common/ErrorMessage';

export const Details: React.FC<DetailsProps> = ({ info }) => {
  const [userDetails, setUserDetails] = useState<UserDetails | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [prevUserId, setPrevUserId] = useState<number | null>(null);

  useEffect(() => {
    if (!info || info.id === prevUserId) return;

    const loadDetails = async () => {
      setLoading(true);
      setError(null);
      setPrevUserId(info.id);

      try {
        const data = await fetchUserDetails(info.id);
        setUserDetails(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load details');
      } finally {
        setLoading(false);
      }
    };

    loadDetails();
  }, [info, prevUserId]);

  if (!info) {
    return (
      <div style={{ 
        padding: '20px', 
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'center',
        height: '100%',
        color: '#6c757d'
      }}>
        <p>Select a user to see details</p>
      </div>
    );
  }

  if (loading) {
    return (
      <div style={{ padding: '20px' }}>
        <h2 style={{ marginBottom: '20px', color: '#333' }}>User Details</h2>
        <LoadingSpinner message="Loading user details..." />
      </div>
    );
  }

  if (error) {
    return (
      <div style={{ padding: '20px' }}>
        <h2 style={{ marginBottom: '20px', color: '#333' }}>User Details</h2>
        <ErrorMessage message={error} />
      </div>
    );
  }

  return (
    <div style={{ padding: '20px' }}>
      <h2 style={{ marginBottom: '20px', color: '#333' }}>User Details</h2>
      {userDetails && (
        <div style={{
          backgroundColor: 'white',
          borderRadius: '8px',
          padding: '20px',
          boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
        }}>
          <img
            src={userDetails.avatar}
            alt={userDetails.name}
            style={{
              width: '100px',
              height: '100px',
              borderRadius: '50%',
              objectFit: 'cover',
              marginBottom: '20px',
              border: '3px solid #f0f0f0'
            }}
          />
          <h3 style={{ marginBottom: '10px', color: '#333' }}>{userDetails.name}</h3>
          <div style={{ 
            backgroundColor: '#f8f9fa', 
            padding: '15px', 
            borderRadius: '4px',
            marginTop: '15px'
          }}>
            <p style={{ margin: '8px 0' }}>
              <strong style={{ display: 'inline-block', width: '70px' }}>City:</strong>
              <span>{userDetails.details.city}</span>
            </p>
            <p style={{ margin: '8px 0' }}>
              <strong style={{ display: 'inline-block', width: '70px' }}>Company:</strong>
              <span>{userDetails.details.company}</span>
            </p>
            <p style={{ margin: '8px 0' }}>
              <strong style={{ display: 'inline-block', width: '70px' }}>Position:</strong>
              <span>{userDetails.details.position}</span>
            </p>
          </div>
        </div>
      )}
    </div>
  );
};