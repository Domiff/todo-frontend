import type { Router } from "vue-router"
import { createRouter, createWebHistory } from "vue-router"

import HomeView from "@/views/HomeView.vue"
import LoginView from "@/views/LoginView.vue"
import LogoutView from "@/views/LogoutView.vue"
import RegisterView from "@/views/RegisterView.vue"

const routes = [
    { path: "/", component: HomeView },
    { path: "/register", component: RegisterView },
    { path: "/login", component: LoginView },
    { path: "/logout", component: LogoutView },
]

export const router: Router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: routes,
})
