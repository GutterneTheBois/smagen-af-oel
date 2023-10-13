import { FC } from "react";
import styles from "./navbar.module.scss";
import Image from "next/image";
import { getServerSession } from "next-auth";
import { SignOutButton } from "../AuthComponents";
import { authOptions } from "@/lib/auth";
import { Button } from "@/client-components";
import { TbGlassFullFilled } from "react-icons/tb";
import AuthArea from "./AuthArea";

type Item = {
	name: string;
	href: string;
};

type NavBarProps = {
	push?: boolean;
};

const NavBar: FC<NavBarProps> = async ({ push }) => {
	const session = await getServerSession(authOptions);

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
			name: "Spiritus",
			href: "/spirits",
		},
		{
			name: "Destillerier",
			href: "/distilleries",
		},
	];

	return (
		<header>
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
				<AuthArea session={session} />
			</div>
		</header>
	);
};

export default NavBar;
