export const urls = {
    base: "http://127.0.0.1:8000/",
    auth: {
        register: "auth/web/register/",
        login: "auth/token/",
        logout: "auth/token/blacklist/",
        refresh: "auth/token/refresh/",
    },
    api: {
        read: "api/list/",
        create: "api/create/",
        update: "api/update/",
        delete: "api/delete/",
    },
} as const
