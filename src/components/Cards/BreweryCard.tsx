import { FC } from "react";
import { Brewery } from "@prisma/client";
import styles from "./card.module.scss";
import Button from "../../client-components/Button";

type CardProps = {
	brewery: Brewery;
};

const BreweryCard: FC<CardProps> = ({ brewery }): JSX.Element => {
	return (
		<div className={styles.card__sm}>
			{brewery !== undefined && (
				<>
					<h3>{brewery.name}</h3>
					<h4>{brewery.description}</h4>
					<a
						className={styles.link}
						href={`http://localhost:3000/brewery/${brewery.id}`}
					>
						<Button width={"20vw"}>AAAAAAA</Button>
					</a>
				</>
			)}
		</div>
	);
};

export default BreweryCard;
