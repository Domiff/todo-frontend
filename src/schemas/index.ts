import type { AxiosRequestConfig } from "axios"

export interface ApiClient<TResponse, TRequest = object> {
    get(url: string, config: AxiosRequestConfig): Promise<TResponse | null>
    post(url: string, data: TRequest, config?: AxiosRequestConfig): Promise<TResponse | null>
    patch(url: string, data: TRequest, config: AxiosRequestConfig): Promise<TResponse | null>
    delete(url: string, config: AxiosRequestConfig): Promise<TResponse | null>
}
