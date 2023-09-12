import { FC } from "react";
import styles from "./card.module.scss";

type LoadingProps = {
	small?: boolean;
};

const LoadingCard: FC<LoadingProps> = ({ small }) => {
	return (
		<div className={`${small ? styles.card__sm : styles.card}`}>
			<h3>Loading...</h3>
			<span className={styles.loader}></span>
		</div>
	);
};

export default LoadingCard;
