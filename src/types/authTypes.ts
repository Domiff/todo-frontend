import type {
    LoginRequest,
    LoginResponse,
    RefreshRequest,
    RefreshResponse,
    RegisterRequest,
    RegisterResponse,
} from "@/interfaces/authInterfaces.ts"

export type AuthRequest = RegisterRequest | LoginRequest | RefreshRequest
export type AuthResponse = RegisterResponse | LoginResponse | RefreshResponse
