"use client";
import { Button } from "@/client-components";
import { signOut } from "next-auth/react";
import { HiOutlineLogout } from "react-icons/hi";

const SignoutButton = () => {
    return (
        <Button width={"4vw"} onClick={() => signOut()}>
            <HiOutlineLogout style={{ marginRight: "0.25vw" }} />
            <span>Sign Out</span>
        </Button>
    );
};

export default SignoutButton;
