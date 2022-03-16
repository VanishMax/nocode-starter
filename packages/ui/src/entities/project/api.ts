import type { NocodeProject } from 'nocode-starter-core';
import request from '../../shared/api/request';

const projectApi = {
  list: async () => request<NocodeProject[]>('/projects/', {
    method: 'GET',
    headers: { 'Content-Type': 'application/json' },
  }),
  single: async (id: string) => request<NocodeProject>(`/projects/${id}`, {
    method: 'GET',
    headers: { 'Content-Type': 'application/json' },
  }),
  create: async (data: NocodeProject) => request<NocodeProject>('/projects/', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      name: data.name,
    }),
  }),
};

export default projectApi;
