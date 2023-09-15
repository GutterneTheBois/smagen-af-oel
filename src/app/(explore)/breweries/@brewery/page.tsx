"use client";
import { useDb } from "@/services";
import { useLoadingAsync } from "@/utils/hooks/useLoadingAsync";
import styles from "../../explore.module.scss";
import { Card, LoadingCard } from "@/components";
import { ChangeEvent, useState } from "react";
import { Brewery } from "@prisma/client";

const BreweryGrid = () => {
	const { breweries, refreshBreweries } = useDb();
	const [filteredBreweries, setFilteredBreweries] =
		useState<Brewery[]>(breweries);
	const [query, setQuery] = useState<string>("");

	const { loading } = useLoadingAsync(async () => {
		await refreshBreweries();

		const filtered = breweries.filter((brewery) =>
			brewery.name.toLowerCase().includes(query)
		) as Brewery[];

		setFilteredBreweries(filtered);
	}, [breweries, query]);

	const onChange = (ev: ChangeEvent<HTMLInputElement>) => {
		setQuery(ev.target.value.toLowerCase());
	};

	return (
		<>
			<div className={styles.pre__container}>
				<h1 className={styles.title}>Bryggerier</h1>
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
