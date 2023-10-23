"use client";
import { Button } from "@/client-components";
import { signOut } from "next-auth/react";
import { TbGlassOff } from "react-icons/tb";

const SignoutButton = () => {
    return (
        <Button width={"6vw"} onClick={() => signOut()}>
            <TbGlassOff
                style={{ height: "2vh", width: "auto", marginRight: "1vw" }}
            />
            <span>Sign Out</span>
        </Button>
    );
};

export default SignoutButton;
