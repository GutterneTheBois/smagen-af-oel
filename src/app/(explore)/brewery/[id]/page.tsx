import { prisma } from "@/lib/prisma";
import styles from "../../explore.module.scss";
import { ProductsGrid } from "@/components";

const BreweryPage = async ({ params }: { params: { id: string } }) => {
	const brewery = async () => {
		const res = await prisma.brewery.findUnique({
			where: { id: params.id },
		});

		return { ...res };
	};

	return (
		<div className={styles.title}>
			<h1>{(await brewery()).name}</h1>
			<h2>{(await brewery()).description}</h2>
			<ProductsGrid breweryName={(await brewery()).name} />
		</div>
	);
};

export default BreweryPage;
