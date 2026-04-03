import type { AxiosRequestConfig } from "axios"

export interface ApiClient {
    get<TResponse>(url: string, config?: AxiosRequestConfig): Promise<TResponse>
    post<TResponse, TRequest = object>(
        url: string,
        data: TRequest,
        config?: AxiosRequestConfig,
    ): Promise<TResponse>
    patch<TResponse, TRequest = object>(
        url: string,
        data: TRequest,
        config?: AxiosRequestConfig,
    ): Promise<TResponse>
    delete<TResponse>(url: string, config?: AxiosRequestConfig): Promise<TResponse>
}
