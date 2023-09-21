import { Brewery, Prisma } from "@prisma/client";
import { genApiClient } from "../src/services/backend/appApiClient";

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
