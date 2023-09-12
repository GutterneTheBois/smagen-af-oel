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
			href: "/beers",
		},
		{
			name: "Bryggerier",
			href: "/breweries",
		},
		{
			name: "Destillerier",
			href: "/distilleries",
		},
		{
			name: "Spiritus",
			href: "/spirits",
		},
	];

	return (
		<div className={`${push ? styles.navbarContainer : ""}`}>
			<div className={styles.navbar}>
				<a href={"/"}>
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
