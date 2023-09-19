import { Brewery, Prisma } from "@prisma/client";
import { genApiClient } from "../src/services/backend/appApiClient";

test("should create new brewery and match", async () => {
  const client = await genApiClient();

  const res: any = (await client.postRequest("brewery", {
    name: "Walther A/S",
    description: "Det her er en test",
  })) as Brewery;

  await expect(res).resolves.toEqual({
    name: "Walther A/S",
    description: "Det her er en test",
  });
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
