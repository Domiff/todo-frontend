<script setup lang="ts">
    import { ref } from "vue"

    import { router } from "@/core/router"
    import type { RefreshLogoutRequest } from "@/modules/auth/schemas"
    import { logout } from "@/modules/auth/services"
    import { useAuthStore } from "@/modules/auth/store"

    const auth = useAuthStore()
    const isSubmitting = ref(false)

    async function handleLogout() {
        isSubmitting.value = true
        const refresh = auth.getRefreshToken()
        const data = { refresh: refresh } as RefreshLogoutRequest
        try {
            await logout(data)
            auth.logout()
            await router.push("/login")
        } finally {
            isSubmitting.value = false
        }
    }

    async function goBack() {
        await router.push("/tasks")
    }
</script>

<template>
    <v-app>
        <v-container class="logout-wrap d-flex justify-center align-center">
            <v-card width="520" class="pa-8 rounded-xl logout-card">
                <v-card-title class="text-h4 text-center logout-title">Sign out</v-card-title>
                <v-card-subtitle class="text-center logout-subtitle">
                    You are about to end your current session.
                </v-card-subtitle>

                <v-card-text class="pt-6">
                    <v-form v-on:submit.prevent="handleLogout" class="d-flex flex-column ga-3">
                        <v-btn
                            type="submit"
                            color="error"
                            rounded="lg"
                            size="large"
                            variant="flat"
                            block
                            v-bind:loading="isSubmitting"
                        >
                            Logout
                        </v-btn>
                        <v-btn
                            rounded="lg"
                            size="large"
                            variant="tonal"
                            color="primary"
                            block
                            v-bind:disabled="isSubmitting"
                            v-on:click="goBack"
                        >
                            Stay signed in
                        </v-btn>
                    </v-form>
                </v-card-text>
            </v-card>
        </v-container>
    </v-app>
</template>

<style scoped>
    .logout-wrap {
        min-height: 80vh;
    }

    .logout-card {
        border: 1px solid color-mix(in srgb, rgb(var(--v-theme-primary)) 14%, transparent);
    }

    .logout-title {
        color: rgb(var(--v-theme-text-primary));
        font-weight: 800;
        letter-spacing: 0.01em;
    }

    .logout-subtitle {
        color: rgb(var(--v-theme-text-secondary));
        font-size: 0.95rem;
        line-height: 1.5;
        white-space: normal;
        opacity: 1;
    }
</style>
