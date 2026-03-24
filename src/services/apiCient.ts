import axios, { type AxiosRequestConfig } from "axios"

import type { ApiClient } from "@/interfaces/authInterfaces.ts"
import { urls } from "@/services/urls.ts"
import type { AuthRequest, AuthResponse } from "@/types/authTypes.ts"

class FetchApiClient<TResponse, TRequest> implements ApiClient<TResponse, TRequest> {
    private readonly baseUrl: string

    constructor(baseUrl: string) {
        this.baseUrl = baseUrl
    }

    async get(url: string, config: AxiosRequestConfig): Promise<TResponse | null> {
        const response = await axios.get<TResponse>(this.baseUrl + url, config)
        return response.data
    }

    async post(
        url: string,
        data: TRequest,
        config?: AxiosRequestConfig,
    ): Promise<TResponse | null> {
        const response = await axios.post<TResponse>(this.baseUrl + url, data, config)
        return response.data
    }

    async patch(
        url: string,
        data: TRequest,
        config: AxiosRequestConfig,
    ): Promise<TResponse | null> {
        const response = await axios.patch<TResponse>(this.baseUrl + url, data, config)
        return response.data
    }

    async delete(url: string, config: AxiosRequestConfig): Promise<TResponse | null> {
        const response = await axios.delete<TResponse>(this.baseUrl + url, config)
        return response.data
    }
}

export const authClient = new FetchApiClient<AuthResponse, AuthRequest>(urls.base)
