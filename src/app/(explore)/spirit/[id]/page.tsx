import { prisma } from "@/lib/prisma";
import styles from "../../explore.module.scss";

const SpiritPage = async ({ params }: { params: { id: string } }) => {
	const spirit = async () => {
		const res = await prisma.spirit.findUnique({
			where: { id: params.id },
		});

		return { ...res };
	};

	return (
		<div className={styles.title}>
			<h1>{(await spirit()).name}</h1>
			<h2>{(await spirit()).description}</h2>
		</div>
	);
};

export default SpiritPage;
