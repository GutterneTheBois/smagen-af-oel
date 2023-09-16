"use client";
import { useDb } from "@/services";
import { useLoadingAsync } from "@/utils/hooks/useLoadingAsync";
import { LoadingCard, Card } from "@/components";
import styles from "../../explore.module.scss";
import { ChangeEvent, useEffect, useState } from "react";
import { Spirit } from "@prisma/client";

const SpiritGrid = () => {
	const { spirits, refreshSpirits } = useDb();
	const [filteredSpirits, setFilteredSpirits] = useState<Spirit[]>([]);
	const [query, setQuery] = useState<string>("");

	useEffect(() => {
		if (filteredSpirits.length === 0) {
			(async () => {
				await refreshSpirits();
				setFilteredSpirits(spirits);
			})();
		}
	}, [spirits]);

	const { loading } = useLoadingAsync(async () => {
		await refreshSpirits();

		const filtered = spirits.filter((spirit) =>
			spirit.type.toLowerCase().includes(query)
		) as Spirit[];

		setFilteredSpirits(filtered);
	}, [query]);

	const onChange = (ev: ChangeEvent<HTMLInputElement>) => {
		setQuery(ev.target.value.toLowerCase());
	};

	return (
		<>
			<h1 className={styles.title}>Spiritus</h1>
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
					</>
				) : (
					filteredSpirits.map((spirit) => (
						<Card key={spirit.id} spirit={spirit} />
					))
				)}
			</div>
		</>
	);
};

export default SpiritGrid;
