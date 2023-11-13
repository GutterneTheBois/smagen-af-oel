"use client";
import { FC } from "react";
import styles from "../modal.module.scss";
import { Button, GhostButton } from "@/client-components";
import { IoBeer, IoLogOut } from "react-icons/io5";

interface FooterProps {
	toggle: () => Promise<void>;
}

const ModalFooter: FC<FooterProps> = ({ toggle }) => {
	return (
		<div className={styles.modalFooter}>
			<Button
				className={styles.modalFooterBtn}
				onClick={async () => await toggle()}
			>
				<IoBeer className={styles.modalIcon} />
				Confirm
			</Button>

			<GhostButton
				className={styles.modalFooterBtn}
				linkTo="http://www.google.com"
			>
				<IoLogOut className={styles.modalIcon} />
				Cancel
			</GhostButton>
		</div>
	);
};

export default ModalFooter;
