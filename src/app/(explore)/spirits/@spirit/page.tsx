"use client";
import { useDb } from "@/services";
import { useLoadingAsync } from "@/utils/hooks/useLoadingAsync";
import { LoadingCard } from "@/client-components";
import styles from "../../explore.module.scss";
import { SpiritCard } from "@/components/Cards";

const SpiritsGrid = () => {
	const { spirits, refreshSpirits } = useDb();

	const { loading } = useLoadingAsync(async () => {
		await refreshSpirits();
	}, [spirits]);

	return (
		<div className={styles.container}>
			{loading ? (
				<>
					<LoadingCard />
					<LoadingCard />
				</>
			) : (
				spirits.map((spirit) => (
					<SpiritCard key={spirit.id} spirit={spirit} />
				))
			)}
		</div>
	);
};

export default SpiritsGrid;
