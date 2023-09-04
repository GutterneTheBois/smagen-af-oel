"use client";

import { ExampleButton } from "@/barrels";
import { signIn } from "next-auth/react";

export default function GithubButton() {
	return (
		<ExampleButton
			className="border border-slate-300 rounded px-5 py-4 flex items-center"
			onClick={() => signIn("github")}
		>
			<div className="px-2"></div>
			<span>Sign In with Github</span>
		</ExampleButton>
	);
}
