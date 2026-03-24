import { defineStore } from "pinia"
import { computed, ref } from "vue"

import type { RefreshRequest, RefreshResponse } from "@/interfaces/apiClientInterfaces.ts"
import { refresh } from "@/services/auth/auth.ts"

export const useAuthStore = defineStore("auth", () => {
    const accessToken = ref<string | null>(null)
    const refreshToken = ref<string | null>(null)
    const isAuthenticated = computed(() => accessToken.value !== null)

    function setTokens(access: string, refresh: string) {
        accessToken.value = access
        refreshToken.value = refresh

        localStorage.setItem("access", access)
        localStorage.setItem("refresh", refresh)
    }

    async function updateAccess() {
        const refreshToken = { refresh: localStorage.getItem("refresh") } as RefreshRequest
        const newAccess = (await refresh(refreshToken)) as RefreshResponse
        accessToken.value = newAccess.access
    }

    function logout() {
        accessToken.value = null
        refreshToken.value = null
        localStorage.removeItem("access")
        localStorage.removeItem("refresh")
    }

    return {
        accessToken,
        refreshToken,
        isAuthenticated,
        setTokens,
        updateAccess,
        logout,
    }
})
