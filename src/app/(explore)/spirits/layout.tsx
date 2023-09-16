import { ReactNode } from "react";

const SpiritExploreLayout = async (props: {
	children: ReactNode;
	spirit: ReactNode;
}) => {
	return (
		<>
			{props.children}
			{props.spirit}
		</>
	);
};

export default SpiritExploreLayout;
