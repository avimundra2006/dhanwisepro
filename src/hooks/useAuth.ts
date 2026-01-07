import { useState, useEffect } from 'react';

interface User {
  email: string;
  name: string;
}

const AUTH_KEY = 'finance-auth';
const USERS_KEY = 'finance-users';

export function useAuth() {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const stored = localStorage.getItem(AUTH_KEY);
    if (stored) {
      setUser(JSON.parse(stored));
    }
    setIsLoading(false);
  }, []);

  const signUp = (email: string, password: string, name: string): { success: boolean; error?: string } => {
    const users = JSON.parse(localStorage.getItem(USERS_KEY) || '{}');
    
    if (users[email]) {
      return { success: false, error: 'Email already registered' };
    }

    users[email] = { password, name };
    localStorage.setItem(USERS_KEY, JSON.stringify(users));

    const newUser = { email, name };
    localStorage.setItem(AUTH_KEY, JSON.stringify(newUser));
    setUser(newUser);
    
    return { success: true };
  };

  const login = (email: string, password: string): { success: boolean; error?: string } => {
    const users = JSON.parse(localStorage.getItem(USERS_KEY) || '{}');
    
    if (!users[email]) {
      return { success: false, error: 'User not found' };
    }

    if (users[email].password !== password) {
      return { success: false, error: 'Invalid password' };
    }

    const loggedInUser = { email, name: users[email].name };
    localStorage.setItem(AUTH_KEY, JSON.stringify(loggedInUser));
    setUser(loggedInUser);
    
    return { success: true };
  };

  const logout = () => {
    localStorage.removeItem(AUTH_KEY);
    setUser(null);
  };

  return {
    user,
    isLoading,
    isAuthenticated: !!user,
    signUp,
    login,
    logout,
  };
}
