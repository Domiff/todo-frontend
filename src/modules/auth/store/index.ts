import { defineStore } from "pinia"
import { ref } from "vue"

import type { RefreshLogoutRequest } from "@/modules/auth/schemas/auth.ts"
import { refresh } from "@/modules/auth/services/auth"

export const useAuthStore = defineStore("auth", () => {
    const isAuthenticated = ref<boolean>(!!getAccessToken())

    function setTokens(access: string, refresh: string) {
        localStorage.setItem("access", access)
        localStorage.setItem("refresh", refresh)
        isAuthenticated.value = !!getAccessToken()
    }

    function getRefreshToken() {
        return localStorage.getItem("refresh")
    }

    function getAccessToken() {
        return localStorage.getItem("access")
    }

    async function updateAccess() {
        const refreshToken = { refresh: getRefreshToken() } as RefreshLogoutRequest
        const newAccess = await refresh(refreshToken)
        localStorage.setItem("access", newAccess.access)
        isAuthenticated.value = !!getAccessToken()
    }

    function logout() {
        localStorage.removeItem("access")
        localStorage.removeItem("refresh")
        isAuthenticated.value = !!getAccessToken()
    }

    return {
        isAuthenticated,
        setTokens,
        updateAccess,
        logout,
        getRefreshToken,
        getAccessToken,
    }
})
