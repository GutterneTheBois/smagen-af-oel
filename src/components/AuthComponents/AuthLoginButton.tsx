"use client";
import { Button } from "@/client-components";
import { signIn } from "next-auth/react";
import { BsDiscord, BsFacebook, BsGithub } from "react-icons/bs";
import styles from "./auth.module.scss";
import { FC } from "react";
import g_logo from "../../../public/Google__G__Logo.svg";
import Image from "next/image";

type Props = {
	type: "facebook" | "google" | "discord" | "github";
};

const AuthLoginButton: FC<Props> = ({ type }) => {
	const getIconByPropType = (): JSX.Element => {
		switch (type) {
			case "facebook":
				return (
					<BsFacebook
						className={`${styles.facebook} ${styles.authIcon}`}
					/>
				);
			case "google":
				return (
					<Image
						width={100}
						height={100}
						src={g_logo.src}
						alt="Google G logo"
						className={`${styles.google} ${styles.authIcon}`}
					/>
				);
			case "discord":
				return (
					<BsDiscord
						className={`${styles.discord} ${styles.authIcon}`}
					/>
				);
			case "github":
				return (
					<BsGithub
						className={`${styles.github} ${styles.authIcon}`}
					/>
				);
		}

		return <></>;
	};

	return (
		<Button
			className={`${styles.loginWithButton}`}
			padding={"0 0 0 0.5vw"}
			width={"90%"}
			onClick={() => signIn(`${type}`, { callbackUrl: "/" })}
		>
			{getIconByPropType()}
			<span className={styles.justifiedText}>
				Sign in with {type[0].toUpperCase() + type.slice(1)}
			</span>
		</Button>
	);
};

export default AuthLoginButton;
