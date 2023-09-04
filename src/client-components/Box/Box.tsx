import { FC } from "react";
import { CommonProps } from "../types/CommonProps";

const Box: FC<CommonProps> = (props: CommonProps): JSX.Element => {
	return (
		<div
			style={{
				display: props.display ? props.display : "flex",
				justifyContent: props.justifyContent
					? props.justifyContent
					: "left",
				alignItems: props.alignItems ? props.alignItems : "left",
			}}
		>
			{props.children}
		</div>
	);
};

export default Box;
