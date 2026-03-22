import axios, { type AxiosRequestConfig } from "axios"

import type { ApiClient, AuthRequest, TokenResponse } from "@/interfaces/apiClientInterface.ts"
import { urls } from "@/services/urls.ts"

class FetchApiClient<TResponse, TRequest = object> implements ApiClient<TResponse, TRequest> {
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

export const client = new FetchApiClient<TokenResponse, AuthRequest>(urls.base)
