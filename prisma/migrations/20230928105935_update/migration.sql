-- AlterTable
ALTER TABLE "beers" ADD COLUMN     "beer_of_the_dayId" INTEGER;

-- CreateTable
CREATE TABLE "announcements" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,

    CONSTRAINT "announcements_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "botds" (
    "id" SERIAL NOT NULL,

    CONSTRAINT "botds_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "beers" ADD CONSTRAINT "beers_beer_of_the_dayId_fkey" FOREIGN KEY ("beer_of_the_dayId") REFERENCES "botds"("id") ON DELETE SET NULL ON UPDATE CASCADE;
