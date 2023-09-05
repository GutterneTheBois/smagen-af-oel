import { useCallback, useState } from "react";
import { Beer, Prisma } from "@prisma/client";
import { genApiClient } from "../backend/appApiClient";

export type DatabaseHook = {
	beers: Beer[];
	getAllBeers: () => Promise<void>;
	createBeer: (
		name: string,
		type: string,
		vol: Prisma.Decimal,
		size: number,
		image_url: string,
		breweryName: string,
		ibu?: number,
		description?: string
	) => Promise<void>;
};

export const useDbContextValue = (): DatabaseHook => {
	const [beers, setBeers] = useState<Beer[]>([]);

	const getAllBeers = useCallback(async (): Promise<void> => {
		const client = await genApiClient();
		const ex: any = await client.getRequest("beer");

		const beers: Beer[] = ex.beers;

		setBeers(beers);
	}, [setBeers]);

	const createBeer = useCallback(
		async (
			name: string,
			type: string,
			vol: Prisma.Decimal,
			size: number,
			image_url: string,
			breweryName: string,
			ibu?: number,
			description?: string
		): Promise<void> => {
			const client = await genApiClient();

			const newBeer: Beer = {
				name: name,
				description: description || null,
				type: type,
				vol: vol,
				ibu: ibu || null,
				size: size,
				image_url: image_url,
				breweryName: breweryName,
			} as Beer;

			const beer = (await client.postRequest("beer", newBeer)) as Beer;

			setBeers([...beers, beer]);
		},
		[setBeers]
	);

	return {
		beers,
		getAllBeers,
		createBeer,
	};
};
