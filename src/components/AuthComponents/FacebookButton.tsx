"use client";
import { Button } from "@/client-components";
import { signIn } from "next-auth/react";
import { BsFacebook } from "react-icons/bs";

const FacebookButton = () => {
    return (
        <Button
            padding={"0 0 0 0.5vw"}
            onClick={() => signIn("facebook", { callbackUrl: "/" })}
        >
            <BsFacebook
                style={{ color: "#3b5998", width: "2vw", height: "auto" }}
            />
            <span>Sign in with facebook</span>
        </Button>
    );
};

export default FacebookButton;
