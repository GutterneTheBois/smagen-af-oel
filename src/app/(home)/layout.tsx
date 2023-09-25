import { DatabaseContextProvider } from "@/services";
import "../globals.scss";
import { Footer, NavBar } from "@/components";
import { Khand } from "next/font/google";
import bg from "../../../public/background.png";
import Favicon from "../../../public/metadata/favicon.ico";
import styles from "./index.module.scss";
import "../globals.scss";

const khand = Khand({ subsets: ["latin"], weight: "400" });

export const metadata = {
	title: "Smagen af Øl",
	description: "Generated by create next app",
	icons: [{ rel: "icon", url: Favicon.src }],
};

const RootLayout = ({
	children,
	random_beer,
}: {
	children: React.ReactNode;
	random_beer: React.ReactNode;
}) => {
	return (
		<html lang="en">
			<body className={`${khand.className}`}>
				<main className={styles.main}>
					<NavBar />
					<DatabaseContextProvider>
						<div className={styles.grid}>
							<div className={styles.card}>left</div>
							{random_beer}
							<div className={styles.card}>right</div>
						</div>
						{children}
					</DatabaseContextProvider>
					<Footer attach />
				</main>
			</body>
		</html>
	);
};

export default RootLayout;
