// "use client";
// import { FC, useState } from "react";
// import { Box, Button, GridBox, HTMLFrame, Input } from "SmagenUI";
// import "./main.scss";

// const Main: FC = () => {
// 	const onClick = () => {
// 		console.log("Smagen UI button clicked!");
// 	};

// 	const [input, setInput] = useState("");

// 	const onChange = (ev: any) => {
// 		setInput(ev.target.value);
// 	};

// 	const submitClick = () => {
// 		console.log(`SUBMITTED: ${input}`);
// 	};

// 	// const [list, setList] = useState<any>([]);

// 	// const showToast = (type: string) => {
// 	// 	const toastProperties = TOAST_PROPERTIES.find(
// 	// 		(toast) => toast.title.toLowerCase() === type
// 	// 	);
// 	// 	setList([...list, toastProperties]);
// 	// };

// 	return (
// 		<>
// 			<Box handDrawn width={"30vw"} height={"20vh"} color={"white"}>
// 				<GridBox columns={2}>
// 					<Button drawn onClick={onClick} size="sm">
// 						Smagen UI Sm
// 					</Button>
// 					<Button>Smagen UI Md</Button>
// 					<Button drawn size="lg">
// 						Smagen UI Lg
// 					</Button>
// 				</GridBox>

// 				<HTMLFrame src={"/embed.html"} />
// 			</Box>
// 			{/* <Button onClick={() => showToast("success")}>TOAST IT!</Button>
// 			<Button onClick={() => showToast("warning")}>TOAST IT!</Button>
// 			<Button onClick={() => showToast("danger")}>TOAST IT!</Button>
// 			<Button onClick={() => showToast("info")}>TOAST IT!</Button> */}
// 			<Input />
// 			<Input label="with label" />
// 			<Input
// 				className="inputChanged"
// 				onChange={onChange}
// 				defaultValue={input}
// 			/>
// 		</>
// 	);
// };

// export default Main;
