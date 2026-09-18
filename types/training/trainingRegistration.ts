import { RegistrationStatus } from "@/lib/generated/prisma/enums"

export type TrainingRegistration = {
    id: string
    trainingScheduleId: string
    name: string
    email: string
    phone: string | null
    company: string | null
    status: RegistrationStatus
    reviewedAt: Date | string | null
    reviewedBy: string | null
    rejectionReason: string | null
    notes: string | null
    createdAt: Date | string
    updatedAt?: Date | string
    schedule?: { id: string; batch: number; startAt: Date | string; training?: { title: string } } | null
}

export type CreateRegistrationInput = {
    trainingScheduleId: string
    name: string
    email: string
    phone?: string
    company?: string
    notes?: string
}