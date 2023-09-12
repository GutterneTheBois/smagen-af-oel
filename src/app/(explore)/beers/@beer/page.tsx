"use client";
import { useDb } from "@/services";
import { useLoadingAsync } from "@/utils/hooks/useLoadingAsync";
import styles from "../../explore.module.scss";
import { LoadingCard, Card } from "@/components";

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
				beers.map((beer) => <Card key={beer.id} beer={beer} />)
			)}
		</div>
	);
};

export default BeerGrid;
