// src/services/reviews.service.js
import { api } from '../lib/api';

export const ReviewsService = {
  list: () => api.get('/reviews'),
};