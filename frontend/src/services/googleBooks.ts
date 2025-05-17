
import { apiRequest } from './api';
import { BackendSearchResponse } from '../types/BookList.types';
import { QueryClient } from '@tanstack/react-query';

const queryClient = new QueryClient();

export async function searchBooks(query: string, limit = 10, page = 1) {
  const key = ['books', query, limit, page];

  const cachedData = queryClient.getQueryData<BackendSearchResponse>(key);
  if (cachedData) {
    return {
      data: cachedData,
      error: null,
      status: 200
    };
  }
  const response = await apiRequest<BackendSearchResponse>(
    `search?q=${query}&maxResults=${limit}&page=${page}`
  );

  if (response.data) {
    queryClient.setQueryData(key, response.data);
  }

  return response;
}