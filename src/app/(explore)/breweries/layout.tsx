import { ReactNode } from "react";
import { DatabaseContextProvider } from "@/services";
import { NavBar } from "@/components";

const BreweryExploreLayout = async (props: {
	children: ReactNode;
	brewery: ReactNode;
}) => {
	return (
		<>
			{props.children}
			{props.brewery}
		</>
	);
};

export default BreweryExploreLayout;
