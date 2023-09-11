import { ReactNode } from "react";
import { DatabaseContextProvider } from "@/services";
import { NavBar } from "@/components";

const BreweryExploreLayout = async (props: {
	children: ReactNode;
	brewery: ReactNode;
}) => {
	return (
		<html lang="en">
			<body>
				<DatabaseContextProvider>
					<NavBar push />
					{props.children}
					{props.brewery}
				</DatabaseContextProvider>
			</body>
		</html>
	);
};

export default BreweryExploreLayout;
