<script setup lang="ts">
    import { ref } from "vue"
    import { login } from "@/services/auth"
    import router from "@/router"
    import Navbar from "@/components/Navbar.vue"

    const username = ref("")
    const password = ref("")
    const errorMessage = ref("")

    async function handleLogin() {
        const data = {
            username: username.value,
            password: password.value,
        }
        try {
            await login(data)
            errorMessage.value = ""
            await router.push("/")
        } catch (error: Error) {
            if (error.response?.status === 400) {
                errorMessage.value = "Incorrect login or password!"
            } else {
                errorMessage.value = "An error occurred. Please try again later."
            }
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
