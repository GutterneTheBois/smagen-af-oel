import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

async function main() {
    const entry1 = await prisma.exampleUser.upsert({
        where: { email: "nick@smagen.ui" },
        update: {},
        create: {
            name: "Nick",
            email: "nick@smagen.ui",
            posts: {
                create: [
                    {
                        title: "Some post",
                        content: "Just random words I guess",
                        published: false,
                    },
                    {
                        title: "Another person",
                        content: "Meh, here's a link: http://localhost:3000",
                        published: true,
                    },                    
                ],
            },
        },
    });

    const entry2 = await prisma.exampleUser.upsert({
        where: { email: "mikkel@smagen.ui" },
        update: {},
        create: {
            name: "Mikkel",
            email: "mikkel@smagen.ui",
        },
    });

    console.log(`Seeded: ${entry1.name} & ${entry2.name}`);
}

main()
    .then(async () => {
        prisma.$disconnect();
    })
    .catch(async (err) => {
        console.error(err);
        await prisma.$disconnect();
        process.exit(1);
    })