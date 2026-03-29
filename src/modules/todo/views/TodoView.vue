<script setup lang="ts">
    import { onMounted, ref } from "vue"
    import { green, orange } from "vuetify/util/colors"

    import TodoCreate from "@/modules/todo/components/todo/TodoCreate.vue"
    import type { TasksList } from "@/modules/todo/schemas/todo.ts"
    import { tasksListView } from "@/modules/todo/services/todo.ts"

    const todoItems = ref<TasksList[]>([])

    function addNewTask(task: TasksList) {
        todoItems.value.push(task)
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
                        <div class="d-flex justify-space-between">
                            <v-chip
                                class="ma-2"
                                v-bind:color="todo.completed ? green.accent1 : orange.accent1"
                                size="small"
                            >
                                {{ todo.completed ? "Done" : "In process" }}
                            </v-chip>

                            <v-chip class="ma-2" color="primary" size="small">
                                {{ todo.category }}
                            </v-chip>
                        </div>

                        <v-divider class="opacity-5" />

                        <div style="width: 400px">
                            <v-card-title>
                                {{ todo.title }}
                            </v-card-title>

                            <v-card-text>
                                {{ todo.body }}
                            </v-card-text>
                        </div>

                        <v-divider class="opacity-5" />
                    </v-card>
                </v-col>
            </v-row>
        </v-container>
    </v-app>
</template>
