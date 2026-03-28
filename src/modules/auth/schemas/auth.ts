export interface RegisterRequest {
    username: string
    password: string
    email: string
    first_name: string
    last_name: string
}

export interface LoginRequest {
    username: string
    password: string
}

export interface RefreshLogoutRequest {
    refresh: string
}

export interface RegisterResponse {
    id: string | number
    tokens: {
        access: string
        refresh: string
    }
}

export interface LoginResponse {
    access: string
    refresh: string
}

export interface RefreshResponse {
    access: string
}

export type AuthRequest = RegisterRequest | LoginRequest | RefreshLogoutRequest
export type AuthResponse = RegisterResponse | LoginResponse | RefreshResponse
