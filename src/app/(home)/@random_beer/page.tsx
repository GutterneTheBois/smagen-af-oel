"use client";
import { useDb } from "@/services";
import { useEffect, useState } from "react";
import { useLoadingAsync } from "@/utils/hooks/useLoadingAsync";
import { Beer } from "@prisma/client";
import styles from "../index.module.scss";
import { Button } from "@/client-components";

const RandomBeer = () => {
	const { beers, refreshBeers } = useDb();

	const [beer, setBeer] = useState<Beer>();

	useEffect(() => {
		if (beer === undefined) {
			(async () => {
				await refreshBeers();
				setBeer(beers[Math.floor(Math.random() * beers.length)]);
			})();
		}
	}, [beers, refreshBeers, beer]);

	const { loading } = useLoadingAsync(async () => {
		await refreshBeers();
	}, [refreshBeers]);

	const BeerCard = (): JSX.Element => {
		return (
			<>
				<img
					src={
						"https://www.dropbox.com/s/8msstai7ficca3n/15imp.jpeg?raw=1"
					}
					alt={beer?.image_url || " "}
				/>
				<hr />
				<div className={styles.buttons}>
					<a href={"/beers"}>
						<Button width="90%">Udforsk øl i butikken</Button>
					</a>
					<a href={"/breweries"}>
						<Button width="90%">
							Udforsk bryggerier i butikken
						</Button>
					</a>
					<a href={"/spirits"}>
						<Button width="90%">Udforsk spiritus i butikken</Button>
					</a>
					<a href="/distilleries">
						<Button width="90%">
							Udforsk destillerier i butikken
						</Button>
					</a>
				</div>
			</>
		);
	};

	return (
		<div className={styles.card}>
			{!loading ? (
				<>
					{beer === undefined ? (
						<>Ingen Øl Fundet</>
					) : (
						<>{BeerCard()}</>
					)}
				</>
			) : (
				<div>Ingen Øl Fundet</div>
			)}
		</div>
	);
};

export default RandomBeer;
