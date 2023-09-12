"use client";
import { useDb } from "@/services";
import { useLoadingAsync } from "@/utils/hooks/useLoadingAsync";
import { LoadingCard, Card } from "@/components";
import styles from "../../explore.module.scss";

const SpiritGrid = () => {
	const { spirits, refreshSpirits } = useDb();

	const { loading } = useLoadingAsync(
		async () => await refreshSpirits(),
		[spirits]
	);

	return (
		<div className={styles.container}>
			{loading ? (
				<>
					<LoadingCard />
					<LoadingCard />
				</>
			) : (
				spirits.map((spirit) => (
					<Card key={spirit.id} spirit={spirit} />
				))
			)}
		</div>
	);
};

export default SpiritGrid;
