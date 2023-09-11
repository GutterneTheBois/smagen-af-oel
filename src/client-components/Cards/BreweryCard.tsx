import { FC } from "react";
import Link from "next/link";
import { Brewery } from "@prisma/client";
import styles from "./card.module.scss";
import Button from "../Button";

type CardProps = {
	brewery: Brewery;
};

const Card: FC<CardProps> = ({ brewery }): JSX.Element => {
	return (
		<div className={styles.card}>
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

export default Card;
