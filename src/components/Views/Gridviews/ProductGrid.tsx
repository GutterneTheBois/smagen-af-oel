"use client";
import { Beer, Spirit } from "@prisma/client";
import { FC, useState, useEffect } from "react";
import { Dropdown } from "./components";

const ProductGrid: FC = () => {
	const [queries, setQueries] = useState<string[]>([]);
	const [filteredProducts, setFilteredProducts] = useState<Beer[] | Spirit[]>(
		[]
	);

	return (
		<>
			<div>
				<Dropdown
					type="beer"
					setFilteredOptions={setQueries}
					queries={queries}
				/>
			</div>
			{queries.map((q) => (
				<div key={q} style={{ width: "90vw", justifyContent: "right" }}>
					<h1>{q}</h1>
				</div>
			))}
			<button onClick={() => console.log(queries)}>DEBUG</button>
		</>
	);
};

export default ProductGrid;
