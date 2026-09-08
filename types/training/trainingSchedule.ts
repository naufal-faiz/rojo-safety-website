export type TrainingSchedule = {
    id: number
    training_id: number
    start_at: Date
    end_at: Date
    location: string
    price: number
    status: "publish" | "draft" | "archived"
    batch_no: number
    training_type: "inhouse" | "public"
    quota: number
    created_at: Date
    updated_at: Date
    deleted_at: Date
}