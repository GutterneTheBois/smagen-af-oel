import styles from "../page.module.scss";
import { UpdaterExample } from "@/components";
import { ExampleButton, ExampleSimpleGrid, Modal } from "@/barrels";
import ExampleApiGet from "@/components/ExampleApiGet";
import Link from "next/link";

export default async function Home() {
	return (
		<main className={styles.main}>
			<Modal />
			<div className={styles.description}>
				<Link href={"/"}>
					<ExampleButton>Go to home</ExampleButton>
				</Link>
			</div>

			<div className={styles.center}>
				<p className={`${styles.logo} ${styles.logo_style}`}>
					Gutterne
				</p>
			</div>

			<ExampleSimpleGrid columns={2}>
				<ExampleApiGet />
				<UpdaterExample />
			</ExampleSimpleGrid>
		</main>
	);
}
