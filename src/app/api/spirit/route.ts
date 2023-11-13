import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (req: NextRequest) => {
	const spirits = await prisma.spirit.findMany();

	return NextResponse.json({ spirits });
};

export const POST = async (req: NextRequest) => {
	const body = await req.json();

	const spirit = Object.assign({}, body);
	delete spirit.distilleryName;

	const createSpirit = await prisma.spirit.create({
		data: {
			...spirit,
			distillery: {
				connect: {
					name: body.distilleryName,
				},
			},
		},
	});

	return NextResponse.json({ createSpirit });
};

export const PATCH = async (req: NextRequest) => {
	const { id, newDescription } = await req.json();

	const updateSpirit = await prisma.spirit.update({
		where: {
			id: id,
		},
		data: {
			description: newDescription,
		},
	});

	return NextResponse.json({ updateSpirit });
};
