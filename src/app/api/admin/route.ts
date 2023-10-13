import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (req: NextRequest) => {
	const admins = await prisma.admin.findMany();
	return NextResponse.json({ admins });
};

export const POST = async (req: NextRequest) => {
	const body = await req.json();

	const addAdmin = await prisma.admin.create({
		data: {
			...body,
		},
	});

	return NextResponse.json({ addAdmin });
};
