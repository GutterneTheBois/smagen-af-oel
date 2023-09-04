import { prisma } from '@/lib/prisma';
import { NextRequest, NextResponse } from 'next/server';

export const POST = async (req: NextRequest) => {
    const body = await req.json();

    const addUser = await prisma.exampleUser.create({
        data: {
            ...body
        },
    });

    return NextResponse.json({ addUser });
}

export const GET = async (req: NextRequest) => {
    const users = await prisma.exampleUser.findMany();

    return NextResponse.json({ users });
}

export const PUT = async (req: NextRequest) => {
    const { id, newName } = await req.json();

    const user = await prisma.exampleUser.update({
        where: {
            id: id,
        },
        data: {
            name: newName,
        },
    });

    return NextResponse.json({ user });
}