import type { AxiosRequestConfig } from "axios"

export interface ApiClient<TResponse, TRequest = object> {
    get(url: string, config: AxiosRequestConfig): Promise<TResponse | null>
    post(url: string, data: TRequest, config?: AxiosRequestConfig): Promise<TResponse | null>
    patch(url: string, data: TRequest, config: AxiosRequestConfig): Promise<TResponse | null>
    delete(url: string, config: AxiosRequestConfig): Promise<TResponse | null>
}

export interface AuthRequest {
    username: string
    password: string
    email?: string
    first_name?: string
    last_name?: string
}

export interface RegisterResponse {
    id: string | number
    token: {
        access: string
        refresh: string
    }
}

export interface LoginResponse {
    access: string
    refresh: string
}
