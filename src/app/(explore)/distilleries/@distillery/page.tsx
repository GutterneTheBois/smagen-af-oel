"use client";
import { useDb } from "@/services";
import { useLoadingAsync } from "@/utils/hooks/useLoadingAsync";
import { DistilleryCard, LoadingCard } from "@/client-components";
import styles from "../../explore.module.scss";

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
					<DistilleryCard
						key={distillery.id}
						distillery={distillery}
					/>
				))
			)}
		</div>
	);
};

export default DistilleryGrid;
