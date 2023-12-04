import { Spirit, Prisma } from "@prisma/client";
import { genApiClient, dbClient } from "@/services";
import spirits from "../prisma/seed-data/spirits.json";

type ReducedSpirit = Omit<Spirit, "id" | "vol">;

describe("Test of data seeding for spirits", () => {
	it("sends a GET request and matches seeding data", async () => {
		const client = await genApiClient();
		const response = await client.getRequest("spirit");

		const data = await response.json();

		const filterData = (spirit: ReducedSpirit) =>
			({
				name: spirit.name,
				description: spirit.description,
				type: spirit.type,
				size: spirit.size,
				image_url: spirit.image_url,
				distilleryName: spirit.distilleryName,
			} as ReducedSpirit);

		const reducedData: ReducedSpirit[] = spirits.map(
			({
				name,
				description,
				type,
				size,
				image_url,
				distilleryName,
			}: ReducedSpirit) =>
				filterData({
					name,
					description,
					type,
					size,
					image_url,
					distilleryName,
				})
		);

		const spiritData: ReducedSpirit[] = data.spirits.map(
			({
				name,
				description,
				type,
				size,
				image_url,
				distilleryName,
			}: ReducedSpirit) =>
				filterData({
					name,
					description,
					type,
					size,
					image_url,
					distilleryName,
				})
		);

		expect(spiritData).toEqual(reducedData);
	});
});

describe("Test of spirit API functions", () => {
	beforeAll(async () => {
		const client = await genApiClient();

		const dist = {
			name: "testDist",
			description: null,
		};

		await client.postRequest("distillery", dist);

		const spirit = {
			name: "Test",
			description: "Test",
			type: "test",
			distilleryName: "testDist",
			vol: new Prisma.Decimal(40.0),
			size: 500,
			image_url: "https://test.test/test-img&raw=1",
		};

		await client.postRequest("spirit", spirit);
	});

	it("should find the spirit just created", async () => {
		const client = await genApiClient();
		const res: any = await client.getRequest("spirit");

		const data = await res.json();

		expect(
			data.spirits.findLast((spirit: Spirit) => spirit.name === "Test")
		);
	});

	it("should update spirit in the database", async () => {
		const client = await genApiClient();
		const dbHandler = await dbClient();

		let testSpirit: Spirit = (await dbHandler.findSpecificElement(
			"spirit",
			"Test"
		)) as Spirit;
		const newDescription = "test updated";
		const image_url = "https://test.test/spirit_img&raw=1";

		await client.patchRequest("spirit", {
			id: testSpirit.id,
			newDescription,
			image_url,
		});

		testSpirit = (await dbHandler.findSpecificElement(
			"spirit",
			"Test"
		)) as Spirit;

		expect(testSpirit.description).toEqual(newDescription);
		expect(testSpirit.image_url).toEqual(image_url);
	});

	it("should delete spirit", async () => {
		const client = await genApiClient();
		const dbHandler = await dbClient();

		const testSpirit = await dbHandler.findSpecificElement(
			"spirit",
			"Test"
		);
		await client.postRequest("spirit/delete", {
			id: testSpirit.id,
		});

		expect(
			await dbHandler.findSpecificElement("spirit", "Test")
		).toBeNull();
	});

	afterAll(async () => {
		const client = await genApiClient();
		const dbHandler = await dbClient();

		const testDist = await dbHandler.findSpecificElement(
			"distillery",
			"testDist"
		);
		await client.postRequest("distillery/delete", {
			id: testDist.id,
		});
	});
});
