import { FC } from "react";
import {
	BeerDeleteRequest,
	BeerRequest,
	BreweryDeleteRequest,
	BreweryPostRequest,
	BreweryPutRequest,
	DistilleryDeleteRequest,
	DistilleryPostRequest,
	DistilleryPutRequest,
	SpiritDeleteRequest,
	SpiritPostRequest,
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
				<StatusField />
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
				<BeerDeleteRequest />
			</div>
			<hr />
			<div
				style={{
					display: "flex",
					marginTop: "2vh",
					marginBottom: "2vh",
					marginLeft: "2vw",
				}}
			>
				<DistilleryPostRequest />
				<DistilleryPutRequest />
				<DistilleryDeleteRequest />
			</div>
			<hr />
			<div
				style={{ display: "flex", marginTop: "2vh", marginLeft: "2vw" }}
			>
				<SpiritPostRequest />
				<SpiritDeleteRequest />
			</div>
		</>
	);
};

export default TestPage;
