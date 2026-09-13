import { CertificationType, PublishedStatus } from "@/lib/generated/prisma/enums"

export type TrainingCategory = {
    id: string
    name: string
    slug: string
}

// Hapus kalo udah selesai buat model training
export type Training = {
    trainingTitle: string
    description: string
    date: string
    activityDuration: number
    type: CertificationType
    price: string
    slug: string
}

export type InitialTrainingData = {
    id: string
    title: string
    slug: string
    description: string
    image: string
    status: PublishedStatus
    trainingCategoryId: string
    certificationType: CertificationType
    createdAt?: Date | string
    updatedAt?: Date | string
    publishedAt?: Date | string | null
}