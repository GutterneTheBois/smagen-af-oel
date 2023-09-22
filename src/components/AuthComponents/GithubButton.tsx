"use client";
import { Button } from "@/client-components";
import { signIn } from "next-auth/react";
import { BsGithub } from "react-icons/bs";

export default function GithubButton() {
    return (
        <Button padding={"0 0 0 0.5vw"} onClick={() => signIn("github")}>
            <BsGithub style={{ width: "2vw", height: "auto" }} />
            <span>Sign In with Github</span>
        </Button>
    );
}
