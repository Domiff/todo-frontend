import type { TaskCreate, TasksList, TaskUpdate } from "@/modules/todo/schemas/todo.ts"
import { makeAuthHeader } from "@/modules/todo/services/utils.ts"
import { FetchApiClient } from "@/services/apiCient.ts"
import { urls } from "@/services/urls.ts"

const todoClient = new FetchApiClient(urls.base)

export async function tasksListView(): Promise<TasksList[]> {
    return await todoClient.get<TasksList[]>(urls.api.read, { headers: makeAuthHeader() })
}

export async function taskCreateView(data: TaskCreate): Promise<TaskCreate> {
    return await todoClient.post(urls.api.create, data, { headers: makeAuthHeader() })
}

export async function taskUpdateView(pk: number, data: TaskUpdate): Promise<TaskUpdate> {
    return await todoClient.patch(urls.api.update + pk, data, { headers: makeAuthHeader() })
}

export async function taskDeleteView(pk: number): Promise<void> {
    return await todoClient.delete(urls.api.delete + pk, { headers: makeAuthHeader() })
}
