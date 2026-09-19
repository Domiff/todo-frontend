export const urls = {
    base: import.meta.env.VITE_API_URL,
    auth: {
        register: "auth/web/register/",
        login: "auth/token/",
        logout: "auth/token/blacklist/",
        refresh: "auth/token/refresh/",
    },
    api: {
        read: "api/tasks/",
        create: "api/tasks/",
        update: "api/tasks/",
        delete: "api/tasks/",
    },
} as const
