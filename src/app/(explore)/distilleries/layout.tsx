import { ReactNode } from "react";
import { DatabaseContextProvider } from "@/services";
import { NavBar } from "@/components";

const DistilleryExploreLayout = async (props: {
	children: ReactNode;
	distillery: ReactNode;
}) => {
	return (
		<>
			{props.children}
			{props.distillery}
		</>
	);
};

export default DistilleryExploreLayout;
