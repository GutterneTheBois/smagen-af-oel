"use client";
import { Button } from "@/client-components";
import { signIn } from "next-auth/react";
import { BsDiscord } from "react-icons/bs";
import styles from "./auth.module.scss";
import { FC } from "react";

type AuthButtonProps = {
    type: string | "discord" | "facebook";
};

const DiscordButton: FC<AuthButtonProps> = ({ type }) => {
    return (
        <Button
            className={styles.loginWithButton}
            padding={"0 0 0 0.5vw"}
            width={"90%"}
            onClick={() => signIn("discord")}
        >
            <BsDiscord
                style={{
                    color: "#3b5998",
                    width: "2vw",
                    height: "auto",
                    margin: "0.5rem",
                }}
            />
            <span>Sign In with Discord</span>
        </Button>
    );
};

export default DiscordButton;
