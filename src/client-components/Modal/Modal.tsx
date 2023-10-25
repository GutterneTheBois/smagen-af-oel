"use client";
import { FC, useState } from "react";
import styles from "./modal.module.scss";
import { createAgeCookie } from "@/services/actions";
import ModalHeader from "./components/ModalHeader";
import ModalFooter from "./components/ModalFooter";

const Modal: FC = () => {
	const [open, setOpen] = useState<boolean>(true);

	const toggle = async () => {
		setOpen(!open);
		await createAgeCookie();
	};

	return (
		<>
			<div
				className={`${styles.modalContainer} ${
					open ? `${styles.open}` : `${styles.closed}`
				}`}
			>
				<div className={styles.modal}>
					<ModalHeader />

					<div className={styles.modalBody}></div>

					<ModalFooter toggle={toggle} />
				</div>
			</div>
		</>
	);
};

export default Modal;
