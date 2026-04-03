interface BaseTask {
    title: string
    deadline: string
    category: string
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
