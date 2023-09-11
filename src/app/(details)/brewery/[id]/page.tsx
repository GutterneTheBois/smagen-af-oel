import { prisma } from "@/lib/prisma";

const BreweryPage = async ({ params }: { params: { id: string } }) => {
	const brewery = async () => {
		const res = await prisma.brewery.findUnique({
			where: { id: params.id },
		});

		return { name: res?.name, description: res?.description };
	};

	return (
		<div>
			<h1>{(await brewery()).name}</h1>
			<h2>{(await brewery()).description}</h2>
		</div>
	);
};

export default BreweryPage;
