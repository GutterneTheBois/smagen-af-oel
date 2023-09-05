import { PrismaClient } from "@prisma/client";
import breweryData from "./seed-data/breweries.json" assert { type: "json" };
import beerData from "./seed-data/beers.json" assert { type: "json" };


const prisma = new PrismaClient();

async function main() {
	const breweries = await prisma.$transaction(
		breweryData.map((brewery) => 
			prisma.brewery.upsert({
				where: { name: brewery.name },
				update: {},
				create: {
					name: brewery.name,
					description: brewery.description
				}
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
							name: beer.breweryName
						}
					}
				}
			})
		)
	);

	console.info(`Seeded ${breweries.length} breweries`);
	console.info(`Seeded ${beers.length} beers`);
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
