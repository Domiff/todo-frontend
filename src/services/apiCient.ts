import axios, { type AxiosRequestConfig } from "axios"
import { urls } from "@/services/urls.ts"
import type { ApiClient } from "@/interfaces/apiClientInterface.ts"

class FetchApiClient<T> implements ApiClient<T> {
    private readonly baseUrl: string

    constructor(baseUrl: string) {
        this.baseUrl = baseUrl
    }

    async get(url: string, config: AxiosRequestConfig): Promise<T> {
        const response = await axios.get<T>(this.baseUrl + url, config)
        return response.data
    }

    async post(url: string, data?: object, config?: AxiosRequestConfig): Promise<T> {
        const response = await axios.post<T>(this.baseUrl + url, data, config)
        return response.data
    }

    async patch(url: string, data: object, config: AxiosRequestConfig) {
        const response = await axios.patch<T>(this.baseUrl + url, data, config)
        return response.data
    }

    async delete(url: string, config: AxiosRequestConfig) {
        const response = await axios.delete<T>(this.baseUrl + url, config)
        return response.data
    }
}

export const client = new FetchApiClient<string>(urls.base)
