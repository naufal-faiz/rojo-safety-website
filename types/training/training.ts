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