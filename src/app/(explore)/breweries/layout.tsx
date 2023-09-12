import { ReactNode } from "react";
import { DatabaseContextProvider } from "@/services";
import { NavBar } from "@/components";

const BreweryExploreLayout = async (props: {
	children: ReactNode;
	brewery: ReactNode;
}) => {
	return (
		<DatabaseContextProvider>
			<NavBar push />
			{props.children}
			{props.brewery}
		</DatabaseContextProvider>
	);
};

export default BreweryExploreLayout;
