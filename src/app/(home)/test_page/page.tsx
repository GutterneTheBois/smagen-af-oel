import { FC } from "react";
import {
	BeerRequest,
	BreweryDeleteRequest,
	BreweryPostRequest,
	BreweryPutRequest,
	DistilleryPostRequest,
	DistilleryPutRequest,
	StatusField,
} from "@/components/TestComponents";

const TestPage: FC = async () => {
	return (
		<>
			<div
				style={{
					display: "flex",
					marginBottom: "2vh",
					marginLeft: "2vw",
				}}
			>
				<BreweryPostRequest />
				<BreweryPutRequest />
				<BreweryDeleteRequest />
			</div>
			<hr />
			<div
				style={{
					display: "flex",
					marginBottom: "2vh",
					marginLeft: "2vw",
				}}
			>
				<BeerRequest />
			</div>
			<hr />
			<div
				style={{ display: "flex", marginTop: "2vh", marginLeft: "2vw" }}
			>
				<DistilleryPostRequest />
				<DistilleryPutRequest />
			</div>
			<StatusField />
		</>
	);
};

export default TestPage;
