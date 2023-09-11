import { FC } from "react";
import Image from "next/image";
import Link from "next/link";
import { Beer } from "@prisma/client";
import styles from "./card.module.scss";
import Button from "../Button";

type CardProps = {
	beer: Beer;
};

const Card: FC<CardProps> = ({ beer }): JSX.Element => {
	return (
		<div className={styles.card}>
			{beer !== undefined && (
				<>
					<Image
						className={styles.card__img}
						width={100}
						height={100}
						src={
							beer.image_url === "flygtning.jpeg"
								? `/beers/${beer.image_url}`
								: "/beers/standin.jpg"
						}
						alt={beer.name}
					/>
					<hr />
					<h3>{beer.name}</h3>
					<h4>{beer.type}</h4>
					<a
						className={styles.link}
						href={`http://localhost:3000/beer/${beer.id}`}
					>
						<Button width={"20vw"}>AAAAAAA</Button>
					</a>
				</>
			)}
		</div>
	);
};

export default Card;
