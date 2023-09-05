import styles from "../page.module.scss";
import { Button, SimpleGrid, Modal } from "@/client-components";
import Link from "next/link";

export default async function Home() {
	return (
		<main className={styles.main}>
			<Modal />
			<div className={styles.description}>
				<Link href={"/"}>
					<Button>Go to home</Button>
				</Link>
			</div>

			<div className={styles.center}>
				<p className={`${styles.logo} ${styles.logo_style}`}>
					Gutterne
				</p>
			</div>

			<SimpleGrid columns={2}></SimpleGrid>
		</main>
	);
}
