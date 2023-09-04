import { ExampleButton } from "@/barrels"; // Notice how the import is just the barrel dir

const ExampleUsingBarrelButton = () => {
	return (
		<>
			<ExampleButton
				/*optionals*/ height="8vh"
				// color='#000000'
				// backgroundColor='#dd0b69'
				onClick={() => console.log("Vanilla button clicked!")}
			>
				Perfection
			</ExampleButton>
		</>
	);
};

export default ExampleUsingBarrelButton;
