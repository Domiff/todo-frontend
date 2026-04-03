import { createRouter, createWebHistory } from "vue-router"

import HomeView from "@/core/views/HomeView.vue"
import { authRoutes } from "@/modules/auth/routes"
import { todoRoutes } from "@/modules/todo/routes"

const routes = [{ path: "/", component: HomeView }, ...authRoutes, ...todoRoutes]

export const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: routes,
})
