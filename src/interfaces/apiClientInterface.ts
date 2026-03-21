import type { AxiosRequestConfig } from "axios"

export interface ApiClient<T> {
    get(url: string, config: AxiosRequestConfig): Promise<T | null>
    post(url: string, data: object, config?: AxiosRequestConfig): Promise<T | null>
    patch(url: string, data: object, config: AxiosRequestConfig): Promise<T | null>
    delete(url: string, config: AxiosRequestConfig): Promise<T | null>
}
