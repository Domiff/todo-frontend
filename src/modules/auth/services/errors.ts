import axios from "axios"
import type { Ref } from "vue"

import type { LoginError, RegisterError } from "@/modules/auth/schemas/authErrors.ts"

export function registerErrorHandler(error: unknown, errorMessage: Ref<string>) {
    if (axios.isAxiosError<RegisterError>(error)) {
        const serverData = error.response?.data

        if (serverData?.username) {
            errorMessage.value = `Username: ${serverData.username.join(" ")}`
        } else if (serverData?.email) {
            errorMessage.value = `Email: ${serverData.email.join(" ")}`
        } else if (serverData?.password) {
            errorMessage.value = `Password: ${serverData.password.join(" ")}`
        } else {
            errorMessage.value = "Registration failed. Please try again"
        }
    } else if (error instanceof Error) {
        errorMessage.value = error.message
    } else {
        errorMessage.value = "Server unavailable. Please try later"
    }
}

export function loginErrorHandler(error: unknown, errorMessage: Ref<string>) {
    if (axios.isAxiosError<LoginError>(error)) {
        if (error.response?.status === 400 || error.response?.status === 401) {
            errorMessage.value = "Incorrect login or password!"
        } else {
            errorMessage.value = "An error occurred. Please try again later."
        }
    }
}
