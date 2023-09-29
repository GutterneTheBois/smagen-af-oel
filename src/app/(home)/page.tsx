import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";
import styles from "./index.module.scss";
import Image from "next/image";
import { Button, SimpleGrid } from "@/client-components";
import Link from "next/link";

export default async function Home() {
	const session = await getServerSession(authOptions);

	return (
		<>
			<div className={styles.headings}>
				<div>
					<h2>Dagens Øl</h2>
				</div>
				<div>
					<h2>Udforsk Butikken</h2>
				</div>
				<div>
					<h2>Nyheder</h2>
				</div>
			</div>
			{/* <main>
			<div className={styles.grid}> */}
			{/* random beer should render here */}
			{/* </div> */}
			{/* <div className={styles.description}>
				<p>
					Get started by editing&nbsp;
					<code className={styles.code}>src/app/page.tsx</code>
				</p>
				<Link href={"/route"}>
					<Button backgroundColor="#dd0b69">Go to /route</Button>
				</Link>
				{(session?.user?.name === "Nicolai Walther" ||
					session?.user?.name === "Mikkel Christensen") && (
					<Link href={"/test_page"}>
						<Button backgroundColor="#dd0b69">Test Page</Button>
					</Link>
				)}

				<div>
					<a
						href="https://vercel.com?utm_source=create-next-app&utm_medium=appdir-template&utm_campaign=create-next-app"
						target="_blank"
						rel="noopener noreferrer"
					>
						By{" "}
						<Image
							src="/vercel.svg"
							alt="Vercel Logo"
							className={styles.vercelLogo}
							width={100}
							height={24}
							priority
						/>
					</a>
				</div>
			</div>

			<div className={styles.center}>
				<p className={`${styles.logo} ${styles.logo_style}`}>
					Gutterne
				</p>
			</div>

			<SimpleGrid columns={2}></SimpleGrid> 
		</main>*/}
		</>
	);
}
