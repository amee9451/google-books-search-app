import { ApiResponse } from '../types/Books/Book.types';
const API_DOMAIN = process.env.API_DOMAIN;
import { BOOK_SEARCH_API } from '../constants/Book';
export async function apiRequest<T>(
  url: string,
  options: RequestInit = {}
): Promise<ApiResponse<T>> {
  try {
    const res = await fetch(`${API_DOMAIN}${BOOK_SEARCH_API}${url}`, {
      headers: {
        'Content-Type': 'application/json',
      },
      ...options,
    });
    const data = await res.json();
    if (!res.ok) {
      return {
        data: null,
        error: data?.message || 'API request failed',
        status: res.status,
      };
    }
    return {
      data,
      error: null,
      status: res.status,
    };
  } catch (err: any) {
    return {
      data: null,
      error: err.message || 'Unexpected error',
      status: 500,
    };
  }
}
