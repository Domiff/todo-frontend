<script setup lang="ts">
    import { ref } from "vue"

    import type { TaskDetail, TaskUpdate } from "@/modules/todo/schemas/todo.ts"
    import { taskUpdateView } from "@/modules/todo/services/todo.ts"
    import { formatDate, formatTime } from "@/modules/todo/services/utils.ts"

    const { todo } = defineProps<{
        todo: TaskDetail
    }>()
    const emit = defineEmits(["update-task"])

    const dialog = ref(false)

    const title = ref(todo.title)
    const category = ref(todo.category)
    const body = ref(todo.body)
    const completed = ref(todo.completed)

    const date = ref<string>(formatDate(todo.deadline))
    const time = ref<string>(formatTime(todo.deadline))

    const dateMenu = ref(false)
    const timeMenu = ref(false)

    async function handleUpdate() {
        if (date.value !== null && time.value !== undefined) {
            const deadline = new Date(date.value)
            const timeAsString = time.value.split(":")
            const timeAsNumber = timeAsString.map((num) => Number(num))

            deadline.setHours(timeAsNumber[0] ?? 0)
            deadline.setMinutes(timeAsNumber[1] ?? 0)

            const task: TaskUpdate = {
                pk: todo.pk,
                title: title.value,
                deadline: deadline.toISOString(),
                category: category.value,
                body: body.value,
                completed: completed.value,
            }
            if (todo.pk) {
                emit("update-task", await taskUpdateView(todo.pk, task), todo.pk)
            }
            dialog.value = false
        }
    }
</script>

<template>
    <div class="text-center pa-4">
        <v-btn v-on:click="dialog = true">Update the task</v-btn>

        <v-dialog v-model="dialog" width="500">
            <v-card class="pa-6 rounded-xl">
                <v-card-title class="text-h5 text-center mb-4">Update the task</v-card-title>

                <v-card-text>
                    <v-form v-on:submit.prevent="handleUpdate" class="d-flex flex-column ga-4">
                        <v-text-field
                            label="Title"
                            v-model="title"
                            variant="outlined"
                            rounded="lg"
                        />

                        <v-textarea label="Body" v-model="body" variant="outlined" rounded="lg" />

                        <v-menu v-model="dateMenu" v-bind:close-on-content-click="false">
                            <template v-slot:activator="{ props }">
                                <v-text-field
                                    v-bind="props"
                                    label="Select Date"
                                    v-bind:model-value="formatDate(date)"
                                    readonly
                                    variant="outlined"
                                    rounded="lg"
                                />
                            </template>

                            <v-date-picker
                                v-model="date"
                                v-on:update:modelValue="dateMenu = false"
                                show-adjacent-months
                            />
                        </v-menu>

                        <v-menu v-model="timeMenu" v-bind:close-on-content-click="false">
                            <template v-slot:activator="{ props }">
                                <v-text-field
                                    v-bind="props"
                                    label="Select Time"
                                    v-bind:model-value="time"
                                    readonly
                                    variant="outlined"
                                    rounded="lg"
                                />
                            </template>

                            <v-time-picker
                                v-model="time"
                                format="24hr"
                                v-on:update:modelValue="timeMenu = false"
                            />
                        </v-menu>

                        <v-select
                            label="Category"
                            v-model="category"
                            v-bind:items="['Primary', 'Secondary']"
                            variant="outlined"
                            rounded="lg"
                        />

                        <v-radio-group label="Status" v-model="completed" inline>
                            <v-radio
                                label="Completed"
                                value="true"
                                color="primary"
                                class="mr-4"
                            ></v-radio>
                            <v-radio
                                label="In process"
                                value="false"
                                color="primary"
                                class="mr-4"
                            ></v-radio>
                        </v-radio-group>

                        <v-btn
                            type="submit"
                            color="primary"
                            class="mt-2"
                            rounded="lg"
                            elevation="1"
                            block
                        >
                            Update task
                        </v-btn>
                    </v-form>
                </v-card-text>
            </v-card>
        </v-dialog>
    </div>
</template>
