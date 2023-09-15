import { prisma } from "@/lib/prisma";
import styles from "../../explore.module.scss";

const BeerPage = async ({ params }: { params: { id: string } }) => {
	const beer = async () => {
		const b = await prisma.beer.findUnique({
			where: { id: params.id },
		});

		return { ...b };
	};

	return (
		<div className={styles.title}>
			<h1>{(await beer()).name}</h1>
			<h2>{(await beer()).type}</h2>
		</div>
	);
};

export default BeerPage;
