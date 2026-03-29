import type { RouteRecordRaw } from "vue-router"

import TodoList from "@/modules/todo/views/TodoView.vue"

export const todoRoutes: RouteRecordRaw[] = [{ path: "/tasks", component: TodoList }]
