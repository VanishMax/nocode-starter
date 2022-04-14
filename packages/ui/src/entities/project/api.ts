import type { Project, Model, ShortProjectUser } from '@nocode/core';
import request from '~/shared/api/request';
import { useUserStore } from '~/entities/user';

const getHeaders = () => ({
  'Content-Type': 'application/json',
  authorization: `Bearer ${(() => useUserStore().token)()}`,
});

const projectApi = {
  list: async () => request<Project[]>('/projects', {
    method: 'GET',
    headers: getHeaders(),
  }),
  single: async () => request<Project>('/project', {
    method: 'GET',
    headers: getHeaders(),
  }),
  create: async (data: { name: string }) => request<Project>('/projects/', {
    method: 'POST',
    headers: getHeaders(),
    body: JSON.stringify({
      name: data.name,
    }),
  }),
  delete: async (id: string) => request<Project>(`/projects/${id}`, {
    method: 'DELETE',
    headers: getHeaders(),
  }),
  invite: async (id: string, data: ShortProjectUser[]) => request<ShortProjectUser[]>(
    `/projects/${id}/invite`,
    {
      method: 'POST',
      headers: getHeaders(),
      body: JSON.stringify(data),
    },
  ),
  redeemInvite: async (id: string, data: ShortProjectUser[]) => request<ShortProjectUser[]>(
    `/projects/${id}/invite`,
    {
      method: 'DELETE',
      headers: getHeaders(),
      body: JSON.stringify(data),
    },
  ),
  /**
   *
   * @param id – project id
   * @param data – an object where key is a path string to a model,
   *  and value is anything that specifies the path
   */
  changeModel: async (id: string, data: Record<string, any>) => request<Model>(
    `/projects/${id}`,
    {
      method: 'PUT',
      headers: getHeaders(),
      body: JSON.stringify(data),
    },
  ),
};

export default projectApi;
