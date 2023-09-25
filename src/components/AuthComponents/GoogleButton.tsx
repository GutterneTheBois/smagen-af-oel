"use client";
import { Button } from "@/client-components";
import { signIn } from "next-auth/react";
import g_logo from "../../../public/Google__G__Logo.svg";
import styles from "./auth.module.scss";

const GoogleButton = () => {
    return (
        <Button
            className={styles.loginWithButton}
            padding={"0 0 0 0.5vw"}
            width={"90%"}
            onClick={() => signIn("google")}
        >
            {/* <BsGoogle style={{ color: "blue" }} /> */}
            <img
                src={g_logo.src}
                alt="Google G logo"
                style={{
                    color: "#3b5998",
                    width: "2vw",
                    height: "auto",
                    margin: "0.5rem",
                }}
            />
            <span>Sign in with Google</span>
        </Button>
    );
};

export default GoogleButton;
