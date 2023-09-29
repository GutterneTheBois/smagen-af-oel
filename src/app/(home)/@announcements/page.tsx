"use client";
import { useInfo } from "@/services";
import { useLoadingAsync } from "@/utils/hooks/useLoadingAsync";
import styles from "../index.module.scss";
import Image from "next/image";

const Announcements = () => {
	const { announcements, refreshData } = useInfo();

	const { loading } = useLoadingAsync(async () => {
		await refreshData();
	}, [refreshData]);

	return (
		<div className={`${styles.card} ${styles.overflow}`}>
			{!loading && (
				<>
					{announcements.map((announ, index) => (
						<div key={index} className={styles.botd_card}>
							<h3>{announ.title}</h3>
							<h5>{announ.description}</h5>
							<hr />
						</div>
					))}
				</>
			)}
		</div>
	);
};

export default Announcements;
