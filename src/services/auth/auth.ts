import type { AuthRequest } from "@/interfaces/apiClientInterfaces.ts"
import { authClient } from "@/services/apiCient.ts"
import { urls } from "@/services/urls.ts"
import type { AuthResponse } from "@/types/authType.ts"

export async function register(data: AuthRequest): Promise<AuthResponse | null> {
    return await authClient.post(urls.auth.register, data)
}

export async function login(data: AuthRequest): Promise<AuthResponse | null> {
    return await authClient.post(urls.auth.login, data)
}
