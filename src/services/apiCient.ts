import axios, { type AxiosInstance, type AxiosRequestConfig } from "axios"

import type { ApiClient } from "@/interfaces/authInterfaces.ts"
import { urls } from "@/services/urls.ts"
import type { AuthRequest, AuthResponse } from "@/types/authTypes.ts"

class FetchApiClient<TResponse, TRequest> implements ApiClient<TResponse, TRequest> {
    private readonly instance: AxiosInstance

    constructor(baseUrl: string) {
        this.instance = axios.create({
            baseURL: baseUrl,
        })
    }

    async get(url: string, config: AxiosRequestConfig): Promise<TResponse | null> {
        const response = await this.instance.get<TResponse>(url, config)
        return response.data
    }

    async post(
        url: string,
        data: TRequest,
        config?: AxiosRequestConfig,
    ): Promise<TResponse | null> {
        const response = await this.instance.post<TResponse>(url, data, config)
        return response.data
    }

    async patch(
        url: string,
        data: TRequest,
        config: AxiosRequestConfig,
    ): Promise<TResponse | null> {
        const response = await this.instance.patch<TResponse>(url, data, config)
        return response.data
    }

    async delete(url: string, config: AxiosRequestConfig): Promise<TResponse | null> {
        const response = await this.instance.delete<TResponse>(url, config)
        return response.data
    }
}

export const authClient = new FetchApiClient<AuthResponse, AuthRequest>(urls.base)
export const todoClient = new FetchApiClient<object, object>(urls.base)
