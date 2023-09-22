import DiscordButton from "@/components/AuthComponents/DiscordButton";
import FacebookButton from "@/components/AuthComponents/FacebookButton";
import GoogleButton from "@/components/AuthComponents/GoogleButton";
import GithubButton from "@/components/AuthComponents/GithubButton";
import { FC } from "react";
import styles from "./login.module.scss";

const LoginPage: FC = (): JSX.Element => {
    return (
        <div className={styles.loginarea}>
            <FacebookButton />
            <GoogleButton />
            <DiscordButton />
            <GithubButton />
        </div>
    );
};

export default LoginPage;
