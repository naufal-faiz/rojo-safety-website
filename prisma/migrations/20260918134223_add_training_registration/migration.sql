-- CreateEnum
CREATE TYPE "registration_status" AS ENUM ('PENDING', 'APPROVED', 'REJECTED');

-- CreateTable
CREATE TABLE "training_registration" (
    "id" UUID NOT NULL,
    "training_schedule_id" UUID NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "phone" TEXT,
    "company" TEXT,
    "status" "registration_status" NOT NULL DEFAULT 'PENDING',
    "reviewed_at" TIMESTAMP(3),
    "reviewed_by" TEXT,
    "rejection_reason" TEXT,
    "notes" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "deleted_at" TIMESTAMP(3),

    CONSTRAINT "training_registration_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "training_registration_training_schedule_id_status_idx" ON "training_registration"("training_schedule_id", "status");

-- CreateIndex
CREATE UNIQUE INDEX "training_registration_training_schedule_id_email_key" ON "training_registration"("training_schedule_id", "email");

-- AddForeignKey
ALTER TABLE "training_registration" ADD CONSTRAINT "training_registration_training_schedule_id_fkey" FOREIGN KEY ("training_schedule_id") REFERENCES "training_schedule"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
