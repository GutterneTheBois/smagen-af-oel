import { NavBar } from "@/components";
import { DatabaseContextProvider } from "@/services";
import { Inter } from "next/font/google";
import { ReactNode } from "react";

const ExploreSpiritLayout = ({ children }: { children: ReactNode }) => {
	return (
		<>
			<NavBar push />
			{children}
		</>
	);
};

export default ExploreSpiritLayout;
