import { Brewery, Prisma } from "@prisma/client";
import { genApiClient } from "../src/services/backend/appApiClient";

test("should create new brewery and match", async () => {
  const client = await genApiClient();

  const response: any = await client.getRequest("brewery");

  await expect(response).resolves.toEqual(200);
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
