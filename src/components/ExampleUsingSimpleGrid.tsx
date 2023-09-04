import { ExampleBox, ExampleButton, ExampleSimpleGrid } from "@/barrels";

const ExampleUsingSimpleGrid = () => {
	return (
		<>
			<ExampleSimpleGrid columns={5} centerItems width={"40vw"}>
				<ExampleBox>
					<ExampleButton>Item 1</ExampleButton>
				</ExampleBox>

				<ExampleBox justifyContent="center" alignItems="center">
					<ExampleButton>Item 2</ExampleButton>
				</ExampleBox>

				<ExampleBox justifyContent="center" alignItems="center">
					<ExampleButton>Item 3</ExampleButton>
				</ExampleBox>

				<ExampleButton>Item 4</ExampleButton>
			</ExampleSimpleGrid>
		</>
	);
};

export default ExampleUsingSimpleGrid;
