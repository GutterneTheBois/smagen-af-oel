"use client";
import { Button } from "@/client-components";
import { signIn } from "next-auth/react";
import { BsFacebook } from "react-icons/bs";
import styles from "./auth.module.scss";

const FacebookButton = () => {
    return (
        <Button
            className={styles.loginWithButton}
            padding={"0 0 0 0.5vw"}
            width={"90%"}
            onClick={() => signIn("facebook", { callbackUrl: "/" })}
        >
            <BsFacebook
                style={{
                    color: "#3b5998",
                    width: "2vw",
                    height: "auto",
                    margin: "0.5rem",
                }}
            />
            <span>Sign in with facebook</span>
        </Button>
    );
};

export default FacebookButton;
