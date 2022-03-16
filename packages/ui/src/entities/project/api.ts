import type { Project, Model, ShortProjectUser } from 'nocode-starter-core';
import request from '~/shared/api/request';

const projectApi = {
  list: async () => request<Project[]>('/projects', {
    method: 'GET',
    headers: { 'Content-Type': 'application/json' },
  }),
  single: async (id: string) => request<Project>(`/projects/${id}`, {
    method: 'GET',
    headers: { 'Content-Type': 'application/json' },
  }),
  create: async (data: { name: string }) => request<Project>('/projects/', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      name: data.name,
    }),
  }),
  delete: async (id: string) => request<Project>(`/projects/${id}`, {
    method: 'DELETE',
  }),
  invite: async (id: string, data: ShortProjectUser[]) => request<ShortProjectUser[]>(
    `/projects/${id}/invite`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    },
  ),
  redeemInvite: async (id: string, data: ShortProjectUser[]) => request<ShortProjectUser[]>(
    `/projects/${id}/invite`,
    {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    },
  ),
  changeModel: async (id: string, data: Record<string, any>) => request<Model>(
    `/projects/${id}`,
    {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    },
  ),
};

export default projectApi;
