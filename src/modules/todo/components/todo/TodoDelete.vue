<script setup lang="ts">
    import { ref } from "vue"

    import type { TaskDetail } from "@/modules/todo/schemas/todo.ts"
    import { taskDeleteView } from "@/modules/todo/services/todo.ts"

    const dialog = ref(false)

    const { todo } = defineProps<{
        todo: TaskDetail
    }>()
    const emit = defineEmits(["delete-task"])

    async function handleDelete() {
        await taskDeleteView(todo.pk)
        emit("delete-task", todo.pk)
        dialog.value = false
    }
</script>

<template>
    <v-btn
        v-on:click="dialog = true"
        color="error"
        variant="flat"
        rounded="lg"
        size="small"
        class="action-btn"
        prepend-icon="mdi-delete-outline"
    >
        Delete
    </v-btn>
    <v-dialog v-model="dialog" max-width="500">
        <v-card class="pa-6 rounded-xl">
            <v-card-title class="text-h5 text-center delete-title text-wrap">
                Are you sure to want delete task: <i>{{ todo.title }}</i
                >?
            </v-card-title>

            <v-card-text>
                <v-form v-on:submit.prevent="handleDelete">
                    <v-btn
                        type="submit"
                        color="error"
                        class="mt-2 action-btn"
                        rounded="lg"
                        elevation="1"
                        variant="flat"
                        block
                    >
                        Delete task
                    </v-btn>
                </v-form>
            </v-card-text>
        </v-card>
    </v-dialog>
</template>

<style scoped>
    .action-btn {
        font-size: 0.92rem;
        font-weight: 700;
        text-align: center;
    }

    .action-btn :deep(.v-btn__content) {
        width: 100%;
        justify-content: center;
    }

    .delete-title {
        line-height: 1.35;
    }
</style>
