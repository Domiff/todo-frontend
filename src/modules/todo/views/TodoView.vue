<script setup lang="ts">
    import { onMounted, ref } from "vue"

    import { router } from "@/core/router"
    import { useAuthStore } from "@/modules/auth/store"
    import TodoCreate from "@/modules/todo/components/todo/TodoCreate.vue"
    import TodoDelete from "@/modules/todo/components/todo/TodoDelete.vue"
    import TodoDetail from "@/modules/todo/components/todo/TodoDetail.vue"
    import TodoUpdate from "@/modules/todo/components/todo/TodoUpdate.vue"
    import type { TaskDetail } from "@/modules/todo/schemas/todo.ts"
    import { tasksListView } from "@/modules/todo/services/todo.ts"

    const todoItems = ref<TaskDetail[]>([])

    const auth = useAuthStore()

    function addNewTask(task: TaskDetail) {
        todoItems.value.push(task)
    }

    function updateTask(updatedTask: TaskDetail) {
        const index = todoItems.value.findIndex((task) => task.pk === updatedTask.pk)
        if (index !== -1) {
            todoItems.value.splice(index, 1, updatedTask)
        }
    }

    function deleteTask(pk: number) {
        const index = todoItems.value.findIndex((task) => task.pk === pk)
        if (index !== -1) {
            todoItems.value.splice(index, 1)
        }
    }

    onMounted(async () => {
        try {
            todoItems.value = await tasksListView()
        } catch {
            try {
                await auth.updateAccess()
                todoItems.value = await tasksListView()
            } catch {
                auth.logout()
                window.alert("You are not logged in")
                await router.push("login")
            }
        }
    })
</script>

<template>
    <v-container class="pa-4 pa-sm-6 pa-md-8 todo-page">
        <v-row align="center" justify="space-between" class="mb-4 flex-wrap ga-2">
            <h1 class="page-title">List tasks</h1>
            <TodoCreate v-on:add-task="addNewTask" />
        </v-row>

        <v-row>
            <v-col
                v-for="todo in todoItems"
                v-bind:key="todo.pk"
                cols="12"
                sm="6"
                md="4"
                lg="3"
                class="d-flex"
            >
                <v-card rounded="xl" hover class="task-card w-100 d-flex flex-column">
                    <TodoDetail v-bind:todo="todo" />
                    <v-spacer />
                    <v-divider class="mx-3 mb-1 opacity-30" />

                    <v-card-actions class="px-4 pb-4 pt-1 task-actions">
                        <TodoUpdate v-bind:todo="todo" v-on:update-task="updateTask" />
                        <TodoDelete v-bind:todo="todo" v-on:delete-task="deleteTask" />
                    </v-card-actions>
                </v-card>
            </v-col>
        </v-row>
    </v-container>
</template>

<style scoped>
    .todo-page {
        max-width: 1280px;
    }

    .page-title {
        color: rgb(var(--v-theme-text-primary));
        font-size: clamp(1.4rem, 2.2vw, 2rem);
        font-weight: 800;
        letter-spacing: 0.01em;
    }

    .task-card {
        background: color-mix(
            in srgb,
            rgb(var(--v-theme-surface)) 94%,
            rgb(var(--v-theme-background)) 6%
        );
    }

    .task-actions {
        display: grid;
        grid-template-columns: repeat(2, minmax(0, 1fr));
        gap: 8px;
    }

    .task-card :deep(.action-btn) {
        width: 100%;
        min-width: 0;
    }
</style>
