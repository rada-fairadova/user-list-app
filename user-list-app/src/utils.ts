import type{ User, UserDetails } from './types';

const API_BASE = 'https://raw.githubusercontent.com/netology-code/ra16-homeworks/master/hooks-context/use-effect/data';

export const fetchUsers = async (): Promise<User[]> => {
  const response = await fetch(`${API_BASE}/users.json`);
  if (!response.ok) throw new Error('Failed to fetch users');
  return response.json();
};

export const fetchUserDetails = async (id: number): Promise<UserDetails> => {
  const response = await fetch(`${API_BASE}/${id}.json`);
  if (!response.ok) throw new Error('Failed to fetch user details');
  return response.json();
};