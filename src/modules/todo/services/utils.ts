import { useDate } from "vuetify/framework"

import { useAuthStore } from "@/modules/auth/store"
import type { AuthHeader } from "@/modules/todo/schemas/todo.ts"

export function makeAuthHeader(): AuthHeader | undefined {
    const auth = useAuthStore()
    const accessToken = auth.getAccessToken()
    if (!accessToken) {
        return undefined
    }
    return { Authorization: `Bearer ${accessToken}` }
}

export function formatDate(date: string | null) {
    if (!date) {
        return ""
    }
    const newDate = useDate()
    return newDate.format(date, "fullDateWithWeekday")
}

export function formatTime(date: string | null) {
    if (!date) {
        return ""
    }
    const newDate = new Date(date)
    const h = String(newDate.getHours()).padStart(2, "0")
    const min = String(newDate.getMinutes()).padStart(2, "0")
    return `${h}:${min}`
}
