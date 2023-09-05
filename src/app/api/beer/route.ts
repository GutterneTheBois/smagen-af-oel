import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (req: NextRequest) => {
	const beers = await prisma.beer.findMany();

	return NextResponse.json({ beers });
};
