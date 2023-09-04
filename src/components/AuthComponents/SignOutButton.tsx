"use client";

import { Button } from "@/client-components";
import { signOut } from "next-auth/react";

export default function GithubButton() {
	return (
		<Button
			className="border border-slate-300 rounded px-5 py-4 flex items-center"
			onClick={() => signOut()}
		>
			<div className="px-2"></div>
			<span>Sign Out</span>
		</Button>
	);
}
