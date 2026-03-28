import type { AuthHeader } from "@/interfaces/authInterfaces.ts"
import { useAuthStore } from "@/store/auth.ts"

export function makeAuthHeader(): AuthHeader | null {
    const auth = useAuthStore()
    const accessToken = auth.getAccessToken()
    if (!accessToken) {
        return null
    }
    return { Authorization: `Bearer ${accessToken}` }
}
