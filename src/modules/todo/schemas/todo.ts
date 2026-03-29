interface BaseTask {
    title: string
    deadline: string
    category: string
}

export interface TasksList extends BaseTask {
    pk: number
    body: string
    completed: boolean
    created_at: string
}

export interface TaskCreate extends BaseTask {
    body: string
}

export interface TaskUpdate extends BaseTask {
    body: string
    deadline: string
    completed: string
}

export type AuthHeader = Record<string, string>
