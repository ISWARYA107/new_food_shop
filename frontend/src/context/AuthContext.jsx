import { createContext, useContext, useState, useEffect } from 'react';
import { loginUser, registerUser, getCurrentUser } from '../api/authApi';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // On first load, if a token exists, validate it and fetch the user
  useEffect(() => {
    const token = localStorage.getItem('cf_token');
    if (!token) {
      setLoading(false);
      return;
    }
    getCurrentUser()
      .then((data) => setUser(data))
      .catch(() => {
        localStorage.removeItem('cf_token');
        setUser(null);
      })
      .finally(() => setLoading(false));
  }, []);

  const login = async (email, password) => {
    const data = await loginUser({ email, password });
    localStorage.setItem('cf_token', data.token);
    setUser(data);
    return data;
  };

  const register = async (payload) => {
    const data = await registerUser(payload);
    localStorage.setItem('cf_token', data.token);
    setUser(data);
    return data;
  };

  const logout = () => {
    localStorage.removeItem('cf_token');
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
