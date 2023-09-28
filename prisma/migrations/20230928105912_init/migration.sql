-- CreateTable
CREATE TABLE "breweries" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,

    CONSTRAINT "breweries_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "beers" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "type" TEXT NOT NULL,
    "vol" DECIMAL(65,30) NOT NULL,
    "ibu" INTEGER,
    "size" INTEGER NOT NULL,
    "image_url" TEXT,
    "breweryName" TEXT NOT NULL,

    CONSTRAINT "beers_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "distilleries" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,

    CONSTRAINT "distilleries_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "spirits" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "type" TEXT NOT NULL,
    "vol" DECIMAL(65,30) NOT NULL,
    "size" INTEGER NOT NULL,
    "image_url" TEXT,
    "distilleryName" TEXT NOT NULL,

    CONSTRAINT "spirits_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "breweries_name_key" ON "breweries"("name");

-- CreateIndex
CREATE UNIQUE INDEX "beers_name_key" ON "beers"("name");

-- CreateIndex
CREATE UNIQUE INDEX "distilleries_name_key" ON "distilleries"("name");

-- CreateIndex
CREATE UNIQUE INDEX "spirits_name_key" ON "spirits"("name");

-- AddForeignKey
ALTER TABLE "beers" ADD CONSTRAINT "beers_breweryName_fkey" FOREIGN KEY ("breweryName") REFERENCES "breweries"("name") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "spirits" ADD CONSTRAINT "spirits_distilleryName_fkey" FOREIGN KEY ("distilleryName") REFERENCES "distilleries"("name") ON DELETE RESTRICT ON UPDATE CASCADE;
