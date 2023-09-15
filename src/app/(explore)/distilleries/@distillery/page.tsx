"use client";
import { useDb } from "@/services";
import { useLoadingAsync } from "@/utils/hooks/useLoadingAsync";
import styles from "../../explore.module.scss";
import { LoadingCard, Card } from "@/components";
import { ChangeEvent, useState } from "react";
import { Distillery } from "@prisma/client";

const DistilleryGrid = () => {
	const { distilleries, refreshDistilleries } = useDb();
	const [filteredDistilleries, setFilteredDistilleries] =
		useState<Distillery[]>(distilleries);
	const [query, setQuery] = useState<string>("");

	const { loading } = useLoadingAsync(async () => {
		await refreshDistilleries();

		const filtered = distilleries.filter((distillery) =>
			distillery.name.toLowerCase().includes(query)
		) as Distillery[];

		setFilteredDistilleries(filtered);
	}, [distilleries, query]);

	const onChange = (ev: ChangeEvent<HTMLInputElement>) => {
		setQuery(ev.target.value.toLowerCase());
	};

	return (
		<>
			<div className={styles.pre__container}>
				<h1 className={styles.title}>Destillerier</h1>
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
