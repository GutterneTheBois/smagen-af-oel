import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (req: NextRequest) => {
	const announcements = await prisma.announcement.findMany();

	return NextResponse.json({ announcements });
};

export const POST = async (req: NextRequest) => {
	const body = await req.json();

	const createAnnouncement = await prisma.announcement.create({
		data: {
			...body,
		},
	});

	return NextResponse.json({ createAnnouncement });
};

export const PUT = async (req: NextRequest) => {
	const { id, newDescription } = await req.json();

	const updateAnnouncement = await prisma.announcement.update({
		where: {
			id: id,
		},
		data: {
			description: newDescription,
		},
	});

	return NextResponse.json({ updateAnnouncement });
};
