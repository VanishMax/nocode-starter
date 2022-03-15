/* eslint-disable no-undef */
import { API_URL } from '~/constants';

type DataOrError<DATA> = { data: DATA, error?: never } | { error: unknown, data?: never };

const request = async <DATA>(url: string, options: RequestInit): Promise<DataOrError<DATA>> => {
  try {
    const res = await fetch(API_URL + url, options);
    const data = await res.json();
    if ((data as {statusCode: number })?.statusCode >= 400) {
      return { error: data };
    }

    return { data: data as DATA };
  } catch (error) {
    return { error };
  }
};

export default request;
