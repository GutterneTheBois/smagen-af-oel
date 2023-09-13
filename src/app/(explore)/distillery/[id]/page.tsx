import { prisma } from "@/lib/prisma";
import styles from "../../explore.module.scss";
import { ProductsGrid } from "@/components";

const DistilleryPage = async ({ params }: { params: { id: string } }) => {
	const distillery = async () => {
		const res = await prisma.distillery.findUnique({
			where: { id: params.id },
		});

		return { name: res?.name, description: res?.description };
	};

	return (
		<div className={styles.title}>
			<div className={styles.products}>
				<div>
					<h1>{(await distillery()).name}</h1>
					<h2>{(await distillery()).description}</h2>
				</div>
				<ProductsGrid distilleryName={(await distillery()).name} />
			</div>
		</div>
	);
};

export default DistilleryPage;
