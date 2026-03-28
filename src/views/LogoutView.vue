<script setup lang="ts">
    import Navbar from "@/components/Navbar.vue"
    import type { RefreshLogoutRequest } from "@/interfaces/authInterfaces.ts"
    import { router } from "@/router"
    import { logout } from "@/services/auth"
    import { useAuthStore } from "@/store/auth.ts"

    const auth = useAuthStore()

    async function handleLogout() {
        const refresh = auth.getRefreshToken()
        const data = { refresh: refresh } as RefreshLogoutRequest
        await logout(data)
        auth.logout()
        await router.push("/")
    }
</script>

<template>
    <v-app>
        <Navbar />
        <v-container class="d-flex justify-center align-center" style="height: 80vh">
            <v-card width="500" class="pa-6">
                <v-card-title class="text-h2 text-center">Logout</v-card-title>
                <v-card-text>
                    <v-form v-on:submit.prevent="handleLogout">
                        <v-btn type="submit" block>Logout</v-btn>
                    </v-form>
                </v-card-text>
            </v-card>
        </v-container>
    </v-app>
</template>

<style scoped></style>
