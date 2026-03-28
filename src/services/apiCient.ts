import axios, { type AxiosInstance, type AxiosRequestConfig } from "axios"

import type { ApiClient } from "@/schemas"

export class FetchApiClient<TResponse, TRequest> implements ApiClient<TResponse, TRequest> {
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
