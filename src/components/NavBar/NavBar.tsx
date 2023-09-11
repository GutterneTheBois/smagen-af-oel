import { FC } from "react";
import styles from "./navbar.module.scss";
import Image from "next/image";
import Link from "next/link";

type Item = {
	name: string;
	href: string;
};

type NavBarProps = {
	push?: boolean;
};

const NavBar: FC<NavBarProps> = ({ push }) => {
	const items: Item[] = [
		{
			name: "Øl",
			href: "http://localhost:3000/beers",
		},
		{
			name: "Bryggerier",
			href: "http://localhost:3000/breweries",
		},
	];

	return (
		<div className={`${push ? styles.navbarContainer : ""}`}>
			<div className={styles.navbar}>
				<a href={"http://localhost:3000"}>
					<Image
						className={styles.img}
						width={83}
						height={68}
						src={"/logo.jpg"}
						alt={"logo"}
					/>
				</a>
				{items.map((item) => (
					<a
						key={item.name}
						className={styles.ghost}
						href={item.href}
					>
						{item.name}
					</a>
				))}
			</div>
		</div>
	);
};

export default NavBar;
