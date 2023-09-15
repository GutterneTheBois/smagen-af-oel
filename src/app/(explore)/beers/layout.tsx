import { ReactNode } from "react";
import { DatabaseContextProvider } from "@/services";
import { NavBar } from "@/components";

const BeerExploreLayout = async (props: {
	children: ReactNode;
	beer: ReactNode;
}) => {
	return (
		<main>
			{props.children}
			{props.beer}
		</main>
	);
};

export default BeerExploreLayout;
