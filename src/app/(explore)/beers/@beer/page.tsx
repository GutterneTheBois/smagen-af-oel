"use client";
import { useDb } from "@/services";
import { useLoadingAsync } from "@/utils/hooks/useLoadingAsync";
import { BeerCard, LoadingCard } from "@/client-components";
import styles from "../../explore.module.scss";

const BeerGrid = () => {
	const { beers, refreshBeers } = useDb();

	const { loading } = useLoadingAsync(async () => {
		await refreshBeers();
	}, [beers]);

	return (
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
				beers.map((beer) => <BeerCard key={beer.id} beer={beer} />)
			)}
		</div>
	);
};

export default BeerGrid;
