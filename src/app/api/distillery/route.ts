import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (req: NextRequest) => {
	const distilleries = await prisma.distillery.findMany();

	return NextResponse.json({ distilleries });
};

export const POST = async (req: NextRequest) => {
	const body = await req.json();

	const createDistillery = await prisma.distillery.create({
		data: {
			...body,
		},
	});

	return NextResponse.json({ createDistillery });
};

export const PATCH = async (req: NextRequest) => {
	const { id, newDescription } = await req.json();

	const updateDistillery = await prisma.distillery.update({
		where: {
			id: id,
		},
		data: {
			description: newDescription,
		},
	});

	return NextResponse.json({ updateDistillery });
};
