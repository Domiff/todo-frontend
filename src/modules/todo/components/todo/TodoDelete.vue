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
    <div class="text-center pa-4">
        <v-btn
            v-on:click="dialog = true"
            color="error"
            variant="tonal"
            rounded="lg"
            class="action-btn"
        >
            Delete the task
        </v-btn>
        <v-dialog v-model="dialog" width="500">
            <v-card class="pa-6 rounded-xl">
                <v-card-title class="text-h5 text-center delete-title"
                    >Delete task with title <i>{{ todo.title }}</i
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
    </div>
</template>

<style scoped>
    .action-btn {
        font-size: 0.92rem;
        font-weight: 700;
    }

    .delete-title {
        line-height: 1.35;
    }
</style>
