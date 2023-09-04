import { Button } from "@/client-components"; // Notice how the import is just the barrel dir

const ExampleUsingBarrelButton = () => {
	return (
		<>
			<Button
				/*optionals*/ height="8vh"
				// color='#000000'
				// backgroundColor='#dd0b69'
				onClick={() => console.log("Vanilla button clicked!")}
			>
				Perfection
			</Button>
		</>
	);
};

export default ExampleUsingBarrelButton;
