import { createRouter, createWebHistory } from "vue-router"
import type { Router } from "vue-router"
import Register from "@/views/RegisterView.vue"
import HomeView from "@/views/HomeView.vue"
import Login from "@/views/LoginView.vue"

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
