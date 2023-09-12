"use client";
import { useDb } from "@/services";
import { useLoadingAsync } from "@/utils/hooks/useLoadingAsync";
import styles from "../../explore.module.scss";
import { Card, LoadingCard } from "@/components";

const BreweryGrid = () => {
	const { breweries, refreshBreweries } = useDb();

	const { loading } = useLoadingAsync(async () => {
		await refreshBreweries();
	}, [breweries]);

	return (
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
				breweries.map((brewery) => (
					<Card key={brewery.id} brewery={brewery} />
				))
			)}
		</div>
	);
};

export default BreweryGrid;
