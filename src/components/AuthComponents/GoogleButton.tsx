"use client";
import { Button } from "@/client-components";
import { signIn } from "next-auth/react";
import { BsGoogle } from "react-icons/bs";
import styles from "./auth.module.scss";

const GoogleButton = () => {
    return (
        <Button width={"4vw"} onClick={() => signIn("google")}>
            {/* <BsGoogle style={{ color: "blue" }} /> */}
            <div className={styles.google}></div>
            <span style={{ marginLeft: "0.5vw" }}>Sign in</span>
        </Button>
    );
};

export default GoogleButton;
