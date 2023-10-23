import { Brewery } from "@prisma/client";
import { genApiClient } from "../src/services/backend/appApiClient";

beforeAll(async () => {
  const client = await genApiClient();

  await client.postRequest("brewery", {
    name: "Dolleris A/S",
    description: "Det her er en test",
  });
});

beforeEach(async () => {
  const client = await genApiClient();

  const res: any = await client.getRequest("brewery");

  const data = await res.json();

  console.log(data.breweries.findLast((brewery: Brewery) => brewery.name));
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
