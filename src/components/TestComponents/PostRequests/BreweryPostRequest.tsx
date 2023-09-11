"use client";
import { ChangeEvent, FC, useState, useRef } from "react";
import { useDb } from "@/services";
import { Button } from "@/client-components";
import { useLoadingAsync } from "@/utils/hooks/useLoadingAsync";

const BreweryPostRequest: FC = () => {
	const { createBrewery, breweries, refreshBreweries } = useDb();
	const nameRef = useRef(null);
	const descRef = useRef(null);

	const [input, setInput] = useState({
		name: "",
		description: undefined,
	});

	const { loading } = useLoadingAsync(async () => {
		await refreshBreweries();
	}, []);

	const onChange = (ev: ChangeEvent<HTMLInputElement>): void => {
		const { name, value } = ev.target;

		setInput({
			...input,
			[name]: value,
		});
	};

	const isExistingBrewery = (): boolean => {
		return breweries.some((brewery) => brewery.name === input.name);
	};

	const clearInputs = () => {
		setInput({
			name: "",
			description: undefined,
		});

		// @ts-ignore
		nameRef.current.value = "";
		// @ts-ignore
		descRef.current.value = "";
	};

	return (
		<div style={{ marginRight: "10vw" }}>
			<h1>Create Brewery</h1>
			<div>
				<label htmlFor="name">Name:</label>
				<br />
				<input
					ref={nameRef}
					name="name"
					style={{
						color: `${isExistingBrewery() ? "red" : "white"}`,
					}}
					defaultValue={input.name}
					onChange={onChange}
					placeholder="Name"
				/>
				{isExistingBrewery() && <p>Brewery already exists!</p>}
				<hr />
				<label htmlFor="description">Description:</label>
				<br />
				<input
					ref={descRef}
					name="description"
					defaultValue={input.description}
					onChange={onChange}
					placeholder={"Description"}
				/>
				<Button
					onClick={() => {
						createBrewery(input.name, input.description);
						clearInputs();
					}}
				>
					Submit
				</Button>
			</div>
		</div>
	);
};

export default BreweryPostRequest;
