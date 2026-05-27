import axios from 'axios';
import { API_BASE_URL } from '../config/env';
import {
  projects,
  experiences,
  skills,
  education,
  certifications,
  resumeData,
} from '../../../server/data/portfolioContent.js';

export const defaultPortfolioContent = {
  projects,
  experiences,
  skills,
  education,
  certifications,
  resumeData,
};

export const fetchPortfolioContent = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/api/portfolio`);
    const payload = response.data?.data ?? {};

    return {
      ...defaultPortfolioContent,
      ...payload,
    };
  } catch (error) {
    console.warn('Using local portfolio content fallback.', error);
    return defaultPortfolioContent;
  }
};
