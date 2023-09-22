"use client";
import { Button } from "@/client-components";
import { signIn } from "next-auth/react";
import { BsDiscord } from "react-icons/bs";

export default function DiscordButton() {
    return (
        <Button padding={"0 0 0 0.5vw"} onClick={() => signIn("discord")}>
            <BsDiscord
                style={{ color: "#7289d9", width: "2vw", height: "auto" }}
            />
            <span>Sign In with Discord</span>
        </Button>
    );
}
