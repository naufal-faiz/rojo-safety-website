/*
  Warnings:

  - The values [FULL,COMPLETED] on the enum `training_schedule_status` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "training_schedule_status_new" AS ENUM ('DRAFT', 'OPEN', 'CLOSED', 'CANCELLED');
ALTER TABLE "public"."training_schedule" ALTER COLUMN "status" DROP DEFAULT;
ALTER TABLE "training_schedule" ALTER COLUMN "status" TYPE "training_schedule_status_new" USING ("status"::text::"training_schedule_status_new");
ALTER TYPE "training_schedule_status" RENAME TO "training_schedule_status_old";
ALTER TYPE "training_schedule_status_new" RENAME TO "training_schedule_status";
DROP TYPE "public"."training_schedule_status_old";
ALTER TABLE "training_schedule" ALTER COLUMN "status" SET DEFAULT 'DRAFT';
COMMIT;
