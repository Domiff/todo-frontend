import { createRouter, createWebHistory } from "vue-router"

import { authRoutes } from "@/modules/auth/routes"
import { todoRoutes } from "@/modules/todo/routes"
import HomeView from "@/views/HomeView.vue"

const routes = [{ path: "/", component: HomeView }, ...authRoutes, ...todoRoutes]

export const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: routes,
})
