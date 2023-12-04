import { Distillery } from "@prisma/client";
import { genApiClient, dbClient } from "@/services";
import distilleries from "../prisma/seed-data/distilleries.json";

type ReducedDistillery = Omit<Distillery, "id">;
describe("Test of seeding data", () => {
	it("should make a GET request and match data from seeder file", async () => {
		const client = await genApiClient();
		const response = await client.getRequest("distillery");

		const data = await response.json();

		const filterData = (name: string, description: string | null) => ({
			name,
			description,
		});

		const reducedData: ReducedDistillery[] = data.distilleries.map(
			({ name, description }: ReducedDistillery) =>
				filterData(name, description)
		);

		expect(distilleries).toEqual(reducedData);
	});
});

describe("Test of distillery API functions", () => {
	beforeAll(async () => {
		const client = await genApiClient();
		await client.postRequest("distillery", {
			name: "Test",
			description: "Test distillery",
		} as ReducedDistillery);
	});

	it("should find and match the distillery created", async () => {
		const client = await genApiClient();
		const response: any = await client.getRequest("distillery");
		const data = await response.json();

		expect(
			data.distilleries.findLast(
				(distillery: Distillery) => distillery.name === "Test"
			)
		);
	});

	it("should update distillery and match in database", async () => {
		const client = await genApiClient();
		const dbHandler = await dbClient();

		let testDistillery = await dbHandler.findSpecificElement(
			"distillery",
			"Test"
		);

		await client.patchRequest("distillery", {
			id: testDistillery.id,
			newDescription: "test updated",
		});

		testDistillery = await dbHandler.findSpecificElement(
			"distillery",
			"Test"
		);

		expect(testDistillery.description).toBe("test updated");
	});

	it("should delete distillery", async () => {
		const client = await genApiClient();
		const dbHandler = await dbClient();

		let testDistillery = await dbHandler.findSpecificElement(
			"distillery",
			"Test"
		);
		await client.postRequest("distillery/delete", {
			id: testDistillery.id,
		});

		testDistillery = await dbHandler.findSpecificElement(
			"distillery",
			"Test"
		);

		expect(testDistillery).toBeNull();
	});
});
