import { Brewery } from "@prisma/client";
import { genApiClient } from "../src/services/backend/appApiClient";
import { dbClient } from "../src/services/backend/dbClient";

beforeAll(async () => {
	const client = await genApiClient();

	await client.postRequest("brewery", {
		name: "Dolleris A/S",
		description: "Det her er en test",
	});
});

afterEach(async () => {
	const dbHandler = await dbClient();

	const testBrewery = await dbHandler.findSpecificElement(
		"brewery",
		"Dolleris A/S"
	);

	//console.log(testBrewery.description);
});

it("should make GET request for breweries and receive status 200", async () => {
	const client = await genApiClient();

	const response: any = await client.getRequest("brewery");

	expect(response.status).toEqual(200);
});

it("should create new brewery and match", async () => {
	const client = await genApiClient();

	const res: any = await client.getRequest("brewery");

	const data = await res.json();

	expect(
		data.breweries.findLast(
			(brewery: Brewery) => brewery.name === "Dolleris A/S"
		)
	);
});

it("should update brewery and match", async () => {
	const client = await genApiClient();

	const dbHandler = await dbClient();

	const testBrewery = await dbHandler.findSpecificElement(
		"brewery",
		"Dolleris A/S"
	);

	await client.putRequest("brewery", {
		id: testBrewery.id,
		newDescription: "Opdateret beskrivelse",
	});

	await client.patchRequest("brewery", {
		id: testBrewery.id,
		newDescription: "Opdateret beskrivelse",
	});
  
	console.log(testBrewery.description);

	console.log(await client.getRequest("brewery").then((res) => res.json()));

	const updatedBrewery = await dbHandler.findSpecificElement(
		"brewery",
		"Dolleris A/S"
	);

	expect(updatedBrewery.description).toBe("Opdateret beskrivelse");
});

it("should delete brewery", async () => {
	const client = await genApiClient();

	const dbHandler = await dbClient();

	const testBrewery = await dbHandler.findSpecificElement(
		"brewery",
		"Dolleris A/S"
	);

	await client.postRequest("brewery/delete", {
		id: testBrewery.id,
	});

	const shouldBeNull = await dbHandler.findSpecificElement(
		"brewery",
		"Dolleris A/S"
	);

	expect(shouldBeNull).toBeNull();
});
