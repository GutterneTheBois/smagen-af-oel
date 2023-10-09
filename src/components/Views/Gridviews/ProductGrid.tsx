"use client";
import { Beer, Spirit } from "@prisma/client";
import { FC, useState, useEffect } from "react";
import { Dropdown, QueriedGrid } from "./components";
import { useDb } from "@/services";
import { useLoadingAsync } from "@/utils/hooks/useLoadingAsync";

export type QueriedProduct = {
	type: string;
	products: Beer[] | Spirit[];
};

const ProductGrid: FC = () => {
	const { refreshBeers, beers } = useDb();

	const [queries, setQueries] = useState<string[]>([]);
	const [queriedProducts, setQueriedProducts] = useState<QueriedProduct[]>(
		[]
	);

	const { loading } = useLoadingAsync(async () => {
		await refreshBeers();
	}, [beers]);

	useEffect(() => {
		const lowered = queries.map((q) => q.toLowerCase());

		const queried: Beer[] = beers.filter((b) =>
			lowered.includes(b.type.toLowerCase())
		) as Beer[];

		queries.filter((dt) => {
			const ps = queried.filter(
				(p) => p.type.toLowerCase() === dt.toLowerCase()
			) as Beer[];

			if (!queriedProducts.some((qp) => qp.type.includes(dt)))
				setQueriedProducts([
					...queriedProducts,
					{ type: dt, products: [...ps] },
				]);
			// else {
			// 	const index = queriedProducts.findIndex((qp) => qp.type === dt);
			// 	setQueriedProducts([
			// 		...queriedProducts.slice(0, index),
			// 		...queriedProducts.slice(index + 1),
			// 	]);
			// }
		});
	}, [queries]);

	return (
		<>
			<div>
				<Dropdown
					type="beer"
					setFilteredOptions={setQueries}
					queries={queries}
				/>
			</div>
			{/* {queries.map((q) => (
				<div key={q} style={{ width: "90vw", justifyContent: "right" }}>
					<h1>{q}</h1>
				</div>
			))} */}
			<QueriedGrid products={queriedProducts} />
			<button onClick={() => console.log(queries)}>DEBUG</button>
		</>
	);
};

export default ProductGrid;
