import { authClient } from "@/services/apiCient.ts"
import { urls } from "@/services/urls.ts"
import type { AuthRequest, AuthResponse } from "@/types/authTypes.ts"

export async function register(data: AuthRequest): Promise<AuthResponse | null> {
    return await authClient.post(urls.auth.register, data)
}

export async function login(data: AuthRequest): Promise<AuthResponse | null> {
    return await authClient.post(urls.auth.login, data)
}

export async function logout(data: AuthRequest): Promise<AuthResponse | null> {
    return await authClient.post(urls.auth.logout, data)
}

export async function refresh(data: AuthRequest): Promise<AuthResponse | null> {
    return await authClient.post(urls.auth.refresh, data)
}
