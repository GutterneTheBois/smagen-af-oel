import { FC } from "react";
import styles from "../modal.module.scss";

const ModalHeader: FC = () => {
	return (
		<div className={styles.modalHeader}>
			<h1 className={styles.modalHeaderText}>Befræft alder</h1>
		</div>
	);
};

export default ModalHeader;
