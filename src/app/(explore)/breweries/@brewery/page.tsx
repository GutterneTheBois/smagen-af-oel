"use client";
import { useDb } from "@/services";
import { useLoadingAsync } from "@/utils/hooks/useLoadingAsync";
import { BreweryCard } from "@/client-components";
import styles from "../../explore.module.scss";

const BreweryGrid = () => {
	const { breweries, refreshBreweries } = useDb();

	const { loading } = useLoadingAsync(async () => {
		await refreshBreweries();
	}, [breweries]);

	return (
		<div className={styles.container}>
			{loading ? (
				<div>Loading...</div>
			) : (
				breweries.map((brewery) => (
					<BreweryCard key={brewery.id} brewery={brewery} />
				))
			)}
		</div>
	);
};

export default BreweryGrid;
