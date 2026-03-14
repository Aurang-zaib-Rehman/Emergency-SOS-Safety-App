import { createContext, useContext, useState } from 'react';
import { getUser, setUser, removeUser, getUsers, setUsers } from '../utils/localStorage';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUserState] = useState(() => getUser());

  const signup = (name, email, password) => {
    const users = getUsers();
    if (users.find(u => u.email === email))
      return { success: false, error: 'Email already registered.' };

    const newUser = { name, email, password };
    setUsers([...users, newUser]);

    const session = { name, email };
    setUser(session);
    setUserState(session);
    return { success: true };
  };

  const login = (email, password) => {
    const users = getUsers();
    const found = users.find(u => u.email === email && u.password === password);
    if (!found) return { success: false, error: 'Invalid email or password.' };

    const session = { name: found.name, email: found.email };
    setUser(session);
    setUserState(session);
    return { success: true };
  };

  const logout = () => {
    removeUser();
    setUserState(null);
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