import { Beer, Prisma } from "@prisma/client";
import { genApiClient } from "@/services";
import { dbClient } from "@/services";
import beers from "../prisma/seed-data/beers.json";

type ReducedBeer = Omit<Beer, "id" | "botd" | "vol">;

describe("Test of data seeding for beer", () => {
	it("sends a GET request and matches schema and seeder file", async () => {
		const client = await genApiClient();
		const response = await client.getRequest("beer");

		const data = await response.json();
		const filterData = (beer: ReducedBeer) =>
			({
				name: beer.name,
				description: beer.description,
				type: beer.type,
				ibu: beer.ibu,
				size: beer.size,
				image_url: beer.image_url,
				breweryName: beer.breweryName,
			} as ReducedBeer);

		const reducedData: ReducedBeer[] = beers.map(
			({
				name,
				description,
				type,
				ibu,
				size,
				image_url,
				breweryName,
			}: ReducedBeer) =>
				filterData({
					name,
					description,
					type,
					ibu,
					size,
					image_url,
					breweryName,
				})
		);

		const beerData: ReducedBeer[] = data.beers.map(
			({
				name,
				description,
				type,
				ibu,
				size,
				image_url,
				breweryName,
			}: ReducedBeer) =>
				filterData({
					name,
					description,
					type,
					ibu,
					size,
					image_url,
					breweryName,
				})
		);

		expect(beerData).toEqual(reducedData);
	});
});

describe("Test of beer API functions", () => {
	beforeAll(async () => {
		const client = await genApiClient();
		const brewery = {
			name: "TestBrewery",
			description: null,
		};

		await client.postRequest("brewery", brewery);

		const beer = {
			name: "Test",
			description: "Test",
			type: "Test",
			breweryName: "TestBrewery",
			vol: new Prisma.Decimal(9.2),
			ibu: 50,
			size: 330,
			image_url: "https://test.test/test-img&raw=1",
		};

		await client.postRequest("beer", beer);
	});

	it("should find the beer just created", async () => {
		const client = await genApiClient();
		const res: any = await client.getRequest("beer");

		const data = await res.json();

		expect(data.beers.findLast((beer: Beer) => beer.name === "Test"));
	});

	it("should update beer in database", async () => {
		const client = await genApiClient();
		const dbHandler = await dbClient();
		const testBeer = await dbHandler.findSpecificElement("beer", "Test");

		await client.patchRequest("beer", {
			id: testBeer.id,
			newDescription: "new testing description",
			image_url: "https://test.test/test_img&raw=1",
		});

		const updatedBeer = (await dbHandler.findSpecificElement(
			"beer",
			"Test"
		)) as Beer;

		expect(updatedBeer.description).toEqual("new testing description");
		expect(updatedBeer.image_url).toBe("https://test.test/test_img&raw=1");
	});

	it("should delete beer", async () => {
		const client = await genApiClient();
		const dbHandler = await dbClient();

		const testBeer = await dbHandler.findSpecificElement("beer", "Test");

		await client.postRequest("beer/delete", {
			id: testBeer.id,
		});

		expect(await dbHandler.findSpecificElement("beer", "Test")).toBeNull();
	});

	afterAll(async () => {
		const client = await genApiClient();
		const dbHandler = await dbClient();

		const testBrewery = await dbHandler.findSpecificElement(
			"brewery",
			"TestBrewery"
		);
		await client.postRequest("brewery/delete", {
			id: testBrewery.id,
		});
	});
});
