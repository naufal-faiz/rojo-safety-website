import { TrainingCategory } from "./training"

export type HeavyEquipment = {
    id: string
    name: string
    description: string
    image: string
    trainingCategoryId: string
    createdAt?: Date | string
    updatedAt?: Date | string
    deletedAt?: Date | string | null
    category?: TrainingCategory | null
}

export type CreateHeavyEquipmentInput = {
    name: string
    description: string
    image: string
    trainingCategoryId: string
}
