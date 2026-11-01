export interface Category {
    slug: string
    name: string
}

export const priorities = [
    { value: 1, title: "Low" },
    { value: 2, title: "Middle" },
    { value: 3, title: "High" },
]

interface BaseTask {
    title: string
    deadline: string
    priority: number
    category: string | null
}

export interface TaskDetail extends BaseTask {
    pk: number
    body: string
    completed: boolean
    created_at: string
    updated_at: string
}

export interface TaskCreate extends BaseTask {
    body: string
}

export interface TaskUpdate extends BaseTask {
    pk: number
    body: string
    completed: boolean
}

export type AuthHeader = Record<string, string>
