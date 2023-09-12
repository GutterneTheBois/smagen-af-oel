import { FC } from "react";
import Image from "next/image";
import { Brewery, Beer, Spirit, Distillery } from "@prisma/client";
import styles from "./card.module.scss";
import { Button } from "@/client-components";

type CardProps = {
	brewery?: Brewery;
	beer?: Beer;
	distillery?: Distillery;
	spirit?: Spirit;
};

const Card: FC<CardProps> = (props: CardProps): JSX.Element => {
	const shouldBeSmall = (): boolean => {
		if (props.brewery || props.distillery) return true;

		return false;
	};

	const getModelProps = ():
		| Brewery
		| Distillery
		| Beer
		| Spirit
		| undefined => {
		if (props.brewery)
			return {
				...props.brewery,
				href: `/brewery/${props.brewery.id}`,
			} as Brewery;
		else if (props.distillery)
			return {
				...props.distillery,
				href: `/distillery/${props.distillery.id}`,
			} as Distillery;
		else if (props.beer)
			return { ...props.beer, href: `/beer/${props.beer.id}` } as Beer;
		else if (props.spirit)
			return {
				...props.spirit,
				href: `/spirit/${props.spirit.id}`,
			} as Spirit;
	};

	return (
		<div className={`${shouldBeSmall() ? styles.card__sm : styles.card}`}>
			{getModelProps() !== undefined && (
				<>
					{(getModelProps() as Beer | Spirit).image_url !==
						undefined && (
						<>
							<Image
								className={styles.card__img}
								width={100}
								height={100}
								src={
									(getModelProps() as Beer | Spirit)
										.image_url === "flygtning.jpeg"
										? `/beers/${
												(
													getModelProps() as
														| Beer
														| Spirit
												).image_url
										  }`
										: "/beers/standin.jpg"
								}
								alt={getModelProps()?.name || ""}
							/>
							<hr className={styles.hr} />
						</>
					)}

					<h3 className={styles.spacing__sm}>
						{getModelProps()?.name}
					</h3>
					<hr className={styles.hr} />
					<h4 className={styles.spacing__sm}>
						{getModelProps()?.description}
					</h4>
					<a
						className={styles.link}
						href={(getModelProps() as any).href}
					>
						<Button width={"20vw"}>Se Produkt</Button>
					</a>
				</>
			)}
		</div>
	);
};

export default Card;
