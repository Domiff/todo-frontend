export interface RegisterError {
    username?: string[]
    email?: string[]
    password?: string[]
}

export interface LoginError {
    username?: string
    password?: string
}
