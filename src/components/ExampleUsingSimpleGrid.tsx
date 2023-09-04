import { Box, Button, SimpleGrid } from "@/client-components";

const ExampleUsingSimpleGrid = () => {
	return (
		<>
			<SimpleGrid columns={5} centerItems width={"40vw"}>
				<Box>
					<Button>Item 1</Button>
				</Box>

				<Box justifyContent="center" alignItems="center">
					<Button>Item 2</Button>
				</Box>

				<Box justifyContent="center" alignItems="center">
					<Button>Item 3</Button>
				</Box>

				<Button>Item 4</Button>
			</SimpleGrid>
		</>
	);
};

export default ExampleUsingSimpleGrid;
