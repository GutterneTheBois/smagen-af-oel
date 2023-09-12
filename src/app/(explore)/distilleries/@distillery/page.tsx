"use client";
import { useDb } from "@/services";
import { useLoadingAsync } from "@/utils/hooks/useLoadingAsync";
import styles from "../../explore.module.scss";
import { LoadingCard, Card } from "@/components";

const DistilleryGrid = () => {
	const { distilleries, refreshDistilleries } = useDb();

	const { loading } = useLoadingAsync(async () => {
		await refreshDistilleries();
	}, [distilleries]);

	return (
		<div className={styles.container}>
			{loading ? (
				<>
					<LoadingCard small />
					<LoadingCard small />
					<LoadingCard small />
				</>
			) : (
				distilleries.map((distillery) => (
					<Card key={distillery.id} distillery={distillery} />
				))
			)}
		</div>
	);
};

export default DistilleryGrid;
