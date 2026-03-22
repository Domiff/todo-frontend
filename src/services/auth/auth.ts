import type { AuthRequest, TokenResponse } from "@/interfaces/apiClientInterface.ts"
import { client } from "@/services/apiCient.ts"
import { urls } from "@/services/urls.ts"

export async function register(data: AuthRequest): Promise<TokenResponse | null> {
    return await client.post(urls.auth.register, data)
}

export async function login(data: AuthRequest): Promise<TokenResponse | null> {
    return await client.post(urls.auth.login, data)
}
