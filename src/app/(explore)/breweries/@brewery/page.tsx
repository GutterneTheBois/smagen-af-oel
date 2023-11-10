"use client";
import { useDb } from "@/services";
import { useLoadingAsync } from "@/utils/hooks/useLoadingAsync";
import styles from "../../explore.module.scss";
import { Card, LoadingCard } from "@/components";
import { ChangeEvent, useState, useEffect } from "react";
import { Brewery } from "@prisma/client";

const BreweryGrid = () => {
	const { breweries, refreshBreweries } = useDb();
	const [filteredBreweries, setFilteredBreweries] =
		useState<Brewery[]>(breweries);
	const [query, setQuery] = useState<string>("");

	useEffect(() => {
		if (filteredBreweries.length === 0) {
			(async () => {
				await refreshBreweries();
				setFilteredBreweries(breweries);
			})();
		}
	}, [breweries, filteredBreweries.length]);

	const { loading } = useLoadingAsync(async () => {
		await refreshBreweries();

		const filtered = breweries.filter((brewery) =>
			brewery.name.toLowerCase().includes(query)
		) as Brewery[];

		setFilteredBreweries(filtered);
	}, [query]);

	const onChange = (ev: ChangeEvent<HTMLInputElement>) => {
		setQuery(ev.target.value.toLowerCase());
	};

	return (
		<>
			<h1 className={styles.title}>Bryggerier</h1>
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
						<LoadingCard small />
						<LoadingCard small />
						<LoadingCard small />
						<LoadingCard small />
						<LoadingCard small />
						<LoadingCard small />
						<LoadingCard small />
						<LoadingCard small />
						<LoadingCard small />
						<LoadingCard small />
						<LoadingCard small />
						<LoadingCard small />
						<LoadingCard small />
						<LoadingCard small />
					</>
				) : (
					filteredBreweries.map((brewery) => (
						<Card key={brewery.id} brewery={brewery} />
					))
				)}
			</div>
		</>
	);
};

export default BreweryGrid;
