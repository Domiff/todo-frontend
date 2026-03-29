<script setup lang="ts">
    import { ref } from "vue"

    import type { LoginRefreshResponse, LoginRequest } from "@/modules/auth/schemas"
    import { login, loginErrorHandler } from "@/modules/auth/services"
    import { useAuthStore } from "@/modules/auth/store/index.ts"
    import { router } from "@/router"

    const username = ref("")
    const password = ref("")
    const errorMessage = ref("")

    const auth = useAuthStore()

    async function handleLogin() {
        const data: LoginRequest = {
            username: username.value,
            password: password.value,
        }
        try {
            const loginData = (await login(data)) as LoginRefreshResponse
            const access: string = loginData.access
            const refresh: string = loginData.refresh
            auth.setTokens(access, refresh)
            await router.push("/tasks")
        } catch (error: unknown) {
            loginErrorHandler(error, errorMessage)
        }
    }
</script>

<template>
    <v-app>
        <v-container class="d-flex justify-center align-center" style="height: 80vh">
            <v-card width="500" class="pa-6">
                <v-card-title class="text-h5 text-center">Login</v-card-title>
                <v-card-text>
                    <v-form @submit.prevent="handleLogin">
                        <v-text-field v-model="username" label="Username" required />
                        <v-text-field
                            v-model="password"
                            label="Password"
                            type="password"
                            required
                        />
                        <v-alert v-if="errorMessage" type="error" dense class="mt-2" border="start">
                            {{ errorMessage }}
                        </v-alert>
                        <v-btn type="submit" color="primary" class="mt-4" block> Login </v-btn>
                    </v-form>
                </v-card-text>
            </v-card>
        </v-container>
    </v-app>
</template>
