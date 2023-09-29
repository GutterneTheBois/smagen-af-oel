"use client";
import { useInfo } from "@/services";
import { useLoadingAsync } from "@/utils/hooks/useLoadingAsync";
import styles from "../index.module.scss";
import Image from "next/image";

const BeerOfTheDay = () => {
	const { botds, refreshBotD } = useInfo();

	const { loading } = useLoadingAsync(async () => {
		await refreshBotD();
	}, [refreshBotD]);

	return (
		<div className={`${styles.card} ${styles.overflow}`}>
			{!loading ? (
				<>
					{botds.map((botd, index) => (
						<div key={index} className={styles.botd_card}>
							<>
								<a href={`/beer/${botd.id}`}>
									<Image
										className={styles.beer_img}
										height={500}
										width={500}
										src={botd.image_url || ""}
										alt={""}
									/>
								</a>
								<div>
									<p>{botd.name}</p>
								</div>
								<hr className={styles.botd_divider} />
								<div>
									<p>{botd.breweryName}</p>
								</div>
							</>
							<hr />
						</div>
					))}
				</>
			) : (
				<></>
			)}
		</div>
	);
};

export default BeerOfTheDay;
