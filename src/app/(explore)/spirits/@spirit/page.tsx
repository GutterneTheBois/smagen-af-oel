"use client";
import { useDb } from "@/services";
import { useLoadingAsync } from "@/utils/hooks/useLoadingAsync";
import { LoadingCard, Card } from "@/components";
import styles from "../../explore.module.scss";
import { ChangeEvent, useState } from "react";
import { Spirit } from "@prisma/client";

const SpiritGrid = () => {
	const { spirits, refreshSpirits } = useDb();
	const [filteredSpirits, setFilteredSpirits] = useState<Spirit[]>(spirits);
	const [query, setQuery] = useState<string>("");

	const { loading } = useLoadingAsync(async () => {
		await refreshSpirits();

		const filtered = spirits.filter((spirit) =>
			spirit.type.toLowerCase().includes(query)
		) as Spirit[];

		setFilteredSpirits(filtered);
	}, [spirits, query]);

	const onChange = (ev: ChangeEvent<HTMLInputElement>) => {
		setQuery(ev.target.value.toLowerCase());
	};

	return (
		<>
			<div className={styles.pre__container}>
				<h1 className={styles.title}>Spiritus</h1>
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
