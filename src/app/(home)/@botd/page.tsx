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

	const showBotd = (): JSX.Element => {
		return (
			<>
				{botds.length === 0 ? (
					<h3>Dagens øl er ikke fundet</h3>
				) : (
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
				)}
			</>
		);
	};

	return (
		<div className={`${styles.card} ${styles.overflow}`}>
			{!loading && <>{showBotd()}</>}
		</div>
	);
};

export default BeerOfTheDay;
