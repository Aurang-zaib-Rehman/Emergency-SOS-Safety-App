// utils/localStorage.js
// All localStorage read/write helpers in one place

export const getUser = () => {
  const stored = localStorage.getItem('sos_user');
  return stored ? JSON.parse(stored) : null;
};

export const setUser = (user) => {
  localStorage.setItem('sos_user', JSON.stringify(user));
};

export const removeUser = () => {
  localStorage.removeItem('sos_user');
};

export const getUsers = () => {
  const stored = localStorage.getItem('sos_users');
  return stored ? JSON.parse(stored) : [];
};

export const setUsers = (users) => {
  localStorage.setItem('sos_users', JSON.stringify(users));
};

export const getContacts = () => {
  const stored = localStorage.getItem('sos_contacts');
  return stored ? JSON.parse(stored) : [];
};

export const setContacts = (contacts) => {
  localStorage.setItem('sos_contacts', JSON.stringify(contacts));
};