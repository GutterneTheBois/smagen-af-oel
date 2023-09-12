import { FC } from "react";
import { Distillery } from "@prisma/client";
import styles from "./card.module.scss";
import Button from "../../client-components/Button";

type CardProps = {
	distillery: Distillery;
};

const DistilleryCard: FC<CardProps> = ({ distillery }): JSX.Element => {
	return (
		<div className={styles.card__sm}>
			{distillery !== undefined && (
				<>
					<h3>{distillery.name}</h3>
					<h4>{distillery.description}</h4>
					<a
						className={styles.link}
						href={`http://localhost:3000/distillery/${distillery.id}`}
					>
						<Button width={"20vw"}>AAAAAAA</Button>
					</a>
				</>
			)}
		</div>
	);
};

export default DistilleryCard;
