"use client";
import { useDb } from "@/services";
import { useLoadingAsync } from "@/utils/hooks/useLoadingAsync";
import styles from "../../explore.module.scss";
import { LoadingCard, Card } from "@/components";
import { ChangeEvent, useState, useEffect } from "react";
import { Distillery } from "@prisma/client";

const DistilleryGrid = () => {
	const { distilleries, refreshDistilleries } = useDb();
	const [filteredDistilleries, setFilteredDistilleries] =
		useState<Distillery[]>(distilleries);
	const [query, setQuery] = useState<string>("");

	useEffect(() => {
		if (filteredDistilleries.length === 0) {
			(async () => {
				await refreshDistilleries();
				setFilteredDistilleries(distilleries);
			})();
		}
	}, [distilleries, refreshDistilleries, filteredDistilleries.length]);

	const { loading } = useLoadingAsync(async () => {
		await refreshDistilleries();

		const filtered = distilleries.filter((distillery) =>
			distillery.name.toLowerCase().includes(query)
		) as Distillery[];

		setFilteredDistilleries(filtered);
	}, [query]);

	const onChange = (ev: ChangeEvent<HTMLInputElement>) => {
		setQuery(ev.target.value.toLowerCase());
	};

	return (
		<>
			<h1 className={styles.title}>Destillerier</h1>
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
					</>
				) : (
					filteredDistilleries.map((distillery) => (
						<Card key={distillery.id} distillery={distillery} />
					))
				)}
			</div>
		</>
	);
};

export default DistilleryGrid;
