import { prisma } from "@/lib/prisma";
import { Beer, Brewery, Distillery, Spirit } from "@prisma/client";

export class DbClient {
	async findSpecificElement(
		type: "brewery" | "distillery" | "beer" | "spirit",
		name: string
	) {
		switch (type) {
			case "brewery":
				return (await prisma.brewery.findUnique({
					where: {
						name: name,
					},
				})) as Brewery;
			case "distillery":
				return (await prisma.distillery.findUnique({
					where: {
						name: name,
					},
				})) as Distillery;
			case "beer":
				return (await prisma.beer.findUnique({
					where: {
						name: name,
					},
				})) as Beer;
			case "spirit":
				return (await prisma.spirit.findUnique({
					where: {
						name: name,
					},
				})) as Spirit;
		}
	}
}

export const dbClient = async () => new DbClient();
