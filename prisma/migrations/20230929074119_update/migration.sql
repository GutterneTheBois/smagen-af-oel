-- AlterTable
ALTER TABLE "beers" ADD COLUMN     "botd" BOOLEAN NOT NULL DEFAULT false;

-- CreateTable
CREATE TABLE "announcements" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,

    CONSTRAINT "announcements_pkey" PRIMARY KEY ("id")
);
