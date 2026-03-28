import type {
    LoginRequest,
    LoginResponse,
    RefreshLogoutRequest,
    RefreshResponse,
    RegisterRequest,
    RegisterResponse,
} from "@/interfaces/authInterfaces.ts"

export type AuthRequest = RegisterRequest | LoginRequest | RefreshLogoutRequest
export type AuthResponse = RegisterResponse | LoginResponse | RefreshResponse
