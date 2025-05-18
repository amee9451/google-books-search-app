var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { apiRequest } from './api';
import { QueryClient } from '@tanstack/react-query';
const queryClient = new QueryClient();
export function searchBooks(query, limit = 10, page = 1) {
    return __awaiter(this, void 0, void 0, function* () {
        const key = ['books', query, limit, page];
        const cachedData = queryClient.getQueryData(key);
        if (cachedData) {
            return {
                data: cachedData,
                error: null,
                status: 200
            };
        }
        const response = yield apiRequest(`search?q=${query}&maxResults=${limit}&page=${page}`);
        if (response.data) {
            queryClient.setQueryData(key, response.data);
        }
        return response;
    });
}
