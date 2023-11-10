import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (req: NextRequest) => {
	const botds = await prisma.beer.findMany({
		where: { botd: true },
	});

	return NextResponse.json({ botds });
};

export const PATCH = async (req: NextRequest) => {
	const { id } = await req.json();

	const beer = await prisma.beer.findUnique({
		where: {
			id: id,
		},
	});

	const updateBotD = await prisma.beer.update({
		where: {
			id: id,
		},
		data: {
			botd: !beer?.botd,
		},
	});

	return NextResponse.json({ updateBotD });
};
