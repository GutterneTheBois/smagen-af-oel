import { ReactNode } from "react";
import { DatabaseContextProvider } from "@/services";
import { NavBar } from "@/components";

const SpiritExploreLayout = async (props: {
	children: ReactNode;
	spirit: ReactNode;
}) => {
	return (
		<DatabaseContextProvider>
			<NavBar push />
			{props.children}
			{props.spirit}
		</DatabaseContextProvider>
	);
};

export default SpiritExploreLayout;
