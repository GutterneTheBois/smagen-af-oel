import { prisma } from "@/lib/prisma";
import styles from "../../explore.module.scss";
import Image from "next/image";
import { Brewery } from "@prisma/client";

const BeerPage = async ({ params }: { params: { id: string } }) => {
	const beer = async () => {
		const b = await prisma.beer.findUnique({
			where: { id: params.id },
		});

		return { ...b };
	};

	const getLinkToBrewery = async (): Promise<string> => {
		const brewery = (await prisma.brewery.findUnique({
			where: { name: (await beer()).breweryName },
		})) as Brewery;

		return `/brewery/${brewery.id}`;
	};

	return (
		<div className={styles.productContainer}>
			<div className={styles.imageColumn}>
				<Image
					className={styles.productImage}
					src={(await beer()).image_url || ""}
					alt={(await beer()).name || ""}
					width={200}
					height={400}
				/>
			</div>
			<div className={styles.textColumn}>
				<div className={styles.beerDescription}>
					<h1>
						{(await beer()).type} - {(await beer()).name}
					</h1>
					<h2 style={{ display: "inline" }}>
						<p
							style={{
								display: "inline",
								fontSize: 28,
								fontWeight: 700,
							}}
						>
							Brewery:{" "}
						</p>
						<a href={await getLinkToBrewery()}>
							<p style={{ display: "inline", fontSize: 28 }}>
								{" "}
								{(await beer()).breweryName}{" "}
							</p>
						</a>
					</h2>
					<p>{(await beer()).description}</p>
					<h4>
						Alcohol:
						<p style={{ display: "inline" }}>
							{" "}
							{(
								(await beer()).vol as unknown as number
							).toString() || "Not Applicable"}
							%
						</p>
					</h4>
					<h4>
						Size:
						<p style={{ display: "inline" }}>
							{" "}
							{((await beer()).size as unknown as number) ||
								"Not Applicable"}{" "}
							mL
						</p>
					</h4>
					{(await beer()).ibu !== null && (
						<h4>
							IBU (International Bitterness Units):
							<p style={{ display: "inline" }}>
								{(await beer()).ibu as unknown as number}
							</p>
						</h4>
					)}
				</div>
			</div>
		</div>
	);
};

export default BeerPage;
