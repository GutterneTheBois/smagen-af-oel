import { useCallback, useState } from "react";
import { Beer, Brewery, Distillery, Spirit } from "@prisma/client";
import { genApiClient } from "../backend/appApiClient";

export type DatabaseHook = {
	breweries: Brewery[];
	refreshBreweries: () => Promise<void>;
	createBrewery: (name: string, description?: string) => Promise<void>;
	deleteBrewery: (id: string) => Promise<void>;

	beers: Beer[];
	refreshBeers: () => Promise<void>;
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
	deleteBeer: (id: string) => Promise<void>;

	distilleries: Distillery[];
	refreshDistilleries: () => Promise<void>;
	createDistillery: (name: string, description?: string) => Promise<void>;
	deleteDistillery: (id: string) => Promise<void>;

	spirits: Spirit[];
	refreshSpirits: () => Promise<void>;
	createSpirit: (
		name: string,
		distilleryName: string,
		type: string,
		vol: number,
		size: number,
		image_url?: string,
		description?: string
	) => Promise<void>;
	deleteSpirit: (id: string) => Promise<void>;

	refreshData: () => Promise<void>;
	updateDescription: (
		toUpdate: "brewery" | "distillery",
		id: string,
		newDescription: string
	) => Promise<void>;
};

export const useDbContextValue = (): DatabaseHook => {
	/* Brewery Functions */
	const [breweries, setBreweries] = useState<Brewery[]>([]);

	const refreshBreweries = useCallback(async () => {
		const client = await genApiClient();
		const res: any = await client.getRequest("brewery");

		const data = await res.json();
		const breweries = data.breweries as Brewery[];

		setBreweries(breweries);
	}, [setBreweries]);

	const createBrewery = useCallback(
		async (name: string, description?: string) => {
			const client = await genApiClient();

			const newBrewery = {
				name: name,
				description: description,
			};

			const request = await client.postRequest("brewery", newBrewery);
			const brewery = request.json() as Brewery;

			setBreweries([...breweries, brewery]);
		},
		[setBreweries, breweries]
	);

	const deleteBrewery = useCallback(
		async (id: string) => {
			const client = await genApiClient();
			await client.postRequest("brewery/delete", { id });

			await refreshBreweries();
		},
		[refreshBreweries]
	);

	/* Beer Functions */
	const [beers, setBeers] = useState<Beer[]>([]);

	const refreshBeers = useCallback(async (): Promise<void> => {
		const client = await genApiClient();
		const res: any = await client.getRequest("beer");

		const data = await res.json();
		const beers = data.beers as Beer[];

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

			const request = await client.postRequest("beer", newBeer);
			const beer = request.json() as Beer;

			setBeers([...beers, beer]);
		},
		[setBeers, beers]
	);

	const deleteBeer = useCallback(
		async (id: string) => {
			const client = await genApiClient();
			await client.postRequest("beer/delete", { id });

			await refreshBeers();
		},
		[refreshBeers]
	);

	/* Distillery Functions */
	const [distilleries, setDistilleries] = useState<Distillery[]>([]);

	const refreshDistilleries = useCallback(async () => {
		const client = await genApiClient();
		const res: any = await client.getRequest("distillery");

		const data = await res.json();
		const distilleries = data.distilleries as Distillery[];

		setDistilleries(distilleries);
	}, [setDistilleries]);

	const createDistillery = useCallback(
		async (name: string, description?: string) => {
			const client = await genApiClient();

			const newDistillery = {
				name: name,
				description: description,
			};

			const request = await client.postRequest(
				"distillery",
				newDistillery
			);
			const distillery = request.json() as Distillery;

			setDistilleries([...distilleries, distillery]);
		},
		[setDistilleries, distilleries]
	);

	const deleteDistillery = useCallback(
		async (id: string) => {
			const client = await genApiClient();

			await client.postRequest("distillery", { id });

			await refreshDistilleries();
		},
		[refreshDistilleries]
	);

	/* Spirit functions */
	const [spirits, setSpirits] = useState<Spirit[]>([]);

	const refreshSpirits = useCallback(async () => {
		const client = await genApiClient();
		const res: any = await client.getRequest("spirit");

		const data = await res.json();
		const spirits = data.spirits as Spirit[];

		setSpirits(spirits);
	}, [setSpirits]);

	const createSpirit = useCallback(
		async (
			name: string,
			distilleryName: string,
			type: string,
			vol: number,
			size: number,
			image_url?: string,
			description?: string
		) => {
			const client = await genApiClient();

			const newSpirit = {
				name: name,
				description: description || null,
				type: type,
				vol: vol,
				size: size,
				image_url: image_url,
				distilleryName: distilleryName,
			};

			const request = await client.postRequest("spirit", newSpirit);
			const spirit = request.json() as Spirit;

			setSpirits([...spirits, spirit]);
		},
		[spirits, setSpirits]
	);

	const deleteSpirit = useCallback(
		async (id: string) => {
			const client = await genApiClient();
			await client.postRequest("spirit/delete", { id });

			await refreshSpirits();
		},
		[refreshSpirits]
	);

	/* Common functions */
	const refreshData = useCallback(async () => {
		await refreshBreweries();
		await refreshBeers();
		await refreshDistilleries();
		await refreshSpirits();
	}, [refreshBreweries, refreshBeers, refreshDistilleries, refreshSpirits]);

	const updateDescription = useCallback(
		async (
			elementToUpdate: "brewery" | "distillery",
			id: string,
			newDescription: string
		) => {
			const update = { id, newDescription };

			const client = await genApiClient();
			await client.putRequest(elementToUpdate, update);

			switch (elementToUpdate) {
				case "brewery":
					await refreshBreweries();
					break;
				case "distillery":
					await refreshDistilleries();
					break;
			}
		},
		[refreshBreweries, refreshDistilleries]
	);

	return {
		breweries,
		refreshBreweries,
		createBrewery,
		deleteBrewery,

		beers,
		refreshBeers,
		createBeer,
		deleteBeer,

		distilleries,
		refreshDistilleries,
		createDistillery,
		deleteDistillery,

		spirits,
		refreshSpirits,
		createSpirit,
		deleteSpirit,

		refreshData,
		updateDescription,
	};
};
