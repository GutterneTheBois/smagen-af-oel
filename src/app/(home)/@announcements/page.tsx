"use client";
import { useDb, useInfo } from "@/services";
import { useLoadingAsync } from "@/utils/hooks/useLoadingAsync";
import styles from "../index.module.scss";
import { Button } from "@/client-components";

const Announcements = () => {
	const { announcements, refreshAnnouncements } = useInfo();
	const { admins, refreshAdmins } = useDb();

	const { loading } = useLoadingAsync(async () => {
		await refreshAnnouncements();
		await refreshAdmins();
	}, [refreshAnnouncements]);

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
