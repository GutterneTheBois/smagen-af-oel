import { PrismaClient } from "@prisma/client";
import breweryData from "./seed-data/breweries.json" assert { type: "json" };
import beerData from "./seed-data/beers.json" assert { type: "json" };
const prisma = new PrismaClient();

async function main() {
	// const breweries = await prisma.brewery.createMany({
	// 	data: breweryData,
	// });

	// const beers = await prisma.beer.createMany({
	// 	data: beerData,
	// });

	// console.info(`Seeded ${breweries.count}`);
	// console.info(`Seeded ${beers.count}`);

	const breweries = await prisma.$transaction(
		breweryData.map(brewery => {
			prisma.brewery.upsert({
				where: { name: brewery.name },
				update: {},
				create: { 
					name: brewery.name, 
					description: brewery.description,
				},
			});
		})
	);

	// const beers = await prisma.$transaction(
	// 	beerData.map(beer => 
	// 		prisma.brewery.update({
	// 			where: { name: beer.breweryName },
	// 			data: {
	// 				beers: {
	// 					create: {
	// 						name: String(beer.name),
	// 						description: beer.description,
	// 						type: beer.type,
	// 						vol: String(beer.vol),
	// 						ibu: beer.ibu,
	// 						size: beer.size,
	// 						image_url: beer.image_url,
	// 					}
	// 				}
	// 			},
	// 		}),
	// 	)
	// );

	console.info(`Seeded ${breweries.length}`);
	// console.info(`Seeded ${beers.length}`);


	// const entry1 = await prisma.exampleUser.upsert({
	//     where: { email: "nick@smagen.ui" },
	//     update: {},
	//     create: {
	//         name: "Nicolai",
	//         email: "nick@smagen.ui",
	//         posts: {
	//             create: [
	//                 {
	//                     title: "Some post",
	//                     content: "Just random words I guess",
	//                     published: false,
	//                 },
	//                 {
	//                     title: "Another person",
	//                     content: "Meh, here's a link: http://localhost:3000",
	//                     published: true,
	//                 },
	//             ],
	//         },
	//     },
	// });
	// const entry2 = await prisma.exampleUser.upsert({
	//     where: { email: "mikkel@smagen.ui" },
	//     update: {},
	//     create: {
	//         name: "Mikkel",
	//         email: "mikkel@smagen.ui",
	//     },
	// });
	// console.log(`Seeded: ${entry1.name} & ${entry2.name}`);
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
