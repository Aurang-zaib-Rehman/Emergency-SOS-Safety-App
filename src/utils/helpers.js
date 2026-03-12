// utils/helpers.js

export const formatTime = (date) =>
  date.toLocaleTimeString('en-US', {
    hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: true,
  });

export const formatDate = (date) =>
  date.toLocaleDateString('en-US', {
    weekday: 'long', year: 'numeric', month: 'long', day: 'numeric',
  });

export const getInitial = (name) =>
  name ? name.charAt(0).toUpperCase() : '?';

export const isValidEmail = (email) =>
  /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

export const generateId = () => Date.now().toString();