import { createRouter, createWebHistory } from "vue-router"

import { authRoutes } from "@/modules/auth/router"
import HomeView from "@/views/HomeView.vue"

const routes = [{ path: "/", component: HomeView }, ...authRoutes]

export const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: routes,
})
