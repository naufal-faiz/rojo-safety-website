-- CreateEnum
CREATE TYPE "user_role" AS ENUM ('ADMIN', 'USER');

-- CreateEnum
CREATE TYPE "published_status" AS ENUM ('DRAFT', 'PUBLISHED', 'ARCHIVED');

-- CreateEnum
CREATE TYPE "training_schedule_type" AS ENUM ('PUBLIC', 'INHOUSE');

-- CreateEnum
CREATE TYPE "training_schedule_status" AS ENUM ('DRAFT', 'OPEN', 'FULL', 'CLOSED', 'CANCELLED', 'COMPLETED');

-- CreateEnum
CREATE TYPE "certification_type" AS ENUM ('NONE', 'BNSP', 'KEMNAKER');

-- CreateEnum
CREATE TYPE "ads_modal_placement" AS ENUM ('LANDING_PAGE', 'ARTICLE');

-- CreateEnum
CREATE TYPE "ads_modal_type" AS ENUM ('GENERAL', 'ARTICLE_PROMOTION');

-- CreateEnum
CREATE TYPE "ads_modal_status" AS ENUM ('DRAFT', 'ACTIVE', 'INACTIVE');

-- CreateTable
CREATE TABLE "user" (
    "id" UUID NOT NULL,
    "email" TEXT NOT NULL,
    "phone" TEXT,
    "username" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "role" "user_role" NOT NULL DEFAULT 'USER',
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "deleted_at" TIMESTAMP(3),

    CONSTRAINT "user_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "seo" (
    "id" UUID NOT NULL,
    "meta_title" TEXT,
    "meta_description" TEXT,
    "canonical_url" TEXT,
    "robots_index" BOOLEAN NOT NULL DEFAULT true,
    "robots_follow" BOOLEAN NOT NULL DEFAULT true,
    "og_title" TEXT,
    "og_description" TEXT,
    "og_image" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "deleted_at" TIMESTAMP(3),

    CONSTRAINT "seo_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "article_category" (
    "id" UUID NOT NULL,
    "name" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "deleted_at" TIMESTAMP(3),

    CONSTRAINT "article_category_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "article" (
    "id" UUID NOT NULL,
    "title" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "thumbnail" TEXT NOT NULL,
    "excerpt" TEXT,
    "views" INTEGER NOT NULL DEFAULT 0,
    "status" "published_status" NOT NULL DEFAULT 'DRAFT',
    "article_category_id" UUID NOT NULL,
    "seo_id" UUID,
    "published_at" TIMESTAMP(3),
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "deleted_at" TIMESTAMP(3),

    CONSTRAINT "article_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "training_category" (
    "id" UUID NOT NULL,
    "name" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "deleted_at" TIMESTAMP(3),

    CONSTRAINT "training_category_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "heavy_equipment" (
    "id" UUID NOT NULL,
    "name" TEXT NOT NULL,
    "training_category_id" UUID NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "deleted_at" TIMESTAMP(3),

    CONSTRAINT "heavy_equipment_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "training" (
    "id" UUID NOT NULL,
    "title" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "image" TEXT NOT NULL,
    "certification" "certification_type" NOT NULL DEFAULT 'KEMNAKER',
    "status" "published_status" NOT NULL DEFAULT 'DRAFT',
    "training_category_id" UUID NOT NULL,
    "seo_id" UUID,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "published_at" TIMESTAMP(3),
    "updated_at" TIMESTAMP(3) NOT NULL,
    "deleted_at" TIMESTAMP(3),

    CONSTRAINT "training_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "training_schedule" (
    "id" UUID NOT NULL,
    "training_id" UUID NOT NULL,
    "type" "training_schedule_type" NOT NULL,
    "status" "training_schedule_status" NOT NULL DEFAULT 'DRAFT',
    "start_at" TIMESTAMP(3) NOT NULL,
    "end_at" TIMESTAMP(3) NOT NULL,
    "location" TEXT,
    "price" DECIMAL(12,2) NOT NULL,
    "quota" INTEGER NOT NULL,
    "batch" INTEGER NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "deleted_at" TIMESTAMP(3),

    CONSTRAINT "training_schedule_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ads_modal" (
    "id" UUID NOT NULL,
    "image" TEXT NOT NULL,
    "placement" "ads_modal_placement" NOT NULL,
    "type" "ads_modal_type" NOT NULL DEFAULT 'GENERAL',
    "status" "ads_modal_status" NOT NULL DEFAULT 'DRAFT',
    "target_url" TEXT NOT NULL,
    "start_at" TIMESTAMP(3) NOT NULL,
    "end_at" TIMESTAMP(3) NOT NULL,
    "article_id" UUID,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "deleted_at" TIMESTAMP(3),

    CONSTRAINT "ads_modal_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "user_email_key" ON "user"("email");

-- CreateIndex
CREATE UNIQUE INDEX "user_username_key" ON "user"("username");

-- CreateIndex
CREATE UNIQUE INDEX "article_slug_key" ON "article"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "article_seo_id_key" ON "article"("seo_id");

-- CreateIndex
CREATE INDEX "article_article_category_id_idx" ON "article"("article_category_id");

-- CreateIndex
CREATE INDEX "article_status_idx" ON "article"("status");

-- CreateIndex
CREATE INDEX "heavy_equipment_training_category_id_idx" ON "heavy_equipment"("training_category_id");

-- CreateIndex
CREATE UNIQUE INDEX "training_slug_key" ON "training"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "training_seo_id_key" ON "training"("seo_id");

-- CreateIndex
CREATE INDEX "training_training_category_id_idx" ON "training"("training_category_id");

-- CreateIndex
CREATE INDEX "training_status_idx" ON "training"("status");

-- CreateIndex
CREATE INDEX "training_schedule_training_id_idx" ON "training_schedule"("training_id");

-- CreateIndex
CREATE INDEX "training_schedule_status_idx" ON "training_schedule"("status");

-- CreateIndex
CREATE INDEX "training_schedule_type_idx" ON "training_schedule"("type");

-- CreateIndex
CREATE INDEX "ads_modal_placement_idx" ON "ads_modal"("placement");

-- CreateIndex
CREATE INDEX "ads_modal_article_id_idx" ON "ads_modal"("article_id");

-- AddForeignKey
ALTER TABLE "article" ADD CONSTRAINT "article_article_category_id_fkey" FOREIGN KEY ("article_category_id") REFERENCES "article_category"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "article" ADD CONSTRAINT "article_seo_id_fkey" FOREIGN KEY ("seo_id") REFERENCES "seo"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "heavy_equipment" ADD CONSTRAINT "heavy_equipment_training_category_id_fkey" FOREIGN KEY ("training_category_id") REFERENCES "training_category"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "training" ADD CONSTRAINT "training_seo_id_fkey" FOREIGN KEY ("seo_id") REFERENCES "seo"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "training" ADD CONSTRAINT "training_training_category_id_fkey" FOREIGN KEY ("training_category_id") REFERENCES "training_category"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "training_schedule" ADD CONSTRAINT "training_schedule_training_id_fkey" FOREIGN KEY ("training_id") REFERENCES "training"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ads_modal" ADD CONSTRAINT "ads_modal_article_id_fkey" FOREIGN KEY ("article_id") REFERENCES "article"("id") ON DELETE SET NULL ON UPDATE CASCADE;
