import { ReactNode } from "react";
import { DatabaseContextProvider } from "@/services";
import { NavBar } from "@/components";
import ProductGrid from "@/components/Views/Gridviews/ProductGrid";

const BeerExploreLayout = async (props: {
	children: ReactNode;
	beer: ReactNode;
}) => {
	return (
		<main>
			<ProductGrid />
			{props.children}
			{props.beer}
		</main>
	);
};

export default BeerExploreLayout;
