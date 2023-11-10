import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (req: NextRequest) => {
	const beers = await prisma.beer.findMany();

	return NextResponse.json({ beers });
};

export const POST = async (req: NextRequest) => {
	const body = await req.json();

	const beer = Object.assign({}, body);
	delete beer.breweryName;

	const breweries = await prisma.brewery.findMany();

	if (!breweries.find((brewery) => brewery.name === body.breweryName)) {
		await prisma.brewery.create({
			data: {
				name: body.breweryName,
				description: null,
			},
		});
	}

	const createBeer = await prisma.beer.create({
		data: {
			...beer,
			brewery: {
				connect: {
					name: body.breweryName,
				},
			},
		},
	});

	return NextResponse.json({ createBeer });
};

export const PATCH = async (req: NextRequest) => {
	const { id, newDescription, image_url } = await req.json();

	const updateBeer = await prisma.beer.update({
		where: {
			id: id,
		},
		data: {
			description: newDescription,
			image_url: image_url,
		},
	});

	return NextResponse.json({ updateBeer });
};
