import { Brewery, Prisma } from "@prisma/client";
import { genApiClient } from "../src/services/backend/appApiClient";
import { initScriptLoader } from "next/script";

beforeAll(async () => {});

it("should make GET request for breweries and receive status 200", async () => {
  const client = await genApiClient();

  const response: any = await client.getRequest("brewery");

  console.log(response);

  expect(response.status).toEqual(200);
});

// test("should create new brewery and not match", async () => {
//   const client = await genApiClient();

//   const res: any = (await client.postRequest("brewery", {
//     name: "Dolleris A/S",
//     description: "Det her er en fejl test",
//   })) as Brewery;

//   await expect(res).resolves.toEqual({
//     name: "Walther A/S",
//     description: "Det her er en test",
//   });
// });

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
