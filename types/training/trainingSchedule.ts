import { TrainingScheduleStatus, TrainingScheduleType } from "@/lib/generated/prisma/enums"

export type TrainingSchedule = {
    id: string
    trainingId: string
    type: TrainingScheduleType
    status: TrainingScheduleStatus
    startAt: Date | string
    endAt: Date | string
    location: string | null
    price: number | string  // Decimal serializes as string lewat network boundary
    quota: number
    batch: number
    createdAt?: Date | string
    updatedAt?: Date | string
    training?: { id: string; title: string; slug: string } | null
    approvedCount?: number  // di-attach saat query, bukan field DB
}

export type CreateTrainingScheduleInput = {
    trainingId: string
    type: TrainingScheduleType
    startAt: Date
    endAt: Date
    location?: string
    price: number
    quota: number
    batch: number
}

export type UpdateTrainingScheduleInput = Partial<CreateTrainingScheduleInput> & {
    status?: TrainingScheduleStatus // hanya DRAFT/OPEN/CLOSED/CANCELLED yang valid ditulis manual
}