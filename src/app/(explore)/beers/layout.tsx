import { ReactNode } from "react";
import { DatabaseContextProvider } from "@/services";
import { NavBar } from "@/components";

const BeerExploreLayout = async (props: {
	children: ReactNode;
	beer: ReactNode;
}) => {
	return (
		<html lang="en">
			<body>
				<DatabaseContextProvider>
					<NavBar push />
					{props.children}
					{props.beer}
				</DatabaseContextProvider>
			</body>
		</html>
	);
};

export default BeerExploreLayout;
