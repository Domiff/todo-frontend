<script setup lang="ts">
    import { ref } from "vue"

    import type { TaskCreate } from "@/modules/todo/schemas/todo.ts"
    import { taskCreateView } from "@/modules/todo/services/todo.ts"
    import { formatDate } from "@/modules/todo/services/utils.ts"

    const dialog = ref(false)

    const title = ref("")
    const category = ref("")
    const body = ref("")

    const date = ref<string>("")
    const time = ref<string>("")

    const dateMenu = ref(false)
    const timeMenu = ref(false)

    const emit = defineEmits(["add-task"])

    async function handleCreate() {
        if (date.value !== null && time.value !== undefined) {
            const deadline = new Date(date.value)
            const timeAsString = time.value.split(":")
            const timeAsNumber = timeAsString.map((num) => Number(num))

            deadline.setHours(timeAsNumber[0] ?? 0)
            deadline.setMinutes(timeAsNumber[1] ?? 0)

            const task: TaskCreate = {
                title: title.value,
                deadline: deadline.toISOString(),
                category: category.value,
                body: body.value,
            }
            emit("add-task", await taskCreateView(task))
            dialog.value = false
        }
    }
</script>

<template>
    <div class="text-center pa-4">
        <v-btn v-on:click="dialog = true"> Create a new task </v-btn>

        <v-dialog v-model="dialog" width="500">
            <v-card class="pa-6 rounded-xl">
                <v-card-title class="text-h5 text-center mb-4"> Create a new task </v-card-title>

                <v-card-text>
                    <v-form v-on:submit.prevent="handleCreate" class="d-flex flex-column ga-4">
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

                        <v-btn
                            type="submit"
                            color="primary"
                            class="mt-2"
                            rounded="lg"
                            elevation="1"
                            block
                        >
                            Create task
                        </v-btn>
                    </v-form>
                </v-card-text>
            </v-card>
        </v-dialog>
    </div>
</template>
