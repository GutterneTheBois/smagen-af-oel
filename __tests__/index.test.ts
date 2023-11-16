import { Brewery } from "@prisma/client";
import { genApiClient } from "../src/services/backend/appApiClient";
import { dbClient } from "../src/services/backend/dbClient";
import breweries from "../prisma/seed-data/breweries.json";
import { before } from "node:test";

describe("Test of Brewery API functions", () => {
	before(async () => {
		const client = await genApiClient();

		await client.postRequest("brewery", {
			name: "Test",
			description: "Det her er en test",
		});
	});

	it("should make GET request for breweries and match the Schema .json file", async () => {
		const client = await genApiClient();

		const response: any = await client.getRequest("brewery");

		const data = await response.json();

		expect(data.breweries("name") + data.breweries("description")).toEqual(
			breweries
		);
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
