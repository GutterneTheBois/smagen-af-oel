import { FC, ReactNode } from "react";
import styles from "./ghost.module.scss";

type GhostProps = {
	children: ReactNode;
	className?: string;
	linkTo?: string;
	onClick?: () => void;
};

const GhostButton: FC<GhostProps> = ({
	children,
	className,
	onClick,
	linkTo,
}) => {
	return (
		<a
			className={`${styles.ghost} ${className && className}`}
			href={`${linkTo ? linkTo : "#"}`}
		>
			<div className={styles.ghostContent}>{children}</div>
		</a>
	);
};

export default GhostButton;
