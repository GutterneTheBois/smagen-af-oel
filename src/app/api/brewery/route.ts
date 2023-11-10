import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (req: NextRequest) => {
	const breweries = await prisma.brewery.findMany();

	return NextResponse.json({ breweries });
};

export const POST = async (req: NextRequest) => {
	const body = await req.json();

	const createBrewery = await prisma.brewery.create({
		data: {
			...body,
		},
	});

	return NextResponse.json({ createBrewery });
};

export const PUT = async (req: NextRequest) => {
	const { id, newDescription } = await req.json();

	const updateBrewery = await prisma.brewery.update({
		where: {
			id: id,
		},
		data: {
			description: newDescription,
		},
	});

	return NextResponse.json({ updateBrewery });
};

export const PATCH = async (req: NextRequest) => {
	const { id, newDescription } = await req.json();

	const updateBrewery = await prisma.brewery.update({
		where: {
			id: id,
		},
		data: {
			description: newDescription,
		},
	});

	return NextResponse.json({ updateBrewery });
};
