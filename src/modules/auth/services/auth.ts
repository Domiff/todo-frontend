import type {
    AuthRequest,
    AuthResponse,
    LoginRequest,
    RefreshLogoutRequest,
    RegisterRequest,
} from "@/modules/auth/schemas"
import { FetchApiClient } from "@/services/apiCient.ts"
import { urls } from "@/services/urls.ts"

const authClient = new FetchApiClient<AuthResponse, AuthRequest>(urls.base)

export async function register(data: RegisterRequest): Promise<AuthResponse | null> {
    return await authClient.post(urls.auth.register, data)
}

export async function login(data: LoginRequest): Promise<AuthResponse | null> {
    return await authClient.post(urls.auth.login, data)
}

export async function logout(data: RefreshLogoutRequest): Promise<AuthResponse | null> {
    return await authClient.post(urls.auth.logout, data)
}

export async function refresh(data: RefreshLogoutRequest): Promise<AuthResponse | null> {
    return await authClient.post(urls.auth.refresh, data)
}
