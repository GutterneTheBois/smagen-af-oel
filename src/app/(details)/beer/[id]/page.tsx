import { prisma } from "@/lib/prisma";

const BeerPage = async ({ params }: { params: { id: string } }) => {
	const beer = async () => {
		const b = await prisma.beer.findUnique({
			where: { id: params.id },
		});

		return { ...b };
	};

	return (
		<div>
			<h1>{(await beer()).name}</h1>
		</div>
	);
};

export default BeerPage;
