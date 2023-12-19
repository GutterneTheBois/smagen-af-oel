-- AlterTable
ALTER TABLE "beers" ADD COLUMN     "stockAmount" INTEGER;

-- AlterTable
ALTER TABLE "spirits" ADD COLUMN     "stockAmount" INTEGER;

-- CreateTable
CREATE TABLE "Admin" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "Admin_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Admin_name_key" ON "Admin"("name");
