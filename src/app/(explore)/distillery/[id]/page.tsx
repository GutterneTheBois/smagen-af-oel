import { prisma } from "@/lib/prisma";
import styles from "../../explore.module.scss";

const DistilleryPage = async ({ params }: { params: { id: string } }) => {
	const distillery = async () => {
		const res = await prisma.distillery.findUnique({
			where: { id: params.id },
		});

		return { name: res?.name, description: res?.description };
	};

	return (
		<div className={styles.title}>
			<h1>{(await distillery()).name}</h1>
			<h2>{(await distillery()).description}</h2>
		</div>
	);
};

export default DistilleryPage;
