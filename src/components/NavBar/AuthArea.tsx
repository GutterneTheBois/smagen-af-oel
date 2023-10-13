"use client";
import { FC } from "react";
import styles from "./navbar.module.scss";
import { Session } from "next-auth";
import { Button } from "@/client-components";
import { TbGlassFullFilled } from "react-icons/tb";
import { SignOutButton } from "../AuthComponents";
import Image from "next/image";
import { useDb } from "@/services";
import { useLoadingAsync } from "@/utils/hooks/useLoadingAsync";

type AuthAreaProps = {
	session: Session | null;
};

const AuthArea: FC<AuthAreaProps> = ({ session }) => {
	const { admins, refreshAdmins } = useDb();

	const { loading } = useLoadingAsync(async () => {
		await refreshAdmins();
	}, [refreshAdmins]);

	const isAdmin = (): boolean => {
		if (session === null) return false;

		const user = session.user?.name;

		if (user === undefined || user === null) return false;
		else return admins.some((a) => a.name.includes(user));
	};

	return (
		<>
			{!loading && (
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
							{isAdmin() && (
								<a href="/admin">
									<Button>Admin Page</Button>
								</a>
							)}
							<Image
								width={200}
								height={200}
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
			)}
		</>
	);
};

export default AuthArea;
