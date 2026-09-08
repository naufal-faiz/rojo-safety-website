export type Advertisement = {
    id: number
    image: string
    placement: string //enum nantinya
    article_id?: number
    target_url?: string
    start_at: Date
    end_at: Date
    status: string // enum juga
    type: "article" | "homepage"
    created_at: Date
    updated_at: Date
    deleted_at: Date
}