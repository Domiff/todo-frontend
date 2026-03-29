<script setup lang="ts">
    import { ref } from "vue"

    import type { RegisterRequest, RegisterResponse } from "@/modules/auth/schemas"
    import { register, registerErrorHandler } from "@/modules/auth/services"
    import { useAuthStore } from "@/modules/auth/store"
    import { router } from "@/router"

    const username = ref("")
    const firstName = ref("")
    const lastName = ref("")
    const email = ref("")
    const password1 = ref("")
    const password2 = ref("")
    const errorMessage = ref("")

    const auth = useAuthStore()

    const required = (value: string) => !!value || "This field is required"
    const validEmail = (value: string) => {
        const pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
        return (!!value && pattern.test(value)) || "Invalid email"
    }
    const passwordsMatch = (): boolean | string =>
        password1.value === password2.value || "Passwords do not match"

    async function handleRegister() {
        if (password1.value !== password2.value) {
            errorMessage.value = "Passwords do not match"
            return
        }
        const data: RegisterRequest = {
            username: username.value,
            first_name: firstName.value,
            last_name: lastName.value,
            email: email.value,
            password: password1.value,
        }
        try {
            const registerData = (await register(data)) as RegisterResponse
            const access: string = registerData.tokens.access
            const refresh: string = registerData.tokens.refresh
            auth.setTokens(access, refresh)
            await router.push("/tasks")
        } catch (error: unknown) {
            registerErrorHandler(error, errorMessage)
        }
    }
</script>

<template>
    <v-app>
        <v-container class="d-flex justify-center align-center" style="height: 80vh">
            <v-card width="500" class="pa-6">
                <v-card-title class="text-h5 text-center">Register</v-card-title>
                <v-card-text>
                    <v-form @submit.prevent="handleRegister">
                        <v-text-field
                            label="Username"
                            v-model="username"
                            v-bind:rules="[required]"
                            required
                        />
                        <v-text-field
                            label="Firstname"
                            v-model="firstName"
                            v-bind:rules="[required]"
                            required
                        />
                        <v-text-field
                            label="Lastname"
                            v-model="lastName"
                            v-bind:rules="[required]"
                            required
                        />
                        <v-text-field
                            label="Email"
                            v-model="email"
                            type="email"
                            v-bind:rules="[required, validEmail]"
                            required
                        />
                        <v-text-field
                            label="Password"
                            v-model="password1"
                            type="password"
                            v-bind:rules="[required]"
                            required
                        />
                        <v-text-field
                            label="Confirm password"
                            v-model="password2"
                            type="password"
                            v-bind:rules="[required, passwordsMatch]"
                            required
                        />

                        <v-alert v-if="errorMessage" type="error" dense class="mt-2" border="start">
                            {{ errorMessage }}
                        </v-alert>

                        <v-btn type="submit" color="primary" class="mt-4" block>Register</v-btn>
                    </v-form>
                </v-card-text>
            </v-card>
        </v-container>
    </v-app>
</template>
