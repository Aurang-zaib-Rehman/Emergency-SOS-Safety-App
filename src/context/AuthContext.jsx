import { createContext, useContext, useState } from 'react';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    const stored = localStorage.getItem('sos_user');
    return stored ? JSON.parse(stored) : null;
  });

  const signup = (name, email, password) => {
    const users = JSON.parse(localStorage.getItem('sos_users') || '[]');
    const exists = users.find(u => u.email === email);
    if (exists) return { success: false, error: 'Email already registered.' };

    const newUser = { name, email, password };
    users.push(newUser);
    localStorage.setItem('sos_users', JSON.stringify(users));

    const sessionUser = { name, email };
    localStorage.setItem('sos_user', JSON.stringify(sessionUser));
    setUser(sessionUser);
    return { success: true };
  };

  const login = (email, password) => {
    const users = JSON.parse(localStorage.getItem('sos_users') || '[]');
    const found = users.find(u => u.email === email && u.password === password);
    if (!found) return { success: false, error: 'Invalid email or password.' };

    const sessionUser = { name: found.name, email: found.email };
    localStorage.setItem('sos_user', JSON.stringify(sessionUser));
    setUser(sessionUser);
    return { success: true };
  };

  const logout = () => {
    localStorage.removeItem('sos_user');
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, signup, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used inside AuthProvider');
  return ctx;
}