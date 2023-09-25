"use client";
import { Button } from "@/client-components";
import { signIn } from "next-auth/react";
import { BsGithub } from "react-icons/bs";
import styles from "./auth.module.scss";

export default function GithubButton() {
    return (
        <Button
            className={styles.loginWithButton}
            padding={"0 0 0 0.5vw"}
            width={"90%"}
            onClick={() => signIn("github")}
        >
            <BsGithub
                style={{
                    color: "#3b5998",
                    width: "2vw",
                    height: "auto",
                    margin: "0.5rem",
                }}
            />
            <span>Sign In with Github</span>
        </Button>
    );
}
