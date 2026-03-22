<script setup lang="ts">
    import { ref } from "vue"

    import Navbar from "@/components/Navbar.vue"
    import type { AuthRequest, LoginResponse } from "@/interfaces/apiClientInterfaces.ts"
    import router from "@/router"
    import { login, loginErrorHandler } from "@/services/auth"
    import { useAuthStore } from "@/store/auth.ts"

    const username = ref("")
    const password = ref("")
    const errorMessage = ref("")

    const auth = useAuthStore()

    async function handleLogin() {
        const data: AuthRequest = {
            username: username.value,
            password: password.value,
        }
        try {
            const loginDAta = (await login(data)) as LoginResponse
            const access: string = loginDAta.access
            const refresh: string = loginDAta.refresh
            auth.setTokens(access, refresh)
            await router.push("/")
        } catch (error: unknown) {
            loginErrorHandler(error, errorMessage)
        }
    }
</script>

<template>
    <v-app>
        <Navbar />
        <br /><br />
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
