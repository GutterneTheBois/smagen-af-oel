import { prisma } from "@/lib/prisma";
import styles from "../../explore.module.scss";

const BreweryPage = async ({ params }: { params: { id: string } }) => {
	const brewery = async () => {
		const res = await prisma.brewery.findUnique({
			where: { id: params.id },
		});

		return { name: res?.name, description: res?.description };
	};

	return (
		<div className={styles.title}>
			<h1>{(await brewery()).name}</h1>
			<h2>{(await brewery()).description}</h2>
		</div>
	);
};

export default BreweryPage;
