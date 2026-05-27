import axios from 'axios';
import { API_BASE_URL } from '../config/env';

export const submitContactForm = (payload) =>
  axios.post(`${API_BASE_URL}/api/contact`, payload);
