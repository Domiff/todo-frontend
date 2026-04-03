<script setup lang="ts">
    import { green, orange } from "vuetify/util/colors"

    import type { TaskDetail } from "@/modules/todo/schemas/todo.ts"
    import { formatDate, formatTime } from "@/modules/todo/services/utils.ts"

    const { todo } = defineProps<{
        todo: TaskDetail
    }>()
</script>

<template>
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

        <div class="d-flex justify-lg-end">
            <v-card-text> Deadline </v-card-text>
            <v-card-text> Date: {{ formatDate(todo.deadline) }} </v-card-text>
            <v-card-text> Time: {{ formatTime(todo.deadline) }} </v-card-text>
        </div>
    </div>
    <v-divider class="opacity-5" />
</template>
