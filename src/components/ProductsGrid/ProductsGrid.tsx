import { FC } from "react";
import { prisma } from "@/lib/prisma";
import { Beer, Spirit } from "@prisma/client";
import { Card } from "..";
import styles from "./products.module.scss";

type ProductsGridProps = {
	breweryName?: string;
	distilleryName?: string;
};

const ProductsGrid: FC<ProductsGridProps> = async ({
	breweryName,
	distilleryName,
}) => {
	const getProducts = async (): Promise<Spirit[] | Beer[]> => {
		let products: Beer[] | Spirit[] = [];

		if (breweryName)
			products = (await prisma.beer.findMany({
				where: { breweryName: breweryName },
			})) as Beer[];
		else if (distilleryName)
			products = (await prisma.spirit.findMany({
				where: { distilleryName: distilleryName },
			})) as Spirit[];

		return products as Beer[] | Spirit[];
	};

	return (
		<div className={styles.products__container}>
			<div className={styles.grid}>
				{(await getProducts()).map((product) => (
					<>
						{breweryName !== undefined ? (
							<Card beer={product as Beer} />
						) : (
							<Card spirit={product as Spirit} />
						)}
					</>
				))}
			</div>
		</div>
	);
};

export default ProductsGrid;
