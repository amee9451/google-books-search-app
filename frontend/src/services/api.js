var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
const API_DOMAIN = process.env.API_DOMAIN;
import { BOOK_SEARCH_API } from "../constants/Book";
export function apiRequest(url, options = {}) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const res = yield fetch(`${API_DOMAIN}${BOOK_SEARCH_API}${url}`, Object.assign({ headers: {
                    "Content-Type": "application/json",
                } }, options));
            const data = yield res.json();
            if (!res.ok) {
                return {
                    data: null,
                    error: (data === null || data === void 0 ? void 0 : data.message) || "API request failed",
                    status: res.status,
                };
            }
            return {
                data,
                error: null,
                status: res.status,
            };
        }
        catch (err) {
            return {
                data: null,
                error: err.message || "Unexpected error",
                status: 500,
            };
        }
    });
}
