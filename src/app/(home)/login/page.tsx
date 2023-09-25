import DiscordButton from "@/components/AuthComponents/DiscordButton";
import FacebookButton from "@/components/AuthComponents/FacebookButton";
import GoogleButton from "@/components/AuthComponents/GoogleButton";
import GithubButton from "@/components/AuthComponents/GithubButton";
import { FC } from "react";
import styles from "./login.module.scss";
import { IoPersonCircleOutline } from "react-icons/io5";
import { RiLockPasswordLine } from "react-icons/ri";
import { Button } from "@/client-components";

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
                    <FacebookButton />
                    <GoogleButton />
                    <DiscordButton />
                    <GithubButton />
                </div>
            </div>
        </div>
    );
};

export default LoginPage;
