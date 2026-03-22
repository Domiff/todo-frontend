import type { Router } from "vue-router"
import { createRouter, createWebHistory } from "vue-router"

import HomeView from "@/views/HomeView.vue"
import Login from "@/views/LoginView.vue"
import Register from "@/views/RegisterView.vue"

const routes = [
    { path: "/", component: HomeView },
    { path: "/register", component: Register },
    { path: "/login", component: Login },
]

const router: Router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: routes,
})

export default router
