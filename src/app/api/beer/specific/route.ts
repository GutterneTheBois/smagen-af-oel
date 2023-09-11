import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (req: NextRequest) => {
	const { id } = await req.json();

	const res = await prisma.beer.findFirst({
		where: { id: id },
	});

	return NextResponse.json({ res });
};
