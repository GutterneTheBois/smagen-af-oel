import { PrismaClient } from "@prisma/client";
import breweryData from "./seed-data/breweries.json" assert { type: "json" };
import beerData from "./seed-data/beers.json" assert { type: "json" };
import distilleryData from "./seed-data/distilleries.json" assert { type: "json" };
import spiritData from "./seed-data/spirits.json" assert { type: "json" };
import adminData from "./seed-data/admins.json" assert { type: "json" };

const prisma = new PrismaClient();

async function main() {
  // seeding admins
  const admins = await prisma.$transaction(
    adminData.map((admin) => 
      prisma.admin.upsert({
          where: { name: admin.name },
          update: {},
          create: {
            name: admin.name,
          },
        })
      )
  );

  console.log(`Added ${admins.length} admins!`);


  // seeding products
  const breweries = await prisma.$transaction(
    breweryData.map((brewery) =>
      prisma.brewery.upsert({
        where: { name: brewery.name },
        update: {},
        create: {
          name: brewery.name,
          description: brewery.description,
        },
      })
    )
  );

  const beers = await prisma.$transaction(
    beerData.map((beer) =>
      prisma.beer.upsert({
        where: { name: beer.name },
        update: {},
        create: {
          name: beer.name,
          description: beer.description,
          type: beer.type,
          vol: beer.vol,
          ibu: beer.ibu,
          size: beer.size,
          image_url: beer.image_url,
          brewery: {
            connect: {
              name: beer.breweryName,
            },
          },
        },
      })
    )
  );

  const destilleries = await prisma.$transaction(
    distilleryData.map((distillery) =>
      prisma.distillery.upsert({
        where: { name: distillery.name },
        update: {},
        create: {
          name: distillery.name,
          description: distillery.description,
        },
      })
    )
  );

  const spirits = await prisma.$transaction(
    spiritData.map((spirit) =>
      prisma.spirit.upsert({
        where: { name: spirit.name },
        update: {},
        create: {
          name: spirit.name,
          description: spirit.description,
          type: spirit.type,
          vol: spirit.vol,
          size: spirit.size,
          image_url: spirit.image_url,
          distillery: {
            connect: {
              name: spirit.distilleryName,
            },
          },
        },
      })
    )
  );

  console.info(`Seeded ${breweries.length} breweries`);
  console.info(`Seeded ${beers.length} beers`);
  console.info(`Seeded ${destilleries.length} destilleries`);
  console.info(`Seeded ${spirits.length} spirits`);
}

main()
  .then(async () => {
    prisma.$disconnect();
  })
  .catch(async (err) => {
    console.error(err);
    await prisma.$disconnect();
    process.exit(1);
  });
