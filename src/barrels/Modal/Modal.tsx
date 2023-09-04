"use client";
import { FC, useState } from "react";
import styles from "./modal.module.scss";
import ExampleButton from "../ExampleButton/ExampleButton";
import GhostButton from "../GhostButton/GhostButton";
import { IoBeer, IoLogOut } from "react-icons/io5";

const Modal: FC = () => {
	const [open, setOpen] = useState<boolean>(true);

	const toggle = () => {
		setOpen(!open);
	};

	return (
		<>
			<ExampleButton onClick={toggle}>SHOW MODAL</ExampleButton>
			<div
				className={`${styles.modalContainer} ${
					open ? `${styles.open}` : `${styles.closed}`
				}`}
			>
				<div className={styles.modal}>
					<div className={styles.modalHeader}>
						<h1 className={styles.modalHeaderText}>SOME TEXT</h1>
					</div>

					<div className={styles.modalBody}></div>

					<div className={styles.modalFooter}>
						<ExampleButton
							className={styles.modalFooterBtn}
							onClick={toggle}
						>
							<IoBeer className={styles.modalIcon} />
							Confirm
						</ExampleButton>
						<GhostButton className={styles.modalFooterBtn}>
							<IoLogOut className={styles.modalIcon} />
							Cancel
						</GhostButton>
					</div>
				</div>
			</div>
		</>
	);
};

export default Modal;
