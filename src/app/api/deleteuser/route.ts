import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
    const { id } = await req.json();
    console.log(`${id}`);

    const res = await prisma.exampleUser.deleteMany({
        where: { id: id },
    });

    return NextResponse.json({res});
}