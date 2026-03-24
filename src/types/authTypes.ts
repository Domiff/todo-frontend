import type {
    LoginRequest,
    LoginResponse,
    RefreshRequest,
    RefreshResponse,
    RegisterRequest,
    RegisterResponse,
} from "@/interfaces/apiClientInterfaces.ts"

export type AuthRequest = RegisterRequest | LoginRequest | RefreshRequest
export type AuthResponse = RegisterResponse | LoginResponse | RefreshResponse
