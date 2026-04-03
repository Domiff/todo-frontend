<script setup lang="ts">
    import { onMounted, ref } from "vue"

    import TodoCreate from "@/modules/todo/components/todo/TodoCreate.vue"
    import TodoDelete from "@/modules/todo/components/todo/TodoDelete.vue"
    import TodoDetail from "@/modules/todo/components/todo/TodoDetail.vue"
    import TodoUpdate from "@/modules/todo/components/todo/TodoUpdate.vue"
    import type { TaskDetail } from "@/modules/todo/schemas/todo.ts"
    import { tasksListView } from "@/modules/todo/services/todo.ts"

    const todoItems = ref<TaskDetail[]>([])

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
        todoItems.value = await tasksListView()
    })
</script>

<template>
    <v-app>
        <v-container class="pa-8">
            <v-row align="center" justify="space-between">
                <h1>List tasks</h1>
                <TodoCreate v-on:add-task="addNewTask" />
            </v-row>

            <v-row gap="16">
                <v-col v-for="todo in todoItems" v-bind:key="todo.pk" cols="12" sm="4">
                    <v-card rounded="lg" hover>
                        <TodoDetail v-bind:todo="todo" />
                        <div class="d-flex row align-text-center">
                            <TodoUpdate v-bind:todo="todo" v-on:update-task="updateTask" />
                            <TodoDelete v-bind:todo="todo" v-on:delete-task="deleteTask" />
                        </div>
                    </v-card>
                </v-col>
            </v-row>
        </v-container>
    </v-app>
</template>
