"use client";
import { Button } from "@/client-components";
import { signIn } from "next-auth/react";
import { BsFacebook } from "react-icons/bs";

const FacebookButton = () => {
	return (
		<Button onClick={() => signIn("facebook")}>
			<BsFacebook />
			<span>Sign in with facebook</span>
		</Button>
	);
};

export default FacebookButton;
