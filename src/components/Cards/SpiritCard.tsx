import { FC } from "react";
import Image from "next/image";
import Link from "next/link";
import { Spirit } from "@prisma/client";
import styles from "./card.module.scss";
import Button from "../../client-components/Button";

type CardProps = {
	spirit: Spirit;
};

const SpiritCard: FC<CardProps> = ({ spirit }): JSX.Element => {
	return (
		<div className={styles.card}>
			{spirit !== undefined && (
				<>
					<Image
						className={styles.card__img}
						width={100}
						height={100}
						src={
							spirit.image_url === "flygtning.jpeg"
								? `/spirits/${spirit.image_url}`
								: "/beers/standin.jpg"
						}
						alt={spirit.name}
					/>
					<hr />
					<h3>{spirit.name}</h3>
					<h4>{spirit.type}</h4>
					<a
						className={styles.link}
						href={`http://localhost:3000/spirit/${spirit.id}`}
					>
						<Button width={"20vw"}>AAAAAAA</Button>
					</a>
				</>
			)}
		</div>
	);
};

export default SpiritCard;
