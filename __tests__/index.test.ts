import { Brewery } from "@prisma/client";
import { genApiClient } from "../src/services/backend/appApiClient";
import { dbClient } from "../src/services/backend/dbClient";
import breweries from "../prisma/seed-data/breweries.json";

type ReducedBrewery = Omit<Brewery, "id">;
describe("Test of GET", () => {
	it("should make GET request for breweries and match the Schema .json file", async () => {
		const client = await genApiClient();
		const response = await client.getRequest("brewery");

		const data = await response.json();

		const filterData = (name: string, description: string | null) => ({
			name,
			description,
		});

		const reducedData: ReducedBrewery[] = data.breweries.map(
			({ name, description }: ReducedBrewery) => filterData(name, description)
		);

		expect(breweries).toEqual(reducedData);
	});
});

describe("Test of Brewery API functions", () => {
	beforeAll(async () => {
		const client = await genApiClient();

		await client.postRequest("brewery", {
			name: "Test",
			description: "Det her er en test",
		});
	});

	it("should create new brewery and match", async () => {
		const client = await genApiClient();

		const res: any = await client.getRequest("brewery");

		const data = await res.json();

		expect(
			data.breweries.findLast((brewery: Brewery) => brewery.name === "Test")
		);
	});

	it("should update brewery and match", async () => {
		const client = await genApiClient();

		const dbHandler = await dbClient();

		const testBrewery = await dbHandler.findSpecificElement("brewery", "Test");

		await client.patchRequest("brewery", {
			id: testBrewery.id,
			newDescription: "Opdateret beskrivelse",
		});

		const updatedBrewery = await dbHandler.findSpecificElement(
			"brewery",
			"Test"
		);

		expect(updatedBrewery.description).toBe("Opdateret beskrivelse");
	});

	it("should delete brewery", async () => {
		const client = await genApiClient();

		const dbHandler = await dbClient();

		const testBrewery = await dbHandler.findSpecificElement("brewery", "Test");

		await client.postRequest("brewery/delete", {
			id: testBrewery.id,
		});

		const shouldBeNull = await dbHandler.findSpecificElement("brewery", "Test");

		expect(shouldBeNull).toBeNull();
	});
});
