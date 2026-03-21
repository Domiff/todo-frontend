import { client } from "@/services/apiCient.ts"
import { urls } from "@/services/urls.ts"

export async function register(data: object): Promise<string> {
    return await client.post(urls.auth.register, data)
}

export async function login(data: object): Promise<string> {
    return await client.post(urls.auth.login, data)
}
