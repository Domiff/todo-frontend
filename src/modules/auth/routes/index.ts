import type { RouteRecordRaw } from "vue-router"

import LoginView from "@/modules/auth/views/LoginView.vue"
import LogoutView from "@/modules/auth/views/LogoutView.vue"
import RegisterView from "@/modules/auth/views/RegisterView.vue"

export const authRoutes: RouteRecordRaw[] = [
    { path: "/register", component: RegisterView },
    { path: "/login", component: LoginView },
    { path: "/logout", component: LogoutView },
]
