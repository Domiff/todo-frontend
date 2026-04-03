import axios, { type AxiosInstance, type AxiosRequestConfig } from "axios"

import type { ApiClient } from "@/core/schemas"

export class FetchApiClient implements ApiClient {
    private readonly instance: AxiosInstance

    constructor(baseUrl: string) {
        this.instance = axios.create({ baseURL: baseUrl })
    }

    async get<TResponse>(url: string, config?: AxiosRequestConfig): Promise<TResponse> {
        const response = await this.instance.get<TResponse>(url, config)
        return response.data
    }

    async post<TResponse, TRequest>(
        url: string,
        data: TRequest,
        config?: AxiosRequestConfig,
    ): Promise<TResponse> {
        const response = await this.instance.post<TResponse>(url, data, config)
        return response.data
    }

    async patch<TResponse, TRequest>(
        url: string,
        data: TRequest,
        config?: AxiosRequestConfig,
    ): Promise<TResponse> {
        const response = await this.instance.patch<TResponse>(url, data, config)
        return response.data
    }

    async delete<TResponse>(url: string, config?: AxiosRequestConfig): Promise<TResponse> {
        const response = await this.instance.delete<TResponse>(url, config)
        return response.data
    }
}
