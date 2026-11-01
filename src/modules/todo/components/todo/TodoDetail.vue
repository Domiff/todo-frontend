<script setup lang="ts">
    import { computed } from "vue"
    import { blue, green, grey, orange, red } from "vuetify/util/colors"

    import { type Category, priorities, type TaskDetail } from "@/modules/todo/schemas/todo.ts"
    import { formatDate, formatTime } from "@/modules/todo/services/utils.ts"

    const { todo, categories } = defineProps<{
        todo: TaskDetail
        categories: Category[]
    }>()

    const priorityColor = computed(() => {
        if (todo.priority === 3) {
            return red.base
        } else if (todo.priority === 2) {
            return orange.base
        }
        return grey.base
    })

    const priorityTitle = computed(
        () => priorities.find((priority) => priority.value === todo.priority)?.title,
    )

    const categoryName = computed(
        () => categories.find((category) => category.slug === todo.category)?.name ?? todo.category,
    )

    const completedColor = computed(() => {
        if (todo.completed) {
            return green.base
        }
        return blue.base
    })
</script>

<template>
    <div class="d-flex justify-space-between px-3 pt-3">
        <v-chip class="chip-status" v-bind:color="completedColor" size="small">
            {{ todo.completed ? "Done" : "In process" }}
        </v-chip>

        <div class="d-flex ga-1">
            <v-chip v-if="categoryName" class="chip-category" size="small">
                {{ categoryName }}
            </v-chip>

            <v-chip class="chip-priority" v-bind:color="priorityColor" size="small">
                {{ priorityTitle }}
            </v-chip>
        </div>
    </div>
    <v-divider class="mx-3 mt-2 mb-1 opacity-30" />
    <div class="task-content">
        <v-card-title class="task-title text-wrap">
            {{ todo.title }}
        </v-card-title>

        <v-card-text class="task-body">
            {{ todo.body }}
        </v-card-text>

        <div class="deadline-meta">
            <span class="deadline-label">Deadline</span>
            <span>{{ formatDate(todo.deadline) }} - {{ formatTime(todo.deadline) }}</span>
            <span></span>
        </div>
    </div>
</template>

<style scoped>
    .chip-status,
    .chip-category,
    .chip-priority {
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
