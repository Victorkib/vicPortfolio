const removeTrailingSlash = (value) => value.replace(/\/+$/, '');

const fallbackApiBaseUrl = 'https://vicportfolio.onrender.com';

const rawApiBaseUrl =  'http://localhost:5000' || import.meta.env.VITE_API_BASE_URL || fallbackApiBaseUrl;

export const API_BASE_URL = removeTrailingSlash(rawApiBaseUrl);