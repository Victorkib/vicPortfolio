import axios from 'axios';
import { API_BASE_URL } from '../config/env';

export const defaultPortfolioContent = {
  projects: [],
  experiences: [],
  skills: {},
  education: [],
  certifications: [],
  resumeData: {
    personalInfo: {},
    experiences: [],
    education: [],
    skills: [],
    activities: '',
    certifications: [],
  },
};

export const fetchPortfolioContent = async () => {
  const response = await axios.get(`${API_BASE_URL}/api/portfolio`);
  const payload = response.data?.data ?? {};

  return {
    ...defaultPortfolioContent,
    ...payload,
  };
};
