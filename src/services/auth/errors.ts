import type { Ref } from "vue"
import axios from "axios"
import type {
    RegisterErrorInterface,
    LoginErrorInterface,
} from "@/interfaces/authErrorInterface.ts"

export function registerErrorHandler(error: unknown, errorMessage: Ref<string>) {
    if (axios.isAxiosError<RegisterErrorInterface>(error)) {
        const serverData = error.response?.data

        if (serverData?.username) {
            errorMessage.value = `Username: "${serverData.username}"`
        } else if (serverData?.first_name) {
            errorMessage.value = `Firstname "${serverData.first_name}"`
        } else if (serverData?.last_name) {
            errorMessage.value = `Lastname "${serverData.last_name}"`
        } else if (serverData?.email) {
            errorMessage.value = `Email "${serverData.email}"`
        } else if (error.response?.status === 500) {
            errorMessage.value = `Field username and email must be unique`
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
    if (axios.isAxiosError<LoginErrorInterface>(error)) {
        if (error.response?.status === 400) {
            errorMessage.value = "Incorrect login or password!"
        } else {
            errorMessage.value = "An error occurred. Please try again later."
        }
    }
}
