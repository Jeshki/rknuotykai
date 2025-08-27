// === src/services/contacts.service.ts ===
import { api } from '../lib/api';
import type { ContactCreatePayload } from '../types';

export const ContactsService = {
  create: (data: ContactCreatePayload) => api.post('/contacts', data),
};