export type User = {
    uuid: number
    phone: string
    username: string
    name: string
    role: "admin" | "user"
    created_at: Date
    updated_at: Date
    deleted_at: Date
}