import { FC } from "react";
import styles from "./login.module.scss";
import { IoPersonCircleOutline } from "react-icons/io5";
import { RiLockPasswordLine } from "react-icons/ri";
import { Button } from "@/client-components";
import { AuthLoginButton } from "@/components/AuthComponents";

const LoginPage: FC = (): JSX.Element => {
	return (
		<div className={styles.loginPage}>
			<div className={styles.loginContainer}>
				<div className={styles.loginTextArea}>
					<div className={styles.loginTextField}>
						<div className={styles.icon}>
							<IoPersonCircleOutline />
						</div>
						<input
							className={styles.input}
							type="email"
							name="email"
							placeholder="Email"
						/>
					</div>

					<div className={styles.loginTextField}>
						<div className={styles.icon}>
							<RiLockPasswordLine />
						</div>
						<input
							className={styles.input}
							type="password"
							name="password"
							placeholder="Password"
						/>
					</div>
					<div
						style={{
							display: "flex",
							justifyContent: "center",
							margin: "1rem",
						}}
					>
						<Button width="100%">Login</Button>
					</div>
				</div>
				<div className={styles.divider}></div>
				<div className={styles.loginWith_Container}>
					<AuthLoginButton type="facebook" />
					<AuthLoginButton type="google" />
					<AuthLoginButton type="discord" />
					<AuthLoginButton type="github" />
				</div>
			</div>
		</div>
	);
};

export default LoginPage;
