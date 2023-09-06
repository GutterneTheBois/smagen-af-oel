import { FC } from "react";
import {
	BeerRequest,
	BreweryPostRequest,
	BreweryPutRequest,
} from "@/components/TestComponents";

const TestPage: FC = async () => {
	return (
		<div style={{ display: "flex" }}>
			<BreweryPostRequest />
			<BeerRequest />
			<BreweryPutRequest />
		</div>
	);
};

export default TestPage;
