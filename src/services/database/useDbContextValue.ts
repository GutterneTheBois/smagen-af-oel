import { useCallback, useState } from "react";
import { Beer, Brewery, Prisma } from "@prisma/client";
import { genApiClient } from "../backend/appApiClient";

export type DatabaseHook = {
	breweries: Brewery[];
	getAllBreweries: () => Promise<void>;
	createBrewery: (name: string, description?: string) => Promise<void>;
	updateBreweryDescription: (
		id: string,
		newDescription: string
	) => Promise<void>;

	beers: Beer[];
	getAllBeers: () => Promise<void>;
	createBeer: (
		name: string,
		type: string,
		vol: number,
		size: number,
		image_url: string,
		breweryName: string,
		ibu?: number,
		description?: string
	) => Promise<void>;
};

export const useDbContextValue = (): DatabaseHook => {
	/* Brewery Functions */
	const [breweries, setBreweries] = useState<Brewery[]>([]);

	const getAllBreweries = useCallback(async () => {
		const client = await genApiClient();
		const res: any = await client.getRequest("brewery");

		const breweries: Brewery[] = res.breweries;

		setBreweries(breweries);
	}, [setBreweries]);

	const createBrewery = useCallback(
		async (name: string, description?: string) => {
			const client = await genApiClient();

			const newBrewery = {
				name: name,
				description: description,
			};

			const brewery = (await client.postRequest(
				"brewery",
				newBrewery
			)) as Brewery;

			setBreweries([...breweries, brewery]);
		},
		[setBreweries, breweries]
	);

	const updateBreweryDescription = useCallback(
		async (id: string, newDescription: string) => {
			const update = { id, newDescription };

			const client = await genApiClient();
			await client.putRequest("brewery", update);

			await getAllBreweries();
		},
		[getAllBreweries]
	);

	/* Beer Functions */
	const [beers, setBeers] = useState<Beer[]>([]);

	const getAllBeers = useCallback(async (): Promise<void> => {
		const client = await genApiClient();
		const res: any = await client.getRequest("beer");

		const beers: Beer[] = res.beers;

		setBeers(beers);
	}, [setBeers]);

	const createBeer = useCallback(
		async (
			name: string,
			type: string,
			vol: number,
			size: number,
			image_url: string,
			breweryName: string,
			ibu?: number,
			description?: string
		): Promise<void> => {
			const client = await genApiClient();

			const newBeer = {
				name: name,
				description: description || null,
				type: type,
				vol: vol,
				ibu: ibu || null,
				size: size,
				image_url: image_url,
				breweryName: breweryName,
			};

			const beer = (await client.postRequest("beer", newBeer)) as Beer;

			setBeers([...beers, beer]);
		},
		[setBeers, beers]
	);

	return {
		breweries,
		getAllBreweries,
		createBrewery,
		updateBreweryDescription,

		beers,
		getAllBeers,
		createBeer,
	};
};
