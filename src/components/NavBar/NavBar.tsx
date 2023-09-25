import { FC } from "react";
import styles from "./navbar.module.scss";
import Image from "next/image";
import { getServerSession } from "next-auth";
import { SignOutButton } from "../AuthComponents";
import { authOptions } from "@/lib/auth";
import { Button } from "@/client-components";
import { TbGlassFullFilled } from "react-icons/tb";

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
		<div className={`${push ? styles.navbar__container : ""}`}>
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
				<div className={styles.auth__area}>
					{!session ? (
						<a href="/login">
							<Button>
								<TbGlassFullFilled
									style={{
										height: "2vh",
										width: "auto",
										marginRight: "1vw",
									}}
								/>
								<span>Log in</span>
							</Button>
						</a>
					) : (
						<div style={{ display: "flex" }}>
							<img
								className={styles.user__img}
								src={session.user?.image || ""}
								alt={" "}
							/>
							<span
								style={{
									marginRight: "0.5vw",
									paddingTop: "0.2vh",
								}}
							>
								{session.user?.name}
							</span>
							<SignOutButton />
						</div>
					)}
				</div>
			</div>
		</div>
	);
};

export default NavBar;
