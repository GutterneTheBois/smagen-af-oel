import { ReactNode } from "react";
import { NavBar } from "@/components";

const SpiritExploreLayout = async (props: {
	children: ReactNode;
	spirit: ReactNode;
}) => {
	return (
		<>
			<NavBar push />
			{props.children}
			{props.spirit}
		</>
	);
};

export default SpiritExploreLayout;
