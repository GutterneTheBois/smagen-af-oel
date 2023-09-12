import { ReactNode } from "react";
import { DatabaseContextProvider } from "@/services";
import { NavBar } from "@/components";

const DistilleryExploreLayout = async (props: {
	children: ReactNode;
	distillery: ReactNode;
}) => {
	return (
		<DatabaseContextProvider>
			<NavBar push />
			{props.children}
			{props.distillery}
		</DatabaseContextProvider>
	);
};

export default DistilleryExploreLayout;
