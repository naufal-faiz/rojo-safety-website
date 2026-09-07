export enum CertificationType {
    bnsp, kemnaker
}

export type Training = {
    trainingTitle: string
    description: string
    date: string
    activityDuration: number
    type: CertificationType
    price: string
    slug: string
}

export type TrainingMaster = {
    id: number
    category_id: number
    seo_id: number
    title: string
    slug: string
    image: string
    description: string
    certification_type: CertificationType
    created_at: Date
    updated_at: Date
    deleted_at: Date
}

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