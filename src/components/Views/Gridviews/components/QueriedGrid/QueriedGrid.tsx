import { Beer, Spirit } from "@prisma/client";
import { FC } from "react";
import { Card } from "@/components/Cards";
import { QueriedProduct } from "../../ProductGrid";

type QueriedProps = {
	products: QueriedProduct[];
};

const QueriedGrid: FC<QueriedProps> = ({ products }) => {
	return (
		<div>
			{products.map((prod, index) => (
				<div
					key={index}
					style={{ width: "90vw", justifyContent: "right" }}
				>
					<h1>{prod.type}</h1>
					<div
						style={{
							display: "grid",
							gridTemplateColumns: "1fr 1fr 1fr",
						}}
					>
						{prod.products.map((p) => (
							<>
								<Card beer={p as Beer} />
							</>
						))}
					</div>
				</div>
			))}
			<button onClick={() => console.table(products)}>DEBUG</button>
		</div>
	);
};

export default QueriedGrid;
