<script setup lang="ts">
    import type { TaskDetail } from "@/modules/todo/schemas/todo.ts"
    import { formatDate, formatTime } from "@/modules/todo/services/utils.ts"

    const { todo } = defineProps<{
        todo: TaskDetail
    }>()
</script>

<template>
    <div class="d-flex justify-space-between px-3 pt-3">
        <v-chip
            class="chip-status"
            v-bind:color="todo.completed ? 'success' : 'warning'"
            size="small"
        >
            {{ todo.completed ? "Done" : "In process" }}
        </v-chip>

        <v-chip class="chip-category" color="secondary" size="small" variant="flat">
            {{ todo.category }}
        </v-chip>
    </div>
    <v-divider class="mx-3 mt-2 mb-1 opacity-30" />
    <div class="task-content">
        <v-card-title class="task-title">
            {{ todo.title }}
        </v-card-title>

        <v-card-text class="task-body">
            {{ todo.body }}
        </v-card-text>

        <div class="deadline-meta">
            <span class="deadline-label">Deadline</span>
            <span>Date: {{ formatDate(todo.deadline) }}</span>
            <span>Time: {{ formatTime(todo.deadline) }}</span>
        </div>
    </div>
    <v-divider class="mx-3 mb-1 opacity-30" />
</template>

<style scoped>
    .chip-status,
    .chip-category {
        font-weight: 600;
    }

    .task-content {
        padding: 2px 12px 8px;
    }

    .task-title {
        padding-bottom: 8px;
        font-size: 1.05rem;
        line-height: 1.35;
    }

    .task-body {
        min-height: 72px;
        font-size: 0.96rem;
        color: color-mix(in srgb, rgb(var(--v-theme-text-primary)) 88%, black 12%);
    }

    .deadline-meta {
        display: flex;
        flex-wrap: wrap;
        gap: 8px 12px;
        padding: 0 16px 12px;
        font-size: 0.82rem;
        color: rgb(var(--v-theme-text-secondary));
    }

    .deadline-label {
        font-weight: 700;
        color: rgb(var(--v-theme-text-primary));
    }
</style>
