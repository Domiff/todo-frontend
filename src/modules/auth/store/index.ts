import { defineStore } from "pinia"
import { computed, ref } from "vue"

import type { RefreshLogoutRequest } from "@/modules/auth/schemas/auth.ts"
import { refresh } from "@/modules/auth/services/auth"

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

    function getRefreshToken() {
        return localStorage.getItem("refresh")
    }

    function getAccessToken() {
        return localStorage.getItem("access")
    }

    async function updateAccess() {
        const refreshToken = { refresh: localStorage.getItem("refresh") } as RefreshLogoutRequest
        const newAccess = await refresh(refreshToken)
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
        getRefreshToken,
        getAccessToken,
    }
})
