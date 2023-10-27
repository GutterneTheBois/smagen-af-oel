import { prisma } from "@/lib/prisma";
import styles from "../../explore.module.scss";
import { Distillery } from "@prisma/client";
import Image from "next/image";

const SpiritPage = async ({ params }: { params: { id: string } }) => {
	const spirit = async () => {
		const res = await prisma.spirit.findUnique({
			where: { id: params.id },
		});

		return { ...res };
	};

	const getLinkToDistillery = async (): Promise<string> => {
		const distillery = (await prisma.distillery.findUnique({
			where: { name: (await spirit()).distilleryName },
		})) as Distillery;

		return `/distillery/${distillery.id}`;
	};

	return (
		<div className={styles.productContainer}>
			<div className={styles.imageColumn}>
				<Image
					className={styles.productImage}
					src={(await spirit()).image_url || ""}
					alt={(await spirit()).name || ""}
					width={200}
					height={400}
				/>
			</div>
			<div className={styles.textColumn}>
				<div className={styles.beerDescription}>
					<h1>
						{(await spirit()).type} - {(await spirit()).name}
					</h1>
					<h2 style={{ display: "inline" }}>
						<p
							style={{
								display: "inline",
								fontSize: 28,
								fontWeight: 700,
							}}
						>
							Distilleri:{" "}
						</p>
						<a href={await getLinkToDistillery()}>
							<p style={{ display: "inline", fontSize: 28 }}>
								{(await spirit()).distilleryName}
							</p>
						</a>
					</h2>
					<p>{(await spirit()).description}</p>
					<h3>
						Alcohol:
						<p style={{ display: "inline", fontSize: 28 }}>
							{" "}
							{(
								(await spirit()).vol as unknown as number
							).toString() || "N/A"}
							%
						</p>
					</h3>
					<h4>
						Size:
						<p style={{ display: "inline" }}>
							{" "}
							{((await spirit()).size as number) || "N/A"}mL
						</p>
					</h4>
				</div>
			</div>
		</div>
		// <div className={styles.title}>
		// 	<h1>{(await spirit()).name}</h1>
		// 	<h2>{(await spirit()).description}</h2>
		// </div>
	);
};

export default SpiritPage;
