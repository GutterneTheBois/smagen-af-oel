"use client";
import { ChangeEvent, useState } from "react";
import { useDb } from "@/services";
import { useLoadingAsync } from "@/utils/hooks/useLoadingAsync";
import styles from "../../explore.module.scss";
import { LoadingCard, Card } from "@/components";
import { Beer } from "@prisma/client";

const BeerGrid = () => {
	const { beers, refreshBeers } = useDb();
	const [filteredBeers, setFilteredBeers] = useState<Beer[]>(beers);
	const [query, setQuery] = useState<string>("");

	const { loading } = useLoadingAsync(async () => {
		await refreshBeers();

		const filtered = beers.filter((beer) =>
			beer.type.toLowerCase().includes(query)
		) as Beer[];

		setFilteredBeers(filtered);
	}, [beers, query]);

	const onChange = (ev: ChangeEvent<HTMLInputElement>) => {
		setQuery(ev.target.value.toLowerCase());
	};

	return (
		<>
			<div className={styles.pre__container}>
				<h1 className={styles.title}>Øl</h1>
				<div style={{ marginRight: "2vw" }}>
					<label style={{ marginRight: "0.8vw" }} htmlFor="search">
						Søg:
					</label>
					<input
						name="search"
						className={styles.search}
						onChange={onChange}
					/>
				</div>
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
