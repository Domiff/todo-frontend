import { defineStore } from "pinia"
import { computed, ref } from "vue"

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
        logout,
    }
})
