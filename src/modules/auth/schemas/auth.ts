export interface RegisterRequest {
    username: string
    password: string
    email?: string
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

export interface LoginRefreshResponse {
    access: string
    refresh: string
}
