const removeTrailingSlash = (value) => value.replace(/\/+$/, '');

const fallbackApiBaseUrl = 'https://vicportfolio.onrender.com';

const rawApiBaseUrl = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000' || fallbackApiBaseUrl;

export const API_BASE_URL = removeTrailingSlash(rawApiBaseUrl);