import { useCallback, useState } from "react";
import { Beer } from "@prisma/client";
import { genApiClient } from "../backend/appApiClient";

export type DatabaseHook = {
	beers: Beer[];
	getAllBeers: () => Promise<void>;
};

export const useDbContextValue = (): DatabaseHook => {
	const [beers, setBeer] = useState<Beer[]>([]);

	const getAllBeers = useCallback(async (): Promise<void> => {
		const client = await genApiClient();
		const ex: any = await client.getRequest("beer");

		const beers: Beer[] = ex.beers;

		setBeer(beers);
	}, [setBeer]);

	return {
		beers,
		getAllBeers,
	};
};
