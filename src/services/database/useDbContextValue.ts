import { useCallback, useState } from "react";
import { Admin, Beer, Brewery, Distillery, Spirit } from "@prisma/client";
import { genApiClient } from "../backend/appApiClient";
import { prisma } from "@/lib/prisma";

export type DatabaseHook = {
	breweries: Brewery[];
	refreshBreweries: () => Promise<void>;
	createBrewery: (name: string, description?: string) => Promise<void>;
	findSpecificBrewery: (name: string) => Promise<Brewery>;

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

	distilleries: Distillery[];
	refreshDistilleries: () => Promise<void>;
	createDistillery: (name: string, description?: string) => Promise<void>;

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

	refreshData: () => Promise<void>;
	updateDescription: (
		toUpdate: "brewery" | "distillery" | "beer" | "spirit",
		id: string,
		newDescription: string
	) => Promise<void>;
	deleteData: (
		typeToDelete: "brewery" | "beer" | "distillery" | "spirit",
		id: string
	) => Promise<void>;

	admins: Admin[];
	refreshAdmins: () => Promise<void>;
	addAdmin: (name: string) => Promise<void>;
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

	const findSpecificBrewery = useCallback(
		async (name: string): Promise<Brewery> => {
			return (await prisma.brewery.findUnique({
				where: { name: name },
			})) as Brewery;
		},
		[]
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

			await client.postRequest("distillery/delete", { id });

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
			elementToUpdate: "brewery" | "distillery" | "beer" | "spirit",
			id: string,
			newDescription: string
		) => {
			const update = { id, newDescription };

			const client = await genApiClient();
			await client.patchRequest(elementToUpdate, update);

			switch (elementToUpdate) {
				case "brewery":
					await refreshBreweries();
					break;
				case "distillery":
					await refreshDistilleries();
					break;
				case "beer":
					await refreshBeers();
					break;
				case "spirit":
					await refreshSpirits();
					break;
			}
		},
		[refreshBreweries, refreshDistilleries, refreshBeers, refreshSpirits]
	);

	const deleteData = useCallback(
		async (
			typeToDelete: "brewery" | "beer" | "distillery" | "spirit",
			id: string
		) => {
			const client = await genApiClient();
			await client.postRequest(`${typeToDelete}/delete`, { id });

			switch (typeToDelete) {
				case "brewery":
					await refreshBreweries();
					break;
				case "distillery":
					await refreshDistilleries();
					break;
				case "beer":
					await refreshBeers();
					break;
				case "spirit":
					await refreshSpirits();
					break;
			}
		},
		[refreshBreweries, refreshDistilleries, refreshBeers, refreshSpirits]
	);

	// admin
	const [admins, setAdmins] = useState<Admin[]>([]);

	const refreshAdmins = useCallback(async () => {
		const client = await genApiClient();
		const res = await client.getRequest("admin");

		const data = await res.json();
		setAdmins(data.admins as Admin[]);
	}, []);

	const addAdmin = useCallback(
		async (name: string) => {
			const client = await genApiClient();
			const request = await client.postRequest("admin", { name: name });

			setAdmins([...admins, request.json() as Admin]);
		},
		[setAdmins]
	);

	return {
		breweries,
		refreshBreweries,
		createBrewery,
		findSpecificBrewery,

		beers,
		refreshBeers,
		createBeer,

		distilleries,
		refreshDistilleries,
		createDistillery,

		spirits,
		refreshSpirits,
		createSpirit,

		refreshData,
		updateDescription,
		deleteData,

		admins,
		refreshAdmins,
		addAdmin,
	};
};
