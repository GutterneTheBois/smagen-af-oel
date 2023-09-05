import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (req: NextRequest) => {
	const { id } = await req.json();

	const res = await prisma.beer.deleteMany({
		where: { id: id },
	});

	return NextResponse.json({ res });
};
