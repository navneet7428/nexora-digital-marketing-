import { createContext, useContext, useState, useEffect } from 'react';
import { verifyToken } from '../utils/api';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [admin,    setAdmin]    = useState(null);
  const [checking, setChecking] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('nexora_token');
    if (!token) { setChecking(false); return; }
    verifyToken()
      .then(({ username }) => { setAdmin({ username }); setChecking(false); })
      .catch(() => { localStorage.removeItem('nexora_token'); setChecking(false); });
  }, []);

  const login = (token, username) => {
    localStorage.setItem('nexora_token', token);
    setAdmin({ username });
  };

  const logout = () => {
    localStorage.removeItem('nexora_token');
    setAdmin(null);
  };

  return (
    <AuthContext.Provider value={{ admin, checking, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
