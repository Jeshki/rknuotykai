import { api } from '../lib/api';

// BCK
// id, title, starts_at, meet_location, price, description, status, valid_until, duration_hours

export const HikesService = {
  list: (params = {}) => api.get('/hikes', { params }),
  get: (id) => api.get(`/hikes/${id}`),
  listImages: (id) => api.get(`/hikes/${id}/images`),

  registerParticipant: (id, payload) =>
    api.post(`/hikes/${id}/participants`, payload),
};
