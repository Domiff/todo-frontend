import { FetchApiClient } from "@/core/services/apiCient.ts"
import { urls } from "@/core/services/urls.ts"
import type {
    LoginRefreshResponse,
    LoginRequest,
    RefreshLogoutRequest,
    RegisterRequest,
    RegisterResponse,
} from "@/modules/auth/schemas"

const authClient = new FetchApiClient(urls.base)

export async function register(data: RegisterRequest): Promise<RegisterResponse> {
    return await authClient.post(urls.auth.register, data)
}

export async function login(data: LoginRequest): Promise<LoginRefreshResponse> {
    return await authClient.post(urls.auth.login, data)
}

export async function logout(data: RefreshLogoutRequest): Promise<void> {
    return await authClient.post(urls.auth.logout, data)
}

export async function refresh(data: RefreshLogoutRequest): Promise<LoginRefreshResponse> {
    return await authClient.post(urls.auth.refresh, data)
}
