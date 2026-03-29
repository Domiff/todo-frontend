import { useAuthStore } from "@/modules/auth/store"
import type { AuthHeader } from "@/modules/todo/schemas/todo.ts"

export function makeAuthHeader(): AuthHeader | undefined {
    const auth = useAuthStore()
    const accessToken = auth.getAccessToken()
    if (!accessToken) {
        return undefined
    }
    return { Authorization: `Bearer ${accessToken}` }
}
