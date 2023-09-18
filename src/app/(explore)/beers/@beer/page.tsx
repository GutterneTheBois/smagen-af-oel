"use client";
import { ChangeEvent, useState, useEffect } from "react";
import { useDb } from "@/services";
import { useLoadingAsync } from "@/utils/hooks/useLoadingAsync";
import styles from "../../explore.module.scss";
import { LoadingCard, Card } from "@/components";
import { Beer } from "@prisma/client";

const BeerGrid = () => {
	const { beers, refreshBeers } = useDb();

	const [filteredBeers, setFilteredBeers] = useState<Beer[]>([]);
	const [query, setQuery] = useState<string>("");

	useEffect(() => {
		if (filteredBeers.length === 0) {
			(async () => {
				await refreshBeers();
				setFilteredBeers(beers);
			})();
		}
	}, [beers]);

	const { loading } = useLoadingAsync(async () => {
		await refreshBeers();

		const filtered = beers.filter((beer) =>
			beer.type.toLowerCase().includes(query)
		) as Beer[];

		setFilteredBeers(filtered);
	}, [query]);

	const onChange = (ev: ChangeEvent<HTMLInputElement>) => {
		setQuery(ev.target.value.toLowerCase());
	};

	return (
		<>
			<h1 className={styles.title}>Øl</h1>
			<div className={styles.search}>
				<label htmlFor="search">Søg:</label>
				<input
					className={styles.search__input}
					name="search"
					onChange={onChange}
				/>
			</div>
			<div className={styles.container}>
				{loading ? (
					<>
						<LoadingCard />
						<LoadingCard />
						<LoadingCard />
						<LoadingCard />
						<LoadingCard />
						<LoadingCard />
						<LoadingCard />
						<LoadingCard />
					</>
				) : (
					filteredBeers.map((beer) => (
						<Card key={beer.id} beer={beer} />
					))
				)}
			</div>
		</>
	);
};

export default BeerGrid;
